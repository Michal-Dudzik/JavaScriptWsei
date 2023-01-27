export default class NotesAPI {
	static getAllNotes() {
		const notes = JSON.parse(localStorage.getItem('notesapp-notes') || '[]');

		const savedColor = localStorage.getItem('noteColor');
		if (savedColor) {
			const selectedNote = document.querySelector('.notes__title');
			const selectedNoteSmall = document.querySelector('.notes__small-title');
			selectedNote.style.color = savedColor;
			// selectedNoteSmall.style.color = savedColor;
		}

		return notes.sort((a, b) => {
			return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
		});
	}

	static saveNote(noteToSave) {
		const notes = NotesAPI.getAllNotes();
		const existing = notes.find((note) => note.id == noteToSave.id);

		// Edit/Update
		if (existing) {
			existing.title = noteToSave.title;
			existing.body = noteToSave.body;
			existing.updated = new Date().toISOString();
		} else {
			noteToSave.id = Math.floor(Math.random() * 1000000);
			noteToSave.updated = new Date().toISOString();
			notes.push(noteToSave);
		}

		localStorage.setItem('notesapp-notes', JSON.stringify(notes));
	}

	static deleteNote(id) {
		const notes = NotesAPI.getAllNotes();
		const newNotes = notes.filter((note) => note.id != id);

		localStorage.setItem('notesapp-notes', JSON.stringify(newNotes));
	}
}
