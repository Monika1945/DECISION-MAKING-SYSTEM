import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Link, useLocation } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import ProjectLogo from "../components/Logo";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Result = () => {
  const location = useLocation();

  const scores = location.state?.scores || {};
  const total = location.state?.total || 0;
  const percent = location.state?.percent || 0;

  let status = "";
  if (percent >= 75) status = "READY ✅";
  else if (percent >= 50) status = "ALMOST READY ⚠️";
  else status = "NOT READY ❌";

  const data = {
    labels: ["Aptitude", "Logical", "Verbal", "Technical"],
    datasets: [
      {
        data: [
          scores.Aptitude || 0,
          scores.Logical || 0,
          scores.Verbal || 0,
          scores.Technical || 0
        ],
        backgroundColor: ["#6366f1", "#ec4899", "#f59e0b", "#10b981"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <nav className="bg-white px-8 py-4 flex justify-between">
        <Link to="/dashboard"><ProjectLogo /></Link>
        <SidebarMenu />
      </nav>

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-6">Assessment Report</h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <Bar data={data} />
          </div>

          <div className="space-y-4">

            <div className="bg-indigo-600 text-white p-6 rounded-xl">
              <h3>Status</h3>
              <h1 className="text-2xl font-bold">{status}</h1>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p>Total: {total}/20</p>
              <p>{percent.toFixed(1)}%</p>
            </div>

            <Link to="/evaluation" className="block bg-black text-white text-center py-3 rounded-xl">
              Retake
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;