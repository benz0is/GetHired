import React, { useState ,useEffect} from "react";
import background from "../images/background.png";
import logo from "../images/logo.jpg";
import { useHistory } from "react-router-dom";
import shortId from "shortid";

const Register = () => {
  let history = useHistory();
  const id = shortId.generate();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAdress] = useState();
  const [users,setUsers]= useState()
  let list = []
  const type = "account";
  useEffect(()=>{const fetchData=async()=>{
   const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query{users{id,email,password}}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => setUsers(res));

  }
  fetchData()
})
  const handleSubmit = async (e) => {
    if (
      email === undefined ||
      name === undefined ||
      surname === undefined ||
      password === undefined
    ) {
      alert("Please fill out all forms");
      return;
    }
    if (password.length <= 5) {
      alert("Password too short");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }
    if (address === undefined) {
      setAdress("");
    }
    if(users!== undefined) {users.data.users.map(res=>{list.push(res.email)})}
    
 const registerUser=async()=>{

    if (list.includes(email)) {
      alert("Email is already taken");
      return
    }         
        const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `mutation{AddUser(id:"${id}",name:"${name}",surname:"${surname}",email:"${email}",password:"${password}",address:"${address}" , type:"${type}"){id}}`,
          }),
        });
        history.push(`/Register/${id}`);


        ;

 } 
 registerUser()

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
        <div className="ml-4 mt-3">
          <div className="form-group ">
            <label>Name*</label>
            <input
              type="text"
              className="form-control"
              style={{ width: "400px", fontFamily: "Tahoma" }}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Surname*</label>
            <input
              type="text"
              className="form-control"
              style={{ width: "400px" }}
              onChange={(e) => setSurname(e.target.value)}
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
              onChange={(e) => setAdress(e.target.value)}
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
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
