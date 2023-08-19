import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth"));
    if (!user) {
      navigate("*");
      return;
    }
    const id = user.id;

    const getDetails = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        // console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        setFetchedData([data]);
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      }
    };
    getDetails();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className={styles.div}>
      <div className={styles.header}>
        <div>Full stack 4.2</div>

        <button className={styles.btn} onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div className={styles.result}>
        {error && <div>{error}</div>}

        {fetchedData &&
          fetchedData.map((val, i) => {
            return (
              <div key={i}>
                <div>Fetched Details-</div>
                <div>First Name: {val.firstName}</div>
                <div>Last Name: {val.lastName}</div>
                <div>Username: {val.username}</div>
                <div>Date of Birth: {val.birthDate}</div>
                <div>Age: {val.age}</div>
                <div>Gender: {val.gender}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
