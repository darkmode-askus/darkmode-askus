import React from "react";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReportsPage from "../pages/report/ReportsPage";
import ManageFAQPage from "../pages/faq/ManageFAQPage";
import { useTracker } from "meteor/react-meteor-data";
import { Roles } from "meteor/alanning:roles";
import SignIn from "../pages/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForumPage from "../pages/forum/ForumPage";
import BasicPage from "../components/BasicPage";
import AdminProtectedRoute from "../components/AdminProtectedRoute";
import SignUp from '../pages/SignUp';

export const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/forum" element={<ForumPage />} />
          <Route path="/notauthorized" element={<BasicPage text={"You Are Not Authorized"} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/admin/report"
            element={
              <AdminProtectedRoute ready={ready}>
                <ReportsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/faq"
            element={
              <AdminProtectedRoute ready={ready}>
                <ManageFAQPage />
              </AdminProtectedRoute>
            }
          />
          <Route path="*" element={<BasicPage text={"Error 404: Page Not Found"} />} />
        </Routes>
        <ToastContainer
          position="bottom-left"
          autoClose={1700}
          closeButton={false}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          draggable={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          rtl={false}
          theme="colored"
        />
        <Footer />
      </div>
    </Router>
  );
};
