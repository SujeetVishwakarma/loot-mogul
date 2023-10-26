import React, { useState } from "react";
import CitywiseChart from "@/component/CitywiseChart";
import CoursewiseChart from "@/component/CoursewiseChart";

export default function Home() {
  return (
    <>
      <CitywiseChart />
      <CoursewiseChart />
    </>
  );
}
