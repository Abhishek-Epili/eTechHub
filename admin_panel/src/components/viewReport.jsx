import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/viewReport.css'

function ViewReport() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/reviews/getReportedReviews');
                setReports(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="reports">
            <h2>Reports</h2>
            {reports.length === 0 ? (
                <p>No reports found.</p>
            ) : (
                <ul>
                    {reports.map(report => (
                        <li key={report._id}>
                            <div>{report.review_by.name}</div>
                            <div>{report.review_header}</div>
                            <div>{report.review_msg}</div>
                            <div>{report.report_txt}</div>
                            {/* Add more report fields as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ViewReport;
