import React from "react";
import classes from "./Conditions.module.css";

const Conditions = ({ error, loading }) => {
  return (
    <div className={classes.Wrapper}>
      {error && <div>No results found.</div>}
      {loading && <div className={classes.Loader} />}
    </div>
  );
};

export default Conditions;
