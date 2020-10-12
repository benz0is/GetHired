import React, { useState, useEffect } from "react";
import background from "../images/background.png";
import logo from "../images/logo.jpg";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sign_in, sign_in_company } from "../redux/actions";

const LogInPage = () => {
  let history = useHistory();
  const id = sessionStorage.getItem("id");
  const CID = sessionStorage.getItem("CompanyId");
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [errMsg, setErrMsg] = useState("Please login");
  const [password, setPassword] = useState();
  const [api, setApi] = useState();
  const [companyApi, setCompanyApi] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{users{id,email,password,type}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setApi(res));

      const responseCompany = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{companies{id,email,password,type}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setCompanyApi(res));
    };
    fetchData();
  }, []);
  console.log(api);
  const handleSubmit = (e) => {
    if (email === undefined || password === undefined) {
      alert("Please dont leave any blank spaces!");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }
    api.data.users.map((res) => {
      if (res.email == email && res.password == password) {
        {
          sessionStorage.setItem("loggedAcc", "true");
          sessionStorage.removeItem("loggedCompany");
          sessionStorage.setItem("id", res.id);
          sessionStorage.removeItem("CompanyId");
          dispatch(sign_in());
          history.push(`/Account/${res.id}`);
          return;
        }
      }
    });
    companyApi.data.companies.map((res) => {
      if (res.email == email && res.password == password) {
        {
          sessionStorage.setItem("loggedCompany", "true");
          sessionStorage.removeItem("loggedAcc");
          sessionStorage.setItem("CompanyId", res.id);
          sessionStorage.setItem("company", res.companyname);
          sessionStorage.removeItem("id");
          dispatch(sign_in());
          history.push(`/Company/${res.id}`);
          return;
        }
      }
    });
    setErrMsg("Wrong email or password");
  };
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
                  href={
                    sessionStorage.getItem("loggedAcc") === "true"
                      ? `/JobHunting/${id}`
                      : "/Login"
                  }
                  style={{ color: "black", fontSize: "20px" }}
                >
                  Job hunting
                </a>
              </li>
              <li className="nav-item mr-5">
                <a
                  className="nav-link"
                  href={
                    sessionStorage.getItem("loggedAcc") === "true"
                      ? `/Account/${id}`
                      : "/Login"
                  }
                  style={{ color: "black", fontSize: "20px" }}
                >
                  Account
                </a>
              </li>
              <li className="nav-item mr-5">
                <a
                  className="nav-link"
                  href={
                    sessionStorage.getItem("loggedCompany") === "true"
                      ? `/Company/${CID}`
                      : "/Login"
                  }
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
        <h1 className="form-title ml-4" style={{ fontSize: "25px" }}>
          {errMsg}
        </h1>
        <div className="ml-4 mt-3">
          <div className="form-group ">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              style={{ width: "400px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              style={{ width: "400px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#B07F33", color: "white" }}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Log In
          </button>
          <div className="">
            <small>
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="/Register"
              >
                Dont have an account? Register
              </a>
            </small>
          </div>
          <div>
            <small>
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="/RegisterCompany"
              >
                Applying as a company?
              </a>
            </small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogInPage;
