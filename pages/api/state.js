import db from "../../database/db.js"; // Adjust the path accordingly

async function getAllState(req, res) {
  try {
    var query = `select * from public.state`;
    const states = await db.query(query);
    res.status(200).send({
      status: true,
      response: states,
    });
  } catch (error) {
    console.error("Error fetching all State:", error);
    res.status(500).send({ status: false, error: "Internal Server Error" });
  }
}

async function getStateById(req, res) {
  const stateId = req.query.id;
  if (collegeId) {
    try {
      var query = `select * from public.state where id = ${stateId}`;
      const states = await db.query(query);
      res.status(200).send({
        status: true,
        response: states,
      });
    } catch (error) {
      console.error("Error fetching all states:", error);
      res.status(500).send({ status: false, error: "Internal Server Error" });
    }
  }
}

async function createState(req, res) {
  try {
    const { name } = req.body;
    var query = `
    Insert into public.state 
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

const state = async (req, res) => {
  if (req.method === "GET") {
    if (!req.query.id) {
      getAllState(req, res);
    } else {
      getStateById(req, res);
    }
  } else if (req.method === "POST") {
    createState(req, res);
  } else if (req.method === "PUT") {
    // updateCollegeById(req, res);
  } else if (req.method === "DELETE") {
    // deleteCollegeById(req, res);
  }
};

export default state;
