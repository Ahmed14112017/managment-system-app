import { Outlet } from "react-router-dom";

export default function Authlayout() {
  return (
    <div className="auth-container d-flex justify-content-center align-items-center container-fluid ">
              <div className="col-md-10">
                <div className="text-center mb-2">
                    <img src="src\assets\images\PMS 3.png" />
                </div>
                <Outlet />
            </div>
             
        
    </div>
  )
}
