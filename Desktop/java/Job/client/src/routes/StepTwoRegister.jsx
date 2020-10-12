import React, { useState } from "react";
import background from "../images/background.png";
import logo from "../images/logo.jpg";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const StepTwoRegister = () => {
  const { id } = useParams();
  const [category, setCategory] = useState();
  const [desc, setDesc] = useState();
  const [wish, setWish] = useState();
  const [exp, setExp] = useState();
  let history = useHistory();
  const handleSubmit = async (e) => {
    if (
      category === undefined ||
      desc === undefined ||
      wish === undefined ||
      exp === undefined
    ) {
      alert("Please fill out all forms");
      return;
    }
    if (desc.length <= 50) {
      alert("Can you please tell us more about yourself? Every detail counts!");
      return;
    }
    if (wish.length <= 10) {
      alert(
        "Can you format your wish a bit better? We dont quite understand it.."
      );
      return;
    }
    if (exp.length <= 10) {
      alert(
        "If you dont have any experience, write what kind of experience you would like to get!"
      );
      return;
    }
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddUser2(id:"${id}",category:"${category}",description:"${desc}",wish:"${wish}",exp:"${exp}"){id}}`,
      }),
    });

    history.push("/Login");
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
        <h1 style={{ fontSize: "25px" }}>
          Tell us a bit about what you are looking for :
        </h1>
        <div className="ml-4 mt-3">
          <div className="form-group ">
            <label>Which category suits your job needs best?*</label>
            <select
              className="form-control"
              style={{ width: "400px" }}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled selected>
                Category
              </option>
              <option value="Administrative">Administrative work</option>
              <option value="Security">Security</option>
              <option value="Design">Design</option>
              <option value="Insurance">Insurance</option>
              <option value="Finance">Finance</option>
              <option value="Cooking">Cooking</option>
              <option value="IT">IT</option>
              <option value="Engineering">Engineering</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Marketing">Marketing</option>
              <option value="Medicine">Medicine</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Construction">Construction</option>
              <option value="Law">Law</option>
              <option value="Transport">Transport</option>
              <option value="Media">Media</option>
              <option value="Export">Export</option>
              <option value="Farming">Farming</option>
            </select>
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
            <label>Who do you want to be in 5 years?*</label>
            <input
              type="text"
              className="form-control"
              style={{ width: "400px" }}
              onChange={(e) => setWish(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Write your experience:*</label>
            <textarea
              type="text"
              className="form-control"
              style={{
                width: "400px",
                height: "150px",
                minHeight: "150px",
                maxHeight: "150px",
              }}
              onChange={(e) => setExp(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn mb-5"
            style={{ backgroundColor: "#B07F33", color: "white" }}
            onClick={(e) => handleSubmit(e)}
          >
            Finish
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepTwoRegister;
