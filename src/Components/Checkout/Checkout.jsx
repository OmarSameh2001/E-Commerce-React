import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { CartContext } from "../../Context/cartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutSchema = Yup.object().shape({
  shippingAddress: Yup.object().shape({
    details: Yup.string().required("Details is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(002)?(01)[0-25][0-9]{8}$/, "Phone number is not valid"),
    city: Yup.string().required("City is required"),
  }),
});

const Checkout = () => {
  const initialValues = {
    shippingAddress: {
      details: "",
      phone: "",
      city: "",
    },
  };
  const { cartId, deleteCart } = useContext(CartContext); // Assuming you're importing these correctly
  const navigate = useNavigate();

  const [isVisa, setIsVisa] = useState(false);

  const token = localStorage.getItem("userToken") || ""; // Ensure token is defined

  //console.log(cartId);

  const handleSubmit = (values) => {
    console.log(values);
    
    isVisa ? postVisa(values) : postCheckout(values);
  };

  async function postCheckout(shippingAddress) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        {
          headers: {
            token, // Convert token to string explicitly
          },
        }
      );

      console.log(response);
      if (response?.data.status === "success") {
        deleteCart();
        toast.success("Order Placed Successfully, Redirecting To Orders", {
          onClose: () => {
            navigate("/allorders");
          },
          autoClose: 2000,
        });
      } else {
        toast.error("Order Failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function postVisa(shippingAddress) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        shippingAddress, // send the shippingAddress directly
        {
          headers: {
            token, // Convert token to string explicitly
          },
        }
      );
      console.log(response);
      if (response?.data.status === "success") {
        deleteCart();
        window.location.href = response.data.session.url;
      }
      // Handle response for Visa payment
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="App-header bg-white text-dark">
      <h2>Checkout</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={CheckoutSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="shippingAddress.city">City</label>
              <Field
                type="text"
                name="shippingAddress.city"
                className="form-control mb-1"
              />
              <ErrorMessage
                name="shippingAddress.city"
                component="div"
                className="error"
                style={{ backgroundColor: "red" }}
              />
            </div>
            <div>
              <label htmlFor="shippingAddress.details">Address</label>
              <Field
                type="text"
                name="shippingAddress.details"
                className="form-control mb-1"
              />
              <ErrorMessage
                name="shippingAddress.details"
                component="div"
                className="error"
                style={{ backgroundColor: "red" }}
              />
            </div>
            <div>
              <label htmlFor="shippingAddress.phone">Phone</label>
              <Field
                type="text"
                name="shippingAddress.phone"
                className="form-control mb-1"
              />
              <ErrorMessage
                name="shippingAddress.phone"
                component="div"
                className="error"
                style={{ backgroundColor: "red" }}
              />
            </div>
            <div className="d-flex align-items-center">
              <input type="checkbox" onChange={() => setIsVisa(!isVisa)} />
              <p className="mb-0 ml-2">Visa</p>
              <button type="submit" className="btn btn-primary ml-auto">
                {isVisa ? "Visa" : "Cash"}
              </button>
            </div>

            {/* <button
              type="button"
              onClick={() => setIsVisa(true)}
              className="btn btn-primary"
            >
              Visa
            </button> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout;
