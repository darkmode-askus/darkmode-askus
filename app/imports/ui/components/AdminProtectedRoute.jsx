import React from "react";
import {Navigate} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

// Only allow admins to view these routes
const AdminProtectedRoute = ({ ready, children }) => {
    const isLogged = Meteor.userId() !== null;

    // Return to signin page if user not logged-in
    if (!isLogged) {
        return <Navigate to="/signin" />;
    }

    if (!ready) {
        return <LoadingSpinner />;
    }

    const isAdmin = Roles.userIsInRole(Meteor.userId(), "admin");

    // Navigates to not authorized page if user is not admin
    return isLogged && isAdmin ? children : <Navigate to="/notauthorized" />;
};

export default AdminProtectedRoute