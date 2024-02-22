import { createContext } from "react"
import { useState } from "react"

export const TodoContext =  createContext()

const TodoState = (props) =>{
    const host = "http://localhost:3000"
    const todosInitial = []
    const [todos, setTodos] = useState(todosInitial)

    // get all todos
    const getTodos = async () =>{     
        const response = await fetch(`${host}/todos`,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        const json = await response.json()
        if(response.status==401)
        localStorage.removeItem("token");
        setTodos(json)
        //console.log(json);
    }

    // add new todo
    const addTodo = async (title,description,status) =>{
        let completed=(status==="completed")?true:false;
        const response = await fetch(`${host}/todos`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({title,description,completed})
        })
        const todo = await response.json();
        setTodos(todos.concat(todo))
    }
    // delete note
    const deleteTodo = async (id) =>{
        const response = await fetch(`${host}/todos/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        await response.json();
        //alert(response.status);
        await getTodos();
    }
    // edit note
    const editTodo = async (id, title, description, completed) =>{
        const response = await fetch(`${host}/todos/${id}`,{
            method:'PATCH',
            headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({title,description,completed})
        })
        await response.json();
        if(response.status==500) 
        return "Error";
        await getTodos();
    }
    return(
        <TodoContext.Provider value={{todos,addTodo,deleteTodo,editTodo,getTodos}}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState;