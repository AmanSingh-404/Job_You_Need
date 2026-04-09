const mongoose = require("mongoose");


/**
 * - job description schema
 * - resume text : String
 * - self description : String
 * 
 * matchScore : Number
 * 
 * - Technical question :[{
 *      question:"",
 *      intention:"",
 *      answer:""
 * }]
 * - Behavioral question :[{
 *      question:"",
 *      intention:"",
 *      answer:""
 * }]
 * - Skills gaps :[{
 *      skill:"",
 *      severity:{
 *      type: string,
 *      enum: ["low", "medium", "high"]    
 *      },
 *      gap:"",
 *      improvement:""
 * }]
 * - prepreation plan :[{
 *      day:Number,
 *      focus : String,
 *      tasks:[String]
 * }]
 * - 
*/

const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { _id: false })

const behavioralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { _id: false })

const skillsGapsSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"]
    },
    gap: {
        type: String,
        required: [true, "Gap is required"]
    },
    improvement: {
        type: String,
        required: [true, "Improvement is required"]
    }
}, { _id: false })

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: {
        type: [String],
        required: [true, "Tasks are required"]
    }
}, { _id: false })

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resumeText: {
        type: String,
        required: [true, "Resume text is required"]
    },
    selfDescription: {
        type: String,
        // required: true
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
        // required: true
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillsGaps: [skillsGapsSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    }
}, { timestamps: true })

const InterviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = InterviewReportModel; 