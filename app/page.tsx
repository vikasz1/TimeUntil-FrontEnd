import Clock from "./components/Clock";
import Card from "./components/Card";
import TimeUntil from "./components/TimeUntil";
import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CountDown Dashboard",
  description: "The official Next.js Course Dashboard, built with App Router.",
  
};

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <TimeUntil />
    </>
  );
}
