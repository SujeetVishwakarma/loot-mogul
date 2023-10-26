import React, { useState, useEffect, memo } from "react";
import { useRouter } from "next/router";
import Layout from "./../../component/Layout";

const CollegDetails = (props) => {
  const [studentDetails, setStudentDetails] = useState({});

  const router = useRouter();
  const { studentId } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/student?id=${studentId}`);
        const newData = await response.json();

        if (newData.status) {
          setStudentDetails(newData.response);
          console.log(studentDetails);
        } else {
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    return () => setStudentDetails({});
  }, [studentId]);

  //   const getCollegeDetail = (id) => {
  //     router.push(`student/${id}`);
  //   };
  return (
    <Layout>
      <div className="grid grid-rows-2 grid-flow-col gap-4">
        <div className="col-span-1 col-span-1">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Students Details</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">College Name</th>
                    <th className="border p-2">Course Name</th>
                    <th className="border p-2">Batch</th>
                    <th className="border p-2">State Name</th>
                    <th className="border p-2">City Name</th>
                    {/* <th className="border p-2">Courses</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr key={Math.random()}>
                    <td className="border p-2">{studentDetails?.name}</td>
                    <td className="border p-2">
                      {studentDetails?.college_name}
                    </td>
                    <td className="border p-2">
                      {studentDetails?.course_name}
                    </td>
                    <td className="border p-2">{studentDetails?.year_batch}</td>
                    <td className="border p-2">{studentDetails?.state_name}</td>
                    <td className="border p-2">{studentDetails?.city_name}</td>
                  </tr>
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
