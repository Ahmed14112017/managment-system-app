import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

export default function MasterLayout() {
return (
    <div className="master-layout ">
<div className="row">
<Navbar />
</div>

<div className="d-flex justify-content-start ">
        <Sidebar />
        <div className="item">
        <Outlet />

        </div>
</div>
    </div>
)
}
