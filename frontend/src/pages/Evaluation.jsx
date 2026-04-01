import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Evaluation = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  // QUESTIONS
  const questions = [
    {
      section: "Aptitude",
      q: "A company produces 120 units/day. Efficiency drops by 25% for 4 days. Total production?",
      options: ["360", "300", "400", "420"],
      answer: "360"
    },
    {
      section: "Logical",
      q: "All engineers are coders. Some coders are designers. Which is true?",
      options: [
        "All engineers are designers",
        "Some engineers may be designers",
        "No engineers are designers",
        "All designers are engineers"
      ],
      answer: "Some engineers may be designers"
    },
    {
      section: "Verbal",
      q: "Choose correct meaning: 'She executed the task flawlessly.'",
      options: [
        "With errors",
        "Perfectly",
        "Slowly",
        "Carelessly"
      ],
      answer: "Perfectly"
    }
  ];

  // TIMER
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timeLeft === 0) setSubmitted(true);
  }, [timeLeft, submitted]);

  // SELECT
  const select = (val) => {
    setAnswers({ ...answers, [step]: val });
  };

  // RESULT LOGIC
  const getResult = () => {
    let correct = 0;
    let section = { Aptitude: 0, Logical: 0, Verbal: 0 };

    questions.forEach((q, i) => {
      if (answers[i] === q.answer) {
        correct++;
        section[q.section]++;
      }
    });

    const percent = (correct / questions.length) * 100;

    let status = percent >= 75 ? "READY 🚀" :
                 percent >= 50 ? "ALMOST READY ⚠️" :
                 "NOT READY ❌";

    return { correct, percent, status, section };
  };

  // RESULT SCREEN
  if (submitted) {
    const res = getResult();

    return (
      <div className="min-h-screen bg-black text-white p-8">

        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl font-bold mb-6">🎯 Assessment Result</h1>

          <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl mb-8">

            <h2 className="text-5xl font-bold">{res.status}</h2>
            <p className="mt-2 text-gray-400">
              Score: {res.correct} / {questions.length} ({res.percent.toFixed(1)}%)
            </p>

          </div>

          {/* SECTION BREAKDOWN */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">

            {Object.entries(res.section).map(([sec, val], i) => (
              <div key={i} className="p-6 bg-white/10 rounded-2xl backdrop-blur-xl">

                <h3 className="font-bold mb-2">{sec}</h3>
                <p className="text-3xl">{val}</p>

              </div>
            ))}

          </div>

          {/* FEEDBACK */}
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-xl">

            <h3 className="font-bold mb-3">Growth Insights 🧠</h3>

            {res.section.Aptitude === 0 && <p>👉 Improve Aptitude problem solving</p>}
            {res.section.Logical === 0 && <p>👉 Practice logical reasoning</p>}
            {res.section.Verbal === 0 && <p>👉 Work on communication skills</p>}

          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"
          >
            Back to Dashboard
          </button>

        </div>
      </div>
    );
  }

  const q = questions[step];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-white/10 backdrop-blur-xl">
        <h2 className="text-xl font-bold">Assessment</h2>
        <span className="text-purple-400">⏱ {timeLeft}s</span>
      </div>

      <div className="max-w-4xl mx-auto p-6">

        {/* PROGRESS */}
        <div className="h-2 bg-white/10 rounded-full mb-6">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* QUESTION CARD */}
        <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl">

          <p className="text-sm text-gray-400 mb-2">{q.section}</p>

          <h3 className="text-xl font-semibold mb-4">{q.q}</h3>

          <div className="space-y-3">
            {q.options.map(opt => (
              <button
                key={opt}
                onClick={() => select(opt)}
                className={`w-full text-left px-4 py-3 rounded-xl transition 
                ${answers[step] === opt 
                  ? "bg-purple-600 text-white" 
                  : "bg-white/10 hover:bg-white/20"}`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* NAV */}
          <div className="flex justify-between mt-6">

            <button
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-white/10 rounded-lg"
            >
              Prev
            </button>

            {step === questions.length - 1 ? (
              <button
                onClick={() => setSubmitted(true)}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl"
              >
                Submit 🚀
              </button>
            ) : (
              <button
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 bg-white/10 rounded-lg"
              >
                Next
              </button>
            )}

          </div>

        </div>

        {/* NAVIGATOR */}
        <div className="flex gap-2 mt-6 flex-wrap">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-10 h-10 rounded-full 
              ${answers[i] ? "bg-green-500" : "bg-white/10"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Evaluation;