// import {  removeTodo } from "../todo/todoSlice";
// import { useDashboardHelper } from "./dashboard.helper";

// const Dashboard = () => {
//   const {todos,onAddTodo,input,setInput,dispatch}= useDashboardHelper();
//   return (
//     <>
//     <div className="flex items-center justify-center h-screen">
//       <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-xl font-bold">Todo App For test redux</h1>

//         </div>

//         {/* Input Section */}
//         <div className="flex gap-2 mb-4">
//           <input
//             type="text"
//             value={input}
//             placeholder="Add a new task..."
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={onAddTodo}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Add
//           </button>
//         </div>

//         {/* Todo List */}
//         <ul className="space-y-2 max-h-64 overflow-y-auto">
//           {todos.length === 0 ? (
//             <p className="text-gray-400 text-center">No todos yet</p>
//           ) : (
//             todos.map((todo: any) => (
//               <li
//                 key={todo.id}
//                 className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
//               >
//                 <span className="text-gray-700">{todo.title}</span>

//                 <button
//                   onClick={() => dispatch(removeTodo(todo.id))}
//                   className="text-red-500 hover:text-red-700 font-bold"
//                 >
//                   ✕
//                 </button>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//     </div>
//     </>
//   );
// };

import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Card } from "@mui/material";
import Breadcrumb from "../../../components/breadcrumb";
// import Breadcrumbs from "../../components/breadcrumbs";
import { useDashboardHelper } from "./dashboard.helper";

const Dashboard = () => {
  const { breadcrumbs } = useDashboardHelper()

  const stats = [
    { label: "Total Users", value: 120 },
    { label: "Active Users", value: 80 },
    { label: "Inactive Users", value: 40 },
    { label: "New Users", value: 25 },
    { label: "Total Points", value: 5200 },
    { label: "VIP Users", value: 18 },
  ];

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Users",
        data: [10, 20, 15, 25, 30, 40],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 6,
      },
    ],
  };

  const dataPiechart = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "User Growth",
      },
    },
  };
  return (
    <>
      <Breadcrumb breadCrumbs={breadcrumbs}></Breadcrumb>
      <Card className="p-6 rounded-xl shadow bg-gray-100">
        <div className="grid grid-cols-3 gap-6 p-6">
          {stats.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-2xl font-bold mt-2">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div style={{ width: "400px" }}>
            <Pie data={dataPiechart} />
          </div>

          <div style={{ width: "1000px", marginTop: "20px" }}>
            <Bar data={data} options={options} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default Dashboard;
