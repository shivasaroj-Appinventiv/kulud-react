import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../todo/todoSlice";

export const useDashboardHelper = ()=>{

  const dispatch = useDispatch();

  const todos = useSelector((state: any) => state.todos.todos);

  const [input, setInput] = useState("");


  const onAddTodo = () => {
    if (!input.trim()) return;
    dispatch(addTodo(input));
    setInput("");
  };

    return {todos,onAddTodo,input,setInput,dispatch};
}
