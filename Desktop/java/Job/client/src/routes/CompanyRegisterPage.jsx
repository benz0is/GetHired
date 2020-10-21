import React, { useState } from "react";
import background from "../images/background.png";
import logo from "../images/logo.jpg";
import { useHistory } from "react-router-dom";
import shortId from "shortid";

const CompanyRegisterPage = () => {
  let history = useHistory();
  const handleSubmit = async (e) => {
    if (
      email === undefined ||
      name === undefined ||
      password === undefined ||
      desc === undefined
    ) {
      alert("Please fill out all forms");
      return;
    }
    if (password.length <= 5) {
      alert("Password too short");
      return;
    }
    if (desc.length <= 50) {
      alert("Please write a longer description");
    }
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }
    if (address === undefined) {
      setAddress("no");
    }
    const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddCompany(id:"${shortId.generate()}",companyname:"${name}",description:"${desc},"email:"${email}",password:"${password}",address:"${address}",type:"company"){id}}`,
      }),
    });
    history.push("/Login");
  };
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [desc, setDesc] = useState();
  return (
    <div
      style={{
        width: "100%",
        heigth: "100vh",
        backgroundImage: `url(${background})`,
      }}
    >
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
                  href="/Login"
                  style={{ color: "black", fontSize: "20px" }}
                >
                  Job hunting
                </a>
              </li>
              <li className="nav-item mr-5">
                <a
                  className="nav-link"
                  href={`/Login`}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  Account
                </a>
              </li>
              <li className="nav-item mr-5">
                <a
                  className="nav-link"
                  href={`/Login`}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  For Companies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <form
        className="container justify-content-center col-lg-6 offset-lg-4"
        style={{ height: "89vh" }}
      >
        <div className="ml-4 mt-3">
          <div className="form-group ">
            <label>Company name*</label>
            <input
              type="text"
              className="form-control"
              style={{ width: "400px", fontFamily: "Tahoma" }}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Tell us a bit about yourself:*</label>
            <textarea
              type="text"
              className="form-control text-start"
              style={{ width: "400px", minHeight: "250px", maxHeight: "250px" }}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              className="form-control"
              style={{ width: "400px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password*</label>
            <input
              type="password"
              className="form-control"
              style={{ width: "400px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <small>{` (optional)`}</small>
            <input
              type="text"
              className="form-control"
              style={{ width: "400px" }}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn mb-5"
            style={{ backgroundColor: "#B07F33", color: "white" }}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegisterPage;
