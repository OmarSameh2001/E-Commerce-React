import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EmailReset() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isSent, setIsSent] = useState(false);
  const nav = useNavigate();

  async function postReset(email) {
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        {
          email,
        }
      );
      console.log(response);
      if (response.data.statusMsg === "success") {
        setIsSent(true);
        toast.success("Please Input The Code You Received In Your Email");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function postCode(resetCode) {
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        {
          resetCode,
        }
      );
      console.log(response);
      nav('/forget')
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setIsSent(prev => prev ? setCode(e.target.value) : setEmail(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isSent ? postCode(code) : postReset(email);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <label htmlFor="inputField" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>{isSent ? 'Enter the verification code:' : 'Enter your email:'}</label>
        <input
          type={isSent ? 'text' : 'email'}
          id="inputField"
          value={isSent ? code : email}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ced4da', borderRadius: '4px', fontSize: '16px' }}
          placeholder={isSent ? 'example: 535863' : 'example@example.com'}
          required
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
