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
                const response = await axios.get('http://localhost:4000/api/reports');
                setReports(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    function handleIgnore(report_id){
        axios.put("http://localhost:4000/api/reports/" + report_id, {
                "report_status": "done"
        })
            .then(response => {
                alert("Report updated!");
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleDelete(review_id, report_id) {
        axios.delete("http://localhost:4000/api/reviews/deleteReview/"+review_id).
        then(response => {
            console.log(response.data)
        }).
        catch(err=>{
            console.log(err)
        })

        handleIgnore(report_id)

    }

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
                            <div>Review By: {report.review_by}</div>
                            <div>Review Text: {report.review_msg}</div>
                            <button style={{ float: "right" }} onClick={() => { handleDelete(report.review_id, report._id) }} >Delete Review</button>
                            <button style={{ float: "right" }}>Block/Ban User</button>
                            <button style={{ float: "right" }} onClick={()=>{handleIgnore(report._id)}}>Ignore Report</button>
                            <div>Review Reported By: {report.reported_by}</div>
                            <div>Report Text: {report.report_txt}</div>
                            <a href={`/getReview/${report.review_id}/viewreview`}>Inspect</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ViewReport;
