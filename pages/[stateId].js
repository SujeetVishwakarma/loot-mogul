import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Layout from "./../component/Layout";

const CollegList = (props) => {
  const [collegeData, setCollegeData] = useState([]);

  const router = useRouter();
  const { stateId } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/city?getCollegeListByCity=1&id=${stateId}`
        );
        const newData = await response.json();

        if (newData.status) {
          setCollegeData(newData.response);
        } else {
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Fetch data when the component mounts
    fetchData();

    return () => setCollegeData([]);
  }, [stateId]);

  const finalData = collegeData;

  const getCollegeDetail = (id) => {
    router.push(`college/${id}`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Colleges</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                {/* <th className="border p-2">YearFounded</th> */}
                <th className="border p-2">State</th>
                <th className="border p-2">City</th>
                <th className="border p-2">Rating</th>
                {/* <th className="border p-2">Courses</th> */}
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {finalData.map((item) => (
                /* <tr key={item.stateId}> */
                <tr key={Math.random()}>
                  <td className="border p-2">{item.name}</td>
                  {/* <td className="border p-2">{item.year_founded}</td> */}
                  <td className="border p-2">{item.state_name}</td>
                  <td className="border p-2">{item.city_name}</td>
                  <td className="border p-2">{item.rating}</td>
                  {/* <td className="border p-2">{item.courses}</td> */}
                  <td className="border p-2">
                    <button
                      onClick={() => getCollegeDetail(item.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CollegList;
