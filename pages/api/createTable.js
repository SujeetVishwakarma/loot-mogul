import db from "../../database/db.js"; // Adjust the path accordingly
import {
  state,
  city,
  course,
  college,
  collegeCourses,
  student,
} from "./../../database/createTable.js";
const createTable = async (req, res) => {
  try {
    state();
    city();
    course();
    college();
    collegeCourses();
    student();

    res.status(200).send({
      status: true,
      success: "Successfully table created",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default createTable;
