import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { Label, TextInput, Textarea, Button, Radio } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "./Spinner";
import checkList from '../assets/checklist.png';

const AddTodo = () => {
    const context = useContext(TodoContext);
    const { addTodo } = context;
    const [addingTodo, setAddingTodo] = useState(false);
    const [todo, setTodo] = useState({ title: "", description: "", status: "" });

    const handleClick = async (e) => {
        setAddingTodo(true);
        e.preventDefault();
        await addTodo(todo.title, todo.description, todo.status);
        setTodo({ title: "", description: "", status: "" });
        toast.success("New task added !");
        setAddingTodo(false);
    };

    const handleChange = (e) => {
        setTodo({
            ...todo,
            [e.target.id]: e.target.value
        });
    };

    return (
        <div className="flex flex-row px-6 m-4 shadow-sm p-2 flex-wrap">
            <div className="md:w-2/3 p-2 w-full">
            <h1 className="text-3xl font-bold text-indigo-500 after:content-['_a_Task']">
                <span className="underline underline-offset-8 decoration-7 decoration-pink-600">
                    Add
                </span>
            </h1>
            <form className="mt-4 flex max-w-md flex-col gap-4 ">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Title : " />
                    </div>
                    <TextInput id="title" placeholder="Enter the task title" minLength={3} value={todo.title} required type="text" onChange={handleChange} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Description : " />
                    </div>
                    <Textarea id="description" rows={2} placeholder="Enter the task description" className="text-sm" value={todo.description} minLength={6} required onChange={handleChange} />
                </div>
                <div className="mb-2 block">
                    <Label htmlFor="status" value="Status : " />
                    <Radio id="status" value="pending" name="status" required onChange={handleChange} />
                    <Label htmlFor="status" value="Pending " />
                    <Radio id="status" value="completed" name="status" required onChange={handleChange} />
                    <Label htmlFor="status" value="Completed " />
                </div>
                <Button disabled={todo.title.length < 3 || todo.description.length < 6 || todo.status.length < 2} type="submit" className="disabled:bg-pink-300 disabled:text-black bg-pink-600" onClick={handleClick}>{addingTodo && <Spinner size={"4"} />}Add Task</Button>
            </form>
            </div>
            <div className="md:w-1/3 p-2 w-full">
            <img src={checkList} alt="" className="w-45 h-45"/>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                theme="light"
            />
        </div>
    );
};

export default AddTodo;
