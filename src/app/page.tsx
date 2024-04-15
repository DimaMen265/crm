import StatusLabel, { Status } from "./components/StatusLabel";

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <div className="flex gap-5">
        <StatusLabel status={Status.Active}>Active</StatusLabel>
        <StatusLabel status={Status.NotActive}>Not active</StatusLabel>
        <StatusLabel status={Status.Pending}>Pending</StatusLabel>
        <StatusLabel status={Status.Suspended}>Suspended</StatusLabel>
      </div>
    </main>
  );
}
