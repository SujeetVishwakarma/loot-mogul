import db from "../../database/db.js"; // Adjust the path accordingly

async function getAllCity(req, res) {
  try {
    var query = `select * from public.city`;
    const citys = await db.query(query);
    res.status(200).send({
      status: true,
      response: citys,
    });
  } catch (error) {
    console.error("Error fetching all city:", error);
    res.status(500).send({ status: false, error: "Internal Server Error" });
  }
}

async function getAllCityName(req, res) {
  try {
    var name = req.query.name;
    var query = `
    select * from public.city where name ilike '%${name}%';
    `;
    var data = await db.query(query);
    res.status(200).send({ status: true, response: data });
  } catch (err) {
    res.status(500).send({
      status: false,
      error: err.message,
    });
  }
}

async function getCollegeListByCity(req, res) {
  try {
    var id = req.query.id;
    let query = `
    SELECT 
    cl.id,
    cl.name,
    cl.rating,
    cl.year_founded,
    st.name as state_name, 
    ct.name as city_name,
    string_agg(DISTINCT course.id || ':' || course.name, ', ') as courses
    FROM 
        public.college cl
    INNER JOIN 
        public.city ct ON ct.id = cl.city_id 
    INNER JOIN 
        public.state st ON st.id = cl.state_id 
    LEFT JOIN 
        public.collegeCourses cc ON cc.college_id = cl.id
    LEFT JOIN 
        public.course course ON course.id = cc.course_id
    WHERE 
        cl.city_id = ${id}
    GROUP BY 
        cl.id, cl.name, cl.rating,cl.year_founded, st.name, ct.name

    `;
    let data = await db.query(query);
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

async function getCityById(req, res) {
  const cityId = req.query.id;
  if (collegeId) {
    try {
      var query = `select * from public.city where id = ${cityId}`;
      const citys = await db.query(query);
      res.status(200).send({
        status: true,
        response: citys,
      });
    } catch (error) {
      console.error("Error fetching all citys:", error);
      res.status(500).send({ status: false, error: "Internal Server Error" });
    }
  }
}

async function createCity(req, res) {
  try {
    const { name, state_id } = req.body;
    var query = `
    Insert into public.city 
    (name, state_id) 
    values (
      $1, $2
    ) returning *;
    `;
    const states = await db.query(query, [name, state_id]);
    res.status(200).send({
      status: true,
      response: states,
    });
  } catch (error) {
    console.error("Error fetching all states:", error);
    res.status(500).send({ status: false, error: error.message });
  }
}

async function getCityByStateId(req, res) {
  const stateId = req.query.stateId;
  if (stateId) {
    try {
      var query = `select * from public.city where state_id = ${stateId}`;
      const citys = await db.query(query);
      res.status(200).send({
        status: true,
        response: citys,
      });
    } catch (error) {
      console.error("Error fetching all citys:", error);
      res.status(500).send({ status: false, error: "Internal Server Error" });
    }
  }
}

const city = async (req, res) => {
  if (req.method === "GET") {
    if (req.query.id && req.query.getCollegeListByCity) {
      getCollegeListByCity(req, res);
    } else if (req.query.getCityByStateId && req.query.stateId) {
      getCityByStateId(req, res);
    } else if (req.query.name) {
      getAllCityName(req, res);
    } else if (!req.query.id) {
      getAllCity(req, res);
    } else {
      getCityById(req, res);
    }
  } else if (req.method === "POST") {
    createCity(req, res);
  } else if (req.method === "PUT") {
    // updateCollegeById(req, res);
  } else if (req.method === "DELETE") {
    // deleteCollegeById(req, res);
  }
};
export default city;
