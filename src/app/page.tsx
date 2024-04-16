import { headers } from "next/headers";
import StatusLabel, { Status } from "./components/StatusLabel";
import AddCompanyButton from "./components/AddCompanyButton";
import ServerComponent from "./components/ServerComponent";
import ClientComponent from "./components/ClientComponent";
import ServerComponentCopy from "./components/ServerComponentCopy";

export default function Home() {
  console.log(headers());
  return (
    <main>
      <h1>Home Page {new Date().toTimeString()}</h1>
      <div className="flex gap-5">
        <StatusLabel status={Status.Active}>Active</StatusLabel>
        <StatusLabel status={Status.NotActive}>Not active</StatusLabel>
        <StatusLabel status={Status.Pending}>Pending</StatusLabel>
        <StatusLabel status={Status.Suspended}>Suspended</StatusLabel>
      </div>
      <AddCompanyButton />
      <ServerComponent />
      <ClientComponent>
        <ServerComponentCopy />
      </ClientComponent>
    </main>
  );
};
