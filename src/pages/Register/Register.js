import React from "react";
import Logo from "../../assets/img/logo-gbi.jpeg";
import Stepper from "../../components/Stepper/Stepper";
import { useRegisterContext } from "../../context/RegisterContext";
import "./Register.scss";
import AdditionalInfo from "./Sections/AdditionalInfo";
import AddressInfo from "./Sections/AddressInfo";
import PrivacyInfo from "./Sections/PrivacyInfo";

const Register = () => {
  const { activeStepIndex } = useRegisterContext();
  return (
    <>
      <div className="flex flex-col space-y-4 px-6">
        {/* title */}
        <div className="flex flex-col space-y-2.5 justify-center items-center mt-4">
          <img src={Logo} alt="" className="w-16 h-16 rounded-md" />
          <h1 className="text-lg font-bold">Form Crew Multimedia</h1>
        </div>

        {/* area forms */}
        <div className="shadow-card rounded-md bg-white p-4 space-y-3 h-card">
          <Stepper />
          {activeStepIndex === 0 ? (
            <PrivacyInfo />
          ) : activeStepIndex === 1 ? (
            <AddressInfo />
          ) : (
            <AdditionalInfo />
          )}
          {/* <div className="h-form overflow-y-auto overflow-x-hidden">
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Register;
