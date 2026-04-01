import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import ProjectLogo from "../components/Logo";
import API_BASE from "../config";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [darkMode, setDarkMode] = useState(false);
  const [emailInitial, setEmailInitial] = useState("U");
  const [evaluation, setEvaluation] = useState(location.state?.evaluation || null);
  const [loading, setLoading] = useState(!location.state?.evaluation);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }

    const email = localStorage.getItem("userEmail") || localStorage.getItem("email");
    if (email) setEmailInitial(email.charAt(0).toUpperCase());
  }, []);

  useEffect(() => {
    const evaluationId = searchParams.get("id");
    const token = localStorage.getItem("token");

    if (evaluation) {
      setLoading(false);
      return;
    }

    if (!evaluationId) {
      setError("No saved result was found.");
      setLoading(false);
      return;
    }

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchEvaluation = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/evaluation?id=${evaluationId}`, {
          headers: { "x-auth-token": token }
        });
        setEvaluation(res.data);
      } catch (err) {
        console.error("Result load error:", err);
        setError("Unable to load this saved result.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [evaluation, navigate, searchParams]);

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

  const scores = evaluation
    ? {
        Aptitude: evaluation.aptitudeScore || 0,
        Logical: evaluation.logicalScore || 0,
        Verbal: evaluation.communicationScore || 0,
        Technical: evaluation.technicalScore || 0
      }
    : {};
  const total = evaluation?.totalScore || 0;
  const maxScore = evaluation?.maxScore || 20;
  const percent = maxScore > 0 ? (total / maxScore) * 100 : 0;

  let status = "";
  if (percent >= 75) status = "READY";
  else if (percent >= 50) status = "ALMOST READY";
  else status = "NOT READY";

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
        backgroundColor: ["#6366f1", "#ec4899", "#f59e0b", "#10b981"],
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

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading result...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        transition: "0.3s"
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          backdropFilter: "blur(20px)"
        }}
      >
        <Link to="/dashboard">
          <ProjectLogo />
        </Link>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
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
            {darkMode ? "Dark" : "Light"}
          </button>

          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: t.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            {emailInitial}
          </div>

          <SidebarMenu color={t.text} />
        </div>
      </nav>

      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          padding: "3rem 1.5rem"
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "900",
            marginBottom: "2rem"
          }}
        >
          Assessment Report
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "25px"
          }}
        >
          <div
            style={{
              background: t.card,
              padding: "25px",
              borderRadius: "18px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>Performance Overview</h3>
            <div style={{ height: "350px" }}>
              <Bar data={data} options={options} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                background: t.primary,
                color: "#fff",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
            >
              <h4>Status</h4>
              <h1 style={{ fontSize: "2rem", fontWeight: "800" }}>{status}</h1>
            </div>

            <div
              style={{
                background: t.card,
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
            >
              <h4>Total Score</h4>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "800" }}>
                {total} / {maxScore}
              </h2>
              <p style={{ color: t.sub }}>{percent.toFixed(1)}%</p>
            </div>

            <div
              style={{
                background: t.card,
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
            >
              <h4>Suggestions</h4>

              {evaluation?.recommendations?.length ? (
                evaluation.recommendations.map((item, index) => (
                  <p key={index} style={{ margin: "8px 0 0" }}>
                    {item}
                  </p>
                ))
              ) : (
                <p>No suggestions available.</p>
              )}
            </div>

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