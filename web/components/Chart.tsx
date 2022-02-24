import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  userData: any;
  title: string;
  typo: string;
  domain: [number, number];
};

export const Chart = ({ userData, title, typo, domain }: Props) => {
  const getXTicks = () => {
    try {
      return [userData[0].timestamp, userData.slice(-1).timestamp];
    } catch (error) {
      return [];
    }
  };
  return (
    <div className="">
      <h1 className="text-xl font-bold text-center uppercase">{title}</h1>
      <LineChart
        className=""
        width={1000}
        height={300}
        data={userData.map((ud: any) => ({
          timestamp: ud.timestamp,
          [typo]: ud[typo],
        }))}
        margin={{ top: 30, right: 20, left: 10, bottom: 10 }}
      >
        <XAxis dataKey={"timestamp"} ticks={getXTicks()} />

        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
        {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={1} /> */}
        <Line
          type="monotone"
          dataKey={typo}
          stroke="#387908"
          yAxisId={0}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default Chart;
