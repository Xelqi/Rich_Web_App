document.addEventListener("DOMContentLoaded", function () {
  const { fromEvent } = rxjs;
  const { map, filter } = rxjs.operators;
  let mainNote;

  class Note {
    constructor(title, desc, color) {
      this.title = title;
      this.desc = desc;
      this.color = color;
      this.parent = null;
      this.childNotes = [];
      this.noteElement = this.createNoteElement();
    }

    addChild(childNote) {
      childNote.parent = this;
      this.childNotes.push(childNote);
    }

    removeChild() {
      for (const child of this.childNotes) {
        if (child) {
          child.noteElement.remove();
        }
      }
      this.childNotes = [];
    }

    createNoteElement() {
      const noteContainer = document.createElement("div");
      const newNote = document.createElement("div");
      const noteTitle = document.createElement("h3");
      const noteDesc = document.createElement("p");

      noteTitle.textContent = this.title;
      noteDesc.textContent = this.desc;

      noteContainer.classList.add("note");
      newNote.classList.add("note");
      noteTitle.classList.add("noteTitle");
      noteDesc.classList.add("noteDesc");

      noteContainer.style.backgroundColor = this.color;

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      newNote.appendChild(noteTitle);
      newNote.appendChild(noteDesc);
      newNote.appendChild(editButton);
      newNote.appendChild(deleteButton);
      noteContainer.appendChild(newNote);

      document.querySelector(".wrapper").appendChild(noteContainer);

      const editButtonClick$ = fromEvent(editButton, "click");
      const deleteButtonClick$ = fromEvent(deleteButton, "click");

      editButtonClick$.subscribe(() => {
        this.editNoteContent(noteTitle, noteDesc);
      });

      deleteButtonClick$.subscribe(() => {
        this.deleteNote();
      });

      return noteContainer;
    }

    editNoteContent(titleElement, descElement) {
      const newTitle = prompt("Edit the title:", titleElement.textContent);
      const newDescription = prompt(
        "Edit the description:",
        descElement.textContent
      );
      if (newTitle !== null) {
        titleElement.textContent = newTitle;
      }
      if (newDescription !== null) {
        descElement.textContent = newDescription;
      }
      console.log("Editing note:", this.title);
    }

    deleteNote() {
      // Implementation for deleting note
      console.log("Deleting note:", this.title);
      this.removeChild();
      this.noteElement.remove(); // Remove the HTML element from the DOM
      // Reset object state
      mainNote = null;
    }
  }

  const title = document.getElementById("note-title");
  const desc = document.getElementById("note-description");
  const colorPicker = document.getElementById("note-color");
  const submitBtn = document.getElementById("submit-btn");

  const addNoteBtn$ = fromEvent(submitBtn, "click");

  addNoteBtn$.subscribe(() => addNote());

  function addNote() {
    let a = title.value;
    let b = desc.value;
    let color = colorPicker.value;

    if (!mainNote) {
      mainNote = new Note(a, b, color);
    } else {
      const newNote = new Note(a, b, color);
      mainNote.addChild(newNote);
    }

    title.value = "";
    desc.value = "";
  }
});
