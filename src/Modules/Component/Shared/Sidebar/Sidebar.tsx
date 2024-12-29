import { useContext, useState } from "react";
import { Sidebar as Sidebarcontain, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { authcontext } from "../../../../Autcontext/Authcontext";

export default function Sidebar() {
  const { logindata, logout }: any = useContext(authcontext);
  const [collapse, Setcollapse] = useState(false);
  const collapsetogle = () => {
    Setcollapse(!collapse);
  };

  return (
    <Sidebarcontain className="sidebar" collapsed={collapse}>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <button className="btn side-button" onClick={collapsetogle}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <MenuItem
          icon={<i className="fa-solid fa-user-group"></i>}
          component={<Link to="/dashboard" />}
        >
          {" "}
          Home
        </MenuItem>
        {logindata?.userGroup == "Manager" ? (
          <MenuItem
            icon={<i className="fa-solid fa-user-group"></i>}
            component={<Link to="/dashboard/users" />}
          >
            {" "}
            users
          </MenuItem>
        ) : (
          ""
        )}

        <MenuItem
          icon={<i className="fa-solid fa-bars-progress"></i>}
          component={<Link to="/dashboard/project" />}
        >
          {" "}
          projects
        </MenuItem>
        <MenuItem
          icon={<i className="fa-solid fa-list-check"></i>}
          component={<Link to="/dashboard/tasks" />}
        >
          {" "}
          Tasks
        </MenuItem>
        <MenuItem
          icon={<i className="fa-solid fa-list-check"></i>}
          component={<Link to="/change-password" />}
        >
          {" "}
          ChangePassword
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
          }}
          icon={<i className="fa-solid fa-list-check"></i>}
          component={<Link to="/" />}
        >
          {" "}
          Logout
        </MenuItem>
      </Menu>
    </Sidebarcontain>
  );
}
