import React, { useState, useEffect } from "react";

const Evaluation = () => {

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(300);

  // ADVANCED QUESTIONS
  const questions = [
    {
      section: "Aptitude",
      q: "A manufacturing unit produces 200 units/day. Due to machine downtime, production reduces by 30% for 5 days. What is total production during these days?",
      options: ["700", "750", "800", "900"],
      answer: "700"
    },
    {
      section: "Logical",
      q: "If all analysts are programmers and some programmers are managers, which conclusion is valid?",
      options: [
        "All analysts are managers",
        "Some analysts may be managers",
        "No analyst is a manager",
        "All managers are analysts"
      ],
      answer: "Some analysts may be managers"
    },
    {
      section: "Verbal",
      q: "Choose correct interpretation: 'The system scaled efficiently under load.'",
      options: [
        "It failed under pressure",
        "It handled increased demand well",
        "It slowed down significantly",
        "It stopped working"
      ],
      answer: "It handled increased demand well"
    }
  ];

  // TIMER
  useEffect(() => {
    if (time > 0 && !submitted) {
      const t = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(t);
    }
    if (time === 0) setSubmitted(true);
  }, [time, submitted]);

  const select = (val) => {
    setAnswers({ ...answers, [step]: val });
  };

  const submit = () => setSubmitted(true);

  // RESULT ENGINE
  const analyze = () => {
    let correct = 0;
    let section = { Aptitude: 0, Logical: 0, Verbal: 0 };

    questions.forEach((q, i) => {
      if (answers[i] === q.answer) {
        correct++;
        section[q.section]++;
      }
    });

    const percent = (correct / questions.length) * 100;

    const feedback = [];
    if (section.Aptitude < 1) feedback.push("📉 Improve quantitative problem solving");
    if (section.Logical < 1) feedback.push("🧠 Strengthen logical reasoning");
    if (section.Verbal < 1) feedback.push("🗣 Enhance communication clarity");

    return { correct, percent, section, feedback };
  };

  // RESULT UI
  if (submitted) {
    const res = analyze();

    return (
      <div className="min-h-screen bg-black text-white p-10">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl font-bold mb-8">🚀 Performance Report</h1>

          {/* MAIN SCORE */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 text-center mb-10">

            <h2 className="text-6xl font-bold">{res.percent.toFixed(0)}%</h2>
            <p className="mt-2 text-lg">Hireability Score</p>

          </div>

          {/* SECTION CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            {Object.entries(res.section).map(([sec, val]) => (
              <div key={sec} className="p-6 bg-white/10 rounded-2xl backdrop-blur-xl">
                <h3 className="font-bold mb-2">{sec}</h3>
                <p className="text-3xl">{val}</p>
              </div>
            ))}

          </div>

          {/* FEEDBACK */}
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-xl">

            <h3 className="font-bold mb-3">AI Insights 🧠</h3>

            {res.feedback.length === 0 ? (
              <p>🔥 Excellent! You are placement ready.</p>
            ) : (
              res.feedback.map((f, i) => <p key={i}>👉 {f}</p>)
            )}

          </div>

        </div>
      </div>
    );
  }

  const q = questions[step];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex justify-between px-8 py-4 border-b border-white/10 backdrop-blur-xl">
        <h2 className="font-bold">Assessment Engine</h2>
        <span className="text-purple-400">⏱ {time}s</span>
      </div>

      <div className="max-w-4xl mx-auto p-6">

        {/* PROGRESS */}
        <div className="h-2 bg-white/10 rounded-full mb-6">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* CARD */}
        <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-xl">

          <p className="text-sm text-gray-400">{q.section}</p>
          <h3 className="text-xl font-semibold mt-2">{q.q}</h3>

          <div className="mt-5 space-y-3">
            {q.options.map(opt => (
              <button
                key={opt}
                onClick={() => select(opt)}
                className={`w-full px-4 py-3 rounded-xl text-left transition
                  ${answers[step] === opt 
                    ? "bg-purple-600" 
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
                onClick={submit}
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

        {/* QUESTION PALETTE */}
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