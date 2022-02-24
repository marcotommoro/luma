import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAllUsers } from "../utils";

type Props = {
  activeUser: string;
  setActiveUser: Dispatch<SetStateAction<string>>;
};

const Users = ({ setActiveUser, activeUser }: Props) => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    getAllUsers().then((us) => {
      if (!us) return;
      setUsers(us);
      setActiveUser(us[0]);
    });
  }, []);

  return (
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
  );
};

export default Users;
