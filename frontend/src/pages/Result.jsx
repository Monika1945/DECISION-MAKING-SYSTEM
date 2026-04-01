import React, { useEffect, useState } from "react";
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

  const [darkMode, setDarkMode] = useState(false);
  const [emailInitial, setEmailInitial] = useState("U");

  // 🌙 Load Theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }

    // 📧 Get email first letter
    const email = localStorage.getItem("userEmail");
    if (email) setEmailInitial(email.charAt(0).toUpperCase());
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    const isDark = root.classList.contains("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const theme = {
    light: {
      bg: "linear-gradient(135deg,#f8fafc,#eef2ff)",
      card: "#ffffff",
      text: "#0f172a",
      sub: "#64748b",
      primary: "#4f46e5"
    },
    dark: {
      bg: "linear-gradient(135deg,#020617,#0f172a)",
      card: "#1e293b",
      text: "#f1f5f9",
      sub: "#94a3b8",
      primary: "#6366f1"
    }
  };

  const t = darkMode ? theme.dark : theme.light;

  // 📊 Data
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
        backgroundColor: [
          "#6366f1",
          "#ec4899",
          "#f59e0b",
          "#10b981"
        ],
        borderRadius: 10,
        barThickness: 40
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        max: 5
      }
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      color: t.text,
      transition: "0.3s"
    }}>

      {/* 🔝 NAVBAR */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        backdropFilter: "blur(20px)"
      }}>
        <Link to="/dashboard">
          <ProjectLogo />
        </Link>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>

          {/* 🌙 THEME */}
          <button
            onClick={toggleTheme}
            style={{
              background: t.primary,
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer"
            }}
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {/* 👤 AVATAR */}
          <div style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: t.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold"
          }}>
            {emailInitial}
          </div>

          <SidebarMenu color={t.text} />
        </div>
      </nav>

      {/* 📦 CONTENT */}
      <div style={{
        maxWidth: "1100px",
        margin: "auto",
        padding: "3rem 1.5rem"
      }}>

        <h1 style={{
          fontSize: "2.8rem",
          fontWeight: "900",
          marginBottom: "2rem"
        }}>
          Assessment Report 📊
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "25px"
        }}>

          {/* 📊 CHART CARD */}
          <div style={{
            background: t.card,
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
          }}>
            <h3 style={{ marginBottom: "15px" }}>Performance Overview</h3>
            <div style={{ height: "350px" }}>
              <Bar data={data} options={options} />
            </div>
          </div>

          {/* 📋 SIDE PANEL */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* STATUS */}
            <div style={{
              background: t.primary,
              color: "#fff",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}>
              <h4>Status</h4>
              <h1 style={{ fontSize: "2rem", fontWeight: "800" }}>{status}</h1>
            </div>

            {/* SCORE */}
            <div style={{
              background: t.card,
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
            }}>
              <h4>Total Score</h4>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "800" }}>
                {total} / 20
              </h2>
              <p style={{ color: t.sub }}>{percent.toFixed(1)}%</p>
            </div>

            {/* SUGGESTION */}
            <div style={{
              background: t.card,
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
            }}>
              <h4>Suggestions</h4>

              {percent < 50 && (
                <p>👉 Focus on basics & daily practice</p>
              )}
              {percent >= 50 && percent < 75 && (
                <p>👉 Improve weak areas & take mock tests</p>
              )}
              {percent >= 75 && (
                <p>🚀 You are ready for placements!</p>
              )}
            </div>

            {/* RETAKE */}
            <Link
              to="/evaluation"
              style={{
                textAlign: "center",
                background: "#000",
                color: "#fff",
                padding: "12px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "600"
              }}
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