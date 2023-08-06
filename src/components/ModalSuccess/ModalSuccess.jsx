import React from "react";

const ModalSuccess = ({ image, title, message }) => {
  return (
    <>
      <div className="grid place-items-center h-screen bg-gray-900 bg-opacity-40 z-20 absolute inset-0">
        <div className="flex flex-col space-y-5 rounded-xl bg-white shadow-lg py-4 px-10 animate_1.5s animate_fadeInUp">
          <img src={image} alt="" />
          <div className="flex flex-col space-y-2.5 text-center">
            <p className="text-media-primary-blue text-2xl">{title}</p>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSuccess;
