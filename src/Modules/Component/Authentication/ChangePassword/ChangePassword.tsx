import { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordValidation } from "../../../../Contants/VALIDATION/VALIDATION";
import axios from "axios";
import { URL_USER } from "../../../../Contants/ENDPOINT/ENDPOINT";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
type changePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export default function ChangePassword() {
  const [showpassword, Setshowpassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<changePassword>();
  const ChangePassword = async (data: changePassword) => {
    try {
      const response = await axios.put(URL_USER.changePassword, data);
      console.log(response.data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="d-flex justify-content-center align-items-center ">
        <div className="col-md-8 login-contain px-5 py-2">
          <div className="title mb-3">
            <span>welcome to PMS</span>
            <h3>
              {" "}
              <span className="title-sapn">C</span>hange Password
            </h3>
          </div>
          <form onSubmit={handleSubmit(ChangePassword)}>
            <div className="my-2 title">
              <label className="form-label">old Password</label>
              <span
                className="input-group mb-2  d-flex justify-content-end align-items-center "
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
                type={showpassword ? "text" : "password"}
                className="Form-control"
                placeholder="Enter Your old Password"
                {...register("oldPassword", PasswordValidation)}
              />
            </div>
            {errors?.oldPassword && (
              <span className="text-danger">{errors.oldPassword.message}</span>
            )}
            <div className="my-2 title">
              <label className="form-label">New Password</label>
              <span
                className="input-group mb-2  d-flex justify-content-end align-items-center "
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
                type={showpassword ? "text" : "password"}
                className="Form-control"
                placeholder="Enter Your New Password"
                {...register("newPassword", PasswordValidation)}
              />
            </div>
            {errors?.newPassword && (
              <span className="text-danger">{errors.newPassword.message}</span>
            )}

            <div className="title">
              <label className="form-label">Confirm Password</label>
              <span
                className="input-group mb-2  d-flex justify-content-end align-items-center "
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
                type={showpassword ? "text" : "password"}
                className="Form-control"
                placeholder="Confirm New Password"
                {...register("confirmNewPassword", {
                  required: "Confirm Password is require",
                  validate: (value) => value === getValues("newPassword"),
                })}
              />
            </div>
            {errors?.confirmNewPassword && (
              <span className="text-danger">
                {errors.confirmNewPassword.message}
              </span>
            )}
            <div className="btn-register d-flex justify-content-center align-items-center">
              <button className="btn btn-submit my-5 rounded-5">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
