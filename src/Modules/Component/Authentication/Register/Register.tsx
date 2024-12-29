import { useState } from "react";
import registerimg from "../../../../assets/images/regImg.png";
import { useForm } from "react-hook-form";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../Contants/VALIDATION/VALIDATION";
import axios from "axios";
import { URL_USER } from "../../../../Contants/ENDPOINT/ENDPOINT";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Register() {
  type Formdata = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    phoneNumber: string;
    profileImage?: File[];
  };

  const [showpassword, Setshowpassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Formdata>();
  const navigate = useNavigate();
  const appindtoformdata = (data: Formdata) => {
    const formdata = new FormData();
    formdata.append("userName", data.userName);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("confirmPassword", data.confirmPassword);
    formdata.append("country", data.country);
    formdata.append("phoneNumber", data.phoneNumber);
    data?.profileImage && formdata.append("profileImage", data.profileImage[0]);

    return formdata;
  };

  const onsubmit = async (data: Formdata) => {
    const registerdata = appindtoformdata(data);
    try {
      const response = await axios.post(URL_USER.register, registerdata);
      console.log(response);
      toast.success(response.data.message || "account is created successfully");
      navigate("/verify-account");
    } catch (error) {
      const axioserror = error as any;
      toast.error(axioserror.response?.data?.message);
    }
  };
  return (
    <div className="register text-white p-4">
      <div className="row ">
        <div className="col-md-12">
          <span>welcome to PMS</span>
          <h4 className="title fw-bold">Create New Account</h4>
          <div className="d-flex justify-content-center align-items-center">
            <img src={registerimg} alt="registerimg" />
          </div>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#EF9B28" }}>
                    User Name{" "}
                  </label>
                  <input
                    type="text"
                    className="Form-control"
                    placeholder="Enter your Name"
                    {...register("userName", {
                      required: "userName is require",
                    })}
                  />
                  {errors.userName && (
                    <span className="text-danger">
                      {errors.userName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
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
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#EF9B28" }}>
                    Country{" "}
                  </label>
                  <input
                    type="text"
                    className="Form-control"
                    placeholder="Enter your country"
                    {...register("country", { required: "country is require" })}
                  />
                  {errors.country && (
                    <span className="text-danger">
                      {errors.country.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#EF9B28" }}>
                    Phone Number{" "}
                  </label>
                  <input
                    type="number"
                    className="Form-control"
                    placeholder="Enter your Phone Number"
                    {...register("phoneNumber", {
                      required: "phoneNumber is require",
                    })}
                  />
                  {errors.phoneNumber && (
                    <span className="text-danger">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6  d-flex justify-content-between align-items-center gap-1">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#EF9B28" }}>
                    password{" "}
                  </label>
                  <input
                    type={`${showpassword ? "text" : "password"}`}
                    className="Form-control"
                    placeholder="Enter your password"
                    {...register("password", PasswordValidation)}
                  />
                  {errors.password && (
                    <span className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <span
                  className="input-group  d-flex justify-content-end align-items-center "
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
              </div>
              <div className="col-md-6 d-flex justify-content-between align-items-center gap-1">
                <div className="mb-3 ">
                  <label className="form-label" style={{ color: "#EF9B28" }}>
                    Confirm Password{" "}
                  </label>
                  <input
                    type={`${showpassword ? "text" : "password"}`}
                    className="Form-control"
                    placeholder="Confirm New Password"
                    {...register("confirmPassword", {
                      required: "confirmPassword isrequire",
                      validate: (value) =>
                        value === getValues("password") ||
                        "password is not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-danger">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
                <span
                  className="input-group  d-flex justify-content-end align-items-center "
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
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="my-3">
                  <input
                    className="Form-control"
                    type="file"
                    id="formFile"
                    {...register("profileImage")}
                  />
                </div>
              </div>
            </div>{" "}
            <div className="btn-register  d-flex justify-content-center align-items-center my-3">
              <button
                className="form-control rounded-4 btn-submit"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
