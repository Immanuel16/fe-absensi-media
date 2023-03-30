import React, { useEffect } from "react";
import { useRegisterContext } from "../../context/RegisterContext";

export default function Stepper() {
  const { activeStepIndex } = useRegisterContext();
  useEffect(() => {
    const stepperItems = document.querySelectorAll(".stepper-item");
    stepperItems.forEach((step, i) => {
      if (i <= activeStepIndex) {
        step.classList.add(
          "bg-media-primary-blue",
          "text-white",
          "font-semibold"
        );
      } else {
        step.classList.remove(
          "bg-media-primary-blue",
          "text-white",
          "font-semibold"
        );
      }
    });
  }, [activeStepIndex]);
  return (
    <>
      <div className="flex p-4 items-center justify-center text-base">
        <div className="stepper-item flex justify-center items-center w-10 h-10 font-medium border-2 rounded-full">
          1
        </div>
        <div className="flex-auto border-t-2"></div>
        <div className="stepper-item w-10 h-10 flex justify-center items-center font-medium border-2 rounded-full">
          2
        </div>
        <div className="flex-auto border-t-2"></div>
        <div className="stepper-item w-10 h-10 flex justify-center items-center font-medium border-2 rounded-full">
          3
        </div>
      </div>
    </>
  );
}
