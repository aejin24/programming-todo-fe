import { Axios } from "services/base";

export default function App() {
  async function testF() {
    const test = await Axios.get("localIsd/sdfd");
  }

  testF();

  return <div>{process.env.API_URL}</div>;
}
