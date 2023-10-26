import db from "../../database/db.js"; // Adjust the path accordingly

async function getAllStudent(req, res) {
  try {
    var query = `select st.name, cl.name as colName, cc.id, cl.id col_id from public.student st
    left join public.collegecourses cc on cc.id = st.college_courses_id
    left join public.college cl on cl.id = cc.college_id
    `;
    const students = await db.query(query);
    res.status(200).send({
      status: true,
      response: students,
    });
  } catch (error) {
    console.error("Error fetching all students:", error);
    res.status(500).send({ status: false, error: error.message });
  }
}

async function getStudentById(req, res) {
  const stuid = req.query.id;
  if (stuid) {
    try {
      var query = `select 
      st.name, 
      st.year_batch,
      cc.id college_course_id, 
      cl.id college_id,
      cl.name as college_name,
      cs.name course_name,
       sta.name state_name,
       ct.name city_name
      from public.student st
        left join public.collegecourses cc on cc.id = st.college_courses_id
        left join public.college cl on cl.id = cc.college_id
        left join public.city ct on ct.id = cl.city_id
        left join public.state sta on sta.id = ct.state_id
        left join public.course cs on cs.id = cc.course_id
       WHERE st.id = ${stuid} 
        `;
      const stuData = await db.query(query);
      if (stuData.length > 0) {
        res.status(200).send({
          status: true,
          response: stuData[0],
        });
      } else {
        res.status(204).send({
          status: true,
          response: {},
        });
      }
    } catch (error) {
      console.error("Error fetching all states:", error);
      res.status(500).send({ status: false, error: error.message });
    }
  }
}

async function createStudent(req, res) {
  try {
    const { name, year_batch, college_courses_id } = req.body;
    var query = `
    Insert into public.student 
    (
        name,
        year_batch,
        college_courses_id
        ) 
    values (
      $1, $2, $3
    ) returning *;
    `;
    const students = await db.query(query, [
      name,
      year_batch,
      college_courses_id,
    ]);
    res.status(200).send({
      status: true,
      response: students,
    });
  } catch (error) {
    console.error("Error fetching all students:", error);
    res.status(500).send({ status: false, error: error.message });
  }
}

const student = async (req, res) => {
  if (req.method === "GET") {
    if (req.query.id) {
      getStudentById(req, res);
    } else if (req.query.name) {
    } else {
      await getAllStudent(req, res);
    }
  } else if (req.method === "POST") {
    createStudent(req, res);
  } else if (req.method === "PUT") {
    // updateCollegeById(req, res);
  } else if (req.method === "DELETE") {
    // deleteCollegeById(req, res);
  }
};
export default student;
