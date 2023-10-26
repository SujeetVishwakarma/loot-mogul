import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Layout from "./../../component/Layout";

const CollegList = (props) => {
  const [collegeData, setCollegeData] = useState([]);

  const router = useRouter();
  const { courseId } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/course?getCollegeDetailsByCourseId=true&course_id=${courseId}`
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
  }, [courseId]);

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
                <th className="border p-2">SR.</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">State</th>
                <th className="border p-2">City</th>
                <th className="border p-2">Rating</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {finalData.map((item, index) => (
                /* <tr key={item.stateId}> */
                <tr key={Math.random()}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.college_name}</td>
                  <td className="border p-2">{item.state_name}</td>
                  <td className="border p-2">{item.city_name}</td>
                  <td className="border p-2">{item.rating}</td>
                  <td className="border p-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      <Link href={`/college/${item.id}`}>Details</Link>
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
