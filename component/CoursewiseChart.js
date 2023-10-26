import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useRouter } from "next/router";
import "./barChart.module.css"; // Import your CSS file

const CoursewiseChart = (props) => {
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
        const response = await fetch(
          "/api/course?getCollegeGroupBycourses=true"
        );
        const newData = await response.json();
        console.log(newData);
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
        label: "Coursewise Chart",
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
      router.push(`college-course/${locationData[index].id}`);
    }
  };

  return (
    <div>
      <div style={divstateChart}>
        <Bar
          data={data}
          options={{
            onClick: handlePointClick,
          }}
        />
        {clickedValue !== null && <p>Clicked on data point: {clickedValue}</p>}
      </div>
    </div>
  );
};

export default CoursewiseChart;
