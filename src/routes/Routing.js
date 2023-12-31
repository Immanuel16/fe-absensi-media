import React from "react";
import { Navigate, Route, Routes } from "react-router";
import MobileLayout from "../components/MobileLayout/MobileLayout";
import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import PublicLayout from "../components/PublicLayout/PublicLayout";
import { UserProvider } from "../context/Auth";
import HeaderProvider from "../context/Header";
import { RegisterProvider } from "../context/RegisterContext";
import SpinnerProvider from "../context/Spinner";
import Absensi from "../pages/Absensi/Absensi";
import AddAbsence from "../pages/Absensi/AddAbsence/AddAbsence";
import Account from "../pages/Account/Account";
import Admin from "../pages/Admin/Admin";
import Cash from "../pages/Cash/Cash";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import FormRecruitment from "../pages/Recruitment/FormRecruitment/FormRecruitment";
import Register from "../pages/Register/Register";
import { HistoryMinistry } from "../pages/Account/HistoryMinistry/HistoryMinistry";
import PrivacyInfoAccount from "../pages/Account/PrivacyInfoAccount/PrivacyInfoAccount";
import TotalPk from "../pages/Account/TotalPk/TotalPk";
import BankAccount from "../pages/Account/BankAccount/BankAccount";
import GuideTools from "../pages/Info/GuideTools";
import HistoryCash from "../pages/Cash/History/History";
import FormShooting from "../pages/Shooting/FormShooting/FormShooting";
import Shooting from "../pages/Shooting/Shooting";
import FormRetreat from "../pages/Retreat/Retreat";

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

          {/* account routes */}
          <Route path="account" element={<Account />} />
          <Route
            path="account/history-ministry"
            element={<HistoryMinistry />}
          />
          <Route path="account/privacy-info" element={<PrivacyInfoAccount />} />
          <Route path="account/total-pk" element={<TotalPk />} />
          <Route path="account/bank" element={<BankAccount />} />

          {/* absence routes */}
          <Route path="absen" element={<Absensi />} />
          <Route path="absen/create" element={<AddAbsence />} />
          <Route path="absen/:id/edit" element={<AddAbsence />} />

          {/* admin routes */}
          <Route path="admin" element={<Admin />} />

          {/* cash routes */}
          <Route path="cash" element={<Cash />} />
          <Route path="cash/history" element={<HistoryCash />} />
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
          <Route path="/form-shooting" element={<FormShooting />} />
          <Route path="/form-retreat" element={<FormRetreat />} />
          <Route path="/how-to-use-media-tools" element={<GuideTools />} />
        </Route>
      </Route>

      <Route path="/list-shooting" element={<Shooting />} />

      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Routing;
