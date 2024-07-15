import React from 'react';

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');

    return (
        <div className='border border-sky-500 flex flex-col items-center justify-center m-5'>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">{note.title}</h5>
            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">{note.content}</p>
            <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">{formattedDate}</p>
            <button
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => onDelete(note.id)}
            >
                Delete
            </button>
        </div>
    );
}

export default Note;
