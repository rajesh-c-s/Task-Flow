import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import AddTodo from "../components/AddTodo";
import { Button, Label, TextInput, Textarea, Radio } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {

  let navigate = useNavigate();
  const context = useContext(TodoContext);
  const { todos, getTodos, editTodo, deleteTodo } = context;
  const [loadingTodos, setLoadingTodos] = useState(true);

  const toggleBtn = useRef(null);

  const fetchTodosLoading = async () => {
    setLoadingTodos(true);
    await getTodos();
    setLoadingTodos(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) fetchTodosLoading();
    else navigate("/login");
  }, []);

  const updateTodo = (currentTodo) => {
    toggleBtn.current.click();
    //alert("click");
    setTodo({
      id: currentTodo._id,
      etitle: currentTodo.title,
      edescription: currentTodo.description,
      estatus: currentTodo.status,
    });
  };

  const [todo, setTodo] = useState({
    id: "",
    etitle: "",
    edescription: "",
    estatus: "",
  });

  const handleClick = async () => {
    let completed = todo.estatus === "completed" ? true : false;
    //alert(todo.id);
    try {
      await editTodo(todo.id, todo.etitle, todo.edescription, completed);
      toggleBtn.current.click();
      toast.success("Todo updated");
    } catch (error) {
      console.error("Failed to update todo:", error);
      toast.error("Failed to update task");
    }
  };

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <AddTodo />
      <button
        ref={toggleBtn}
        data-modal-target="updatenote-modal"
        data-modal-toggle="updatenote-modal"
        className=" hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Toggle modal
      </button>
      <div
        id="updatenote-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="updatenote-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Update Task
              </h3>
              <form className="mt-4 flex max-w-md flex-col gap-4 ">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="etitle" value="Edit title " />
                  </div>
                  <TextInput
                    id="etitle"
                    placeholder="Update title"
                    minLength={3}
                    required
                    type="text"
                    value={todo.etitle}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="edescription" value="Edit description " />
                  </div>
                  <Textarea
                    id="edescription"
                    rows={2}
                    placeholder="Update description"
                    value={todo.edescription}
                    className="text-sm"
                    minLength={6}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="estatus" value="Status" />
                  </div>
                  <div>
                    <Radio
                      id="estatus"
                      value="pending"
                      name="estatus"
                      required
                      checked={todo.estatus === "pending"}
                      onChange={handleChange}
                    />
                    <Label htmlFor="estatus-pending" value="Pending" />
                  </div>
                  <div>
                    <Radio
                      id="estatus"
                      value="completed"
                      name="estatus"
                      required
                      checked={todo.estatus === "completed"}
                      onChange={handleChange}
                    />
                    <Label htmlFor="estatus-completed" value="Completed" />
                  </div>
                </div>

                <Button
                  disabled={
                    todo.etitle.length < 3 || todo.edescription.length < 6
                  }
                  type="button"
                  className="disabled:bg-pink-300 disabled:text-black bg-pink-600"
                  onClick={handleClick}
                >
                  Update Task
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col px-6">
        <h1 className="text-3xl font-bold text-indigo-500 after:content-['_Tasks']">
          <span className="underline underline-offset-8 decoration-7 decoration-pink-600">
            Your
          </span>
        </h1>
        {loadingTodos && (
          <div className="mt-4 flex items-center justify-center">
            <Spinner size={"10"} />
          </div>
        )}
        {todos.length === 0 && !loadingTodos && (
          <div
            className="flex items-center justify-center p-4 mt-4 text-sm text-pink-600 border border-pink-400 rounded-lg bg-gray-100"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div>No Tasks to showup yet</div>
          </div>
        )}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
          {todos.map((todo, i) => {
            return (
              <div
                className="block max-w-sm pt-6 pb-4 px-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
                key={todo._id}
              >
                <span
                  className={`${
                    todo.completed == true ? "bg-green-500" : "bg-yellow-400"
                  } text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full`}
                >
                  {todo.completed === true ? "Completed" : "Pending"}
                </span>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {todo.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
                  {todo.description}
                </p>
                <div className="mt-2 flex flex-row justify-left items-center gap-4">
                  <i
                    className="cursor-pointer fa-solid fa-pen text-[#45e766] text-lg"
                    onClick={() => {
                      updateTodo(todo);
                    }}
                  ></i>
                  <i
                    className="cursor-pointer fa-solid fa-trash text-[#eb1010] text-lg"
                    onClick={() => {
                      deleteTodo(todo._id);
                      toast.success("Todo deleted");
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
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

export default Home;
