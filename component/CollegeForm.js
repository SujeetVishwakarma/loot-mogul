import { useState, useEffect } from "react";
import styles from "./../styles/CollegeForm.module.css"; // Import the CSS module
import Layout from "./Layout";

const CollegeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    year_founded: "",
    state_id: "",
    city_id: "",
    rating: "",
    courses: [],
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]); // Add cities state
  const [courses, setCourses] = useState([]);
  const [formErrors, setFormErrors] = useState({}); // Add formErrors state
  const [coursesError, setCoursesError] = useState("");

  useEffect(() => {
    const getStates = async () => {
      const statesData = await fetch(`/api/state`);
      let response = await statesData.json();
      if (response.status) {
        setStates(response?.response);
      }
    };

    const getCourses = async () => {
      const courseData = await fetch(`/api/course`);
      let response = await courseData.json();
      if (response.status) {
        setCourses(response?.response);
      }
    };

    getStates();
    getCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(name, value);
    if (name == "state_id") {
      getCities(value);
    }
  };

  const getCities = async (stateId) => {
    const citiesData = await fetch(
      `/api/city?getCityByStateId=true&stateId=${stateId}`
    );
    let response = await citiesData.json();
    console.log(response);
    if (response.status) {
      setCities(response?.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add code to handle form submission here
    console.log(formData);
    if (validateForm()) {
      console.log("Form submitted:", formData);
      const response = await fetch("/api/college", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let finalResp = await response.json();
      if (finalResp.status) {
        console.log("Data posted successfully:", finalResp.response);
        alert("College created successfully");
        setFormData({
          name: "",
          year_founded: "",
          state_id: "",
          city_id: "",
          rating: "",
          courses: [],
        });
      } else {
        console.error("Error posting data:", finalResp);
      }
    } else {
      alert("Please fill in all required fields"); // You can replace this with a popup or any other UI element
    }
  };

  // components/CompanyForm.js
  const handleCourseChange = (e) => {
    const courseId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    setFormData((prevState) => {
      if (isChecked) {
        return { ...prevState, courses: [...prevState.courses, courseId] };
      } else {
        return {
          ...prevState,
          courses: prevState.courses.filter((id) => id !== courseId),
        };
      }
    });

    // Trigger courses validation
  };

  // components/CompanyForm.js
  const validateForm = () => {
    const errors = {};
    validateCourses();

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.year_founded.trim()) {
      errors.year_founded = "Year Founded is required";
    }

    if (!formData.state_id) {
      errors.state_id = "State is required";
    }

    if (!formData.city_id) {
      errors.city_id = "City is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const validateCourses = () => {
    console.log(formData.courses);
    if (formData.courses.length === 0) {
      setCoursesError("At least one course must be selected");
      return false;
    } else {
      setCoursesError("");
      return true;
    }
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
          <label className={styles.label} htmlFor="year_founded">
            Year Founded*
          </label>
          <input
            type="Number"
            id="year_founded"
            name="year_founded"
            className={styles.inputField}
            value={formData.year_founded}
            onChange={handleChange}
          />
          {formErrors.year_founded && (
            <div className={styles.error}>{formErrors.year_founded}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="state_id">
            State*
          </label>
          <select
            id="state_id"
            name="state_id"
            className={styles.selectField}
            value={formData.state_id}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
          {formErrors.state_id && (
            <div className={styles.error}>{formErrors.state_id}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="city_id">
            City*
          </label>
          <select
            id="city_id"
            name="city_id"
            className={styles.selectField}
            value={formData.city_id}
            onChange={handleChange}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {formErrors.city_id && (
            <div className={styles.error}>{formErrors.city_id}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Courses*</label>
          <div>
            {courses.map((course) => (
              <label key={course.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="courses"
                  value={course.id}
                  checked={formData.courses.includes(course.id)}
                  onChange={handleCourseChange}
                />
                {course.name}
              </label>
            ))}
          </div>
          {coursesError && <div className={styles.error}>{coursesError}</div>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="rating">
            Rating(Optional)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            className={styles.inputField}
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default CollegeForm;
