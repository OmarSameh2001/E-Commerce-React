import React, { useContext, useState } from 'react'; // Combine imports
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";

export default function ForgetPassword() {
  const { setToken, setLogin } = useContext(userContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function getLogin(values) {
    try {
      setLoading(true);
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );
      console.log(response);
      if (response.data.message === "success") {
        
        navigate("/login");
        setMsg("");
      }
    } catch (error) {
      setMsg(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{7,20}$/, "Password not valid"),
      rePassword: Yup.string()
      .required("rePassword id required")
      .oneOf([Yup.ref("password")], "Must be compatiable wih password"),
  });
  
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: ""
    },
    validationSchema,
    onSubmit: getLogin,
  });

  function navigateToRegister() {
    navigate("/register");
  }

  return (
    <div className="App-header bg-white text-dark">
      <h1
        style={{
          fontSize: "75px",
          fontWeight: "bolder",
          paddingBottom: "50px",
        }}
      >
        Forget
      </h1>
      <form className="w-75 mx-auto my-4" onSubmit={formik.handleSubmit}>
        {msg && <p className="alert alert-danger">{msg}</p>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="alert alert-danger">{formik.errors.email}</p>
        )}

        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          className="form-control mb-3"
          id="password"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="alert alert-danger">{formik.errors.password}</p>
        )}

         
          <div>
            <label htmlFor="rePassword">Confirm Password:</label>
            <input
              type="password"
              className="form-control mb-3"
              id="rePassword"
              {...formik.getFieldProps('rePassword')}
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="alert alert-danger">{formik.errors.rePassword}</p>
            )}
          </div>
        

        <button
          disabled={!(formik.isValid && formik.dirty)}
          className="btn bg-success text-white mt-3"
          type="submit"
        >
          {loading ? "Loading" : "Update"}
        </button>
        <p
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "20px",
            paddingTop: "20px",
          }}
          onClick={navigateToRegister}
        >
          If you don't have an account yet click here to register
        </p>
      </form>
    </div>
  );
}
