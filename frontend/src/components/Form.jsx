import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { Link } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

const Switch_method = ({ condition }) => {
    if (condition === 'login') {
        return (
            <div className="text-sm font-medium text-gray-800 dark:text-gray-800 flex flex-row items-center text-center mt-3">
                Not registered ? <Link to="/register/" className="text-blue-900 hover:underline dark:text-blue-500 ml-3 font-semibold"> Create account </Link>
            </div>
        )
    } else if (condition === 'register') {
        return (
            <div className="text-sm font-medium text-gray-800 dark:text-gray-800 flex flex-row items-center text-center mt-3">
                Already registered ? <Link to="/login/" className="text-blue-900 hover:underline dark:text-blue-500 ml-3 font-semibold"> Login </Link>
            </div>
        )
    }
};

// a dynamic form to work for login and register signified by the method
function Form({ route, method }) {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === 'login' ? "Login" : "Register";



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post(route, { username, password })

            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                navigate("/")
            } else {
                navigate("/login")
            }

        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };


    return (
        // style the form element here..
        <>
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className="mt-12 flex flex-col items-center">
                            {/* place for the main logo etc */}
                            <h3 className="text-primary-500 mb-4 text-4xl font-semibold text-blue-500">
                                {name}
                            </h3>
                            <div className="w-full flex-1 mt-8">
                                <div className="mx-auto max-w-xs">
                                    <form onSubmit={handleSubmit} className=''>
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="text"
                                            placeholder="Username"
                                            value={username} onChange={(e) => setUserName(e.target.value)}
                                        />
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type="password"
                                            placeholder="Password"
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                        />
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
                                                {name}
                                            </span>
                                        </button>
                                        <Switch_method condition={method} />

                                        <p className="mt-6 text-sm text-gray-600 text-center">
                                            To a minimalistic and simple Note Making.
                                        </p>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url(../illustration-multitasking-person.png)"
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form