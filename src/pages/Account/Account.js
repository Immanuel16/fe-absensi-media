import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../context/Auth";
import { useHeader } from "../../context/Header";

export default function Account() {
  const navigate = useNavigate();
  const { setTitleHeader } = useHeader();
  const { user } = useUser();
  useEffect(() => {
    setTitleHeader("Akun");
    return () => {};
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return <></>;
}
