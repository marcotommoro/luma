import { NativeEventEmitter, NativeModules } from "react-native";
import BLManager from "react-native-ble-manager";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const macAddress = "7C:9E:BD:68:70:42";
const serviceId = "57a806f7-ab55-4932-ada2-5f2c5a94b3f7";

// const handleDiscoverPeripheral = async (peripheral: any) => {
//   console.log("macoaddre", macAddress, serviceId);
//   if (peripheral.name === "LUMA Monitoring System" && !macAddress) {
//     macAddress = peripheral.id;
//     console.log("Found ", macAddress);
//     await BLManager.stopScan();
//     connectBluethoot();
//   }
// };

// bleManagerEmitter.addListener(
//   "BleManagerDiscoverPeripheral",
//   handleDiscoverPeripheral
// );

export const startBluethootModule = async () => {
  return BLManager.start({ showAlert: false });
};
startBluethootModule();

// export const startBluethootScan = () => {
//   BLManager.scan([], 5, false).then(() => {
//     console.log("sto scannando");
//   });
// };

export const connectBluethoot = async () => {
  try {
    await BLManager.connect(macAddress);
    return true;
  } catch (error) {
    return false;
  }
};

export const readBluethootValue = async (): Promise<any> => {
  try {
    return await BLManager.read(macAddress, serviceId, serviceId);
  } catch (error) {
    // await disconnectBluethoot();
    await connectBluethoot();
    throw new Error();
  }
};

export const disconnectBluethoot = () => {
  BLManager.disconnect(macAddress)
    .then()
    .catch((e) => console.log("cannot disconnect", e));
};
