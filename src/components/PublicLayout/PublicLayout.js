import React from "react";
import { Outlet } from "react-router";
import { RingLoader } from "react-spinners";
import { useModals } from "../../context/ModalsContext";
import { useSpinner } from "../../context/Spinner";
import ModalSuccess from "../ModalSuccess/ModalSuccess";

const override = {
  display: "grid",
  placeItems: "center",
  borderColor: "red",
};

const PublicLayout = () => {
  const { showModal, config } = useModals();
  const { showSpinner } = useSpinner();

  return (
    <div className="grid h-screen font-poppins pb-6 relative">
      <Outlet />
      {/* modals */}
      {showModal && config.type && <ModalSuccess {...config} />}

      {/* spinner */}
      {showSpinner && (
        <div className="absolute z-50 top-0 left-auto grid place-items-center w-full h-screen opacity-60 bg-media-primary-blue bg-opacity-40">
          <RingLoader
            color="#fff"
            loading={showSpinner}
            cssOverride={override}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
};

export default PublicLayout;
