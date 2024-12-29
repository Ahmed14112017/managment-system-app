import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { URL_USER } from "../../../../Contants/ENDPOINT/ENDPOINT";
import { EmailValidation } from "../../../../Contants/VALIDATION/VALIDATION";
import { toast } from "react-toastify";

export default function VerifyAccount() {
  type verifyAcount = {
    email: string;
    code: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<verifyAcount>();
  const navigate = useNavigate();
  const onSubmit = async (data: verifyAcount) => {
    try {
      const response = await axios.post(URL_USER.verifyAccount, data);
      console.log(response.data);
      toast.success(response?.data?.message);
      navigate("/login");
    } catch (error) {
      const responseerror = error as any;
      toast.error(responseerror?.response?.data.message);
    }
  };
  return (
    <div className="">
      <div className="d-flex justify-content-center align-items-center ">
        <div className="col-md-8 login-contain p-5">
          <div className="title mb-5">
            <span>welcome to PMS</span>
            <h3>
              {" "}
              <span className="title-sapn">V</span>erify Account
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5 title">
              <label className="form-label">E-mail</label>
              <input
                type="email"
                className="Form-control"
                placeholder="Enter Your Email"
                {...register("email", EmailValidation)}
              />
            </div>
            {errors?.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
            <div className="my-2 title">
              <label className="form-label">OTP Verification</label>
              <input
                type="text"
                className="Form-control"
                placeholder="Enter Your Verification"
                {...register("code", { required: "OTB is require" })}
              />
            </div>
            {errors?.code && (
              <span className="text-danger">{errors.code.message}</span>
            )}
            <div className="btn-register d-flex justify-content-center align-items-center">
              <button className="btn btn-submit my-5 rounded-5">verify</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
