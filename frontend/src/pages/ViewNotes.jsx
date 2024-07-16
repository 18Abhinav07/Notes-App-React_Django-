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
            <div className="h-[40vh] w-[50vw]  bg-white shadow sm:rounded-lg flex justify-center items-center">
                <div className="w-[30vw] m-10">
                    <div className='flex justify-center items-centre text-centre'>
                        <h1 className="flex text-centre mb-4 text-3xl font-extrabold text-gray-600 md:text-4xl lg:text-4xl"><span className=" text-centre text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"> Edit Note</span></h1>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-400 dark:text-gray-800">Title</span>
                    <textarea
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1 mb-5"
                        type="text"
                        value={title} onChange={handleTitleChange}
                    ></textarea>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-400 dark:text-gray-800">Content</span>
                    <textarea
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                        type="text"
                        value={content} onChange={handleContentChange}
                    ></textarea>
                    <button
                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        onClick={handleSave}>
                        <span className="ml-3">
                            Save
                        </span>
                    </button>
                </div>
            </div>
        );
    };



    return (
        <div className="flex flex-col items-centre justify-centre">
            {notes.length > 0 && <NotesCarousel notes={notes} onDelete={deleteNote} onEdit={editNote} />}
            <div className='mt-20 flex justify-center '>
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