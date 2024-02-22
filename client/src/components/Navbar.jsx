import {Link,useLocation} from 'react-router-dom'
import { CgProfile } from "react-icons/cg";

const Navbar=()=> {
    let location = useLocation()
    
    const toggleNavbar=()=>{
        document.getElementById('navbar-Compo').classList.toggle("hidden");
    }

    const handleLogout =()=>{
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div>
            <nav className="fixed w-full z-20 top-0 bg-white shadow-lg">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:ml-56">
                <Link to="/" className="flex items-center">
                    <span className="self-center text-3xl font-semibold whitespace-nowrap">TaskFlow</span>
                </Link>
                <div className="flex md:order-2">
                    <button onClick={toggleNavbar} type="button" className="inline-flex items-center p-2 text-sm text-gray-800 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                        <span className="sr-only">Open menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                    <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 hidden" id="navbar-Compo">
                        <ul className="flex flex-col justify-center items-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            <li>
                                <Link to="/" onClick={toggleNavbar} className={`block py-2 pl-3 pr-4 ${location.pathname==="/"?"text-pink-600 font-bold":"text-pink-500"} hover:text-pink-600 hover:font-semibold`}>Home</Link>
                            </li>
                            {!localStorage.getItem("token")?
                                <li className='flex justify-between ml-4'>
                                    <Link to="/login" onClick={toggleNavbar} className="text-white outline-none hover:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-pink-600 hover:bg-pink-700 hover:ring-blue-300">Login</Link>
                                    <Link to="/register" onClick={toggleNavbar} className="text-white outline-none hover:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-pink-600 hover:bg-pink-700 hover:ring-blue-300">Register</Link>
                                </li>:
                                <li>     
                                    <div className="flex items-center justify-end md:order-2">
                                        <div className="flex items-center flex-col-reverse md:flex-row ">
                                            <div className='flex items-center space-x-2 rounded-md px-2 py-1'>
                                                <CgProfile className="w-10 h-10 rounded-full"/>
                                                <div className="font-medium dark:text-white">
                                                    <div>{localStorage.getItem("name")}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{localStorage.getItem("email")}</div>
                                                </div>
                                            </div>
                                            <Link onClick={handleLogout} className=" px-4 py-2 text-md text-center mx-4 mb-2 bg-pink-600 hover:bg-pink-700 hover:ring-blue-300 rounded-full text-white">Logout</Link>
                                        </div>
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;