import { useContext } from "react";
import navimg from "../../../../assets/images/nav-logo.png";
import { authcontext } from "../../../../Autcontext/Authcontext";
export default function Navbar() {
  const { logindata } = useContext(authcontext)!;
  console.log(logindata);

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom border-gray">
      <div className="logo">
        <img src={navimg} alt="navimg" />
      </div>
      <div className="user-content">
        <div className="alert">
          <i className="fa-solid fa-bell alert-icon"></i>
        </div>
        <div className="user-name">
          <span>{logindata?.userName}</span>
          <p>{logindata?.userEmail}</p>
        </div>
      </div>
    </div>
  );
}
