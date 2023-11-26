document.addEventListener("DOMContentLoaded", function () {
  const { fromEvent } = rxjs;
  const { map, filter } = rxjs.operators;

  // Getting references to the HTML elements by their IDs
  const title = document.getElementById("note-title");
  const desc = document.getElementById("note-description");
  const colorPicker = document.getElementById("note-color");
  const submitBtn = document.getElementById("submit-btn");

  // Create observables for DOM elements and events
  const addNoteBtn$ = fromEvent(submitBtn, "click");

  // Subscribe to add note button click event
  addNoteBtn$.subscribe(() => addNote());

  // Function to add a new note
  function addNote() {
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

    // Setting the background color of the note
    noteContainer.style.backgroundColor = color;

    // Creating edit button and adding context
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";

    // Creating delete button and adding context
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // Append the children to make the correct structure
    newNote.appendChild(noteTitle);
    newNote.appendChild(noteDesc);
    newNote.appendChild(editButton);
    newNote.appendChild(deleteButton);
    noteContainer.appendChild(newNote);

    document.querySelector(".wrapper").appendChild(noteContainer);

    // Clearing the input fields after adding a note
    title.value = "";
    desc.value = "";

    // Create observables for edit and delete buttons
    const editButtonClick$ = fromEvent(editButton, "click");
    const deleteButtonClick$ = fromEvent(deleteButton, "click");

    // Subscribe to edit note button click event
    editButtonClick$.subscribe(() => {
      editNoteContent(noteTitle, noteDesc);
    });

    // Subscribe to delete note button click event
    deleteButtonClick$.subscribe(() => {
      deleteNote(noteContainer);
    });
  }

  // Function to edit note's content
  function editNoteContent(titleElement, descriptionElement) {
    const newTitle = prompt("Edit the title:", titleElement.textContent);
    const newDescription = prompt("Edit the description:", descriptionElement.textContent);

    if (newTitle !== null) {
      titleElement.textContent = newTitle;
    }
    if (newDescription !== null) {
      descriptionElement.textContent = newDescription;
    }
  }

  // Function to delete note
  function deleteNote(noteContainer) {
    noteContainer.parentElement.removeChild(noteContainer);
  }
});
