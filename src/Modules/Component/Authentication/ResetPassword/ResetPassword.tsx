import {  useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { EmailValidation, PasswordValidation } from "../../../../Contants/VALIDATION/VALIDATION"
import { toast } from "react-toastify"
import { useState } from "react"
import axios from "axios"
import { URL_USER } from "../../../../Contants/ENDPOINT/ENDPOINT"

export default function ResetPassword() {
  const [showpassword,Setshowpassword]=useState(false)
  type Resetpassword={
      email: string,
      password: string,
      confirmPassword: string,
      seed: string
  }
  const {register,handleSubmit,formState:{errors},getValues}=useForm<Resetpassword>()
    const navigate=useNavigate()
    const onSubmit = async (data: Resetpassword) => {
      try{
        const response = await axios.post(URL_USER.resetpassword,data)
        console.log(response.data)
        toast.success(response?.data?.message)
        navigate("/")
      }
      catch(error){
        const responseerror=error as any
        toast.error((responseerror?.response?.data.message))
      }
    }
  return (
     <div className="">
              <div className="d-flex justify-content-center align-items-center ">
                <div className="col-md-8 login-contain px-5 py-2">
                <div className="title mb-3">
                <span>welcome to PMS</span>
                <h3> <span className="title-sapn">R</span>eset Password</h3>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-3 title">
          <label  className="form-label">E-mail</label>
          <input type="email" className="Form-control"  placeholder="Enter Your Email"{...register("email",EmailValidation)}/>
        </div>
        {errors?.email&&<span className="text-danger">{errors.email.message}</span>}
        <div className="my-2 title">
          <label  className="form-label">OTP Verification</label>
          <input type="text" className="Form-control"  placeholder="Enter Your Verification"{...register("seed",{required:"OTB is require"})}/>
        </div>
        {errors?.seed&&<span className="text-danger">{errors.seed.message}</span>}
        <div className="my-2 title">
          <label  className="form-label">New Password</label>
          <span  className="input-group mb-2  d-flex justify-content-end align-items-center " onMouseUp={(e)=>e.preventDefault()}
                            onMouseDown={(e)=>e.preventDefault()}
                            onClick={()=>Setshowpassword(!showpassword)}
                            >
<i className={`fa-regular ${showpassword ? "fa-eye" : "fa-eye-slash"}`}></i>
</span>
          <input type={showpassword?"text":"password"} className="Form-control"  placeholder="Enter Your New Password"{...register("password",PasswordValidation)}/>
        </div>
        {errors?.password&&<span className="text-danger">{errors.password.message}</span>}
        <div className="title">
          <label  className="form-label">Confirm Password</label>
          <span  className="input-group mb-2  d-flex justify-content-end align-items-center " onMouseUp={(e)=>e.preventDefault()}
                            onMouseDown={(e)=>e.preventDefault()}
                            onClick={()=>Setshowpassword(!showpassword)}
                            >
<i className={`fa-regular ${showpassword ? "fa-eye" : "fa-eye-slash"}`}></i>
</span>
          <input type={showpassword?"text":"password"} className="Form-control"  placeholder="Confirm New Password"{...register("confirmPassword",{required:"Confirm Password is require",
            validate:(value)=>value===getValues("password")
          })}/>
        </div>
        {errors?.confirmPassword&&<span className="text-danger">{errors.confirmPassword.message}</span>}
        <div className="btn-register d-flex justify-content-center align-items-center">
        <button className="btn btn-submit my-5 rounded-5">Save</button>
        
        </div>
              </form>
                </div>
              </div>
             
            </div>
  )
}
