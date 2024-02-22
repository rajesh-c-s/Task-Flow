import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'
import Spinner from '../components/Spinner'
import { ToastContainer, toast } from "react-toastify";

const Login=()=> {
    
    let navigate = useNavigate()
    const [logging, setLogging] = useState(false)
    const [credentials, setCredentials] = useState({email:"",password:""})
 
    const handleSubmit=async (e)=>{
        setLogging(true)
        e.preventDefault()
        const response = await fetch("http://localhost:3000/auth/login",{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password})
        })
        const json = await response.json()
        if(response.status===200){
            localStorage.setItem("token",json.token);
            localStorage.setItem("name",json.username);
            localStorage.setItem("email",json.email);
            toast.success("You are logged in");
            navigate('/')
        }
        else
            toast.error("Failed",json.error)
        setLogging(false)
    }
    
    const handleChange=(e)=>{
        setCredentials({
          ...credentials,[e.target.id]:e.target.value
        })
    }

  return (
    <>
        <div className="mt-4 px-2">
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 px-6 py-8 rounded-xl border-2 border-sky-500/50 backdrop-blur">
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    <span className="underline underline-offset-8 decoration-7 decoration-pink-600">
                        Login
                    </span>
                </h1>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput onChange={handleChange} value={credentials.email} id="email" name="email" placeholder="taskflow@gmail.com" required type="email" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password"/>
                    </div>
                    <TextInput onChange={handleChange} value={credentials.password} id="password" name="password" required type="password"/>
                </div>
                <Button type="submit" className="mt-2 bg-pink-600">
                    {logging && <Spinner size={"4"}/>}Login
                </Button>
                <p className="text-center text-gray-500">Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
                <p className='text-center text-gray-500'>Forgot your password? <a href="/forgot-password" className="text-blue-600 hover:underline">Reset</a></p>
            </form>
        </div>
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Login;
