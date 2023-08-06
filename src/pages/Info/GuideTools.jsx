import "./GuideTools.scss";

function GuideTools() {
  return (
    <>
      <div className="flex flex-col space-y-8 w-full p-6 text-sm overflow-y-auto">
        <h1 className="text-lg capitalize font-bold text-center font-montserrat">
          Prosedur penggunaan alat media <br /> GBI Mega Bekasi
        </h1>

        <div className="flex flex-col space-y-6">
          {/* langkah menghidupkan peralatan */}
          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold capitalize text-base flex space-x-2">
              <span>I.</span> <span>langkah menghidupkan peralatan</span>
            </h2>

            <div className="flex flex-col space-y-1.5 pl-4 text-justify">
              <div className="area-list">
                <p>1.</p>
                <p>
                  Cek saklar pada panel yang ada di sisi kiri ruang pelayanan
                  media apakah sudah naik semua atau belum.
                </p>
              </div>

              <div className="area-list">
                <p>2.</p>
                <p>
                  Nyalakan UPS 1{" "}
                  <span className="italic">(Uninterruptible Power Supply)</span>{" "}
                  yang letaknya di belakang PC 2{" "}
                  <span className="italic">(Personal Computer)</span> dan UPS 2
                  yang letaknya di antara PC 2 dan mixer audio.
                </p>
              </div>

              <div className="area-list">
                <p>3.</p>
                <p>
                  Nyalakan Mixer Lighting dan PC 2. Jika Login Screen tidak
                  tampil pada monitor PC 2{" "}
                  <span className="italic">(biasanya tampil di LED)</span>,
                  silahkan restart terlebih dahulu.
                </p>
              </div>

              <div className="area-list">
                <p>4.</p>
                <p>
                  Nyalakan secara berurutan seperti di bawah ini: <br />
                  <span className="font-semibold italic text-media-primary-blue">
                    Switcher Processor → Video Processor (LED Mixer) → Switcher
                    Controller → PC 1 → PC Timer
                  </span>
                </p>
              </div>

              <div className="area-list">
                <p>5.</p>
                <p>
                  Nyalakan semua TV baik yang menghadap jemaat maupun menghadap
                  panggung.
                </p>
              </div>
            </div>
          </div>

          {/* langkah mematikan peralatan */}
          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold capitalize text-base flex space-x-2">
              <span>II.</span> <span>langkah mematikan peralatan</span>
            </h2>

            <div className="flex flex-col space-y-1.5 pl-5 text-justify">
              <div className="area-list">
                <p>1.</p>
                <div>
                  Matikan peralatan media seperti berikut:
                  <br />
                  <div className="area-list items-center">
                    <p>-</p>
                    <p>Semua PC / Komputer</p>
                  </div>
                  <div className="area-list items-center">
                    <p>-</p>
                    <p>Mixer LED</p>
                  </div>
                  <div className="area-list">
                    <p>-</p>
                    <p>Switcher Controller & Switcher Processor</p>
                  </div>
                  <div className="area-list items-center">
                    <p>-</p>
                    <p>Mixer Lighting</p>
                  </div>
                </div>
              </div>

              <div className="area-list">
                <p>2.</p>
                <p>Matikan UPS 1 dan UPS 2.</p>
              </div>

              <div className="area-list">
                <p>3.</p>
                <p>Tutup semua alat dengan kain hitam panjang.</p>
              </div>

              <div className="area-list">
                <p>4.</p>
                <p>
                  Matikan semua saklar pada panel yang ada di sisi kiri ruangan
                  media{" "}
                  <span className="italic">
                    (kecuali yang ada tanda lakban hitam)
                  </span>
                  . Jika kurang paham mematikan panel silahkan koordinasi dengan
                  bang Anes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GuideTools;
