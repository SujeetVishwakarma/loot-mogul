import React, { useState, useEffect, memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "./../../component/Layout";

const CollegDetails = (props) => {
  const [collegeDetails, setCollegeData] = useState([]);
  const [similarCollege, setSimilarCollege] = useState([]);

  const router = useRouter();
  const { collegeId } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/college?id=${collegeId}`);
        const newData = await response.json();
        if (newData.status) {
          setCollegeData(newData.response?.college_details);
          setSimilarCollege(newData.response?.similarColleges);
        } else {
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    return () => setCollegeData([]);
  }, [collegeId]);

  return (
    <Layout>
      <div className="">
        <div className="">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">College Details</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">YearFounded</th>
                    <th className="border p-2">State</th>
                    <th className="border p-2">City</th>
                    <th className="border p-2">Rating</th>
                    <th className="border p-2">Courses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={collegeDetails.id}>
                    <td className="border p-2">{collegeDetails.name}</td>
                    <td className="border p-2">
                      {collegeDetails.year_founded}
                    </td>
                    <td className="border p-2">{collegeDetails.state_name}</td>
                    <td className="border p-2">{collegeDetails.city_name}</td>
                    <td className="border p-2">{collegeDetails.rating}</td>
                    <td className="border p-2">
                      {collegeDetails.courses?.join(" | ")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Students Details</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th>SR.</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Batch</th>
                    <th className="border p-2">Courses</th>
                    <th className="border p-2">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {collegeDetails?.students?.map((item, index) => (
                    <tr key={Math.random()}>
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{item.name}</td>
                      <td className="border p-2">{item.year_batch}</td>
                      <td className="border p-2">{item.course}</td>
                      <td className="border p-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">
                          <Link href={`/student/${item.id}`}>Details</Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Similar Colleges</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th>SR.</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Courses</th>
                    <th className="border p-2">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {similarCollege?.map((item, index) => (
                    <tr key={Math.random()}>
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">
                        {item?.similar_college_name}
                      </td>
                      <td className="border p-2">
                        {item?.course?.join(" | ")}
                      </td>
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
        </div>
      </div>
    </Layout>
  );
};

export default memo(CollegDetails);
