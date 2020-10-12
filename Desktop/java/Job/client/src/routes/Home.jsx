import React from "react";
import logo from "../images/logo.jpg";
import steps from "../images/steps.png";
import comment from "../images/comment.png";
import "../App.css";
import { Redirect, useHistory, useParams } from "react-router-dom";

const Home = () => {
  const id = sessionStorage.getItem("id");
  const CID = sessionStorage.getItem("CompanyId");
  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/Register");
  };
  return (
    <div>
      <div
        className="navbar navbar-expand-md sticky-top "
        style={{ background: "white" }}
      >
        <div className="container-fluid">
          <div className="navbar-brand">
            <a href="/">
              <img
                src={logo}
                alt=""
                style={{ width: "200px", height: "auto" }}
              />
            </a>
          </div>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item  mr-5">
                <a
                  className="nav-link"
                  href="/"
                  style={{ color: "black", fontSize: "20px" }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item mr-5">
                <a
                  className="nav-link"
                  href={`/JobHunting/${id}`}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  Job hunting
                </a>
              </li>
              <li className="nav-item mr-5">
                <a
                  className="nav-link"
                  href={id === undefined ? `/Login` : `/Account/${id}`}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  Account
                </a>
              </li>
              <li className="nav-item mr-5">
                <a
                  className="nav-link"
                  href={CID === undefined ? `/Login` : `/Company/${CID}`}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  For Companies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <img src={steps} alt="" className="" style={{ width: "100%" }} />
      </div>
      <div className="d-flex justify-content-center">
        <i className="fas fa-long-arrow-alt-down fa-3x" id="arrow"></i>
      </div>
      <div>
        <img src={comment} alt="" className="" style={{ width: "100%" }} />
      </div>
      <div className="container text-center">
        <button
          className="btn ml-5 mt-3 expand-sm text-center btn-sm"
          style={{
            background: "#B07F33",
            fontFamily: "Tahoma",
            color: "white",
            height: "60px",
            width: "120px",
            fontSize: "20px",
          }}
          onClick={(e) => handleSubmit(e)}
        >
          Apply now!
        </button>
      </div>
      <div
        className="container text-center mb-5 mt-2"
        style={{
          position: "relative",
          left: "30px",
        }}
      >
        <a
          className=" text-center "
          style={{ textDecoration: "none", color: "black" }}
          href="/Login"
        >
          Already have an account? Log in
        </a>
      </div>
    </div>
  );
};

export default Home;
