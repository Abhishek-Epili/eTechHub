import "../css/adminPanel.css";
import Dashboard from "./dashboard";
import { Routes, Route } from 'react-router-dom'
import AddGadget from "./addGadget";
import ViewReport from "./viewReport";
import ViewGadget from "./viewGadget";

const AdminPanel = () => {

    return (
        <div className="admin-panel">
            {/* Navigation Bar */}
            <div className="nav-bar">
                <ul>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/reports">Reports</a></li>
                    <li><a href="/addgadget">Add Gadget</a></li>
                    <li><a href="/viewgadget">View Gadgets</a></li>
                    <li><a href="/verifiedpurchase">View Verified Purchases</a></li>
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;
