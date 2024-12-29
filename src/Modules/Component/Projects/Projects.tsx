import axios from "axios";
import { URL_PROJECT } from "../../../Contants/ENDPOINT/ENDPOINT";
import { useContext, useEffect, useState } from "react";
import NotData from "../../../NotData/NotData";
import { format } from "date-fns";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConformation from "../../../DeleteConformation/DeleteConformation";
import { toast } from "react-toastify";
import { paginate } from "../../../Pagination/Pagination";
import { authcontext } from "../../../Autcontext/Authcontext";

export type ProjectData = {
  map(
    arg0: (e: {
      id: string;
      title: string;
      description: string;
      creationDate: Date;
    }) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  id: number;
  title: string;
  description: string;
  creationDate: Date;
};
export type ProjectParams = {
  titlename: string | null;
  pagesi: number;
  pagenum: number;
};
export default function Projects() {
  const { logindata }: any = useContext(authcontext);
  const [show, setShow] = useState(false);
  const [showProject, SetshowProject] = useState(false);
  const [ProjectDetails, SetProjectDetails] = useState<ProjectData>();
  const [totalPage, SettotalPage] = useState<number>(1);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [EmployeeProject, SetEmployeeProject] = useState<ProjectData>();
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    Setprojectid(0);
  };
  const handelcloseProjectDetails = () => {
    SetshowProject(false);
    Setprojectid(0);
  };
  const handelshowProject = (id: number) => {
    SetshowProject(true);
    Setprojectid(id);
    getProjectByid(id);
  };
  const handleShow = (id: number) => {
    setShow(true);
    Setprojectid(id);
  };
  const [Projects, SetProjects] = useState<ProjectData[]>([]);
  const [projectid, Setprojectid] = useState<number>(0);
  const [searchparam, Setsearchparam] = useSearchParams("");

  const getAllProject = async ({
    titlename,
    pagesi,
    pagenum,
  }: ProjectParams) => {
    try {
      const response = await axios.get(URL_PROJECT.getallProject, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: {
          title: titlename,
          pagesize: pagesi,
          pageNumber: pagenum,
        },
      });
      console.log(response.data);
      SetProjects(response.data.data);
      SettotalPage(response.data.totalNumberOfPages);
      setcurrentPage(response.data.pageNumber);
      console.log(totalPage);
    } catch (error) {
      console.log(error);
    }
  };
  const getProjectByid = async (id: number) => {
    try {
      const response = await axios.get(URL_PROJECT.getProjectById(id), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data);
      SetProjectDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteProject = async () => {
    try {
      const response = await axios.delete(
        URL_PROJECT.deleteProject(projectid),
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
      toast.success(response.data.message || "project is deleted successfully");
      getAllProject({ titlename: "", pagesi: 4, pagenum: 1 });
      handleClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    }
  };

  const getProjectForEmployee = async () => {
    try {
      const response = await axios.get(URL_PROJECT.getProjectForemployee, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data.data);
      SetEmployeeProject(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logindata?.userGroup == "Employee"
      ? getProjectForEmployee()
      : getAllProject({
          titlename: searchparam.get("title"),
          pagesi: 4,
          pagenum: 1,
        });
  }, [logindata]);

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="mb-3">
            <h3>Projects</h3>
          </div>
        </div>
        {logindata?.userGroup == "Manager" ? (
          <div className="col-md-6 col-sm-12 d-flex justify-content-end">
            <div>
              <button
                className="btn rounded-4 add-button"
                onClick={() => navigate("/dashboard/projectdata")}
              >
                <i className="fa-solid fa-plus"></i>Add New Project
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="col-md-4">
        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className="fa-solid fa-search"></i>
          </span>
          <input
            className="form-control"
            value={searchparam.get("title") || ""}
            onChange={(e) => Setsearchparam({ title: e.target.value })}
          />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">description</th>
            <th scope="col">creationDate</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {logindata?.userGroup === "Manager" ? (
            Projects ? (
              Projects.map((proj) => (
                <tr key={proj.id}>
                  <td>{proj.id}</td>
                  <td>{proj.title}</td>
                  <td>{proj.description}</td>
                  <td>{format(new Date(proj.creationDate), "yyyy-MM-dd")}</td>
                  <td>
                    <div className="dropdown">
                      <i
                        className="fa-solid fa-ellipsis-vertical"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => handelshowProject(proj.id)}
                          >
                            <i className="fa-regular fa-eye me-2"></i>View
                          </button>
                        </li>
                        <li>
                          <Link
                            to={`/dashboard/projectdata/${proj.id}`}
                            state={{ projectdata: proj, type: "edit" }}
                            className="dropdown-item"
                          >
                            <i className="fa-regular fa-pen-to-square me-2"></i>
                            Edit
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => handleShow(proj.id)}
                          >
                            <i className="fa-regular fa-trash-can me-2"></i>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <NotData />
            )
          ) : EmployeeProject ? (
            EmployeeProject.map(
              (e: {
                id: string;
                title: string;
                description: string;
                creationDate: Date;
              }) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.title}</td>
                  <td>{e.description}</td>
                  <td>{format(new Date(e.creationDate), "yyyy-MM-dd")}</td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleteting Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteConformation deleteItem={"Project"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={DeleteProject}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showProject} onHide={handelcloseProjectDetails}>
        <Modal.Header closeButton>
          <Modal.Title>show Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ProjectDetails ? (
            <div>
              <h2>title:{ProjectDetails.title}</h2>
              <p>description:{ProjectDetails.description}</p>
              <p>
                Creation Date:{" "}
                {format(new Date(ProjectDetails.creationDate), "yyyy-mm-dd")}
              </p>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelcloseProjectDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`"page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className={`page-link`}
              onClick={() =>
                getAllProject({
                  titlename: "",
                  pagesi: 4,
                  pagenum: currentPage - 1,
                })
              }
            >
              Previous
            </button>
          </li>
          {paginate({
            currentPage,
            totalNumberOfPages: totalPage,
            requiredNumberOfPages: 5,
          }).map((pageno) => {
            return (
              <li
                key={pageno}
                className={`page-item ${currentPage == pageno ? "active" : ""}`}
              >
                <button
                  onClick={() =>
                    getAllProject({ titlename: "", pagesi: 4, pagenum: pageno })
                  }
                  className="page-link"
                >
                  {pageno}
                </button>
              </li>
            );
          })}
          <li
            className={`"page-item ${
              currentPage === totalPage ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() =>
                getAllProject({
                  titlename: "",
                  pagesi: 4,
                  pagenum: currentPage + 1,
                })
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
