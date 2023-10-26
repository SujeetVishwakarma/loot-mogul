import db from "../../database/db.js"; // Adjust the path accordingly

async function getAllCollegeCourses(req, res) {
  try {
    var query = `
    select cc.*, cl.name as college_name, cs.name as course_name 
    from public.CollegeCourses cc
    inner join public.college cl On cl.id = cc.college_id
    inner join public.course cs on cs.id = cc.course_id
    `;
    const courses = await db.query(query);
    res.status(200).send({
      status: true,
      response: courses,
    });
  } catch (error) {
    console.error("Error fetching all Course:", error);
    res.status(500).send({ status: false, error: "Internal Server Error" });
  }
}

async function getCoursesByCollegeId(req, res) {
  const id = req.query.id;
  if (id) {
    try {
      var query = `select cc.id college_course_id, cs.name from public.collegeCourses cc
      INNER JOIN public.course cs ON cs.id = cc.course_id
      where cc.college_id = ${id}`;
      const Courses = await db.query(query);
      res.status(200).send({
        status: true,
        response: Courses,
      });
    } catch (error) {
      console.error("Error fetching all Courses:", error);
      res.status(500).send({ status: false, error: error.message });
    }
  } else {
    res
      .status(500)
      .send({ status: false, error: "college id must be requiered" });
  }
}

async function getCollegeCourseById(req, res) {
  const id = req.query.id;
  if (id) {
    try {
      var query = `select * from public.collegeCourses where id = ${id}`;
      const Courses = await db.query(query);
      res.status(200).send({
        status: true,
        response: Courses,
      });
    } catch (error) {
      console.error("Error fetching all Courses:", error);
      res.status(500).send({ status: false, error: "Internal Server Error" });
    }
  }
}

async function createCollegeCourse(req, res) {
  try {
    const { college_id, course_id } = req.body;
    var query = `
    Insert into public.collegeCourses 
    (college_id, course_id) 
    values (
      $1, $2
    ) returning *;
    `;
    const states = await db.query(query, [college_id, course_id]);
    res.status(200).send({
      status: true,
      response: states,
    });
  } catch (error) {
    console.error("Error fetching all states:", error);
    res.status(500).send({ status: false, error: "Internal Server Error" });
  }
}

const collegeCourse = async (req, res) => {
  if (req.method === "GET") {
    if (req.query.getCoursesByCollegeId && req.query.id) {
      getCoursesByCollegeId(req, res);
    } else if (!req.query.id) {
      getAllCollegeCourses(req, res);
    } else {
      getCollegeCourseById(req, res);
    }
  } else if (req.method === "POST") {
    createCollegeCourse(req, res);
  } else if (req.method === "PUT") {
  } else if (req.method === "DELETE") {
  }
};
export default collegeCourse;
