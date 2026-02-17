import { Link } from 'react-router-dom';
import ProjectLogo from '../components/Logo';

const About = () => {
    return (
        <div className="min-h-screen bg-slate-50 overflow-hidden relative font-sans">
            {/* Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[10%] right-[5%] w-[40%] h-[40%] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/">
                    <ProjectLogo />
                </Link>
                <div className="space-x-4 text-sm font-medium">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Home</Link>
                    <Link to="/login" className="text-gray-600 hover:text-blue-600 transition">Login</Link>
                    <Link to="/signup" className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition shadow-md">Sign Up</Link>
                </div>
            </nav>

            <main className="relative z-10 container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
                        Empowering Future <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Industy Leaders</span>
                    </h1>

                    <div className="glass-panel p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-md bg-white/40 border border-white/20 mb-16">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            ReadySetGo is a comprehensive placement readiness system designed to bridge the gap between academic learning and professional excellence. We provide students with the tools and insights they need to assess their current standing and prepare for their dream careers.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mt-12">
                            <div className="p-6 bg-white/50 rounded-2xl border border-white/30 hover:shadow-lg transition">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                                    <span className="mr-3 text-2xl">🎯</span> Our Mission
                                </h3>
                                <p className="text-gray-600">
                                    To provide personalized, data-driven career guidance that helps every student reach their full potential through continuous assessment and targeted improvement.
                                </p>
                            </div>
                            <div className="p-6 bg-white/50 rounded-2xl border border-white/30 hover:shadow-lg transition">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                                    <span className="mr-3 text-2xl">💡</span> Our Vision
                                </h3>
                                <p className="text-gray-600">
                                    To become the standard for professional readiness, connecting talent with opportunity through innovative technology and actionable insights.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10">Why Choose ReadySetGo?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: "AI/ML Powered", desc: "Advanced algorithms to predict your placement chances accurately.", icon: "🤖" },
                                { title: "Real-time Feedback", desc: "Instant evaluation of your technical and aptitude tests.", icon: "⚡" },
                                { title: "Growth Roadmap", desc: "Personalized path to fix weaknesses and boost your score.", icon: "🗺️" }
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 glass-panel rounded-2xl border border-white/20 hover:bg-white/60 transition cursor-default">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-24">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Get in Touch</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="glass-panel p-8 rounded-2xl border border-white/30 text-center hover:shadow-xl transition group">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                                    <span className="text-2xl">📍</span>
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2">Our Office</h4>
                                <p className="text-sm text-gray-600">123 Education Hub, Innovation Park, Bangalore, India</p>
                            </div>
                            <div className="glass-panel p-8 rounded-2xl border border-white/30 text-center hover:shadow-xl transition group">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                                    <span className="text-2xl">📧</span>
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2">Email Us</h4>
                                <p className="text-sm text-gray-600">support@readysetgo.edu<br />info@readysetgo.com</p>
                            </div>
                            <div className="glass-panel p-8 rounded-2xl border border-white/30 text-center hover:shadow-xl transition group">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                                    <span className="text-2xl">📞</span>
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2">Call Us</h4>
                                <p className="text-sm text-gray-600">+91 98765-43210<br />(080) 1234-5678</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24 text-center">
                        <Link to="/signup" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-extrabold text-lg hover:shadow-2xl hover:scale-105 transition transform duration-200">
                            Start Your Journey Today
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="relative z-10 py-10 text-center border-t border-gray-100 mt-20">
                <p className="text-gray-500 text-sm">© 2024 ReadySetGo. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;
