import React from "react";

export default function PrivacyInfoAccount() {
  // const user =
  return (
    <>
      <div className="flex flex-col space-y-10">
        {/* header */}
        <div
          className="bg-media-primary-blue h-18 shadow-md sticky top-0 z-10 flex justify-center items-center text-white text-xl font-bold"
          style={{
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          Info Pribadi
        </div>

        {/* main */}
        <div className="flex flex-col space-y-8">
          {/* image */}
          {/* <div
            className={`rounded-full ${
              user.photo ? "p-2" : "p-4"
            } bg-white shadow-md w-32 h-32`}
            style={{ marginTop: "-95px" }}
          >
            <img
              src={user.photo || DefaultAva}
              alt=""
              className={`rounded-full ${
                user.photo
                  ? "max-w-full max-h-full border-2 aspect-1  border-media-primary-gray"
                  : ""
              }`}
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
