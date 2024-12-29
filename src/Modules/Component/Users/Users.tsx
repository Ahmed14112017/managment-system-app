import axios from "axios";
import { BASE_IAMGE, URL_USER } from "../../../Contants/ENDPOINT/ENDPOINT";
import { useEffect, useState } from "react";
import Notfound from "../../../assets/images/notfounded.jpg"
import NotData from "../../../NotData/NotData";
import { useSearchParams } from "react-router-dom";
import { paginate } from "../../../Pagination/Pagination";
export type param={
  pagesi:number,
  pagenum:number,
  username?:string
}
export type UserList={
  id: number,
  isActivated:boolean,
  userName:string,
  email:string,
  country:string,
  imagePath:string


}
export default function Users() {
  const [users, setUsers] = useState<UserList[]>([]);
  // const[arrayofpage,Setarrayofpage]=useState<number[]>([])
  // const[valueName,SetvalueName]=useState<string>()
  const[searchparam,Setsearchparam]=useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
 
  const [Active,SetActive]=useState(false)
  const getAlluser=async({username="",pagenum=1,pagesi=3}:param)=>{
    try{
      const response= await axios.get(URL_USER.GetallusersBymanger,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
      params:{
        userName:searchparam.get("username")||username,pageSize:pagesi,pageNumber:pagenum
      }

    })
      console.log(response.data)
      setUsers(response.data.data)
      // Setarrayofpage(Array(response.data.totalNumberOfPages).fill(0).map((_,i)=>i+1))
      setTotalPages(response.data.totalNumberOfPages);
      setCurrentPage(response.data.pageNumber)

    }
    catch(error){
      console.log(error);
    }
  }
  const toggleActivatd=async(id: number)=>{
    try{
      const response=await axios.put(URL_USER.GetIdUser(id),{},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      SetActive(response.data.isActivated)
      getAlluser({ username: "", pagenum: currentPage, pagesi: 3 });
    }
    catch(error){
      console.log(error);
    }
  }  

const paginationclick=(page: number)=>{
  if(page>=1 && page<=totalPages){
    getAlluser({ username: "", pagenum: page, pagesi: 3 });
  }
}
  useEffect(()=>{
    getAlluser({ username: "", pagenum: currentPage, pagesi: 3 });
  },[searchparam,currentPage])
  return (
    <div className="container mt-3">
      <div className="col-md-4">
      <div className="input-group mb-3">
      <span className="input-group-text">
      <i className="fa-solid fa-magnifying-glass"></i>
      </span>
  <input type="text" value={searchparam.get("username")||""} className="form-control"  placeholder="Username" aria-label="Username"onChange={(e)=>Setsearchparam({username:e.target.value})}/>
</div>
      </div>
      
    <table className="table">
  <thead>
    <tr>
      <th scope="col">userName</th>
      <th scope="col">Statue</th>
      <th scope="col">email</th>
      <th scope="col">Image</th>
      <th scope="col">country</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {users.length>0?(
users.map((e)=>{
  return(
    <tr key={e.id}>
      <td>{e.userName}</td>
      <td>{e.isActivated?<button className="btn btn-success rounded-3">Active</button>:<button className="btn btn-danger rounded-3">Not Active</button>}</td>
      <td>{e.email}</td>
      {e.imagePath?<td><img style={{width:"50px"}} src={`${BASE_IAMGE}${e.imagePath}`}/></td>:<td><img style={{width:"50px"}} src={Notfound}/></td>}
      <td>{e.country}</td>
      <td>
      <div className="dropdown">
  <i className="fa-solid fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
  <ul className="dropdown-menu">
    <li><button className="dropdown-item" type="button"onClick={()=>toggleActivatd(e.id)}>{Active?"Block":"Active"}</button></li>
    <li><button className="dropdown-item" type="button">Veiw</button></li>
  </ul>
</div>
      </td>

      </tr>
  )
})
    ):<NotData />}
    
  </tbody>
</table>

{/* <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
</div> */}

<nav aria-label="Page navigation example">
  <ul className="pagination">
    {/* Previous Button */}
    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <button
        className="page-link"
        onClick={() => paginationclick(currentPage - 1)}
      >
        Previous
      </button>
    </li>

    {/* Page Numbers */}
    {paginate({
      currentPage,
      totalNumberOfPages: totalPages,
      requiredNumberOfPages: 5,
    }).map((pageno) => (
      <li
        key={pageno}
        className={`page-item ${pageno === currentPage ? "active" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => paginationclick(pageno)}
        >
          {pageno}
        </button>
      </li>
    ))}

    {/* Next Button */}
    <li
      className={`page-item ${
        currentPage === totalPages ? "disabled" : ""
      }`}
    >
      <button
        className="page-link"
        onClick={() => paginationclick(currentPage + 1)}
      >
        Next
      </button>
    </li>
  </ul>
</nav>
</div>
  )
}
