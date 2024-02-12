import "../css/adminPanel.css";
import Dashboard from "./dashboard";
import { Routes, Route } from 'react-router-dom'
import AdminLogin from "./adminLogin";
import AddGadget from "./addGadget";

const AdminPanel = () => {

    return (
        <div className="admin-panel">
            {/* Navigation Bar */}
            <div className="nav-bar">
                <ul>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="#reports">Reports</a></li>
                    <li><a href="/addgadget">Add Gadget</a></li>
                </ul>
            </div>

            <Routes>
                <Route index path='/' element={<Dashboard />} />
                <Route path='/addgadget' element={<AddGadget />} />
            </Routes>
        </div>
    );
};

export default AdminPanel;
