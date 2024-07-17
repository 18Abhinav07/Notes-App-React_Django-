import React from 'react';

function Note({ note, onDelete, onEdit }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');
    return (
        <>
            <div className='w-full p-4 rounded-lg bg-two flex flex-col space-y-8'>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-2 items-center'>
                        <div className='w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-800'></div>
                        <div className='text-sm font-bold'>Note</div>
                    </div>


                </div>
                <div className='flex flex-col space-y-2 justify-center px-6'>
                    <h2 className='text-2xl font-bold text-center overflow-scroll'>{note.title}</h2>
                    <div className='flex justify-center items-center py-12'>
                        <img src='../Working.jpg' className='h-40 w-40' />
                    </div>
                    <p className='font-poppins font-semibold  text-slate-800 overflow-scroll'>
                        {note.content}
                    </p>

                    <p className="mb-4 font-normal text-gray-900 dark:text-gray-900 overflow-scroll"> <strong>Date: </strong>{formattedDate}</p>


                </div>
                <div className="flex flex-row justify-end">
                    <button
                        className='rounded-lg shadow-lg bg-slate-400 flex justify-center text-sm 
                    items-center py-2 text-slate-700 font-semibold w-[20%] mr-2'
                        onClick={() => onEdit(note.id)}
                    >
                        Edit
                    </button>
                    <button
                        className='rounded-lg shadow-lg bg-slate-400 flex justify-center text-sm 
                    items-center py-2 text-slate-700 font-semibold w-[25%]'
                        onClick={() => onDelete(note.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>




















        </>
    );
}

export default Note;
