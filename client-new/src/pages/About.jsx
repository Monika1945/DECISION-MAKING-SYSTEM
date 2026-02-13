import React, { useEffect } from 'react';

const About = () => {
    useEffect(() => {
        // Handle scrolling to contact if hash is present
        if (window.location.hash === '#contact') {
            const section = document.getElementById('contact');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            </div>

            <div className="container mx-auto px-6 py-16 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 border-b border-gray-200 pb-6 text-center">
                        About <span className="text-blue-600">Placement Readiness</span>
                    </h1>

                    <div className="space-y-12 text-gray-600 text-lg leading-relaxed">
                        <section className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm">01</span>
                                Our Mission
                            </h2>
                            <p>
                                The Placement Readiness System is designed to empower students by providing a clear, data-driven assessment of their career preparedness. Our goal is to bridge the gap between academic learning and industry expectations through comprehensive skill analysis.
                            </p>
                        </section>

                        <section className="grid md:grid-cols-2 gap-8">
                            <div className="glass-panel p-8 rounded-2xl border border-blue-50">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Goal-Oriented</h3>
                                <p className="text-sm">We focus on quantifiable metrics like technical aptitude, communication skills, and academic performance to give you a realistic readiness score.</p>
                            </div>
                            <div className="glass-panel p-8 rounded-2xl border border-purple-50">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">AI-Driven Insights</h3>
                                <p className="text-sm">Our system uses logic-based analysis to identify your weak areas and provide actionable recommendations for improvement.</p>
                            </div>
                        </section>

                        <section id="contact" className="bg-white/80 p-10 rounded-3xl border border-gray-100 shadow-xl scroll-mt-24">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Me</h2>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                                            <svg className="w-6 h-6 border" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Email</p>
                                            <p className="text-gray-800 font-bold">support@placementready.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                                            <svg className="w-6 h-6 border" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Phone</p>
                                            <p className="text-gray-800 font-bold">+1 (234) 567-890</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
                                            <svg className="w-6 h-6 border" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Address</p>
                                            <p className="text-gray-800 font-bold">123 Career Blvd, Tech City, 560001</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 bg-gray-50 p-6 rounded-2xl">
                                    <p className="font-bold text-gray-800">Available for support 24/7</p>
                                    <p className="text-sm text-gray-500">Feel free to reach out for any technical queries or career guidance support.</p>
                                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">Message Now</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
