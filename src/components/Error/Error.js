import React from "react";
import styles from "./Error.module.scss";

const Error = ({ message }) => {
  return <div className={styles.errorMessage}>{message}</div>;
};

export default Error;
