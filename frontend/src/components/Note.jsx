import React from 'react';

function Note({ note, onDelete , onEdit }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');

    return (
        <>
            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">{note.title}</h5>
            <p className="mb-4 font-normal text-gray-900 dark:text-gray-900 overflow-scroll">{note.content}</p>
            <p className="mb-4 font-normal text-gray-900 dark:text-gray-900 overflow-scroll">{formattedDate}</p>

            <div className="flex justify-start mt-5">
                <button
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 m-1"
                    onClick={() => onDelete(note.id)}
                >
                    Delete
                </button>
                <button
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900 m-1"
                    onClick={() => onEdit(note.id)}
                >
                    Edit
                </button>
            </div>
        </>
    );
}

export default Note;
