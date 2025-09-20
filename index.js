document.addEventListener('DOMContentLoaded', function(){
    let saveButton = document.getElementById('saveButton');

    saveButton.addEventListener('click', function(){
        addNote();
    })

    loadNotes();

    searchInput.addEventListener('input', function(){
        var searchValue = searchInput.value.trim().toLowerCase();
        var notes = JSON.parse(localStorage.getItem('notes')) || [];

        var filteredNotes = notes.filter(function(note){
            return note.text.toLowerCase().includes(searchValue);
        });
        renderNotes(filteredNotes);
    });
});

function addNote(){

    let noteInputValue = document.getElementById('noteInput').value.trim()
    if(noteInputValue !== ""){

        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        let noteIndexElement = document.getElementById('noteIndex');

        let noteIndex = noteIndexElement ? parseInt(noteIndexElement.value) : -1;

        notes.push({text: noteInputValue, completed: false})

        

        localStorage.setItem('notes', JSON.stringify(notes))

        loadNotes();

        const modalEl = document.getElementById("mensajeModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        document.getElementById('noteInput').value = '';


        document.getElementById('noteInput').value = "";
    }else{
        alert('Write something in the note')
    }
}

function loadNotes() {
    var notes =  JSON.parse(localStorage.getItem('notes')) || [];
    renderNotes(notes);
}


function renderNotes(notes){
    var notesContainer = document.getElementById('noteContainer');
    notesContainer.innerHTML = '';

    var completedTask = 0;

    notes.forEach(function(note, index){
        var noteElement = createNoteElement(note, index);
        notesContainer.appendChild(noteElement);
        if(note.completed){
            completedTask++;
        }
    });

    updateCompletedCount(completedTask, notes.length);
}

function createNoteElement(note, index){
    var noteElement = document.createElement('div');
    noteElement.classList.add('card');
    noteElement.classList.add('custom-card');
    noteElement.style="width: 18rem;";


    var checkboxWrapper = document.createElement('div');
    checkboxWrapper.classList.add('form-check');

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'cb-' + index;
    checkbox.checked = note.completed;
    checkbox.classList.add('form-check-input');

    checkbox.addEventListener('change', function(){
        toggledCompleted(index);
    });

    var label = document.createElement('label');
    label.classList.add('form-check-label');
    label.setAttribute('for', 'cb-' + index);



    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);


    var textNode = document.createElement('textarea');
    textNode.id = 'noteText-' + index;
    textNode.disabled = true;
    
    var text = document.createTextNode(note.text);

    textNode.appendChild(text);

    noteElement.appendChild(checkboxWrapper);
    noteElement.appendChild(textNode);


    var editButton = document.createElement('button');
    editButton.className = 'btn btn-outline-warning';
    editButton.textContent = 'Edit';
    editButton.id = 'editButton-'+index;
    editButton.addEventListener('click', function(){
        editNote(index);
    });
    noteElement.appendChild(editButton);

    var cancelButton = document.createElement('button');
    cancelButton.className = 'btn btn-outline-secondary';
    cancelButton.textContent = 'Cancel';
    cancelButton.id = 'cancelButton-'+index;
    cancelButton.style.display = 'none';
    cancelButton.addEventListener('click', function(){
        cancelEdit(index);
    });


    var saveButton = document.createElement('button');
    saveButton.className = 'btn btn-outline-success';
    saveButton.textContent = 'Save';
    saveButton.id = 'saveButton-'+index;
    saveButton.style.display = 'none';
    saveButton.addEventListener('click', function(){
        saveEdit(index);
    });


    var bothbuttonsWrapper = document.createElement('div');
    bothbuttonsWrapper.className = 'btn-group';
    bothbuttonsWrapper.appendChild(saveButton);
    bothbuttonsWrapper.appendChild(cancelButton);
    noteElement.appendChild(bothbuttonsWrapper);

    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function(){
        deleteNoteElement(index);
    });
    noteElement.appendChild(deleteButton);


    return noteElement;
}

function updateCompletedCount(completedTask, total){
    var completedCount = document.getElementById('completedCount');
    completedCount.textContent = `Has completado ${completedTask} de ${total} tareas`;
}

function cancelEdit(index){
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    if(index >= 0 && index < notes.length){

        document.getElementById('noteText-'+index).disabled = true;
        document.getElementById('cancelButton-'+index).style.display = 'none';
        document.getElementById('saveButton-'+index).style.display = 'none';
        document.getElementById('editButton-'+index).style.display = 'block';
        document.getElementById('noteText-'+index).value = notes[index].text;
        document.getElementById('noteIndex').value = index;
        

    }
}

function saveEdit(index){
    
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    if(index >= 0 && index < notes.length){

        let noteInputValue = document.getElementById('noteText-'+index).value.trim()
        if(noteInputValue !== ""){
            notes[index].text = noteInputValue;
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
        }
        else{
            alert('Write something in the note')
            return;
        }
        document.getElementById('noteText-'+index).disabled = true;
        document.getElementById('cancelButton-'+index).style.display = 'none';
        document.getElementById('saveButton-'+index).style.display = 'none';
        document.getElementById('editButton-'+index).style.display = 'block';
        document.getElementById('noteText-'+index).value = notes[index].text;
        document.getElementById('noteIndex').value = index;
        

    }
}

function editNote(index){

    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    if(index >= 0 && index < notes.length){

        document.getElementById('noteText-'+index).disabled = false;
        document.getElementById('noteText-'+index).focus();
        document.getElementById('cancelButton-'+index).style.display = 'block';
        document.getElementById('saveButton-'+index).style.display = 'block';
        document.getElementById('editButton-'+index).style.display = 'none';     
    }
}

function  deleteNoteElement(index){
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    if(index >= 0 && index < notes.length){
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }
}


function toggledCompleted(index){
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    if(index >= 0 && index < notes.length){
        notes[index].completed = !notes[index].completed;
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }
}