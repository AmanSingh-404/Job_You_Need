const pdfParse = require('pdf-parse');
const { generateInterviewReport, generateResumePdf } = require("../services/ai.services");
const InterviewReportModel = require("../models/InterviewReport.model");

async function generateInterviewReportController(req, res) {
    try {
        // 1. Validate file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required"
            });
        }

        const resumeContent = await pdfParse(req.file.buffer);
        const { selfDescription, jobDescription } = req.body;

        // 3. Call AI service
        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });

        // 4. Save to DB
        const interviewReport = await InterviewReportModel.create({
            user: req.user?.id, // safer
            resumeText: resumeContent.text,
            selfDescription,
            jobDescription,
            title: interviewReportByAi.title || "Interview Report",
            matchScore: interviewReportByAi.matchScore,
            technicalQuestions: interviewReportByAi.technicalQuestions,
            behavioralQuestions: interviewReportByAi.behavioralQuestions,
            skillsGaps: interviewReportByAi.skillsGaps,
            preparationPlan: interviewReportByAi.preparationPlan
        });

        // 5. Response
        res.status(200).json({
            success: true,
            message: "Interview report generated successfully",
            interviewReport
        });

    } catch (error) {
        console.error("Error generating report:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;
        const interviewReport = await InterviewReportModel.findOne({_id:interviewId, user: req.user.id});
        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Interview report fetched successfully",
            interviewReport
        });
    } catch (error) {
        console.error("Error fetching interview report:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await InterviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select("-resume -jobDescription -selfDescription -technicalQuestions -behavioralQuestions -skillsGaps -preparationPlan");
        res.status(200).json({
            success: true,
            message: "Interview reports fetched successfully",
            interviewReports
        });
    } catch (error) {
        console.error("Error fetching interview reports:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = { 
    generateInterviewReport: generateInterviewReportController, 
    getAllInterviewReports: getAllInterviewReportsController,
    getInterviewReport: getInterviewReportByIdController
};