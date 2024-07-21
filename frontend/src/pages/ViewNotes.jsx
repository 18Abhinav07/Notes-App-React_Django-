import React from 'react';
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import api from '../api'
import NotesCarousel from "../components/NotesCarousel";
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

function ViewNotes() {

    const [notes, setNotes] = useState([]);
    const [alert, setAlert] = useState({ visible: false, message: '', type: '' });
    const [notetoedit, setNoteToEdit] = useState(null);
    const [visible, setVisible] = useState(true)
    const [loading, setLoading] = useState(false)

    const mdParser = new MarkdownIt({
        breaks: true,
        linkify: true,
    });


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

        const handleEditorChange = ({ text }) => {
            setContent(text);
        };

        const handleSave = () => {
            const updatedcontent = {
                "title": title,
                "content": content,
            }
            sendEdit(notetoedit.id, updatedcontent);
        };

        return (
            <div className="w-auto m-0 sm:m-10 bg-gradient-to-r from-gray-100 to-gray-300 hover:bg-gradient-to-l shadow sm:rounded-lg flex flex-col justify-center">
                <div className="flex items-centre justify-center">
                    <h1 className="flex text-centre mb-4 text-3xl font-extrabold text-gray-600 md:text-4xl lg:text-4xl font-poppins">Edit <span className="text-centre text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-purple-400"> Note</span></h1>
                </div>

                <div className="m-10 sm:m-10">
                    <div className="w-full flex-1">
                        <div className="m-5">
                            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <MdEditor
                                    style={{ height: '500px', marginTop: '20px' }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={handleEditorChange}
                                    value={content}
                                    view={{ menu: true, md: true, html: true }}
                                    canView={{ menu: true, md: true, html: true, fullScreen: true, hideMenu: true }}
                                />
                                {loading && <LoadingIndicator />}
                                <div className="flex justify-end mt-5">
                                    <button
                                        className="mr-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-[20%] py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type="submit"
                                        style={{ display: loading ? 'none' : 'flex' }}
                                    >
                                        <span className="ml-3">Save</span>
                                    </button>
                                    <button
                                        className="tracking-wide font-semibold bg-red-500 text-gray-100 w-[25%] py-4 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type="button"
                                        onClick={() => { setNoteToEdit(null); setLoading(false); setVisible(true); }}
                                        style={{ display: loading ? 'none' : 'flex' }}
                                    >
                                        <span className="ml-3">Cancel</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div id="view_notes" className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex items-centre justify-center ">
            {notes.length > 0 && visible && <NotesCarousel notes={notes} onDelete={deleteNote} onEdit={editNote} mdParser={mdParser} />}
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