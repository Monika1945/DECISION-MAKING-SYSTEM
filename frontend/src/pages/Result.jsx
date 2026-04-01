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

  // ✅ GET DATA FROM EVALUATION PAGE
  const scores = location.state?.scores || {};
  const total = location.state?.total || 0;
  const percent = location.state?.percent || 0;

  // 🎯 STATUS LOGIC
  let status = "";
  if (percent >= 75) status = "READY ✅";
  else if (percent >= 50) status = "ALMOST READY ⚠️";
  else status = "NOT READY ❌";

  // 📊 CHART DATA (MATCH YOUR SECTIONS)
  const data = {
    labels: ["Aptitude", "Logical", "Verbal", "Technical"],
    datasets: [
      {
        label: "Score",
        data: [
          scores.Aptitude || 0,
          scores.Logical || 0,
          scores.Verbal || 0,
          scores.Technical || 0
        ],
        backgroundColor: [
          "#6366f1",
          "#ec4899",
          "#f59e0b",
          "#10b981"
        ],
        borderRadius: 10
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">

      {/* 🔝 NAVBAR */}
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm">
        <Link to="/dashboard">
          <ProjectLogo />
        </Link>
        <SidebarMenu />
      </nav>

      {/* 📦 CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold mb-10">
          🎯 Assessment Report
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* 📊 CHART */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Performance Overview
            </h2>

            <div className="h-[300px]">
              <Bar data={data} options={options} />
            </div>
          </div>

          {/* 📋 RESULT CARD */}
          <div className="space-y-6">

            {/* STATUS */}
            <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-sm uppercase">Status</h3>
              <p className="text-3xl font-bold mt-2">{status}</p>
            </div>

            {/* SCORE */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold mb-2">Total Score</h3>
              <p className="text-2xl font-bold">{total} / 20</p>
              <p className="text-gray-500">{percent.toFixed(1)}%</p>
            </div>

            {/* RECOMMENDATION */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold mb-3">Suggestions</h3>

              {percent < 50 && (
                <p>👉 Focus on basics & practice aptitude daily</p>
              )}
              {percent >= 50 && percent < 75 && (
                <p>👉 Improve weak areas and mock tests</p>
              )}
              {percent >= 75 && (
                <p>🚀 You are ready for placements!</p>
              )}
            </div>

            {/* RETAKE */}
            <Link
              to="/evaluation"
              className="block text-center bg-black text-white py-3 rounded-xl"
            >
              Retake Assessment
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;