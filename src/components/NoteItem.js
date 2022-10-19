import React, { useContext} from 'react'
import noteContext from '../context/noteContext';

const NoteItem = (props) => {
  const {note, updateNote} = props;
  const context = useContext(noteContext);
  const {deleteNote} = context;
  return (
    <div className="col-md-3" style={{margin:"0 2rem","display":"grid","placeItems":"center"}}>
    <div className="card my-3">
  <div className="card-body">
    <h5 className="card-title d-flex align-items-center">{note.title}    </h5>
     

    <p className="card-text">{note.description}</p>
    
    <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)
   
    }}></i>
<i className="fa-sharp fa-solid fa-trash" onClick={()=>{deleteNote(note._id)
  props.showAlert("Deleted successfully","success")
}}></i>
  </div>
</div>
    </div>
  )
}

export default NoteItem
