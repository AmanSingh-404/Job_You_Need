import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/use.auth.js'
import { useInterview } from '../hooks/useInterview.js'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='bg-white border border-[#d1d5db] rounded-[16px] mb-4 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md'>
            <div className='flex items-center justify-between p-5 cursor-pointer bg-white hover:bg-[#f8fafc] transition-colors' onClick={() => setOpen(o => !o)}>
                <div className="flex items-center gap-4">
                    <span className='flex items-center justify-center w-8 h-8 rounded-full bg-[#4ade80]/15 text-[#22c55e] font-bold text-sm shadow-sm flex-shrink-0'>Q{index + 1}</span>
                    <p className='font-semibold text-[#111827] text-base'>{item.question}</p>
                </div>
                <span className={`text-[#6b7280] transform transition-transform duration-300 ml-4 hidden sm:block ${open ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='p-6 border-t border-[#d1d5db] bg-[#f8fafc] flex flex-col gap-6 animate-fadeIn'>
                    <div>
                        <span className='inline-block px-3 py-1 bg-white border border-[#d1d5db] text-[#6b7280] text-xs font-bold rounded-full mb-3 uppercase tracking-wider shadow-sm'>Intention</span>
                        <p className="text-[#111827] text-sm leading-relaxed">{item.intention}</p>
                    </div>
                    <div>
                        <span className='inline-block px-3 py-1 bg-[#4ade80]/20 border border-[#4ade80]/30 text-black text-xs font-bold rounded-full mb-3 uppercase tracking-wider shadow-sm'>Model Answer</span>
                        <p className="text-[#111827] text-sm leading-relaxed">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='relative pl-8 pb-10 border-l-2 border-[#d1d5db] last:border-transparent last:pb-0'>
        <div className='absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-white border-4 border-[#4ade80] shadow-sm'></div>
        <div className='flex items-center gap-3 mb-4 -mt-1'>
            <span className='px-3 py-1 bg-black text-white text-xs font-bold rounded-[8px] tracking-wide'>Day {day.day}</span>
            <h3 className='text-lg font-bold text-[#111827]'>{day.focus}</h3>
        </div>
        <ul className='flex flex-col gap-3'>
            {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-[#374151]">
                    <span className='mt-2 w-1.5 h-1.5 rounded-full bg-[#4ade80] flex-shrink-0' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])

    if (loading || !report) {
        return (
            <main className='min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center font-sans'>
                <div className="w-16 h-16 border-4 border-[#d1d5db] border-t-[#4ade80] rounded-full animate-spin mb-6"></div>
                <h1 className="text-xl font-bold text-[#111827] tracking-tight">Gathering insights...</h1>
                <p className="text-[#6b7280] mt-2 text-sm">Please wait while we load your tailored interview plan.</p>
            </main>
        )
    }

    const scoreColorClass =
        report.matchScore >= 80 ? 'text-[#22c55e] border-[#22c55e] bg-[#22c55e]/5' :
            report.matchScore >= 60 ? 'text-amber-500 border-amber-500 bg-amber-500/5' : 'text-red-500 border-red-500 bg-red-500/5'

    return (
        <div className='min-h-screen bg-[#f8fafc] font-sans flex flex-col text-[#111827] overflow-x-hidden'>
            
            {/* ── Top Header ── */}
            <header className="w-full bg-white border-b border-[#d1d5db] py-4 px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center shadow-sm z-50 gap-4 sm:gap-0">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-10 h-10 rounded-full bg-[#4ade80] flex items-center justify-center text-white font-bold text-xl shadow-sm">
                        J
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-black">Job <span className="text-[#4ade80]">You</span> Need</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-[#6b7280] hidden md:inline-block">Welcome, <strong className="text-black">{user?.username || 'User'}</strong></span>
                    <button 
                        onClick={handleLogout}
                        className="text-sm px-6 py-2 rounded-full border border-[#d1d5db] text-black hover:bg-[#f8fafc] transition-colors font-semibold shadow-sm"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className='flex-grow max-w-[1400px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start'>

                {/* ── Left Nav ── */}
                <nav className='w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-6 sticky top-8'>
                    <div className="bg-white border border-[#d1d5db] rounded-[24px] p-4 shadow-sm flex flex-col gap-2">
                        <p className='text-xs font-bold text-[#6b7280] uppercase tracking-wider px-4 py-2'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-[16px] text-[15px] font-semibold transition-all ${
                                    activeNav === item.id 
                                    ? 'bg-black text-white shadow-md' 
                                    : 'text-[#6b7280] hover:bg-[#f8fafc] hover:text-[#111827]'
                                }`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className={activeNav === item.id ? 'text-[#4ade80]' : 'text-[#9ca3af]'}>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    
                    <button
                        onClick={() => { getResumePdf(interviewId) }}
                        className='w-full py-4 px-6 font-semibold text-[#111827] rounded-[20px] bg-white border-2 border-[#d1d5db] hover:border-[#4ade80] hover:text-[#22c55e] transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] group' >
                        <svg className="w-5 h-5 text-[#22c55e] group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Download Resume
                    </button>
                    
                    <Link to="/" className='text-center text-sm font-semibold text-[#6b7280] hover:text-black transition-colors'>
                        ← Back to Home
                    </Link>
                </nav>

                {/* ── Center Content ── */}
                <main className='flex-grow w-full bg-white border border-[#d1d5db] rounded-[24px] shadow-sm p-6 sm:p-10 min-h-[700px]'>
                    {activeNav === 'technical' && (
                        <section className="animate-fadeIn">
                            <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-[#f1f5f9] gap-4'>
                                <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">Technical Questions</h2>
                                <span className='px-4 py-1.5 bg-[#f8fafc] border border-[#d1d5db] text-[#6b7280] text-sm font-bold rounded-full w-max'>{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='flex flex-col'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section className="animate-fadeIn">
                            <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-[#f1f5f9] gap-4'>
                                <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">Behavioral Questions</h2>
                                <span className='px-4 py-1.5 bg-[#f8fafc] border border-[#d1d5db] text-[#6b7280] text-sm font-bold rounded-full w-max'>{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='flex flex-col'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section className="animate-fadeIn">
                            <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-[#f1f5f9] gap-4'>
                                <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">Preparation Road Map</h2>
                                <span className='px-4 py-1.5 bg-[#f8fafc] border border-[#d1d5db] text-[#6b7280] text-sm font-bold rounded-full w-max'>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='mt-8 max-w-3xl ml-4'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* ── Right Sidebar ── */}
                <aside className='w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6 sticky top-8'>

                    {/* Match Score */}
                    <div className='bg-white border border-[#d1d5db] rounded-[24px] p-8 shadow-sm flex flex-col items-center text-center'>
                        <p className='text-xs font-bold text-[#6b7280] uppercase tracking-widest mb-6'>Match Score</p>
                        <div className={`w-36 h-36 rounded-full border-[10px] flex items-center justify-center mb-6 shadow-inner ${scoreColorClass}`}>
                            <span className='text-5xl font-black tracking-tight'>{report.matchScore}</span>
                            <span className='text-2xl font-bold ml-1'>%</span>
                        </div>
                        <p className='text-base font-semibold text-[#111827]'>
                            {report.matchScore >= 80 ? 'Strong match for this role!' : report.matchScore >= 60 ? 'Good potential for this role.' : 'Requires more preparation.'}
                        </p>
                    </div>

                    {/* Skill Gaps */}
                    <div className='bg-[#f8fafc] border border-[#d1d5db] rounded-[24px] p-6 shadow-sm'>
                        <p className='text-xs font-bold text-[#6b7280] uppercase tracking-widest mb-5'>Skill Gaps Identified</p>
                        <div className='flex flex-wrap gap-2'>
                            {report.skillGaps.map((gap, i) => {
                                const severityClass = gap.severity === 'high' 
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : gap.severity === 'medium'
                                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'

                                return (
                                    <span key={i} className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${severityClass}`}>
                                        {gap.skill}
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview