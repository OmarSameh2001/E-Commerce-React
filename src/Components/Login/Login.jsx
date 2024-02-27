import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";

export default function Login() {
  let { setToken, setLogin } = useContext(userContext);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");
  async function getLogin(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      if (data.message === "success") {
        setToken(data.token);
        setLogin(data.user.name);
        localStorage.setItem("userToken", data.token);
        navigate("/home");
        setMsg("");
        setLoading(false);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{7,20}$/, "password not valid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: getLogin,
  });
  function Loger() {
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
        Login
      </h1>
      <form className="w-75 mx-auto my-4" onSubmit={formik.handleSubmit}>
        {msg ? <p className="alert alert-danger">{msg}</p> : ""}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ""
        )}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control mb-3"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.errors.password && formik.touched.password ? (
          <p className="alert alert-danger">{formik.errors.password}</p>
        ) : (
          ""
        )}

        <button
          disabled={!(formik.isValid && formik.dirty)}
          className="btn bg-success text-white mt-3"
          type="submit"
        >
          {loading ? "loading" : "Login"}
        </button>
        <p
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "20px",
            paddingTop: "20px",
          }}
          onClick={Loger}
        >
          If you don't have an account yet click here to register
        </p>
      </form>
    </div>
  );
}
