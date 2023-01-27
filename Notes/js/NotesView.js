import editor from './editor.js';

export default class NotesView {
	constructor(
		root,
		{ onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
	) {
		this.root = root;
		this.onNoteSelect = onNoteSelect;
		this.onNoteAdd = onNoteAdd;
		this.onNoteEdit = onNoteEdit;
		this.onNoteDelete = onNoteDelete;
		this.root.innerHTML = `
            <div class="notes__sidebar">
			
				<div class="notes__search function__tiles">
						<input type="text" placeholder="Search" />
						<div class="favorite__list">
							<span class="material-symbols-outlined" style="color:var(--white)"> folder_copy </span>
							<span class="material-symbols-outlined" style="color:var(--gold)"> star </span>
							<span class="material-symbols-outlined" style="color:var(--noteColor1)">trip_origin</span>
							<span class="material-symbols-outlined" style="color:var(--noteColor4)">trip_origin</span>
							<span class="material-symbols-outlined" style="color:var(--noteColor3)">trip_origin</span>
							<span class="material-symbols-outlined" style="color:var(--noteColor2)">trip_origin</span>
						</div>
				</div>

                <div class="notes__list"></div>

				<button class="notes__add function__tiles" type="button">Add Note</button>
				
            </div>
            <div class="notes__preview">
                <input class="notes__title" data-color="" type="text" placeholder="New Note...">
				<div id="color-picker">
					<span class="red material-symbols-outlined color-picker-button" data-color="var(--red)">trip_origin</span>
					<span class="green material-symbols-outlined color-picker-button" data-color="var(--green)">trip_origin</span>
					<span class="blue material-symbols-outlined color-picker-button" data-color="var(--blue)">trip_origin</span>
					<span class="yellow material-symbols-outlined color-picker-button" data-color="var(--yellow)">trip_origin</span>
					<span class="white material-symbols-outlined color-picker-button" data-color="var(--text)">format_color_reset</span>
			</div>
                <textarea class="notes__body" >Take Note...</textarea>
            </div>
			<button id="themeSwitcher">
				<img src="images/moon.png" alt="moon" />
			</button>

			<span id="notification" class="material-symbols-outlined favorite"> notifications </span>
        `;

		const btnAddNote = this.root.querySelector('.notes__add');
		const inpTitle = this.root.querySelector('.notes__title');
		const inpBody = this.root.querySelector('.notes__body');
		const colorPickers = this.root.querySelectorAll('.color-picker-button');

		// colorPickers.forEach((color) => {
		// 	color.addEventListener('click', () => {
		// 		console.log(color.classList.item(0));

		// 		const selectedNote = this.root.querySelector('.notes__title');
		// 		const selectedNoteSmall = this.root.querySelector(
		// 			'.notes__small-title'
		// 		);
		// 		console.log(selectedNote);
		// 		selectedNote.classList.toggle(color.classList.item(0));
		// 		selectedNoteSmall.classList.toggle(color.classList.item(0));
		// 	});
		// });

		colorPickers.forEach((color) => {
			color.addEventListener('click', () => {
				localStorage.setItem('noteColor', color.dataset.color);

				const selectedNote = this.root.querySelector('.notes__title');
				const selectedNoteSmall = this.root.querySelector(
					'.notes__small-title'
				);
				selectedNote.style.color = color.dataset.color;
				selectedNoteSmall.style.color = color.dataset.color;
			});
		});

		btnAddNote.addEventListener('click', () => {
			this.onNoteAdd();
		});

		[inpTitle, inpBody].forEach((inputField) => {
			inputField.addEventListener('blur', () => {
				const updatedTitle = inpTitle.value.trim();
				const updatedBody = inpBody.value.trim();

				this.onNoteEdit(updatedTitle, updatedBody);
			});
		});

		this.updateNotePreviewVisibility(false);
	}

	_createListItemHTML(id, title, body, updated) {
		const MAX_BODY_LENGTH = 60;

		return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title" data-color="">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? '...' : ''}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, {
											dateStyle: 'full',
											timeStyle: 'short',
										})}
                </div>
				<label><input type="checkbox"><span class="label material-symbols-outlined favorite" > star </span></label>
				<span class="material-symbols-outlined delete"> delete </span>
            </div>
        `;
	}
	updateNoteList(notes) {
		const notesListContainer = this.root.querySelector('.notes__list');

		notesListContainer.innerHTML = '';

		for (const note of notes) {
			const html = this._createListItemHTML(
				note.id,
				note.title,
				note.body,
				new Date(note.updated)
			);

			notesListContainer.insertAdjacentHTML('beforeend', html);
		}

		// Add select/delete events for each list item
		notesListContainer
			.querySelectorAll('.notes__list-item')
			.forEach((noteListItem) => {
				noteListItem.addEventListener('click', () => {
					this.onNoteSelect(noteListItem.dataset.noteId);
				});

				noteListItem
					.querySelector('.favorite')
					.addEventListener('click', () => {
						this.onNoteFavorite(noteListItem.dataset.noteId).addClass(
							'favorite'
						);
					});

				noteListItem.querySelector('.delete').addEventListener('click', () => {
					this.onNoteDelete(noteListItem.dataset.noteId);
				});
			});
	}

	updateActiveNote(note) {
		this.root.querySelector('.notes__title').value = note.title;
		this.root.querySelector('.notes__body').value = note.body;

		this.root.querySelectorAll('.notes__list-item').forEach((noteListItem) => {
			noteListItem.classList.remove('notes__list-item--selected');
		});

		this.root
			.querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
			.classList.add('notes__list-item--selected');
	}

	updateNotePreviewVisibility(visible) {
		this.root.querySelector('.notes__preview').style.visibility = visible
			? 'visible'
			: 'hidden';
	}
}
