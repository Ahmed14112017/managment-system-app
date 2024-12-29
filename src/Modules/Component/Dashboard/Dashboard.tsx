import { useContext, useEffect, useState } from "react";
import Header from "../../../Header/Header";
import { authcontext } from "../../../Autcontext/Authcontext";
import taskone from "../../../assets/images/18. Bar Graphic.png";
import { ProjectParams } from "../Projects/Projects";
import { URL_PROJECT, URL_TASKS } from "../../../Contants/ENDPOINT/ENDPOINT";
import axios from "axios";
import CountUp from "react-countup";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
type countditails = {
  toDo: number;
  inProgress?: number;
  done: number;
};
export default function Dashboard() {
  const { logindata }: any = useContext(authcontext);
  console.log(logindata);

  const [numberofProject, SetnumberofProject] = useState<number>(0);
  const [numberoftasks, Setnumberoftasks] = useState<number>(0);
  const [numberoftasksdetails, Setnumberoftasksdetails] =
    useState<countditails>();
  const data = {
    labels: ["ToDo", "inProgress", "done"],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          numberoftasksdetails?.toDo,
          numberoftasksdetails?.inProgress,
          numberoftasksdetails?.done,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
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
      SetnumberofProject(response.data.totalNumberOfRecords);
      console.log(numberofProject);
    } catch (error) {
      console.log(error);
    }
  };
  const getAlltaskscount = async () => {
    const response = await axios.get(URL_TASKS.getallTasks, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(response.data);
    Setnumberoftasks(response.data.totalNumberOfRecords);
    console.log(numberoftasks);
  };
  const getAlltaskscountdetails = async () => {
    const response = await axios.get(URL_TASKS.countalltask, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(response.data);
    Setnumberoftasksdetails(response.data);
    console.log(numberoftasksdetails);
  };
  useEffect(() => {
    getAllProject({ titlename: "", pagesi: 10, pagenum: 1 });
    getAlltaskscount();
    getAlltaskscountdetails();
  }, []);
  return (
    <div className="p-4 ">
      {/*  */}
      <div className=" ">
        <Header title={`${logindata?.userName}`} />
        <div className="row mt-4">
          <div className="col-md-6">
            <span>Tasks</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="d-flex justify-content-between align-items-center gap-2 mt-5">
              <div className="task-box py-3 px-5">
                <img src={taskone} alt="taskone" />
                <p>Progress</p>
                <span>
                  $
                  <CountUp
                    end={numberoftasksdetails?.inProgress ?? 0}
                    duration={2.5}
                    delay={0.5}
                  />
                </span>
              </div>
              <div className="task-box py-2 px-5">
                <img src={taskone} alt="taskone" />
                <p>task number</p>
                <span>
                  $ <CountUp end={numberoftasks} duration={2.5} delay={0.5} />
                </span>
              </div>
              <div className="task-box py-2 px-5">
                <img src={taskone} alt="taskone" />
                <p>Project number</p>
                <span>
                  $ <CountUp end={numberofProject} duration={2.5} delay={0.5} />
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {logindata?.userGroup == "Manager" ? (
              <div className="row">
                <span>Users</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Pie data={data} />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
