import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteElement({component, loggedIn}) {
    return loggedIn ? (
        component
    ) : (
        <Navigate to="/sign-up" replace />
    );
};

export default ProtectedRouteElement;