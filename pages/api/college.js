import db from "../../database/db.js"; // Adjust the path accordingly

// Function to retrieve all college data
async function getAllColleges(req, res) {
  try {
    var query = `select * from public.college`;
    const colleges = await db.query(query);
    res.status(200).send({
      status: true,
      response: colleges,
    });
  } catch (error) {
    console.error("Error fetching all colleges:", error);
    res.status(500).send({ status: false, error: "Internal Server Error" });
  }
}

async function getAllCollegeNameAndId(req, res) {
  try {
    var query = `select id, name from public.college`;
    const colleges = await db.query(query);
    res.status(200).send({
      status: true,
      response: colleges,
    });
  } catch (error) {
    console.error("Error fetching all colleges:", error);
    res.status(500).send({ status: false, error: "Internal Server Error" });
  }
}

async function getCollegeGroupByCity(req, res) {
  try {
    var query = `
    select 
      ct.id, ct.name, count(cl.name) as count from public.city ct
      inner join public.college cl On cl.city_id = ct.id
      Group by ct.id, ct.name;
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

async function getCollegeById(req, res) {
  const collegeId = req.query.id;
  if (collegeId) {
    try {
      let query = `
      SELECT 
      json_build_object(
          'name', cl.name,
          'rating', cl.rating,
          'year_founded', cl.year_founded,
          'state_name', st.name,
          'city_name', ct.name,
          'courses', (
                SELECT json_agg(DISTINCT ics.name) FROM public.course ics 
              INNER JOIN 
                public.collegeCourses icc ON icc.course_id = ics.id
              INNER JOIN 
                public.college icl ON icl.id = icc.college_id
                WHERE icl.id = ${collegeId}
            ),
            'students', COALESCE(json_agg(
              json_build_object(
                   'id', stud.id,
                  'name', stud.name,
                  'year_batch', stud.year_batch,
                  'course', course.name
              ) order by stud.year_batch DESC
          ) FILTER (WHERE stud.id IS NOT NULL), '[]')
        ) as college_details
        FROM 
            public.college cl
        left JOIN 
            public.city ct ON ct.id = cl.city_id 
        left JOIN 
            public.state st ON st.id = cl.state_id 
        LEFT JOIN 
            public.collegeCourses cc ON cc.college_id = cl.id
        LEFT JOIN 
            public.course course ON course.id = cc.course_id
        left JOIN 
            public.student stud ON stud.college_courses_id = cc.id
        WHERE 
            cl.id = ${collegeId}
        GROUP BY 
            cl.name, cl.rating, cl.year_founded, st.name, ct.name;
  `;
      let query2 = `WITH target_college AS (
                    SELECT 
                      cl.city_id,
                      cc.course_id
                    FROM 
                      public.college cl
                    JOIN
                      public.collegeCourses cc ON cl.id = cc.college_id
                    WHERE 
                      cl.id = ${collegeId}
                  )
                  SELECT 
                    cl.name AS similar_college_name,
                    array_agg(course.name) course,
                    cl.id
                  FROM 
                    public.college cl
                  JOIN
                    public.collegeCourses cc ON cl.id = cc.college_id
                  left join public.course course ON course.id = cc.course_id  
                  WHERE 
                    cc.course_id IN (SELECT course_id FROM target_college)
                    AND cl.city_id IN (SELECT city_id FROM target_college)
                    AND cl.id != ${collegeId} 
                  GROUP BY 
                    cl.name, cl.id;
  `;
      const colleges = await db.query(query);
      const similarColleges = await db.query(query2);
      if (colleges.length > 0) {
        res.status(200).send({
          status: true,
          // response: colleges[0]?.college_details,
          response: {
            college_details: colleges[0]?.college_details,
            similarColleges: similarColleges,
          },
        });
      } else {
        res.status(200).send({
          status: true,
          response: [],
        });
      }
    } catch (error) {
      console.error("Error fetching all colleges:", error);
      res.status(500).send({ status: false, error: error.message });
    }
  }
}

async function createCollege(req, res) {
  try {
    const { name, year_founded, state_id, city_id, rating, courses } = req.body;
    if (courses.length > 0) {
      var query = `
    Insert into public.college 
    (name, year_founded, state_id, city_id, rating) 
    values (
      $1, $2, $3, $4, $5
    ) returning *;
    `;
      const colleges = await db.query(query, [
        name,
        year_founded,
        state_id,
        city_id,
        rating,
      ]);
      if (colleges.length > 0) {
        let college_id = colleges[0].id;
        let collegeCourseQuery = ``;
        for (let i = 0; i < courses.length; i++) {
          collegeCourseQuery += `
        INSERT into public.collegeCourses 
        (college_id, course_id) 
        values (
          ${college_id},
          ${courses[i]}
        ) returning *;`;
        }
        const collegeCourseInsert = await db.query(collegeCourseQuery);
        if (collegeCourseInsert.length > 0) {
          res.status(200).send({
            status: true,
            response: colleges,
          });
        } else {
          res.status(403).send({
            status: false,
            response: "Something went wrongs in CollegeCourses",
          });
        }
      }
    } else {
      res
        .status(500)
        .send({ status: false, error: "Course in must be there", courses });
    }
  } catch (error) {
    console.error("Error fetching all colleges:", error);
    res.status(500).send({ status: false, error: error.message });
  }
}

const college = async (req, res) => {
  if (req.method === "GET") {
    if (req.query.getCollegeGroupByCity) {
      getCollegeGroupByCity(req, res);
    } else if (req.query.getAllCollegeNameAndId) {
      getAllCollegeNameAndId(req, res);
    } else if (req.query.id) {
      getCollegeById(req, res);
    } else {
      getAllColleges(req, res);
    }
  } else if (req.method === "POST") {
    createCollege(req, res);
  } else if (req.method === "PUT") {
  } else if (req.method === "DELETE") {
  }
};

export default college;
