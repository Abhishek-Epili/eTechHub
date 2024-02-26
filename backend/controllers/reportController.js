const Report = require("../models/reportSchema");

const getReports = async (req, res) => {
    const query = {
        "report_status": "pending"
    }
    try {
        const reports = await Report.find(query,{}).sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const createReport = async (req, res) => {
    try {
        // Extract data from request body
        const { review_id, review_msg, review_by, report_txt, reported_by } = req.body;
        console.log({ review_id, review_msg, review_by, report_txt, reported_by })
        const report = await Report.create({review_id, review_msg, review_by, report_txt, reported_by})

        res.status(200).json(report);
    } catch (err) {
        // Return error response if any error occurs
        console.error('Error creating report:', err);
        res.status(400).json({error: err});
    }
};


const updateReport = async (req, res) => {
    const { id } = req.params;
    const report = req.body;


    console.log(report)
    try {
        const updatedReport = await Report.findByIdAndUpdate(id,  report , { new: true });
        if (!updatedReport) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.status(200).json(updatedReport);
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ error: error});
    }
};


module.exports = {
    getReports,
    createReport,
    updateReport
};
