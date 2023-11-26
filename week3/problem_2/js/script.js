function add_note() {
  // Getting object by ID
  const title = document.getElementById("note-title");
  const desc = document.getElementById("note-description");
  const colorPicker = document.getElementById("note-color");
  // Assigning those values to a variable
  let a = title.value;
  let b = desc.value;
  let color = colorPicker.value;

  // Creating structure
  let noteContainer = document.createElement("div");
  let newNote = document.createElement("div");
  let noteTitle = document.createElement("h3");
  let noteDesc = document.createElement("p");

  // Assigning content
  noteTitle.textContent = a;
  noteDesc.textContent = b;
  // Adding classes for styling
  noteContainer.classList.add("note");
  newNote.classList.add("note");
  noteTitle.classList.add("noteTitle");
  noteDesc.classList.add("noteDesc");
  noteContainer.style.backgroundColor = color;

  let editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = function () {
    edit_note(noteTitle, noteDesc);
  };

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    delete_note(noteContainer); // Pass the newNote element to delete
  };

  // Append the children to make the correct structure
  newNote.appendChild(noteTitle);
  newNote.appendChild(noteDesc);
  newNote.appendChild(editButton);
  newNote.appendChild(deleteButton);
  noteContainer.appendChild(newNote);

  document.querySelector(".wrapper").appendChild(noteContainer);
}

function edit_note(titleElement, descriptionElement) {
  const newTitle = prompt("Edit the title:", titleElement.textContent);
  const newDescription = prompt("Edit the description:", descriptionElement.textContent);

  if (newTitle !== null) {
    titleElement.textContent = newTitle;
  }
  if (newDescription !== null) {
    descriptionElement.textContent = newDescription;
  }
}

function delete_note(noteContainer) {
  noteContainer.parentElement.removeChild(noteContainer);
}
