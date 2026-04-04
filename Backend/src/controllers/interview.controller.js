const pdfParse = require("pdf-parse")
const { generateInterviewReport } = require("../services/ai.services")
const InterviewReportModel = require("../models/interview.model")

async function genrateInterviewReportController(req, res) {
    const resumeFile = req.file

    const resumeContent = pdfParse(req.file.buffer)
    const {selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({resumeContent, selfDescription, jobDescription})

    const interviewReport = await InterviewReportModel.create({
        user: req.user.id,
        resume: resumeFile.buffer,
        selfDescription,
        jobDescription,
        technicalQuestions: interviewReportByAi.technicalQuestions
    })

    res.status(200).json({
        success: true,
        message: "Interview report generated successfully",
        interviewReport
    })
}

module.exports = { genrateInterviewReportController }