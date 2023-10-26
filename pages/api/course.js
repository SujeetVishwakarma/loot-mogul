import db from "../../database/db.js"; // Adjust the path accordingly

async function getAllCourse(req, res) {
  try {
    var query = `select * from public.Course`;
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

async function getCollegeGroupBycourses(req, res) {
  try {
    var query = `
      select 
        cs.id, cs.name, count(cl.name) as count from public.course cs
        inner join public.collegeCourses clc On clc.course_id = cs.id
        inner join public.college cl ON cl.id = clc.college_id
        Group by cs.id, cs.name;
      `;
    const data = await db.query(query);
    res.status(200).send({
      status: true,
      response: data,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      error: err.message,
    });
  }
}

async function getCourseById(req, res) {
  const courseid = req.query.id;
  if (courseid) {
    try {
      var query = `select * from public.Course where id = ${courseid}`;
      const Courses = await db.query(query);
      res.status(200).send({
        status: true,
        response: Courses,
      });
    } catch (error) {
      console.error("Error fetching all Courses:", error);
      res.status(500).send({ status: false, error: "Internal Server Error" });
    }
  } else {
    res.status(400).send({
      status: false,
      error: "Bad request",
    });
  }
}

async function getCollegeDetailsByCourseId(req, res) {
  try {
    const courseid = req.query.course_id;
    if (courseid) {
      let query = `
      select cl.name as college_name,
      sta.name as state_name,
      ct.name as city_name,
      cl.rating as rating,
      cl.id
      from public.course cs
      inner join public.collegeCourses cc ON
        cc.course_id = cs.id
      inner join public.college cl ON
        cl.id = cc.college_id
      left join public.state sta ON
          sta.id = cl.state_id
      left join public.city ct ON
          ct.id = cl.city_id
      where cs.id = ${courseid}	  
      `;
      let data = await db.query(query);
      if (data.length > 0) {
        res.status(200).send({
          status: true,
          response: data,
        });
      } else {
        res.status(204).send({
          status: false,
          error: "No data found",
        });
      }
    } else {
      res.status(400).send({
        status: false,
        error: "Bad request",
      });
    }
  } catch (err) {}
}

async function createCourse(req, res) {
  try {
    const { name, state_id } = req.body;
    var query = `
    Insert into public.Course 
    (name) 
    values (
      $1
    ) returning *;
    `;
    const states = await db.query(query, [name]);
    res.status(200).send({
      status: true,
      response: states,
    });
  } catch (error) {
    console.error("Error fetching all states:", error);
    res.status(500).send({ status: false, error: "Internal Server Error" });
  }
}

const course = async (req, res) => {
  if (req.method === "GET") {
    if (req.query.getCollegeGroupBycourses) {
      getCollegeGroupBycourses(req, res);
    } else if (req.query.course_id && req.query.getCollegeDetailsByCourseId) {
      getCollegeDetailsByCourseId(req, res);
    } else if (!req.query.id && !req.query.getCollegeGroupBycourses) {
      getAllCourse(req, res);
    } else {
      getCourseById(req, res);
    }
  } else if (req.method === "POST") {
    createCourse(req, res);
  } else if (req.method === "PUT") {
    // updateCollegeById(req, res);
  } else if (req.method === "DELETE") {
    // deleteCollegeById(req, res);
  }
};

export default course;
