import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SiSpinrilla } from "react-icons/si";
import { getAllUsers } from "../utils";

type Props = {
  activeUser: string;
  setActiveUser: Dispatch<SetStateAction<string>>;
};

const Users = ({ setActiveUser, activeUser }: Props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((us) => {
      if (!us) return;
      setUsers(us);
      setActiveUser(us[0]);
    });
  }, []);

  return (
    <>
      {users.length !== 0 ? (
        <div className="flex-shrink">
          {users.map((u: any) => (
            <div
              key={u}
              className={`border-1 p-10 text-center cursor-pointer ${
                activeUser === u ? ` bg-slate-50` : ``
              }`}
              onClick={() => setActiveUser(u)}
            >
              {u}
            </div>
          ))}
        </div>
      ) : (
        <div className="justify-center w-1/4 mx-auto text-center">
          <SiSpinrilla
            speed={5}
            className="mx-auto mt-10 text-5xl text-center fa-spin"
          />
        </div>
      )}
    </>
  );
};

export default Users;
