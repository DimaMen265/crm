import { headers } from "next/headers";
import AddCompanyButton from "./components/AddCompanyButton";
import MagicButton from "./components/MagicButton";

export default function Home() {
  console.log(headers());
  return (
    <main>
      <h1>Home Page</h1>
      <AddCompanyButton />
      <MagicButton />
    </main>
  );
};
