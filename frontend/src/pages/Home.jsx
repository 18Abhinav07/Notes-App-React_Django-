
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

function Home() {
    const isAuthenticated = localStorage.getItem(ACCESS_TOKEN)
    const destination = isAuthenticated ? "/createNotes" : "/login";
    return (
        <div className="max-w-[1920px] min-h-screen mx-auto text-black text-sm flex">
            <div className="lg:min-h-[560px] bg-blue-100 px-4 sm:px-10 flex justify-center items-center">
                <div className="max-w-7xl w-full mx-auto py-16">
                    <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
                        <div>
                            <h1 className="md:text-5xl text-4xl font-bold mb-6 md:!leading-[55px]">Simplistic and minimalistic note taking.
                            </h1>
                            <p className="text-base leading-relaxed">Keeping it simple, taking a short note, a reminder, a second brain. All done in this simple note taker.</p>
                            <div className="flex flex-wrap gap-y-4 gap-x-8 mt-8">

                                <Link to={destination} >
                                    <button
                                        className='bg-black hover:bg-[#222] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4'>{isAuthenticated ? "Create a Note" : "Login"}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] fill-current ml-2"
                                            viewBox="0 0 492.004 492.004">
                                            <path
                                                d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                                                data-original="#000000" />
                                        </svg>
                                    </button>
                                </Link>
                                {isAuthenticated ? null :
                                    <Link to="/register">
                                        <button
                                            className='bg-transparent border-2 border-[#333] flex items-center transition-all font-semibold rounded-md px-5 py-2'>
                                            Register
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] fill-current ml-2"
                                                viewBox="0 0 492.004 492.004">
                                                <path
                                                    d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                                                    data-original="#000000" />
                                            </svg>
                                        </button>
                                    </Link>
                                    }
                            </div>
                        </div>
                        <div className="max-lg:mt-12 h-full">
                            <img src="../study.svg" alt="banner img" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home;