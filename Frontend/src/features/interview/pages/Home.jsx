import React,{useState, useRef} from 'react';
import { useAuth } from '../../auth/hooks/use.auth';
import {useInterview} from '../hooks/useinterview'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user, handleLogout } = useAuth();
    const {loading, genrateReport} = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenrateReport = async ()=> {
        const resumeFile = resumeInputRef.current.files[0]
        if(!resumeFile){
            alert("Please upload resume")
            return
        }
        if(!jobDescription || !selfDescription){
            alert("Please fill all the fields")
            return
        }
        const data =  await genrateReport({jobDescription, selfDescription, resumeFile})
        if(data){
            navigate(`/interview/${data._id}`)
        }
    }

    if(loading){
        return(
            <main className="min-h-screen bg-[#f8fafc] text-[#111827] font-sans flex flex-col relative w-full overflow-x-hidden">
                <div className="w-16 h-16 border-4 border-[#d1d5db] border-t-[#4ade80] rounded-full animate-spin mb-6"></div>
                <h1 className="text-xl font-bold text-[#111827] tracking-tight">Gathering insights...</h1>
                <p className="text-[#6b7280] mt-2 text-sm">Please wait while we load your tailored interview plan.</p>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#f8fafc] text-[#111827] font-sans flex flex-col relative w-full overflow-x-hidden">
            {/* Simple Header */}
            <header className="w-full bg-white border-b border-[#d1d5db] py-4 px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center shadow-sm gap-4 sm:gap-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#4ade80] flex items-center justify-center text-white font-bold text-xl shadow-sm">
                        J
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-black">Job <span className="text-[#4ade80]">You</span> Need</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-[#6b7280] hidden sm:inline-block">Welcome, <strong className="text-black">{user?.username || 'User'}</strong></span>
                    <button 
                        onClick={handleLogout}
                        className="text-sm px-6 py-2 rounded-full border border-[#d1d5db] text-black hover:bg-[#f8fafc] transition-colors font-semibold cursor-pointer shadow-sm"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="flex-grow flex items-center justify-center p-4 sm:p-8">
                <div className="max-w-6xl w-full bg-white border border-[#d1d5db] rounded-[24px] shadow-xl overflow-hidden flex flex-col lg:flex-row relative z-10 transition-all duration-300">
                    
                    {/* Left Section (Job Description) */}
                    <div className="w-full lg:w-1/2 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#d1d5db] flex flex-col relative group">
                        
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-[#4ade80]/15 rounded-xl text-[#22c55e]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-black">Job Details</h2>
                                <p className="text-sm text-[#6b7280] mt-1">Paste the requirements you are targeting</p>
                            </div>
                        </div>
                        
                        <div className="flex-grow flex flex-col relative">
                            <label htmlFor="jobDescription" className="text-sm font-semibold text-black mb-2 px-1">
                                Job Description
                            </label>
                            <textarea 
                                onChange={(e)=>{setJobDescription(e.target.value)}}
                                name="jobDescription" 
                                id="jobDescription" 
                                className="w-full flex-grow p-5 bg-[#f8fafc] border border-[#d1d5db] rounded-[16px] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:border-black transition-colors resize-none min-h-[300px]"
                                placeholder="Enter the full job description here..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Right Section (Profile & Submission) */}
                    <div className="w-full lg:w-1/2 p-6 sm:p-10 bg-[#f8fafc] flex flex-col relative group">

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-[#4ade80]/15 rounded-xl text-[#22c55e]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-black">Your Profile</h2>
                                <p className="text-sm text-[#6b7280] mt-1">Provide your resume and a brief intro</p>
                            </div>
                        </div>
                        
                        <div className="mb-6 relative w-full">
                            <label htmlFor="resume" className="text-sm font-semibold text-black mb-2 px-1 flex justify-between items-center w-full">
                                <span>Upload Resume</span>
                                <span className="text-[11px] text-[#6b7280] font-medium tracking-wider">.PDF ONLY</span>
                            </label>
                            <div className="flex items-center justify-center w-full mt-1">
                                <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-[130px] bg-white border-2 border-dashed border-[#d1d5db] rounded-[16px] cursor-pointer hover:border-[#4ade80] transition-colors group/upload shadow-sm">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-3 text-[#9ca3af] group-hover/upload:text-[#22c55e] transition-colors duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-1 text-sm text-[#6b7280] group-hover/upload:text-black transition-colors"><strong className="text-[#4ade80] font-semibold">Click to browse</strong> or drag and drop</p>
                                    </div>
                                    <input ref={resumeInputRef} type="file" name="resume" id="resume" accept=".pdf" className="hidden" />
                                </label>
                            </div>
                        </div>

                        <div className="mb-8 flex-grow flex flex-col relative w-full">
                            <label htmlFor="selfDescription" className="text-sm font-semibold text-black mb-2 px-1">
                                Self Description
                            </label>
                            <textarea 
                                onChange={(e)=> setSelfDescription(e.target.value)}
                                name="selfDescription" 
                                id="selfDescription" 
                                className="w-full flex-grow p-5 bg-white border border-[#d1d5db] rounded-[16px] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:border-black transition-colors resize-none min-h-[140px] shadow-sm"
                                placeholder="Detail your skills, experience, and why you are the perfect fit..."
                            ></textarea>
                        </div>

                        <button
                        onClick={handleGenrateReport}
                        disabled={loading}
                         className="w-full py-4 px-6 font-semibold text-white rounded-full bg-black hover:bg-[#1f2937] transition-colors flex items-center justify-center gap-3 shadow-md active:scale-[0.99] text-[1.05rem]">
                            <span>Generate Interview Report</span>
                            <svg className="w-5 h-5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;