import React from "react";

const Crew = () => {
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
      </div>
    </>
  );
};

export default Crew;
