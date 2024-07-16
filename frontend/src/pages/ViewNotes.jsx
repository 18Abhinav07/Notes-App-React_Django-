import React from 'react';
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import api from '../api'
import NotesCarousel from "../components/NotesCarousel";



function ViewNotes() {

    const [notes, setNotes] = useState([]);
    const [alert, setAlert] = useState({ visible: false, message: '', type: '' });
    const [notetoedit, setNoteToEdit] = useState(null)
    

    useEffect(() => {
        getNotes();
    }, []);

    useEffect(() => {
        if (alert.visible) {
            const timer = setTimeout(() => {
                setAlert({ visible: false, message: '', type: '' });
            }, 1000); // Close alert after 1 seconds

            return () => clearTimeout(timer); // Cleanup the timer if component unmounts
        }
    }, [alert.visible]);

    const handleAlertClose = () => {
        setAlert({ visible: false, message: '', type: '' });
    };

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => setAlert({
                visible: true,
                message: err.message,
                type: 'error',
            }));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    setAlert({
                        visible: true,
                        message: 'Note Deleted successfully!',
                        type: 'success',
                    });
                } else {
                    setAlert({
                        visible: true,
                        message: 'Failed to delete note. Please try again.',
                        type: 'error',
                    });
                }
                getNotes();
            })
            .catch((err) => setAlert({
                visible: true,
                message: err.message,
                type: 'error',
            }));
    };

    const sendEdit = (id, updatedContent) => {
        api
            .put(`/api/notes/edit/${id}/`, updatedContent)
            .then((res) => {
                if (res.status === 200) {
                    setAlert({
                        visible: true,
                        message: 'Note edited successfully!',
                        type: 'success',
                    });
                } else {
                    setAlert({
                        visible: true,
                        message: 'Failed to edit note. Please try again.',
                        type: 'error',
                    });
                }
                getNotes();
            })
            .catch((err) => setAlert({
                visible: true,
                message: err.message,
                type: 'error',
            }));
        

        setNoteToEdit(null)
    };


    const editNote = (id) => {
        const notetoedit = notes.find(note => note.id === id);
        setNoteToEdit(notetoedit)

    }

    const NoteEditor = () => {
        const [title, setTitle] = useState(notetoedit.title)
        const [content, setContent] = useState(notetoedit.content);

        useEffect(() => {
            setTitle(notetoedit.title)
            setContent(notetoedit.content);
        }, [notetoedit]);

        const handleTitleChange = (event) => {
            setTitle(event.target.value);
        };

        const handleContentChange = (event) => {
            setContent(event.target.value);
        };

        const handleSave = () => {

            const updatedcontent = {
                "title": title,
                "content": content,
            }

            sendEdit(notetoedit.id, updatedcontent);
        };

        return (
            <div>
                <textarea value={title} onChange={handleTitleChange} />
                <textarea value={content} onChange={handleContentChange} />
                <button onClick={handleSave}>Save</button>
            </div>
        );
    };



    return (
        <div className="flex flex-col">
            {notes.length > 0 && <NotesCarousel notes={notes} onDelete={deleteNote} onEdit={editNote} />}
            <div className='mt-20'>
                {notetoedit && <NoteEditor />}
            </div>

            <Alert
                message={alert.message}
                type={alert.type}
                visible={alert.visible}
                onClose={handleAlertClose}
            />
        </div>

    )
};

export default ViewNotes

// you have to create the seperate view notes with not the carousal 