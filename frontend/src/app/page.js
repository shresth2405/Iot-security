import Image from "next/image";
import RegisterDevice from "@/components/RegisterDevice";
import DeviceStatus from "@/components/DeviceStatus";
import LoginDevice from "@/components/LoginDevice";
import UnregisterDevice from "@/components/UnregisterDevice";
export default function Home() {
  return (
    <div >
      <h1>BlockChain IOT Security</h1>
      <RegisterDevice/>
      <br />
      <DeviceStatus/>
      <br />
      <LoginDevice/>
      <br />
      <UnregisterDevice/>
    </div>
  );
}
