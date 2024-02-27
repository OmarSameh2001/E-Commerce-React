import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");
  async function getRegister(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      if (data.message === "success") {
        navigate("/login");
        setMsg("");
        setLoading(false);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(2, "too short min is 2")
      .max(10, "too long max is 6"),
    email: Yup.string()
      .required("email is required")
      .email("email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{7,20}$/,
        "Password must have at least one uppercase, lowercase, number, and be at least 8 characters"
      ),
    rePassword: Yup.string()
      .required("rePassword id required")
      .oneOf([Yup.ref("password")], "Must be compatiable wih password"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(002)?(01)[0-25][0-9]{8}$/, "phone not valid"),
  });
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => getRegister(values),
  });
  function Loger() {
    navigate("/login");
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
        Register Section
      </h1>
      <form
        className="w-75 mx-auto my-4"
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        {msg ? <p className="alert alert-danger">{msg}</p> : ""}
        <input
          className="form-control mb-3"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />

        {formik.errors.name && formik.touched.name ? (
          <p className="alert alert-danger">{formik.errors.name}</p>
        ) : (
          ""
        )}

        <input
          className="form-control mb-3"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ""
        )}

        <input
          className="form-control mb-3"
          type="tel"
          name="phone"
          id="phone"
          placeholder="Phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <p className="alert alert-danger">{formik.errors.phone}</p>
        ) : (
          ""
        )}

        <input
          className="form-control mb-3"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className="alert alert-danger">{formik.errors.password}</p>
        ) : (
          ""
        )}

        <input
          className="form-control mb-3"
          type="password"
          name="rePassword"
          id="rePassword"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <p className="alert alert-danger">{formik.errors.rePassword}</p>
        ) : (
          ""
        )}

        <button
          disabled={!(formik.isValid && formik.dirty)}
          className="btn bg-success text-white mt-3"
          type="submit"
        >
          {loading ? "loading" : "Register"}
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
          If you already have an account click here to login
        </p>
      </form>
    </div>
  );
}
