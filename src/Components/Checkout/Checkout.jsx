import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { CartContext } from "../../Context/cartContext";

const CheckoutSchema = Yup.object().shape({
  shippingAddress: Yup.object().shape({
    details: Yup.string().required("Details is required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(002)?(01)[0-25][0-9]{8}$/, "phone not valid"),
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
  const token = localStorage.getItem("userToken");
  let {cartId} = useContext(CartContext)
  async function postCheckout(shippingAddress, cartId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress}, {
          headers: {
            token,
          }
        }
      );
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (values) => {
    console.log(values);
    postCheckout(values, cartId);
    // Handle form submission here
  };

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

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout;
