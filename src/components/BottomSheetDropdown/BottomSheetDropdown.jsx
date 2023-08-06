import React, { useRef } from "react";

const BottomSheetDropdown = ({ listOption, open, title, getData }) => {
  const closeModal = (option) => {
    getData(option);
  };
  return (
    <>
      {open && (
        <section className="fixed width-bottom-sheet z-50 inset-0 overflow-x-hidden overflow-y-hidden mt-auto bottom-0">
          <div className="flex items-end min-h-full text-center sm:p-0 bg-gray-900 bg-opacity-40">
            <div
              className={`rounded-t-3xl inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w w-full ${
                open ? "animate_1.5s animate_fadeInUp" : "animate__fadeOutDown"
              }`}
            >
              <div className="overflow-y-hidden py-6 px-4">
                <div className="flex flex-col space-y-8">
                  <h1 className="text-sm font-semibold">{title}</h1>
                  <div className="flex flex-col space-y-6">
                    {listOption.map((option) => (
                      <button
                        key={option.value}
                        className="text-left font-normal"
                        onClick={() => closeModal(option)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BottomSheetDropdown;
