import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const FEATURES = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
        title: 'AI-Powered Analysis',
        desc: 'Upload your resume and job description. Our AI instantly scores your match and identifies gaps.'
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
        title: 'Smart Interview Questions',
        desc: 'Get curated technical & behavioral questions tailored specifically to your target role.'
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
        ),
        title: 'Day-by-Day Roadmap',
        desc: 'Follow a personalised preparation plan crafted to maximise your chances of landing the offer.'
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        title: 'Tailored Resume PDF',
        desc: 'Generate a polished, ATS-friendly resume PDF optimised for the exact job you\'re applying for.'
    },
]

const STEPS = [
    { num: '01', title: 'Paste the Job Description', desc: 'Copy and paste the full JD of the role you are targeting.' },
    { num: '02', title: 'Upload Your Resume', desc: 'Drop your existing resume PDF and add a short intro about yourself.' },
    { num: '03', title: 'Get Your Report', desc: 'Receive a complete interview kit with questions, answers, skill gaps, and a personalised roadmap.' },
]

const Landing = () => {
    const heroRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.target.classList.toggle('opacity-0', !e.isIntersecting)),
            { threshold: 0.1 }
        )
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#111827] font-sans overflow-x-hidden">

            {/* ── Navbar ── */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#4ade80] flex items-center justify-center text-white shadow-sm">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-black">Job <span className="text-[#4ade80]">You</span> Need</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-sm font-semibold text-[#6b7280] hover:text-black transition-colors px-4 py-2">
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-sm font-bold px-5 py-2.5 rounded-full bg-black text-white hover:bg-[#1f2937] transition-colors shadow-sm"
                        >
                            Get Started →
                        </Link>
                    </div>
                </div>
            </header>

            {/* ── Hero ── */}
            <section ref={heroRef} className="pt-36 pb-24 px-6 flex flex-col items-center text-center relative">
                {/* Background blob */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#4ade80]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4ade80]/15 border border-[#4ade80]/30 text-[#16a34a] text-sm font-bold mb-8 tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                    AI-Powered Interview Preparation
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[1.1] max-w-4xl mb-6">
                    Land your dream job<br />
                    <span className="text-[#4ade80]">confidently.</span>
                </h1>

                <p className="text-lg sm:text-xl text-[#6b7280] max-w-xl mb-10 leading-relaxed">
                    Upload your resume, paste the job description, and get a personalised interview kit — tailored questions, skill gap analysis, and a day-by-day prep roadmap.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                        to="/register"
                        className="px-8 py-4 rounded-full bg-black text-white font-bold text-base hover:bg-[#1f2937] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center gap-2"
                    >
                        Get Started — It's Free
                        <svg className="w-4 h-4 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                    <Link
                        to="/login"
                        className="px-8 py-4 rounded-full border-2 border-[#d1d5db] text-[#111827] font-bold text-base hover:border-[#4ade80] hover:text-[#16a34a] transition-all"
                    >
                        Sign In
                    </Link>
                </div>

                {/* Social proof */}
                <p className="mt-8 text-sm text-[#9ca3af] font-medium">
                    ✦ No credit card required &nbsp;·&nbsp; ✦ Instant results &nbsp;·&nbsp; ✦ ATS-friendly resumes
                </p>
            </section>

            {/* ── Features ── */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-4">Everything you need to ace the interview</h2>
                    <p className="text-[#6b7280] text-lg max-w-xl mx-auto">From gap analysis to tailored questions — your personal AI interview coach.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white border border-[#e5e7eb] rounded-[20px] p-6 shadow-sm hover:shadow-md hover:border-[#4ade80] transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#4ade80]/15 text-[#22c55e] flex items-center justify-center mb-5 group-hover:bg-[#4ade80] group-hover:text-white transition-all duration-300">
                                {f.icon}
                            </div>
                            <h3 className="text-lg font-bold text-black mb-2">{f.title}</h3>
                            <p className="text-sm text-[#6b7280] leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── How it Works ── */}
            <section className="bg-black text-white py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">How it works</h2>
                        <p className="text-[#9ca3af] text-lg">Three simple steps to interview-ready.</p>
                    </div>
                    <div className="flex flex-col gap-0">
                        {STEPS.map((step, i) => (
                            <div key={i} className="flex items-start gap-8 group relative pb-12 last:pb-0">
                                {/* Connector line */}
                                {i < STEPS.length - 1 && (
                                    <div className="absolute left-[27px] top-16 w-0.5 h-full bg-[#1f2937]" />
                                )}
                                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#4ade80] text-black font-black text-lg flex items-center justify-center shadow-lg shadow-[#4ade80]/20 z-10">
                                    {step.num}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-[#9ca3af] leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] via-[#f8fafc] to-[#f0fdf4] -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4ade80]/10 rounded-full blur-3xl -z-10" />

                <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-6 max-w-2xl mx-auto leading-[1.15]">
                    Ready to prepare smarter?
                </h2>
                <p className="text-[#6b7280] text-lg mb-10 max-w-md mx-auto">
                    Join and generate your first personalised interview report in under 60 seconds.
                </p>
                <Link
                    to="/register"
                    className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-black text-white font-bold text-base hover:bg-[#1f2937] transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
                >
                    Get Started for Free
                    <svg className="w-5 h-5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </Link>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t border-[#e5e7eb] bg-white py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#4ade80] flex items-center justify-center text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span className="font-bold text-black text-sm">Job <span className="text-[#4ade80]">You</span> Need</span>
                </div>
                <p className="text-sm text-[#9ca3af]">© {new Date().getFullYear()} Job You Need. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link to="/login" className="text-sm text-[#6b7280] hover:text-black transition-colors font-medium">Login</Link>
                    <Link to="/register" className="text-sm text-[#6b7280] hover:text-black transition-colors font-medium">Register</Link>
                </div>
            </footer>
        </div>
    )
}

export default Landing
