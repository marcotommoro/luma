import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAllUserData } from "../utils";
type Props = {};

const Mobiledata: NextPage<Props> = ({}) => {
  const [userData, setUserData] = useState([]);
  const [timeslice, setTimeslice] = useState("week");
  const timesliceOptions = ["day", "week", "month"];

  const router = useRouter();

  useEffect(() => {
    const { uid } = router.query;
    if (!uid) return;

    getAllUserData(uid, timeslice).then((data) => setUserData(data));
  }, [router.query, timeslice]);

  const getXTicks = () => {
    try {
      return [userData[0].timestamp, userData.slice(-1).timestamp];
    } catch (error) {
      return [];
    }
  };

  const handleChangeTimeslice = (v: { value: string }) => {
    setTimeslice(v.value);
  };

  return (
    <div className="flex px-10 mt-5">
      <div className="">
        <Dropdown
          className="mb-32 text-3xl font-bold text-center mx-52"
          options={timesliceOptions}
          value={timesliceOptions[1]}
          onChange={handleChangeTimeslice}
        />
        <h1 className="mb-10 text-5xl font-bold text-center uppercase">
          Heart
        </h1>
        <LineChart
          className=""
          width={1000}
          height={600}
          data={userData.map((ud: any) => ({
            timestamp: ud.timestamp,
            heart: ud["heart"],
          }))}
          margin={{ top: 30, right: 20, left: 10, bottom: 10 }}
        >
          <XAxis
            className="text-3xl"
            dataKey={"timestamp"}
            ticks={getXTicks()}
            tickSize={10}
            tick={{ stroke: "red", strokeWidth: 2 }}
          />

          <YAxis
            domain={["auto", "auto"]}
            tickSize={20}
            tick={{ fontSize: 25 }}
          />
          <Tooltip labelStyle={{ fontSize: 30 }} />
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />

          <Line
            type="monotone"
            dataKey={"heart"}
            stroke="#387908"
            yAxisId={0}
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
        </LineChart>

        <h1 className="mt-10 text-5xl font-bold text-center uppercase">
          oxygen (sp02)
        </h1>

        <LineChart
          className=""
          width={1000}
          height={600}
          data={userData.map((ud: any) => ({
            timestamp: ud.timestamp,
            sp02: ud["sp02"],
          }))}
          margin={{ top: 30, right: 20, left: 10, bottom: 10 }}
        >
          <XAxis
            className="text-5xl"
            dataKey={"timestamp"}
            ticks={getXTicks()}
          />

          <YAxis domain={["auto", "auto"]} tick={{ fontSize: 30 }} />
          <Tooltip labelStyle={{ fontSize: 25 }} />
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
          {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={1} /> */}
          <Line
            type="monotone"
            dataKey={"sp02"}
            stroke="#387908"
            yAxisId={0}
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default Mobiledata;
