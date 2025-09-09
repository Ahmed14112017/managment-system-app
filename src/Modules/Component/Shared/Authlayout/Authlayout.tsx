import { Outlet } from "react-router-dom";
import authimag from "../../../../assets/images/PMS3.png";

export default function Authlayout() {
  return (
    <div className="auth-container d-flex justify-content-center align-items-center container-fluid ">
      <div className="col-md-10">
        <div className="text-center mb-2">
          <img src={`${authimag}`} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
