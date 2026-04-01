import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/SidebarMenu";
import ProjectLogo from "../components/Logo";

const Evaluation = () => {
  const [darkMode, setDarkMode] = useState(false);

  // 🌙 Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // 🌗 Toggle theme
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
      card: "rgba(255,255,255,0.7)",
      text: "#0f172a",
      sub: "#64748b",
      border: "#e2e8f0",
      primary: "#4f46e5"
    },
    dark: {
      bg: "linear-gradient(135deg,#020617,#0f172a)",
      card: "rgba(30,41,59,0.6)",
      text: "#f1f5f9",
      sub: "#94a3b8",
      border: "#334155",
      primary: "#6366f1"
    }
  };

  const t = darkMode ? theme.dark : theme.light;

  const sections = [
    {
      title: "Aptitude",
      desc: "Problem solving, speed & accuracy"
    },
    {
      title: "Logical",
      desc: "Reasoning and thinking ability"
    },
    {
      title: "Verbal",
      desc: "English and communication skills"
    },
    {
      title: "Analytical Thinking",
      desc: "Decision making and problem solving"
    },
    {
      title: "Technical",
      desc: "C, Java, OS, Computer Networks"
    },
    {
      title: "Interest",
      desc: "ML, Web Development, AI"
    },
    {
      title: "Company Preference",
      desc: "Product, Service, Startup"
    }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        transition: "0.4s"
      }}
    >
      {/* 🔝 NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${t.border}`,
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        <ProjectLogo />

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {/* 🌙 THEME */}
          <button
            onClick={toggleTheme}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border: "none",
              background: t.primary,
              color: "white",
              cursor: "pointer"
            }}
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>

          {/* 👤 AVATAR */}
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
            M
          </div>

          {/* ☰ MENU */}
          <SidebarMenu color={t.text} />
        </div>
      </nav>

      {/* 📦 CONTENT */}
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          padding: "3rem 1.5rem"
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "900",
            marginBottom: "2rem"
          }}
        >
          Assessment
        </h1>

        {/* 🔥 BOXES */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {sections.map((sec, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 25px",
                borderRadius: "18px",
                background: t.card,
                backdropFilter: "blur(20px)",
                border: `1px solid ${t.border}`,
                transition: "0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* LEFT */}
              <div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "800"
                  }}
                >
                  {sec.title}
                </h3>
                <p style={{ color: t.sub }}>{sec.desc}</p>
              </div>

              {/* RIGHT BUTTON */}
              <button
                style={{
                  background: "#000",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Take Assessment →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Evaluation;