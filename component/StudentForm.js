import { useState, useEffect } from "react";
import styles from "./../styles/CollegeForm.module.css"; // Import the CSS module
import Layout from "./Layout";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    year_batch: "",
    college_id: "",
    course_id: "",
  });

  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]); // Add cities state
  const [formErrors, setFormErrors] = useState({}); // Add formErrors state

  useEffect(() => {
    const getColleges = async () => {
      const collegesData = await fetch(
        `/api/college?getAllCollegeNameAndId=true`
      );
      let response = await collegesData.json();
      if (response.status) {
        setColleges(response?.response);
      }
    };

    getColleges();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(name, value);
    if (name == "college_id") {
      getCourses(value);
    }
  };

  const getCourses = async (stateId) => {
    const coursesData = await fetch(
      `/api/collegeCourse?getCoursesByCollegeId=true&id=${stateId}`
    );
    let response = await coursesData.json();
    console.log(response);
    if (response.status) {
      setCourses(response?.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add code to handle form submission here
    if (validateForm()) {
      console.log("Form submitted:", formData);
      let finalObj = {
        name: formData.name,
        year_batch: formData.year_batch,
        college_courses_id: formData.course_id,
      };
      console.log(finalObj);
      const response = await fetch("/api/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalObj),
      });

      let finalResp = await response.json();
      if (finalResp.status) {
        console.log("Data posted successfully:", finalResp.response);
        alert("Student created successfully");
        setFormData({
          name: "",
          year_batch: "",
          college_id: "",
          course_id: "",
        });
      } else {
        console.error("Error posting data:", finalResp);
      }
    } else {
      alert("Please fill in all required fields"); // You can replace this with a popup or any other UI element
    }
  };

  // components/CompanyForm.js
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.year_batch.trim()) {
      errors.year_batch = "Year Batch is required";
    }

    if (!formData.college_id) {
      errors.college_id = "College is required";
    }

    if (!formData.course_id) {
      errors.course_id = "Course is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  return (
    <Layout>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.inputField}
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && (
            <div className={styles.error}>{formErrors.name}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="year_batch">
            Year Batch*
          </label>
          <input
            type="Number"
            id="year_batch"
            name="year_batch"
            className={styles.inputField}
            value={formData.year_batch}
            onChange={handleChange}
          />
          {formErrors.year_batch && (
            <div className={styles.error}>{formErrors.year_batch}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="college_id">
            College*
          </label>
          <select
            id="college_id"
            name="college_id"
            className={styles.selectField}
            value={formData.college_id}
            onChange={handleChange}
          >
            <option value="">Select College</option>
            {colleges.map((college) => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
          {formErrors.college_id && (
            <div className={styles.error}>{formErrors.college_id}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="course_id">
            Course*
          </label>
          <select
            id="course_id"
            name="course_id"
            className={styles.selectField}
            value={formData.course_id}
            onChange={handleChange}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option
                key={course.college_course_id}
                value={course.college_course_id}
              >
                {course.name}
              </option>
            ))}
          </select>
          {formErrors.course_id && (
            <div className={styles.error}>{formErrors.course_id}</div>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default StudentForm;
