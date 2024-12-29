import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { EmailValidation } from "../../../../Contants/VALIDATION/VALIDATION"
import axios from "axios"
import { URL_USER } from "../../../../Contants/ENDPOINT/ENDPOINT"
import { toast } from "react-toastify"

export default function ForgetPassword() {
type verifyemail={
  email: string
}

    const {register,handleSubmit,formState:{errors}}=useForm<verifyemail>()
    const navigate=useNavigate()
  const onsubmit=async(data:verifyemail)=>{
    try{
      const response=await axios.post(URL_USER.frogetpassword,data)
      console.log(response.data)
      navigate("/reset-password")
      toast.success(response?.data.message)
    }
    catch(error){
      const responseerror=error as any
      toast.error((responseerror?.response?.data.message))  
    }
  }
  return (
    <div className="">
      <div className="d-flex justify-content-center align-items-center ">
        <div className="col-md-8 login-contain p-5">
        <div className="title mb-5">
        <span>welcome to PMS</span>
        <h3> <span className="title-sapn">F</span>orget Password</h3>
      </div>
      <form onSubmit={handleSubmit(onsubmit)}>
      <div className="my-3 title">
  <label  className="form-label">E-mail</label>
  <input type="email" className="Form-control"  placeholder="Enter Your Email"{...register("email",EmailValidation)}/>
</div>
{errors?.email&&<span className="text-danger">{errors.email.message}</span>}
<div className="btn-register d-flex justify-content-center align-items-center">
<button className="btn btn-submit my-5 rounded-5">verify</button>

</div>
      </form>
        </div>
      </div>
     
    </div>
  )
}
