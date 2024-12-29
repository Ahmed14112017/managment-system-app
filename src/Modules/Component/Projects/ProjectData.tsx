import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { URL_PROJECT } from "../../../Contants/ENDPOINT/ENDPOINT"
import axios from "axios"
import { toast } from "react-toastify"
type addProjectData={
    title:string,
    description:string
}
export default function ProjectData() {
    const location=useLocation()
    const projectData = location?.state?.projectdata
    const type=location?.state?.type   
    console.log(projectData,type)
    const navigate=useNavigate()
    const{register,handleSubmit,formState:{errors}}=useForm<addProjectData>()
    const onSubmit = async(data: addProjectData)=>{
        console.log(data)
        const url=type=="edit"?URL_PROJECT.updateProject(projectData.id):URL_PROJECT.createProject
        try{
            const response=await axios({
              method:type=="edit"? "PUT":"POST",
              url:url,
              data:data,
              headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
            })
            console.log(response.data)
            navigate(-1)
            toast.success(type=="edit"?response.data.message||"project is updated successfully":response.data.message||"project is added successfully")

        }
        catch(error){
          console.log(error)
        }
    }

  return (
    <div className="container-fluid mt-3 ps-5">
        <div className="pb-5">
        <button className="btn" onClick={()=>navigate(-1)}><i className="fa-solid fa-angle-left pe-3"></i>Veiw All Projects</button>
        <h4 className="ps-3 fw-semibold">{type=="edit"?"Edit a Project":"Add a New Project"}</h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control"  placeholder="name" aria-describedby="emailHelp"{...register("title",{required:"title is required"})}
    defaultValue={type=="edit"?projectData.title:""}
    />
  </div>
  {errors?.title&&<span className="text-danger">{errors.title.message}</span>}

  <div className="mb-5">
    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
    <textarea  className="form-control"  placeholder="Description" aria-describedby="emailHelp"{...register("description",{required:"description is required"})}
    defaultValue={type=="edit"?projectData.description:""}
    />
  </div>
  {errors?.description&&<span className="text-danger">{errors.description.message}</span>}

  <div className="d-flex justify-content-between align-items-center" >
    <button className="btn btn-outline-dark rounded-4 px-4"type="button" onClick={()=>navigate(-1)}>cancel</button>
    <button type="submit" className="btn add-button rounded-4 px-4">save</button>
  </div>
        </form>
     
    </div>
  )
}
