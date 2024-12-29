import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConformation from "../../../DeleteConformation/DeleteConformation";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { URL_TASKS } from "../../../Contants/ENDPOINT/ENDPOINT";
import NotData from "../../../NotData/NotData";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { paginate } from "../../../Pagination/Pagination";
import { authcontext } from "../../../Autcontext/Authcontext";

// import { paginate } from "../../../Pagination/Pagination";
type tasksdata = {
  map(
    arg0: (taskitem: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  id: string;
  title: string;
  status: string;
  description: string;
  creationDate: string;
};
export type searchparam = {
  title?: string;
  status: string;
  pageSize: number;
  pageNumber: number;
};
type Uerstasktype = taskemployee[];
type Usertaskresponse = {
  data: taskemployee[];
};
type taskemployee = {
  id: string;
  title: string;
  status: "ToDo" | "InProgress" | "Done";
  description: string;
};
export default function Taskes() {
  const [tasks, setTasks] = useState<tasksdata>();
  const [show, setShow] = useState(false);
  const [Taskid, SetTaskid] = useState<number>(0);
  const [showtaskdata, Setshowtaskdata] = useState<boolean>(false);
  const [taskdata, Settaskdata] = useState<tasksdata>();
  const [searchparam, Setsearchparam] = useSearchParams();
  const [totalPage, SettotalPage] = useState(1);
  const [currentpage, setcurrentpage] = useState(1);
  const { logindata }: any = useContext(authcontext);
  const [mytask, setmytask] = useState<Uerstasktype>([]);

  const showtaskdetails = (id: number) => {
    Setshowtaskdata(true);
    SetTaskid(id);
    taskveiw(id);
  };
  const handelcloseTask = () => {
    Setshowtaskdata(false);
  };

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setShow(true);
    SetTaskid(id);
  };
  const getAlltasks = async ({
    title,
    status,
    pageSize,
    pageNumber,
  }: searchparam) => {
    const response = await axios.get(URL_TASKS.getallTasks, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      params: {
        title,
        status,
        pageSize,
        pageNumber,
      },
    });
    setTasks(response.data.data);
    console.log(response.data);
    SettotalPage(response.data.totalNumberOfPages);
    console.log(totalPage);
    setcurrentpage(response.data.pageNumber);
  };
  const DeleteTask = async () => {
    try {
      const response = await axios.delete(URL_TASKS.deletetask(Taskid), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data);
      toast.success(response.data.message || "Task is deleted successfully");
      handleClose();
      getAlltasks({
        title: searchparam.get("title") || "",
        status: "",
        pageSize: 3,
        pageNumber: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const taskveiw = async (id: number) => {
    try {
      const response = await axios.get(URL_TASKS.getTaskById(id), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      Settaskdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getmyassigntask = async (pageSize = 3, pageNumber: 1) => {
    try {
      const response = await axios.get<Usertaskresponse>(
        URL_TASKS.getmyassigntask,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            pageSize: pageSize,
            pageNumber: pageNumber,
          },
        }
      );
      console.log(response.data);
      setmytask(response.data.data);
      console.log(mytask);
    } catch (error) {
      console.log(error);
    }
  };

  const changetaskstauts = async ({
    taskidstatus,
    newstatus,
  }: {
    taskidstatus: any;
    newstatus: string;
  }) => {
    try {
      const response = await axios.put(
        URL_TASKS.changeStatus(taskidstatus),
        { status: newstatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      getmyassigntask(3, 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    {
      getAlltasks({
        title: searchparam.get("title") || "",
        status: "",
        pageSize: 2,
        pageNumber: 1,
      });
    }
  }, []);
  useEffect(() => {
    getmyassigntask(3, 1);
  }, []);
  return (
    <div className="container-fluid mt-3">
      {logindata?.userGroup == "Manager" ? (
        <>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <h3>Tasks</h3>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 d-flex justify-content-end">
              <div>
                <button
                  className="btn rounded-4 add-button"
                  onClick={() => navigate("/dashboard/tasksdata")}
                >
                  <i className="fa-solid fa-plus"></i>Add New Task
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-search"></i>
              </span>
              <input
                className="form-control"
                onChange={(e) => Setsearchparam({ title: e.target.value })}
                value={searchparam.get("title") || ""}
              />
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">title</th>
                <th scope="col">status</th>
                <th scope="col">User</th>
                <th scope="col">Project</th>
                <th scope="col">Date Created</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {tasks ? (
                tasks.map((taskitem) => {
                  return (
                    <tr key={taskitem.id}>
                      <td>{taskitem.title}</td>
                      <td>{taskitem.status}</td>
                      <td>
                        {taskitem.employee ? taskitem.employee.userName : ""}
                      </td>
                      <td>{taskitem.project?.title}</td>
                      <td>{taskitem.creationDate}</td>
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
                                onClick={() => showtaskdetails(taskitem.id)}
                              >
                                <i className="fa-regular fa-eye me-2"></i>Veiw
                              </button>
                            </li>
                            <li>
                              <Link
                                to={`/dashboard/tasksdata/${taskitem.id}`}
                                className="dropdown-item"
                                state={{ itemdata: taskitem, type: "edit" }}
                              >
                                <i className="fa-regular fa-pen-to-square me-2"></i>
                                Edit
                              </Link>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => handleShow(taskitem.id)}
                              >
                                <i className="fa-regular fa-trash-can me-2"></i>
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <NotData />
              )}
            </tbody>
          </table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Deleteting Model</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DeleteConformation deleteItem={"Tasks"} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={DeleteTask}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showtaskdata} onHide={handelcloseTask}>
            <Modal.Header closeButton>
              <Modal.Title>show Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {taskdata ? (
                <div>
                  <h2>title:{taskdata.title}</h2>
                  <p>description:{taskdata.description}</p>
                  <p>
                    Creation Date:{" "}
                    {format(new Date(taskdata.creationDate), "yyyy-mm-dd")}
                  </p>
                </div>
              ) : (
                ""
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handelcloseTask}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {/* <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className={`"page-item ${currentPage === 1 ? "disabled" : ""}`}><button className={`page-link`}onClick={()=>getAllProject({titlename:"",pagesi:4,pagenum:currentPage-1})}>Previous</button></li>
    {paginate({currentPage,totalNumberOfPages:totalPage,requiredNumberOfPages:5}).map((pageno)=>{
      return(
        <li key={pageno} className={`page-item ${currentPage==pageno?"active":""}`}><button onClick={()=>getAllProject({titlename:"",pagesi:4,pagenum:pageno})} className="page-link">{pageno}</button></li>

      )
    })}
    <li className={`"page-item ${currentPage === totalPage ? "disabled" : ""}`}><button className="page-link" onClick={()=>getAllProject({titlename:"",pagesi:4,pagenum:currentPage+1})}>Next</button></li>
  </ul>
</nav> */}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentpage == 1 ? "disabled" : ""}`}>
                <a
                  className="page-link"
                  href="#"
                  onClick={() =>
                    getAlltasks({
                      title: "",
                      status: "",
                      pageSize: 2,
                      pageNumber: currentpage - 1,
                    })
                  }
                >
                  Previous
                </a>
              </li>
              {paginate({
                currentPage: currentpage,
                totalNumberOfPages: totalPage,
                requiredNumberOfPages: 5,
              }).map((pagno) => {
                return (
                  <li
                    key={pagno}
                    className={`page-item ${
                      currentpage == pagno ? "active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() =>
                        getAlltasks({
                          title: "",
                          status: "",
                          pageSize: 2,
                          pageNumber: pagno,
                        })
                      }
                    >
                      {pagno}
                    </a>
                  </li>
                );
              })}
              <li
                className={`page-item ${
                  currentpage == totalPage ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() =>
                    getAlltasks({
                      title: "",
                      status: "",
                      pageSize: 2,
                      pageNumber: currentpage + 1,
                    })
                  }
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <div className="container-fluid">
          <div>
            <h2>Task Board</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="task-progress">
                <h5 className="mb-3">To Do</h5>
                <div
                  className="task-contain"
                  onDrop={(e) => {
                    console.log(e);
                    e.preventDefault();
                    console.log({ taskid: e.dataTransfer.getData("taskid") });
                    if (e.dataTransfer.getData("previousstatus") == "ToDo")
                      return;
                    console.log(e.dataTransfer.getData("previousstatus"));
                    changetaskstauts({
                      taskidstatus: e.dataTransfer.getData("taskid"),
                      newstatus: "ToDo",
                    });
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className=" task-content">
                    {mytask.filter((e) => e.status == "ToDo").length > 0
                      ? mytask
                          .filter((e) => e.status == "ToDo")
                          .map((teskss) => {
                            return (
                              <div>
                                <p
                                  key={teskss.id}
                                  draggable={true}
                                  onDragStart={(e) => {
                                    console.log("start");
                                    console.log(teskss.title);
                                    console.log(
                                      e.dataTransfer.setData(
                                        "taskid",
                                        teskss.id
                                      )
                                    );
                                    e.dataTransfer.setData("taskid", teskss.id);
                                    e.dataTransfer.setData(
                                      "previousstatus",
                                      teskss.status
                                    );
                                  }}
                                  onDragEnd={() => {
                                    console.log("end");
                                  }}
                                >
                                  {teskss.title}
                                </p>
                              </div>
                            );
                          })
                      : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="task-progress">
                <h5 className="mb-3">In Progress</h5>
                <div
                  className="task-contain"
                  onDrop={(e) => {
                    console.log(e);
                    e.preventDefault();
                    console.log({ taskid: e.dataTransfer.getData("taskid") });
                    console.log({
                      previousstatus: e.dataTransfer.getData("previousstatus"),
                    });
                    if (
                      e.dataTransfer.getData("previousstatus") == "InProgress"
                    )
                      return;
                    changetaskstauts({
                      taskidstatus: e.dataTransfer.getData("taskid"),
                      newstatus: "InProgress",
                    });
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className=" task-content">
                    {mytask.filter((e) => e.status == "InProgress").length > 0
                      ? mytask
                          .filter((e) => e.status == "InProgress")
                          .map((teskss) => {
                            return (
                              <div key={teskss.id}>
                                <p
                                  key={teskss.id}
                                  draggable={true}
                                  onDragStart={(e) => {
                                    console.log("start");
                                    e.dataTransfer.setData("taskid", teskss.id);
                                    e.dataTransfer.setData(
                                      "previousstatus",
                                      teskss.status
                                    );
                                  }}
                                  onDragEnd={() => {
                                    console.log("end");
                                  }}
                                >
                                  {teskss.title}
                                </p>
                              </div>
                            );
                          })
                      : ""}{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="task-progress">
                <h5 className="mb-3">Done</h5>
                <div
                  className="task-contain"
                  onDrop={(e) => {
                    console.log(e);
                    e.preventDefault();
                    console.log({ taskid: e.dataTransfer.getData("taskid") });
                    e.dataTransfer.getData("taskid");
                    if (e.dataTransfer.getData("previousstatus") == "Done")
                      return;

                    changetaskstauts({
                      taskidstatus: e.dataTransfer.getData("taskid"),
                      newstatus: "Done",
                    });
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className=" task-content">
                    {mytask.filter((e) => e.status == "Done").length > 0
                      ? mytask
                          .filter((e) => e.status == "Done")
                          .map((teskss) => {
                            return (
                              <div>
                                <p
                                  key={teskss.id}
                                  draggable={true}
                                  onDragStart={(e) => {
                                    console.log("drag start");
                                    e.dataTransfer.setData("taskid", teskss.id);
                                    e.dataTransfer.setData(
                                      "previousstatus",
                                      teskss.status
                                    );
                                  }}
                                  onDragEnd={() => {
                                    console.log("drag end");
                                  }}
                                >
                                  {teskss.title}
                                </p>
                              </div>
                            );
                          })
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
