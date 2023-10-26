// import initOptions from "pg-promise/init";
import pgPromise from "pg-promise";

// const init = initOptions({});
const pgp = pgPromise({});

const config = {
  host: "34.93.233.222", // Your PostgreSQL server host
  port: 5432, // Default PostgreSQL port
  database: "test-college",
  user: "postgres",
  password: "root",
};

const db = pgp(config);

db.connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

export default db;
