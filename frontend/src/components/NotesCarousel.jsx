import React, { useState } from 'react';
import Note from './Note';

function NotesCarousel({ notes, onDelete, onEdit }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        const newIndex = (currentSlide - 1 + notes.length) % notes.length;
        setCurrentSlide(newIndex);
    };

    const goToNextSlide = () => {
        const newIndex = (currentSlide + 1) % notes.length;
        setCurrentSlide(newIndex);
    };

    return (
        <div className='flex items-center justify-center'>
            <div id="default-carousel" className="relative w-full h-[30vh] m-10" data-carousel="slide">
                <div className='relative '>
                    {notes.slice().reverse().map((note, index) => (
                        <div
                            key={note.id}
                            className={`duration-700 ease-in-out absolute w-full ${index === currentSlide ? 'block' : 'hidden'} flex flex-col items-center justify-center m-5`}
                            data-carousel-item
                        >
                            <Note note={note} onDelete={onDelete} onEdit={onEdit} />
                        </div>
                    ))}
                </div>
                <div className=" ">
                    <button
                        type="button"
                        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-prev
                        onClick={goToPrevSlide}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-600/30 group-hover:bg-white/50 dark:group-hover:bg-gray-600/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-600/70 group-focus:outline-none">
                            <svg
                                className="w-4 h-4 text-white dark:text-gray-600 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>


                    <div className="ml-5 absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        {notes.map((note, index) => (
                            <button
                                key={note.id}
                                type="button"
                                className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-400'}`}
                                aria-current={index === currentSlide ? 'true' : 'false'}
                                aria-label={`Slide ${index + 1}`}
                                data-carousel-slide-to={index}
                                onClick={() => goToSlide(index)}
                            ></button>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-next
                        onClick={goToNextSlide}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-600/30 group-hover:bg-white/50 dark:group-hover:bg-gray-600/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-600/70 group-focus:outline-none">
                            <svg
                                className="w-4 h-4 text-white dark:text-gray-600 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotesCarousel;
