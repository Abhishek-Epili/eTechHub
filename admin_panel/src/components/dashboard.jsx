import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [loggedInUsers, setLoggedInUsers] = useState();
    const [productsCount, setProductsCount] = useState();
    const [reviewsCount, setReviewsCount] = useState();

    useEffect(()=>{
        async function getCount(){
            const userResponse = await axios.get("http://localhost:4000/api/getCount/getUserCount");
            const reviewResponse = await axios.get("http://localhost:4000/api/getCount/getReviewCount");
            const productResponse = await axios.get("http://localhost:4000/api/getCount/getProductCount");

            setLoggedInUsers(userResponse.data)
            setProductsCount(reviewResponse.data)
            setReviewsCount(productResponse.data)
        }
        getCount();
    },[])

    return (
        <div className="main-content">
            {/* Dashboard Section */}
            <div id="dashboard" className="dashboard-section">
                <h2>Dashboard</h2>
                <div className="dashboard-stats">
                    <div className="stat">
                        <h3>Users Logged In</h3>
                        <p>{loggedInUsers}</p>
                    </div>
                    <div className="stat">
                        <h3>Products</h3>
                        <p>{productsCount}</p>
                    </div>
                    <div className="stat">
                        <h3>Reviews</h3>
                        <p>{reviewsCount}</p>
                    </div>
                </div>
            </div>

            {/* Reports Section (you can add more sections as needed) */}
            <div id="reports" className="reports-section">
                <h2>Reports</h2>
                {/* Add your report components here */}
            </div>
        </div>
    )
}

export default Dashboard;