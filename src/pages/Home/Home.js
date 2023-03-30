import React from "react";
// import {ReactComponent as NotifIcon} from '../../assets/icons/bells.svg';
import { useNavigate } from "react-router";
import { useUser } from "../../context/Auth";

function Home() {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <>
      <div className="flex flex-col overflow-y-auto w-full">
      </div>
    </>
  );
}

export default Home;
