import type { NextPage } from "next";
import dynamic from "next/dynamic";
const CursorArea = dynamic(() => import("../component/CursorArea"), {
  ssr: false,
});

const Home: NextPage = () => {
  return <CursorArea />;
};

export default Home;
