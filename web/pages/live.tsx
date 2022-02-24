import { doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { SiSpinrilla } from "react-icons/si";
import Users from "../components/Users";

type Props = {};

const Live: NextPage<Props> = ({}) => {
  const [activeUser, setActiveUser] = useState("");
  const [userData, setUserData] = useState({ heart: "", sp02: "" });

  useEffect(() => {
    if (!activeUser) return;

    updateDoc(doc(getFirestore(), "users", activeUser), { isLive: true });

    const unsub = onSnapshot(doc(getFirestore(), "live", activeUser), (doc) => {
      try {
        const { heart, sp02 } = doc.data();
        if (!sp02) throw new Error("No data");
        setUserData({ heart: `${heart} bpm `, sp02: `${sp02} %` });
      } catch (error) {
        setUserData({ heart: "", sp02: "" });
      }
    });
    return () => {
      updateDoc(doc(getFirestore(), "users", activeUser), { isLive: false });
      console.log("cancellato in teoria");
    };
  }, [activeUser]);

  return (
    <div className="flex">
      <Users activeUser={activeUser} setActiveUser={setActiveUser} />
      <div className="flex justify-around flex-auto">
        <div className="flex flex-col items-center justify-center mt-5">
          <h1 className="mx-auto mb-10 text-xl font-bold text-center uppercase">
            heart rate
          </h1>
          <div className="relative justify-center bg-red-500 w-36 h-36 circle pulse">
            <p className="absolute text-2xl font-bold text-center text-white uppercase transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {!!userData.heart ? (
                userData.heart
              ) : (
                <SiSpinrilla speed={1} className="fa-spin" />
              )}
            </p>
          </div>
          <h1 className="mx-auto mt-5 text-xl font-bold text-center uppercase"></h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="mx-auto mb-10 text-xl font-bold text-center uppercase">
            oxygen (sp02)
          </h1>
          <div className="relative justify-center bg-blue-400 w-36 h-36 circle pulse">
            <p className="absolute text-2xl font-bold text-white uppercase transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {!!userData.sp02 ? (
                userData.sp02
              ) : (
                <SiSpinrilla speed={1} className="fa-spin" />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
