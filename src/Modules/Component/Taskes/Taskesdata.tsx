import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { ProjectData } from "../Projects/Projects";
import { useEffect, useState } from "react";
import { UserList } from "../Users/Users";
import {
  URL_PROJECT,
  URL_TASKS,
  URL_USER,
} from "../../../Contants/ENDPOINT/ENDPOINT";
import axios from "axios";
import { toast } from "react-toastify";
type addtask = {
  title: string;
  description: string;
  employeeId: number;
  projectId: number;
};
export default function Taskesdata() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addtask>();
  const location = useLocation();
  const navigate = useNavigate();
  const { itemdata, type } = location?.state ? location.state : "";
  console.log(itemdata);
  const [Projects, SetProjects] = useState<ProjectData[]>([]);
  const [users, setUsers] = useState<UserList[]>([]);

  const getAlluser = async (pageSize: number, pageNumber: number) => {
    try {
      const response = await axios.get(URL_USER.GetallusersBymanger, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
        },
      });
      console.log(response.data);
      setUsers(response.data.data);
      // Setarrayofpage(Array(response.data.totalNumberOfPages).fill(0).map((_,i)=>i+1))
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProject = async () => {
    try {
      const response = await axios.get(URL_PROJECT.getallProject, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data);
      SetProjects(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onsubmit = async (data: addtask) => {
    const url =
      type === "edit"
        ? URL_TASKS.updateTask(itemdata.id)
        : URL_TASKS.createTask;
    try {
      const response = await axios({
        method: type == "edit" ? "PUT" : "POST",
        url: url,
        data: data,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data);
      toast.success(
        response.data.message || type === "edit"
          ? "task is updated successfully"
          : "task is added successfully"
      );
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(()=>{
  //   const fetch=async()=>{
  //    await getAlluser({username:"",pagenum:1,pagesi:3})
  //     await getAllProject({titlename:"",pagenum:1,pagesi:3})
  //     if(type==="edit"&&itemdata){
  //       reset({
  //         title:itemdata.title,
  //         description:itemdata.description,
  //         employeeId:itemdata.employee?.id,
  //         projectId:itemdata.project?.id,
  //       })
  //     }
  //   }
  //    fetch()

  // },[])
  useEffect(() => {
    getAlluser(500, 1);
    getAllProject();
  }, []);
  return (
    <div className="container-fluid pb-3">
      <div className="pb-5">
        <button className="btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-angle-left pe-3"></i>Veiw All Tasks
        </button>
        <h4 className="ps-3 fw-semibold">
          {type == "edit" ? "Edit a Task" : "Add a New Task"}
        </h4>
      </div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="mb-5">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="name"
            aria-describedby="emailHelp"
            {...register("title", { required: "title is required" })}
            defaultValue={type == "edit" ? itemdata.title : ""}
          />
        </div>
        {errors?.title && (
          <span className="text-danger">{errors.title.message}</span>
        )}

        <div className="mb-5">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            placeholder="Description"
            aria-describedby="emailHelp"
            {...register("description", {
              required: "description is required",
            })}
            defaultValue={type == "edit" ? itemdata.description : ""}
          />
        </div>
        {errors?.description && (
          <span className="text-danger">{errors.description.message}</span>
        )}
        <div className="row">
          <div className="col-md-6 mb-5">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("employeeId", {
                required: "employee must be detected",
              })}
              defaultValue={
                type === "edit" && itemdata?.employee?.id
                  ? itemdata.employee?.id
                  : ""
              }
            >
              {users.length > 0
                ? users.map((person) => {
                    return (
                      <>
                        <option key={person.id} value={person.id}>
                          {person.userName}
                        </option>
                      </>
                    );
                  })
                : ""}
            </select>
          </div>
          <div className="col-md-6 mb-5">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("projectId", {
                required: "project must be detected",
              })}
              defaultValue={type === "edit" ? itemdata.project?.id : ""}
            >
              {Projects.length > 0
                ? Projects.map((projectname) => {
                    return (
                      <>
                        <option key={projectname.id} value={projectname.id}>
                          {projectname.title}
                        </option>
                      </>
                    );
                  })
                : ""}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-dark rounded-4 px-4"
            type="button"
            onClick={() => navigate(-1)}
          >
            cancel
          </button>
          <button type="submit" className="btn add-button rounded-4 px-4">
            save
          </button>
        </div>
      </form>
    </div>
  );
}
