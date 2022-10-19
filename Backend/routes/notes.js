const express = require('express')
const router = express.Router()
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require("express-validator");


//Route:1 Get all the notes using Get "/api/notes/fetchallnotes". login required.
router.get( "/fetchallnotes",fetchuser,async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }

}
);
//Route:2 Add a new note using Post "/api/notes/addnewnote". login required.
router.post( "/addnewnote",fetchuser, [
    body("title", "Please enter a valid title.").isLength({
        min: 3,
      }),
    body("description", "Description must be atleast 5 characters.").isLength({
      min: 5,
    }),
  ],async (req, res) => {
    try {
        //get the entered title and description
const {title,description,tag} = req.body;
//create a new note object
const note = new Note({
    title,description,tag,user:req.user.id
})
const savedNote = await note.save();
    res.json(savedNote)
    }  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }
});
//Route:3 Update note using Put "/api/notes/updatenote". login required.
router.put( "/updatenote/:id",fetchuser,async (req, res) => {
    try {
const {title,description,tag} = req.body;
//create a new note 
const newNote = {}
if(title){newNote.title=title}
if(description){newNote.description=description}
if(tag){newNote.tag=tag}
//find the note to be updated and update it
let note = await Note.findById(req.params.id)
if(!note){return res.status(404).send("Not Found")}
//Allow updation only if user owns this note
if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed")
}
note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note});

    }  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }
});
//Route:4 Delete note using Delete "/api/notes/deletenote". login required.
router.delete( "/deletenote/:id",fetchuser,async (req, res) => {
    try {

//find the note to be deleted and delete it
let note = await Note.findById(req.params.id)
if(!note){return res.status(404).send("Not Found")}
//Allow deletion only if user owns this note
if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed")
}
note = await Note.findByIdAndDelete(req.params.id)
res.json({success:"Note has been deleted."});

    }  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }
});


module.exports = router