import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useRouter } from "next/router";
import "./barChart.module.css"; // Import your CSS file
import Layout from "./Layout";

// const locationData = [
//   {
//     stateId: 1,
//     State: "California",
//     City: "Los Angeles",
//     totalCollege: 99,
//   },
//   {
//     stateId: 2,
//     State: "New York",
//     City: "New York",
//     totalCollege: 20,
//   },
//   {
//     stateId: 3,
//     State: "Ontario",
//     City: "Toronto",
//     totalCollege: 45,
//   },
// ];

const CitywiseChart = (props) => {
  const divstateChart = {
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    padding: "10px",
    width: "90%",
    margin: "3% auto",
  };

  const router = useRouter();
  const [clickedValue, setClickedValue] = useState(null);
  const [locationData, setLocationData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/college?getCollegeGroupByCity=1");
        const newData = await response.json();

        if (newData.status) {
          setLocationData(newData.response);
        } else {
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Fetch data when the component mounts
    fetchData();

    return () => setLocationData([]);
  }, []);
  const stateName = locationData.map((item) => item.name);
  const collegeCount = locationData.map((item) => item.count);
  const data = {
    //labels: ["January", "February", "March", "April", "May"],
    labels: [...stateName],
    datasets: [
      {
        label: "Citywise College",
        data: [...collegeCount],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
    ],
  };

  const handlePointClick = (event, elements) => {
    if (elements.length > 0) {
      const element = elements[0];
      const index = element.index;
      const dataValue = data.datasets[0].data[index];
      router.push(`/${locationData[index].id}`);
    }
  };

  return (
    <Layout>
      <div style={divstateChart}>
        <Bar
          data={data}
          options={{
            onClick: handlePointClick,
          }}
        />
        {clickedValue !== null && <p>Clicked on data point: {clickedValue}</p>}
      </div>
    </Layout>
  );
};

export default CitywiseChart;
