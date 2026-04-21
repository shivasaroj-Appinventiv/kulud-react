import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../todo/todoSlice";
import { ROUTES } from "../../../routes/RouteConstant";
import type { BreadCrumbType } from "../../../components/breadcrumb/breadcrumb.helper";

export const useDashboardHelper = ()=>{

  const dispatch = useDispatch();

  const todos = useSelector((state: any) => state.todos.todos);

  const [input, setInput] = useState("");

  const breadcrumbs: BreadCrumbType[] = [
    { title: "Dashboard", path: ROUTES.DASHBOARD },
  ];
  const onAddTodo = () => {
    if (!input.trim()) return;
    dispatch(addTodo(input));
    setInput("");
  };

    return {todos,onAddTodo,input,setInput,dispatch,breadcrumbs};
}
