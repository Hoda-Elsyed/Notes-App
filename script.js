const addNote = document.querySelector('.add-note')
const wrapper = document.querySelector('.notes-container')


const notes = JSON.parse(localStorage.getItem("notes"));

if(notes){
    notes.forEach(note => {
        addNewNote(note)
    }
  )       
}


addNote.addEventListener('click',() => addNewNote(''))
    
function addNewNote(text = ''){
    const newNote = document.createElement('div')
    newNote.classList.add('note')
    wrapper.appendChild(newNote)
    newNote.innerHTML=`
    <div class="tools">
    <i class="fa fa-edit"></i>
    <i class="fa fa-trash"></i>
    </div>
    
    <div class="main ${ text ? '' : 'hidden' }"></div>
    <textarea class="${ text ? 'hidden' : '' }"></textarea>
    `
    const editBtn = newNote.querySelector('.fa-edit')
    const deleteBtn = newNote.querySelector('.fa-trash')
    const main = newNote.querySelector('.main')
    const tools = newNote.querySelector('.tools')
    const writeHere = newNote.querySelector('textarea')
    
    writeHere.value = text

    main.innerHTML = marked(text) 

    editBtn.addEventListener('click',()=>{
        writeHere.classList.toggle('hidden')
        main.classList.toggle('hidden')
    })
    
    deleteBtn.addEventListener('click', ()=>{
        newNote.remove()
        updatePage()
    })
    writeHere.addEventListener('input', (e)=>{
        const value = e.target.value
        main.innerHTML = marked(value)
        updatePage()
        
    })
 

}

function updatePage(){
    const allNotes = wrapper.querySelectorAll('textarea')
    const notes = []
    allNotes.forEach(note => notes.push(note.value))
    localStorage.setItem('notes', JSON.stringify(notes));
}
