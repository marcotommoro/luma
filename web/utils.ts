import { faker } from "@faker-js/faker";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import moment, { Moment } from "moment";

const addTime = (d: Moment, n: number, unit: moment.unitOfTime.DurationAs) => {
  return d.add(n, unit);
};

const calculateAvg = (list: QueryDocumentSnapshot<DocumentData>[]) => {
  let sHeart = 0;
  let sOxygen = 0;

  list.forEach((e) => {
    sHeart += e.data().heart;
    sOxygen += e.data().sp02;
  });
  return {
    heart: Math.round(sHeart / list.length),
    sp02: Math.round(sHeart / list.length),
    uid: list[0].data().uid,
    timestamp: `${list[0].data().timestamp.toDate().toLocaleString()} - ${list[
      list.length - 1
    ]
      .data()
      .timestamp.toDate()
      .toLocaleString()}`,
  };
};

export const generateRandomData = (n: number) => {
  const db = getFirestore();

  const users = [
    "ALOuqWRFE5Nm1b5INyv7Tz8Wlyt1",
    // "bBRodH6HpJckKyW5X9oUxvDgdNc2",
  ];

  const cycles = 720;
  let date = moment().subtract(cycles, "hour");

  users.forEach((u) => {
    for (let i = 0; i < cycles; i++) {
      addDoc(collection(db, "data"), {
        uid: u,
        heart: faker.datatype.number({ min: 40, max: 100 }),
        sp02: faker.datatype.number({ min: 70, max: 100 }),
        timestamp: date.toDate(),
      });
      date = addTime(date, 1, "hour");
    }
  });
};

export const getAllUserData = async (
  uid: string,
  timeSlice: string = "day"
) => {
  const end = moment();
  let start = moment();

  switch (timeSlice) {
    case "day":
      start.subtract(1, "day");
      break;
    case "week":
      start.subtract(1, "week");
      break;
    case "month":
      start.subtract(1, "month");
      break;
    default:
      break;
  }

  const q = query(
    collection(getFirestore(), "data"),
    where("uid", "==", uid),
    where("timestamp", ">=", start.toDate()),
    where("timestamp", "<=", end.toDate()),
    orderBy("timestamp")
  );

  const querySnapshot = await getDocs(q);
  const l = querySnapshot.docs.length;
  const docs = querySnapshot.docs;
  const data: any = [];
  let intervals;

  if (l === 0) return [];

  switch (timeSlice) {
    case "day":
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        data.push({ ...d, timestamp: d.timestamp.toDate().toLocaleString() });
      });
      return data;

    case "week":
    case "month":
    default:
      intervals = l / 30;
      for (let i = 0; i < l - 1; i += intervals) {
        console.log(l, i, Math.floor(intervals + i));
        console.log(docs.slice(i, Math.floor(intervals + i)));
        data.push(calculateAvg(docs.slice(i, Math.floor(intervals + i))));
      }
      break;
  }

  return data;
};

export const getAllUsers = async () => {
  const q = query(
    collection(getFirestore(), "users"),
    where("role", "==", "sick"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  const data: any = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.id);
  });

  return data;
};
