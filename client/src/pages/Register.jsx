import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  let navigate = useNavigate();
  const [registering, setRegistering] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const handleSubmit = async (e) => {
    setRegistering(true);
    e.preventDefault();
    //alert(credentials.email);
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (response.status === 200) {
      toast.success("Please check mail for verification and then login");
      navigate("/login");
    } else {
      //alert(response.status);
      //console.log(response);
      toast.error("Error occurred while registering user. Please try again later.");
    }
    setRegistering(false);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <div className="mt-4 px-2">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col gap-4 px-6 py-8 rounded-xl border-2 border-sky-500/50 backdrop-blur"
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            <span className="underline underline-offset-8 decoration-7 decoration-pink-600">
              Register
            </span>
          </h1>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Enter your name" />
            </div>
            <TextInput
              onChange={handleChange}
              value={credentials.name}
              minLength={3}
              id="name"
              name="name"
              placeholder="noobmaster69"
              required
              type="text"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Enter your email" />
            </div>
            <TextInput
              onChange={handleChange}
              value={credentials.email}
              id="email"
              name="email"
              placeholder="taskflow@gmail.com"
              required
              type="email"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Create password" />
            </div>
            <TextInput
              onChange={handleChange}
              value={credentials.password}
              minLength={6}
              id="password"
              name="password"
              required
              type="password"
            />
          </div>
          <Button type="submit" className="mt-2 bg-pink-600">
            {registering && <Spinner size={"4"} />}Register
          </Button>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
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
  );
};

export default Register;
