// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

// const locationData = [
//   { state: "Uttar Pradesh", city: "Lucknow" },
//   { state: "Uttar Pradesh", city: "Kanpur" },
//   { state: "Uttar Pradesh", city: "Agra" },
//   { state: "Uttar Pradesh", city: "Varanasi" },
//   { state: "Uttar Pradesh", city: "Allahabad" },
//   { state: "Maharashtra", city: "Mumbai" },
//   { state: "Maharashtra", city: "Pune" },
//   { state: "Maharashtra", city: "Nagpur" },
//   { state: "Maharashtra", city: "Nashik" },
//   { state: "Maharashtra", city: "Aurangabad" },
//   { state: "Bihar", city: "Patna" },
//   { state: "Bihar", city: "Gaya" },
//   { state: "Bihar", city: "Muzaffarpur" },
//   { state: "Bihar", city: "Bhagalpur" },
//   { state: "Bihar", city: "Darbhanga" },
//   { state: "West Bengal", city: "Kolkata" },
//   { state: "West Bengal", city: "Howrah" },
//   { state: "West Bengal", city: "Durgapur" },
//   { state: "West Bengal", city: "Asansol" },
//   { state: "West Bengal", city: "Siliguri" },
//   { state: "Andhra Pradesh", city: "Hyderabad" },
//   { state: "Andhra Pradesh", city: "Visakhapatnam" },
//   { state: "Andhra Pradesh", city: "Vijayawada" },
//   { state: "Andhra Pradesh", city: "Guntur" },
//   { state: "Andhra Pradesh", city: "Nellore" },
//   { state: "Tamil Nadu", city: "Chennai" },
//   { state: "Tamil Nadu", city: "Coimbatore" },
//   { state: "Tamil Nadu", city: "Madurai" },
//   { state: "Tamil Nadu", city: "Tiruchirappalli" },
//   { state: "Tamil Nadu", city: "Salem" },
//   { state: "Rajasthan", city: "Jaipur" },
//   { state: "Rajasthan", city: "Jodhpur" },
//   { state: "Rajasthan", city: "Kota" },
//   { state: "Rajasthan", city: "Bikaner" },
//   { state: "Rajasthan", city: "Ajmer" },
//   { state: "Kerala", city: "Thiruvananthapuram" },
//   { state: "Kerala", city: "Kochi" },
//   { state: "Kerala", city: "Kozhikode" },
//   { state: "Kerala", city: "Thrissur" },
//   { state: "Kerala", city: "Kollam" },
//   { state: "Gujarat", city: "Ahmedabad" },
//   { state: "Gujarat", city: "Surat" },
//   { state: "Gujarat", city: "Vadodara" },
//   { state: "Gujarat", city: "Rajkot" },
//   { state: "Gujarat", city: "Gandhinagar" },
// ];
// const courses = [
//   "Computer Engineering",
//   "Electrical Engineering",
//   "Mechanical Engineering",
//   "Civil Engineering",
//   "Chemical Engineering",
//   "Aerospace Engineering",
//   "Biomedical Engineering",
//   "Environmental Engineering",
//   "Materials Engineering",
//   "Industrial Engineering",
// ];
// const DataInsert = async (props) => {
//   try {
//     let i = 0;
//     setInterval(async () => {
//       // let data = {
//       //   data: {
//       //     state: locationData[i].state,
//       //     city: locationData[i].city,
//       //   },
//       // };
//       if (i > courses.length) {
//         clearInterval();
//       }
//       let data = {
//         data: {
//           name: courses[i],
//         },
//       };
//       // const response = await axios.post(
//       //   "http://127.0.0.1:1337/api/courses",
//       //   data
//       // );
//       // console.log("Data posted successfully:", response.data);
//       // i++;
//     }, 1500);
//   } catch (error) {
//     console.error("Error posting data:", error);
//   }
//   return <h1>Data insert</h1>;
// };
// export default DataInsert;
