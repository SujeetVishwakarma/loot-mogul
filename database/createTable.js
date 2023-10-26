import db from "./db.js"; // Adjust the path accordingly
module.exports = {
  state: async () => {
    try {
      var query = `
    CREATE TABLE IF NOT EXISTS public.STATE (
      id serial PRIMARY KEY,
      name varchar unique
    )
    `;
      db.query(query, (err, res) => {
        if (err) {
          throw err;
        } else {
          console.log("State Table created");
        }
      });
    } catch (err) {
      console.log("state ", err);
    }
  },
  city: async () => {
    try {
      var query = `
    CREATE TABLE IF NOT EXISTS public.CITY (
      id serial PRIMARY KEY,
      name varchar Unique,
      state_id serial,
      CONSTRAINT fk_state
      FOREIGN KEY(state_id) 
      REFERENCES public.state(id) ON DELETE CASCADE
    )
    `;
      db.query(query, (err, res) => {
        if (err) {
          throw err;
        } else {
          console.log("city Table created");
        }
      });
    } catch (err) {
      console.log("city", err);
    }
  },

  course: async () => {
    try {
      var query = `
        CREATE TABLE IF NOT EXISTS public.course (
            id serial PRIMARY KEY,
            name varchar unique
          )`;
      db.query(query, (err, res) => {
        if (err) {
          throw err;
        } else {
          console.log("course Table created");
        }
      });
    } catch (err) {
      console.log("course", err);
    }
  },

  college: async () => {
    try {
      var query = `
      CREATE TABLE IF NOT EXISTS public.COLLEGE (
        id serial PRIMARY KEY,
        name varchar,
        year_founded varchar,
        state_id serial,
        city_id serial,
        rating int,
        CONSTRAINT fk_state
        FOREIGN KEY(state_id) 
        REFERENCES public.state(id) ON DELETE CASCADE,
        CONSTRAINT fk_city
        FOREIGN KEY(city_id) 
        REFERENCES public.city(id) ON DELETE CASCADE
      )
      `;
      db.query(query, (err, res) => {
        if (err) {
          throw err;
        } else {
          console.log("COLLEGE Table created");
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  collegeCourses: async () => {
    try {
      var query = `
        CREATE TABLE IF NOT EXISTS public.collegeCourses(
        id serial PRIMARY KEY,    
        course_id serial,
        college_id serial,
        CONSTRAINT fk_college
        FOREIGN KEY(college_id) 
        REFERENCES public.college(id) ON DELETE CASCADE,
        CONSTRAINT fk_course
        FOREIGN KEY(course_id) 
        REFERENCES public.course(id) ON DELETE CASCADE
        )
        `;
      db.query(query, (err, res) => {
        if (err) {
          throw err;
        } else {
          console.log("collegeCourses Table created");
        }
      });
    } catch (err) {}
  },
  student: async () => {
    try {
      var query = `
        CREATE TABLE IF NOT EXISTS public.student(
        id serial primary key,
        name varchar,
        year_batch varchar,
        college_courses_id serial,
        CONSTRAINT fk_collegeCourses
        FOREIGN KEY(college_courses_id) 
        REFERENCES public.collegeCourses(id) ON DELETE CASCADE
        )
        `;
      db.query(query, (err, res) => {
        if (err) {
          throw err;
        } else {
          console.log("student Table created");
        }
      });
    } catch (err) {}
  },
};
