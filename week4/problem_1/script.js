function add_contact(event) {
  event.preventDefault();
  let name_check = document.forms["contact-form"]["cname"].value;
  let number_check = document.forms["contact-form"]["ph-no"].value;
  let email_check = document.forms["contact-form"]["email"].value;
  if (name_check == "" || number_check == "" || email_check == "") {
    alert("Missing information in a field");
    return false;
  } else {
    // reference table
    var table = document.getElementById("contacts");
    // make elements you will insert
    var row = document.createElement("tr");
    var name = document.createElement("td");
    var mobile = document.createElement("td");
    var email = document.createElement("td");
    // Get values from form and assign to created elements
    name.innerHTML = document.getElementById("cname").value;
    mobile.innerHTML = document.getElementById("ph-no").value;
    email.innerHTML = document.getElementById("email").value;
    // Attach you elements like in html structure
    row.appendChild(name);
    row.appendChild(mobile);
    row.appendChild(email);
    // Append this row to the table referenced at start
    table.children[0].appendChild(row);
    // Reset input boxes after button pressed
    document.getElementById("contact-form").reset();
    odd_num_bg();
  }
}

function search_bar() {
  var input = document.getElementById("sbar");
  var filter = input.value.trim(); // Get the trimmed input value
  var table = document.getElementById("contacts");
  var rows = table.getElementsByTagName("tr");

  // Initialize a variable to keep track of whether any matches were found
  var foundMatch = false;

  for (let index = 1; index < rows.length; index++) {
    // Start from 1 to skip the header row
    var tds = rows[index].getElementsByTagName("td");
    var phoneNo = tds[1]; // Assuming phone numbers are in the second column (index 1)

    if (phoneNo) {
      var cellValue = phoneNo.innerHTML.trim(); // Get the trimmed cell content
      if (cellValue.includes(filter)) {
        // Check if the cell content includes the filter
        rows[index].style.display = "";
        foundMatch = true; // Set the flag to true if a match is found
      } else {
        rows[index].style.display = "none";
      }
    }
  }

  // Add a row to display a message if no matching phone number is found
  var noMatchRow = document.getElementById("no-match-row");
  if (filter === "") {
    noMatchRow.style.display = "none"; // Hide the row if the filter is empty
  } else if (foundMatch) {
    noMatchRow.style.display = "none";
  } else {
    noMatchRow.style.display = ""; // Display the row if no match is found
  }
}
var sortCount = 0;
var originalRows = new Map();

function sort_alph() {
  var tables = document.querySelectorAll("#contacts");

  // If the originalRows Map is empty, store a copy of the original rows for each table
  if (originalRows.size === 0) {
    tables.forEach((table) => {
      const rows = Array.from(table.rows).slice(1);
      originalRows.set(table, rows);
    });
  }

  tables.forEach((table) => {
    var rows = Array.from(table.rows).slice(1);
    var sortedRows;

    if (sortCount % 2 === 0) {
      // Sort in ascending order
      sortedRows = rows.slice().sort(function (a, b) {
        var nameA = a.getElementsByTagName("td")[0].textContent.toUpperCase();
        var nameB = b.getElementsByTagName("td")[0].textContent.toUpperCase();
        return nameA.localeCompare(nameB);
      });
    } else {
      // Sort in descending order
      sortedRows = rows.slice().sort(function (a, b) {
        var nameA = a.getElementsByTagName("td")[0].textContent.toUpperCase();
        var nameB = b.getElementsByTagName("td")[0].textContent.toUpperCase();
        return nameB.localeCompare(nameA);
      });
    }

    // Add sorted rows back to the table
    sortedRows.forEach((sortedRow) => {
      table.appendChild(sortedRow);
    });
  });

  sortCount++;
  if (sortCount === 3) {
    // Reset sorting and restore the original order for all tables
    sortCount = 0;
    tables.forEach((table) => {
      const original = originalRows.get(table);
      // Remove existing rows
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
      // Add the original rows back to the table
      original.forEach((row) => {
        table.appendChild(row);
      });
    });
  }
}

// JavaScript function to add background color to rows based on odd/even mobile numbers
function odd_num_bg() {
  var table = document.getElementById("contacts"); // Assuming the table has the id "contacts"
  var rows = table.getElementsByTagName("tr");

  for (var i = 1; i < rows.length; i++) {
    var mobileColumn = rows[i].getElementsByTagName("td")[1]; // Assuming mobile number is in the second column

    if (mobileColumn) {
      var mobileNumber = mobileColumn.innerText.trim();
      var mobileDigits = parseInt(mobileNumber);

      if (mobileDigits % 2 === 1) {
        rows[i].style.backgroundColor = "#f2f2f2"; // Odd mobile number
      } else {
        rows[i].style.backgroundColor = ""; // Even mobile number (remove background color)
      }
    }
  }
}

// Call the function to add background color based on mobile numbers
