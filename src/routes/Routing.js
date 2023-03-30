import React from "react";
import { Navigate, Route, Routes } from "react-router";
import MobileLayout from "../components/MobileLayout/MobileLayout";
import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import { PublicLayout } from "../components/PublicLayout/PublicLayout";
import { UserProvider } from "../context/Auth";
import HeaderProvider from "../context/Header";
import { RegisterProvider } from "../context/RegisterContext";
import SpinnerProvider from "../context/Spinner";
import Absensi from "../pages/Absensi/Absensi";
import AddAbsence from "../pages/Absensi/AddAbsence/AddAbsence";
import Account from "../pages/Account/Account";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import FormRecruitment from "../pages/Recruitment/FormRecruitment/FormRecruitment";
import Register from "../pages/Register/Register";

const Routing = () => {
  return (
    <Routes>
      <Route
        element={
          <SpinnerProvider>
            <MobileLayout />
          </SpinnerProvider>
        }
      >
        {/* private routes */}
        <Route
          element={
            <UserProvider>
              <HeaderProvider>
                <PrivateLayout />
              </HeaderProvider>
            </UserProvider>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="absen" element={<Absensi />} />
          <Route path="absen/create" element={<AddAbsence />} />
        </Route>

        {/* public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={
              <RegisterProvider>
                <Register />
              </RegisterProvider>
            }
          />
          <Route path="/form-recruitment" element={<FormRecruitment />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Routing;