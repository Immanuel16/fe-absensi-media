import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { PropagateLoader } from "react-spinners";
import { useUser } from "../../context/Auth";
import { useHeader } from "../../context/Header";
import { useSpinner } from "../../context/Spinner";
import apiHelper from "../../helper/api";
import { FloatingMenu } from "../FloatingMenu/FloatingMenu";

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

  const getDataUser = async () => {
    try {
      const data = await apiHelper.get("/apps/users/detail");
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
        <header className="bg-media-secondary-blue text-white text-xl font-semibold shadow-md sticky top-0 z-10 w-full py-5 px-6 mb-6">
          {titleHeader}
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
    </div>
  );
};

export default PrivateLayout;
