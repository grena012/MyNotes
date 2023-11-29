const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the notes using : GET "/api/auth/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: Add new notes using : POST "/api/notes/addnote"
router.post('/addnote', fetchuser, [
    body('title', 'Enter a Valid Title').isLength({ min: 4 }),
    body('description', 'Password must contains atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //If there are errors return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 3: Update an existing notes using : PUT "/api/notes/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
    const { title, description, tag } = req.body;
    //create a newnote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
         
}catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}


})
//ROUTE 4: Delete an existing notes using : DELETE "/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    try {
    //Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    //Allow deletion only if userowns this Note
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Note has benn deleted" , note: note });

} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}



})

module.exports = router