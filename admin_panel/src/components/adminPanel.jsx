import "../css/adminPanel.css";
import Dashboard from "./dashboard";

const AdminPanel = () => {

    return (
        <div className="admin-panel">
            {/* Navigation Bar */}
            <div className="nav-bar">
                <ul>
                    <li><a href="#dashboard">Dashboard</a></li>
                    <li><a href="#reports">Reports</a></li>
                </ul>
            </div>

            {/* Main Content */}
            <Dashboard/>
        </div>
    );
};

export default AdminPanel;
