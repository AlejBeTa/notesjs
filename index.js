document.addEventListener('DOMContentLoaded', function(){
    let addButton = document.getElementById('addButton');
    let noteInput = document.getElementById('noteInput');
    let saveButton = document.getElementById('saveButton');

    addButton.addEventListener('click', function(){
        addButton.style.display = 'none';
        noteInput.style.display = 'block';
        saveButton.style.display = 'block';
        noteInput.focus();
    })

    saveButton.addEventListener('click', function(){
        addOrUpdateNote();
    })
});

function addOrUpdateNote(){
    console.log(`AEA`)

    let noteInputValue = document.getElementById('noteInput').value.trim()
    if(noteInputValue !== ""){

        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        let noteIndexElement = document.getElementById('noteIndex');

        let noteIndex = noteIndexElement ? parseInt(noteIndexElement.value) : -1;

        if(!isNaN(noteIndex) && noteIndex >=0 && noteIndex < notes.length){
            //Update existing note
            notes[noteIndex].text = noteInputValue;
        }else{
            //Add new note
            notes.push({text: noteInputValue, completed: false})
        }

        localStorage.setItem('notes', JSON.stringify(notes))

        document.getElementById('noteInput').value = "";

        document.getElementById('addButton').style. display = 'block';
        document.getElementById('noteInput').style. display = 'none';
        document.getElementById('saveButton').style. display = 'none';
    }else{
        alert('Write something in the note')
    }
}