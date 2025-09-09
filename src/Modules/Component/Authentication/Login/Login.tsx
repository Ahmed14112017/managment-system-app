import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { URL_USER } from "../../../../Contants/ENDPOINT/ENDPOINT";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../Contants/VALIDATION/VALIDATION";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { authcontext } from "../../../../Autcontext/Authcontext";

type formlogindata = {
  email: string;
  password: string;
};
export default function Login() {
  const [showpassword, Setshowpassword] = useState(false);
  const { savedata } = useContext(authcontext)!;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formlogindata>();
  const onsubmit = async (data: formlogindata) => {
    try {
      const response = await axios.post(URL_USER.login, data);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message || "wellcome");
      navigate("/dashboard");
      savedata();
    } catch {
      console.log("error");
    }
  };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center p-5">
      <div className="col-md-8 login-contain p-5">
        <p className="text-white">welcome to PMS</p>
        <h3 style={{ color: "#EF9B28" }} className="pb-5">
          Login
        </h3>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#EF9B28" }}>
              E-mail{" "}
            </label>
            <input
              type="email"
              className="Form-control"
              placeholder="Enter your E-mail"
              {...register("email", EmailValidation)}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#EF9B28" }}>
              Password{" "}
            </label>
            <span
              className="input-group text-white  d-flex justify-content-end align-items-center mb-2 "
              onMouseUp={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => Setshowpassword(!showpassword)}
            >
              <i
                className={`fa-regular ${
                  showpassword ? "fa-eye" : "fa-eye-slash"
                }`}
              ></i>
            </span>
            <input
              type={`${showpassword ? "text" : "password"}`}
              className="Form-control"
              placeholder="Enter your password"
              {...register("password", PasswordValidation)}
            />
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>

          <div className="from-link d-flex justify-content-between align-items-center mb-2">
            <Link to="register">Register Now ?</Link>
            <Link to="forget-password">Forget Password ?</Link>
          </div>
          <div className="btn-register d-flex justify-content-center align-items-center ">
            <button className="form-control rounded-4 btn-submit">login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
