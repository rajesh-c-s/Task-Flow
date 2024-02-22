import { BrowserRouter,  Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useState } from "react"
import TodoState from "./context/TodoContext"
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./pages/ForgotPassword"

function App() {

  return (
    <div className="flex flex-col h-screen mx-auto">
      <TodoState>
        <BrowserRouter>
          <Navbar/> 
          <div className="flex-grow flex items-center justify-center mt-24 md:mx-16">
            <div className="container">
            <Routes> 
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/register' element={<Register/>}/>
              <Route exact path='/forgot-password' element={<ForgotPassword/>}/>
            </Routes> 
          </div>
          </div>
        </BrowserRouter>
      </TodoState>
    </div>
  )
}

export default App;
