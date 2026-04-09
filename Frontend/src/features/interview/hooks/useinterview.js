import {getAllInterviewReports, getInterviewReportById, generateInterviewReport} from "../services/interview.service";
import { useContext } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    if(!context) {
        throw new Error("useInterview must be used within InterviewProvider");
    }
    
    const {loading, setLoading, report, setReport, reports, setReports} = context;

    const genrateReport = async({jobDescription. selfDescription, resumeFile}) => {
        setLoading(true)
        try{
            const response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReport)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const getReportById = async (interviewReport)=> {
        setLoading(true)
        try{
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }

    }

    const getReports = async()=>{
        setLoading(true)
        try{
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return {
        loading,
        report,
        reports,
        genrateReport,
        getReportById,
        getReports
    }
    
}