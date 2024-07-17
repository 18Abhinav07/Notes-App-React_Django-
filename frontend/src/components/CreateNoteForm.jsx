
import React from "react";
import Alert from "./Alert";
import LoadingIndicator from "./LoadingIndicator";
import api from "../api";
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";

function CreateNoteForm() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [alert, setAlert] = useState({ visible: false, message: '', type: '' });
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (alert.visible) {
            const timer = setTimeout(() => {
                setAlert({ visible: false, message: '', type: '' });
            }, 1000); // Close alert after 1 seconds

            return () => clearTimeout(timer); // Cleanup the timer if component unmounts
        }

    }, [alert.visible]);

    const createNote = (e) => {
        setLoading(true)
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    setAlert({
                        visible: true,
                        message: 'Note created successfully!',
                        type: 'success',
                    });
                    setLoading(false)
                    const timer = setTimeout(() => {
                        navigate('/viewNotes')
                    }, 2000); // Close alert after 1 seconds

                } else {
                    setAlert({
                        visible: true,
                        message: 'Failed to make note. Please try again.',
                        type: 'error',
                    });
                    setLoading(false)
                }
            })
            .catch((err) => setAlert({
                visible: true,
                message: err.message,
                type: 'error',
            }), setLoading(false));


    };

    const handleAlertClose = () => {
        setAlert({ visible: false, message: '', type: '' });
    };

    return (
        // style the form element here..
        <>
            <div className="min-h-screen bg-gradient-to-r from-gray-400 to-gray-200 flex items-centre justify-center ">

                <div className=" w-auto m-0 sm:m-10 bg-gradient-to-r from-gray-100 to-gray-300 hover:bg-gradient-to-l shadow sm:rounded-lg flex flex-col justify-center">

                    <div className="flex items-centre justify-center">
                        <h1 className="flex text-centre mb-4 text-3xl font-extrabold text-gray-600 md:text-4xl lg:text-4xl font-poppins">Create a.. <span className=" text-centre text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-purple-400"> New Note</span> </h1>
                    </div>

                    <div className="m-10 sm:m-10">
                        {/* place for the main logo etc */}

                        <div className="w-full flex-1">
                            <div className="m-5">
                                <form onSubmit={createNote} >
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder="Title"
                                        value={title} onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <textarea
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="text"
                                        placeholder="Content"
                                        value={content} onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                    {loading && <LoadingIndicator />}
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type="submit"
                                        style={{ display: loading ? 'none' : 'flex' }}
                                    >
                                        <svg
                                            className="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">
                                            Create Note
                                        </span>
                                    </button>
                                    <Alert
                                        message={alert.message}
                                        type={alert.type}
                                        visible={alert.visible}
                                        onClose={handleAlertClose}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateNoteForm



