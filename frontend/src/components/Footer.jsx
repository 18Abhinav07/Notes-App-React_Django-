import React from "react";

function Footer() {
    return (
        <footer className="bg-white shadow dark:bg-gray-800 flex flex-col justify-end">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">@ { new Date().getFullYear() } <a href=" " class="hover:underline">Abhinav Pangaria™</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="https://linkedin.com/in/abhinavpangaria1807200305" className="hover:underline me-4 md:me-6">LinkedIn</a>
                    </li>
                    <li>
                        <a href="https://github.com/18Abhinav07" className="hover:underline me-4 md:me-6">Github</a>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer