import React, { useContext, useEffect,useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/noteContext';
import NoteItem from './NoteItem';

const Notes = (props) => {
  let navigate = useNavigate()
  const context = useContext(noteContext);
  const {notes,getNotes,editNote} = context;
  useEffect(()=>{
if(localStorage.getItem("auth-token")){
  getNotes();
}else{
  navigate("/login")
}


// eslint-disable-next-line
  },[]);
  const updateNote = (currentNote)=>{
ref.current.click();
setNote(currentNote)

  }
  const ref = useRef(null);
  const refClose = useRef();
  const [note,setNote] = useState({id:"",title:"",description:""})

  const handleChange = (e)=>{
setNote({...note,[e.target.name]:e.target.value})
  }
  const handleClick = ()=>{
    editNote(note._id,note.title,note.description)
    refClose.current.click();
    props.showAlert("Updated successfully","success");
  }
  return (
    <>
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <h5>Title</h5>
      <input name="title" type="text" id='etitle' value={note.title} onChange={handleChange} minLength={3} required/>
    <div>
    <h5>Description</h5>
      <input name="description" type="text" id="edescription" value={note.description}  onChange={handleChange} minLength={5} required/>
    </div>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.title.length<3 || note.description.length<5}  className="button" onClick={handleClick}>Update</button>
      </div>
    </div>
  </div>
</div>
    <div className='row container my-5'>
        <div className="container mx-2 my-3">
        {notes.length===0&&'No notes to display'}</div>
{notes.map((note)=>{
    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
  })}




    </div>
    </>
  )
}

export default Notes
