import React, { useEffect, useState } from "react";
import { useSpinner } from "../../../context/Spinner";
import apiHelper from "../../../helper/api";
const Bank = () => {
  const { setShowSpinner } = useSpinner();
  const [bankList, setBankList] = useState([]);

  const getListCrewBank = async () => {
    setShowSpinner(true);
    apiHelper.get("/apps/users/bank-account").then(({ data }) => {
      setBankList(data);
      setShowSpinner(false);
    });
  };

  useEffect(() => {
    getListCrewBank();
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-4">
        {/* header table */}
        <div className="grid-bank p-3 bg-media-secondary-blue font-semibold text-sm text-center rounded-md">
          <p className="text-left">Nama</p>
          <p>No. Rekening</p>
          <p>Atas Nama</p>
          <p>Bank</p>
        </div>

        {/* list bank account */}
        <div className="flex flex-col space-y-3 h-bank overflow-y-auto">
          {bankList.map((bank) => (
            <div
              className="grid-bank p-3 border-b border-b-media-primary-gray capitalize text-center"
              key={bank.bank_acc_num}
            >
              <p className="text-left">{bank.username}</p>
              <p>{bank.bank_acc_num}</p>
              <p>{bank.bank_acc_name}</p>
              <p>
                {bank.bank_name === "Bank Central Asia (BCA)"
                  ? "BCA"
                  : bank.bank_name.replace("Bank ", "")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bank;
