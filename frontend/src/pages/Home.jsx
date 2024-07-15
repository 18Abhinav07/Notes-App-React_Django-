import { useState, useEffect } from "react";
import api from "../api";
import Alert from "../components/Alert";
import NotesCarousel from "../components/NotesCarousel";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [alert, setAlert] = useState({ visible: false, message: '', type: '' });

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

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
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

    const createNote = (e) => {
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
                } else {
                    setAlert({
                        visible: true,
                        message: 'Failed to make note. Please try again.',
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

    const handleAlertClose = () => {
        setAlert({ visible: false, message: '', type: '' });
    };




    // should hold some greeting and options to go to create notes and view notes 
    // view notes has carousal 
    // in the carousal can add the function that you can click the card to edit that note.





    return (
        <div>
            <div>

                {notes.length > 0 && <NotesCarousel notes={notes} onDelete={deleteNote} />}

            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
                <Alert
                    message={alert.message}
                    type={alert.type}
                    visible={alert.visible}
                    onClose={handleAlertClose}
                />
            </form>
        </div>
    );
};

export default Home;