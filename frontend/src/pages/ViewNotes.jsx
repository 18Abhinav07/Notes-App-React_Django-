import React from 'react';
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import api from '../api'
import NotesCarousel from "../components/NotesCarousel";



function ViewNotes() {

    const [notes, setNotes] = useState([]);
    const [alert, setAlert] = useState({ visible: false, message: '', type: '' });
    const [notetoedit, setNoteToEdit] = useState(null);
    const [visible, setVisible] = useState(true)
    const [loading, setLoading] = useState(false)


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
        setVisible(true)
    };


    const editNote = (id) => {
        setVisible(false)
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

        const handleSave = () => {

            const updatedcontent = {
                "title": title,
                "content": content,
            }

            sendEdit(notetoedit.id, updatedcontent);
        };

        return (
            <div className="max-w-screen-xl m-0 sm:m-10 bg-gradient-to-r from-cyan-100 to-purple-200 hover:bg-gradient-to-l shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex items-center justify-center">
                    <div className="flex flex-col items-center md:w-full">
                        {/* place for the main logo etc */}
                        <h3 className="font-poppins text-primary-500 mb-4 text-4xl font-semibold text-blue-500">
                            Edit Note
                        </h3>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-s">
                                <label for="title" className="flex font-poppins text-sm font-medium m-2">Title</label>
                                <input
                                    className=" font-poppins font-semibold w-full px-8 py-4 rounded-lg  bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    id="title"
                                    placeholder="Title"
                                    value={title} onChange={(e) => setTitle(e.target.value)}
                                />
                                <label for="content" className="flex font-poppins text-sm font-medium m-2 ">Content</label>
                                <textarea
                                    className="font-poppins font-semibold w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                    type="text"
                                    id="content"
                                    value={content} onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                                {loading && <LoadingIndicator />}
                                <div className="flex flex-row justify-end">
                                <button
                                    className="mt-5 mr-3  tracking-wide font-semibold bg-indigo-500 text-gray-100 w-[20%] py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    type="submit"
                                    onClick={handleSave}
                                    style={{ display: loading ? 'none' : 'flex' }}
                                >
                                    <span className="ml-1 mr-1 pl-2 pr-2">
                                        Save
                                    </span>
                                </button>
                                <button
                                    className="mt-5 p-2  tracking-wide font-semibold bg-red-500 text-gray-100 w-[25%] py-2 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    type="submit"
                                    onClick={() => { setNoteToEdit(null), setLoading(false), setVisible(true) }}
                                    style={{ display: loading ? 'none' : 'flex' }}
                                >
                                    <span className="ml-1 mr-1 pl-2 pr-2">
                                        Cancel
                                    </span>
                                    </button>
                                    </div>
                                <p className="mt-6 text-sm text-gray-600 text-center">
                                    Changes are meant to be the steps to laddder of growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url(../Working.jpg)"
                        }}
                    ></div>
                </div>
            </div>

        );
    };



    return (
        <div id="view_notes" className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex items-centre justify-center ">
            {notes.length > 0 && visible && <NotesCarousel notes={notes} onDelete={deleteNote} onEdit={editNote} />}
            {notetoedit && <NoteEditor />}
            <div className='block'>
            <Alert
                message={alert.message}
                type={alert.type}
                visible={alert.visible}
                onClose={handleAlertClose}
                />
                </div>
        </div>

    )
};

export default ViewNotes

// you have to create the seperate view notes with not the carousal 