import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Chart from "../components/Chart";
import Users from "../components/Users";
import { generateRandomData, getAllUserData } from "../utils";
type Props = {};

const Data: NextPage<Props> = ({}) => {
  const [userData, setUserData] = useState([]);
  const [activeUser, setActiveUser] = useState("");
  const [timeSlice, setTimeSlice] = useState("day");

  const handleGenerate = () => {
    generateRandomData(2);
    console.log("frocio");
  };

  useEffect(() => {
    getAllUserData(activeUser, timeSlice).then((data) => setUserData(data));
  }, [activeUser, timeSlice]);

  return (
    <div>
      <div className="container mx-auto ">
        <div className="flex flex-row-reverse ">
          <div className="flex border-2">
            <div
              className={`px-4 py-2 cursor-pointer ${
                timeSlice === "day" ? ` bg-slate-100 ` : ``
              }`}
              onClick={() => setTimeSlice("day")}
            >
              Day
            </div>
            <div
              className={`px-4 py-2 cursor-pointer ${
                timeSlice === "week" ? ` bg-slate-100 ` : ``
              }`}
              onClick={() => setTimeSlice("week")}
            >
              Week
            </div>
            <div
              className={`px-4 py-2 cursor-pointer ${
                timeSlice === "month" ? ` bg-slate-100 ` : ``
              }`}
              onClick={() => setTimeSlice("month")}
            >
              Month
            </div>
          </div>
        </div>
        <hr />
        <div className="">
          <div className="flex mt-5">
            <Users activeUser={activeUser} setActiveUser={setActiveUser} />
            <div>
              <Chawrt
                domain={[30, 150]}
                title="heart rate"
                typo="heart"
                userData={userData}
              />
              <Chart
                domain={[60, 100]}
                title="oxygen (sp02)"
                typo="sp02"
                userData={userData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
