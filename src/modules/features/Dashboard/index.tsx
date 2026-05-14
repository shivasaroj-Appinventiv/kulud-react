import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Card } from "@mui/material";
import Breadcrumb from "../../../components/breadcrumb";
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
