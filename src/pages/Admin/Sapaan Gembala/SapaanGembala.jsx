import { useEffect, useState } from "react";
import { convertDate, listDay } from "../../../util/util";
import apiHelper from "../../../helper/api";
import { useSpinner } from "../../../context/Spinner";
import UpdateSapaanGembala from "./UpdateSapaanGembala";

const SapaanGembala = () => {
  const [pastorGreeting, setPastorGreeting] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const { setShowSpinner } = useSpinner();
  const now = new Date();

  const getPastorGreeting = async () => {
    setShowSpinner(true);
    apiHelper.get("/public/sapaan-gembala").then(({ data }) => {
      setPastorGreeting(data);
      setShowSpinner(false);
    });
  };

  const convertVideoSource = (url) =>
    url?.replace("view?usp=sharing", "preview");

  const onUpdate = () => {
    getPastorGreeting();
    setIsUpdate(false);
  };

  useEffect(() => {
    getPastorGreeting();
  }, []);
  return !isUpdate ? (
    <div className="flex flex-col space-y-6 overflow-y-scroll">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-media-primary-gray">
          {listDay[now.getDay()]}, {convertDate(now, "DD MMMM YYYY")}
        </p>
        {/* <p className="text-sm font-semibold text-media-primary-gray">
          Episode {pastorGreeting.episode}
        </p> */}
        <button
          className="text-media-primary-blue border-b border-media-primary-blue pb-0.5"
          onClick={() => setIsUpdate(true)}
        >
          Ubah
        </button>
      </div>

      {/* video & title */}
      <div className="flex flex-col space-y-2 items-center justify-center">
        {/* video */}
        <div className="container-video">
          <iframe
            src={convertVideoSource(pastorGreeting.video_url)}
            className="responsive-iframe"
          ></iframe>
        </div>

        {/* title */}
        <p className="text-sm font-semibold italic capitalize">
          {pastorGreeting.title}
        </p>
      </div>
      <div className="flex flex-col space-y-2 border-none bg-media-primary-blue p-2 rounded-lg w-fit px-3">
        <div className="flex space-x-1.5">
          <p className="">Episode:</p>
          <p className="font-semibold capitalize">{pastorGreeting.episode}</p>
        </div>
        <div className="flex space-x-1.5">
          <p className="">Last update:</p>
          <p className="font-semibold">
            {convertDate(pastorGreeting.updatedAt, "DD MMMM YYYY")}
          </p>
        </div>
        <div className="flex space-x-1.5">
          <p className="">Author:</p>
          <p className="font-semibold capitalize">
            {pastorGreeting.updated_by}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <UpdateSapaanGembala data={pastorGreeting} onUpdate={onUpdate} />
  );
};

export default SapaanGembala;
