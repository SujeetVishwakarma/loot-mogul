import React, { useEffect, memo } from "react";

const Test = (props) => {
  console.log("Mount Test");

  useEffect(() => {
    console.log("Update Test");

    return () => console.log("UNMOUNT");
  }, [props.counter]);

  return (
    <>
      <p>{props.counter}</p>
      <h1>Hello World</h1>
    </>
  );
};

export default memo(Test);
