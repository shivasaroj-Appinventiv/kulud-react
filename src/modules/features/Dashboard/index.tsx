import {  removeTodo } from "../todo/todoSlice";
import { useDashboardHelper } from "./dashboard.helper";

const Dashboard = () => {
  const {todos,onAddTodo,input,setInput,dispatch}= useDashboardHelper();
  return (
    <>
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Todo App For test redux</h1>
        
        </div>

        {/* Input Section */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            placeholder="Add a new task..."
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={onAddTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {todos.length === 0 ? (
            <p className="text-gray-400 text-center">No todos yet</p>
          ) : (
            todos.map((todo: any) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <span className="text-gray-700">{todo.title}</span>

                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Dashboard;