import React, { useContext,useState } from 'react'
import noteContext from '../context/noteContext';
import Notes from './Notes';

const Home = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note,setNote] = useState({title:"",description:""})
  const handleClick = ()=>{
addNote(note.title,note.description)
setNote({title:"",description:""});
props.showAlert("Added successfully","success")
  }
  const handleChange = (e)=>{
setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
    <div className='container my-3' style={{"display":"grid","placeItems":"center"}}>
      <h2>Add a new note</h2>
      <div className='my-3'>
      <h5>Title</h5>
      <input name="title" type="text" id='title' value={note.title} onChange={handleChange} minLength={3} required/>
      </div>
    <div>
    <h5>Description</h5>
      <input name="description" type="text" id="description" value={note.description}  onChange={handleChange} minLength={5} required/>
    </div>
      <button disabled={note.title.length<3 || note.description.length<5} className="addBtn" onClick={handleClick}>Add Note</button>
      <div>
<Notes showAlert={props.showAlert}/>
      </div>
    </div>

    </>

  )
}

export default Home
