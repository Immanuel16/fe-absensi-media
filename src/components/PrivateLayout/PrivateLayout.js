import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { PropagateLoader } from "react-spinners";
import { useUser } from "../../context/Auth";
import { useHeader } from "../../context/Header";
import { useModals } from "../../context/ModalsContext";
import { useSpinner } from "../../context/Spinner";
import apiHelper from "../../helper/api";
import { FloatingMenu } from "../FloatingMenu/FloatingMenu";
import ModalSuccess from "../ModalSuccess/ModalSuccess";

const override = {
  display: "grid",
  placeItems: "center",
  borderColor: "red",
};

const PrivateLayout = () => {
  const location = useLocation();
  const { setUser } = useUser();
  const { titleHeader } = useHeader();
  const { showSpinner } = useSpinner();
  const { showModal, config } = useModals();

  const getDataUser = async () => {
    try {
      const { data } = await apiHelper.get("/apps/accounts");
      setUser(data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  return (
    <div className="relative">
      {/* header */}
      {location.pathname !== "/" && (
        <header className="bg-media-primary-blue text-white text-xl font-semibold shadow-md sticky top-0 z-10 w-full py-5 mb-6 rounded-br-header">
          <div className="relative">
            <div className="bg-white absolute top-12 w-2/3 h-0.5"></div>
          </div>
          <div className="px-6">{titleHeader}</div>
        </header>
      )}

      {/* main content */}
      <main
        className={`${
          location.pathname === "/" && "h-content"
        } bg-white text-xs overflow-y-auto`}
      >
        <Outlet />
      </main>

      {/* footer menu */}
      <footer>
        <FloatingMenu />
      </footer>

      {showSpinner && (
        <div className="absolute z-50 top-0 left-auto grid place-items-center w-full h-screen opacity-60 bg-media-primary-blue">
          <PropagateLoader
            color="#fff"
            loading={showSpinner}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {showModal && config.type && <ModalSuccess {...config} />}
    </div>
  );
};

export default PrivateLayout;
