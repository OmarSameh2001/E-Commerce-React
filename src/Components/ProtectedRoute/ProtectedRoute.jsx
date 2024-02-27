import React, { useContext, useEffect } from 'react';
import { userContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { token } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        
    }, [token, navigate]);

    return (
        <>{token ? children : navigate('/login')}</>
    );
}
