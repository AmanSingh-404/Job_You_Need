const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @desc Generate new interview report on the basis of user self description, resume pdf and job description
 * @access Private
*/

interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReport)

/**
 * @route GET /api/interview/report/:interviewId
 * @desc Get interview report on the basis of interview id
 * @access Private
*/

interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReport)

/**
 * @route GET/api/interview/
 * @description get all interview reports of logged in user
 * @access private
*/

interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReports)

/**
 * @route POST /api/interview/resume-pdf
 * @desc Generate resume PDF on the basis of user self description, resume pdf and job description
 * @access Private
*/

interviewRouter.post("/resume-pdf/:interviewId", authMiddleware.authUser, interviewController.generateResumePdf)

module.exports =  interviewRouter;