const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.services");
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

        // 2. Parse PDF
        const resumeContent = await (new pdfParse.PDFParse(Uint*Array.from(req.file.buffer))).getText()
        const { selfDescription, jobDescription } = req.body;

        // 3. Call AI service
        const interviewReportByAi = await generateInterviewReport({
            resumeContent,
            selfDescription,
            jobDescription
        });

        // 4. Save to DB
        const interviewReport = await InterviewReportModel.create({
            user: req.user?.id, // safer
            resumeText: resumeContent.text,
            selfDescription,
            jobDescription,
            technicalQuestions: interviewReportByAi.technicalQuestions
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

module.exports = { generateInterviewReport: generateInterviewReportController };