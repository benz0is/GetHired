import React, { useState, useEffect } from "react";
import background from "../images/background.png";
import logo from "../images/logo.jpg";
import { useParams } from "react-router-dom";

const JobHunting = () => {
  const { id } = useParams();
  const [api, setApi] = useState();
  const [search, setSearch] = useState();
  const [city, setCity] = useState();
  const [remote, setRemote] = useState();
  const [apiSearch, setApiSearch] = useState();
  const [applied, setApplied] = useState();
  const [currentAcc, setCurrentAcc] = useState();
  const [refId, setRefId] = useState();
  const [trigger, setTrigger] = useState();
  let list = [];
  console.log(api);
  const CID = sessionStorage.getItem("CompanyId");
  useEffect(() => {
    const fetchData = async () => {
      const jobResponse = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{jobs{id,ref_id,title,city,category,description,req,salary,remote,applied}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setApi(res.data.jobs));
      const setAcc = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{users{id,name,surname,category,description,exp}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) =>
          setCurrentAcc(
            res.data.users.filter((res) => {
              if (res.id === id) {
                return res;
              }
            })
          )
        );
      const appliedList = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{applied(acc_id:"${id}"){posting_id}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setApplied(res));
    };
    fetchData();
  }, [trigger]);
  if (applied !== undefined) {
    applied.data.applied.map((res) => list.push(res.posting_id));
  }
  console.log(list);
  const handleSubmit = (e) => {
    e.preventDefault();
    let searchCity;
    if (city !== undefined) {
      searchCity = city.toLowerCase();
    }
    if (searchCity !== undefined && remote !== undefined) {
      const newArray = api.filter(
        (res) =>
          res.title.toLowerCase().includes(search) &&
          res.city.toLowerCase().includes(searchCity) &&
          res.remote.toLowerCase().includes(remote)
      );

      setApiSearch(newArray);

      return;
    }
    if (searchCity !== undefined && remote === undefined) {
      const newArray = api.filter(
        (res) =>
          res.title.toLowerCase().includes(search) &&
          res.city.toLowerCase().includes(searchCity)
      );
      setApiSearch(newArray);

      return;
    }
    if (searchCity === undefined && remote !== undefined) {
      const newArray = api.filter(
        (res) =>
          res.title.toLowerCase().includes(search) &&
          res.remote.toLowerCase().includes(remote)
      );
      setApiSearch(newArray);

      return;
    }
    const newArray = api.filter((res) =>
      res.title.toLowerCase().includes(search)
    );
    setApiSearch(newArray);
  };

  const applyToJob = async (res) => {
    setTrigger(!trigger);
    const applyJob = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{ApplyJob(posting_id:${res},ref_id:"${refId}",acc_id:"${currentAcc[0].id}",name:"${currentAcc[0].name}",surname:"${currentAcc[0].surname}",category:"${currentAcc[0].category}",description:"${currentAcc[0].description}",exp:"${currentAcc[0].exp}"){id}}`,
      }),
    });
  };
  return (
    <div
      style={{
        width: "100%",
        heigth: "100vh",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        height: "100vh",
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
                  href={`/JobHunting/${id}`}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  Job hunting
                </a>
              </li>
              <li className="nav-item mr-5">
                <a
                  className="nav-link"
                  href={`/Account/${id}`}
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
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <form className="mb-5" style={{ borderBottom: "1px solid black" }}>
          {" "}
          <div className="form-title">
            <h1 className="text-center mb-4">Search for a job!</h1>
          </div>
          <input
            className="justify-content-center"
            type="text"
            placeholder="Search"
            style={{ width: "400px", height: "38px" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn ml-3"
            style={{
              backgroundColor: "#B07F33",
              color: "white",
              position: "relative",
              bottom: "3px",
            }}
            onClick={(e) => handleSubmit(e)}
          >
            <i class="fas fa-search"></i>
          </button>
          <div className="form-button text-center">
            <p className="mt-2 ">Advanced settings:</p>
          </div>
          <select
            className="mr-4 ml-5"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          >
            <option selected disabled>
              City
            </option>
            <option>Vilnius</option>
            <option>Kaunas</option>
            <option>Klaipėda</option>
            <option>Šiauliai</option>
            <option>Panevėžys</option>
            <option>Alytus</option>
          </select>
          <label className="mr-1 font-weight-bold">Remote:</label>
          <label className="mr-1">Yes</label>
          <input
            type="checkbox"
            className="mb-3 mr-2"
            style={{ position: "relative", top: "2px" }}
            onChange={(e) => setRemote("yes") && console.log(remote)}
          />
          <label className="mr-1">No</label>
          <input
            type="checkbox"
            className="mb-3"
            style={{ position: "relative", top: "2px" }}
            onChange={(e) => setRemote("no") && console.log(remote)}
          />
        </form>
      </div>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ maxWidth: "500px" }}
      >
        <div className="row-1">
          {api !== undefined &&
            apiSearch === undefined &&
            api.map((res) => {
              {
                return (
                  <div
                    className="card my-5 ml-3 col"
                    style={{ width: "500px" }}
                    key={res.id}
                    value={res.id}
                    s
                  >
                    <div className="card-title ">
                      <h1 style={{ fontSize: "25px" }}>
                        {res.company}
                        {res.title}
                      </h1>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold ">City:</div>
                      <div>{res.city}</div>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold">Category:</div>

                      <div>{res.category}</div>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold">Description:</div>

                      <div>{res.description}</div>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold">Requirements:</div>

                      <div>{res.req}</div>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold">Salary:</div>

                      <div>{res.salary}</div>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold">Remote:</div>

                      <div>{res.remote}</div>
                    </div>
                    <div className="row-2">
                      {list.includes(res.id) ? (
                        <div>
                          <button disabled className="btn btn-primary m-2">
                            Applied{console.log(id)}
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                      {console.log(!list.includes(res.id))}
                      {applied !== undefined && !list.includes(res.id) ? (
                        <button
                          className="align-self-end m-2 btn "
                          value={res.id}
                          style={{
                            color: "white",
                            backgroundColor: "#B07F33",
                          }}
                          onClick={(e) => {
                            setRefId(res.ref_id);
                            applyToJob(e.target.value);
                          }}
                        >
                          Apply{console.log(id)}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              }
            })}
          {apiSearch !== undefined &&
            apiSearch.map((res) => {
              {
                return (
                  <div
                    className="card my-5 ml-3 col"
                    style={{ width: "500px" }}
                    key={res.id}
                    value={res.id}
                    s
                  >
                    <div className="card-title ">
                      <h1 style={{ fontSize: "25px" }}>
                        {res.company}
                        {res.title}
                      </h1>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold ">City:</div>
                      <div>{res.city}</div>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold">Category:</div>

                      <div>{res.category}</div>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold">Description:</div>

                      <div>{res.description}</div>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold">Requirements:</div>

                      <div>{res.req}</div>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold">Salary:</div>

                      <div>{res.salary}</div>
                    </div>
                    <div className="card-text ">
                      <div className="font-weight-bold">Remote:</div>

                      <div>{res.remote}</div>
                    </div>
                    <div className="row-2">
                      {list.includes(res.id) ? (
                        <div>
                          <button disabled className="btn btn-primary m-2">
                            Applied{console.log(id)}
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                      {applied !== undefined && !list.includes(res.id) ? (
                        <button
                          className="align-self-end m-2 btn "
                          value={res.id}
                          style={{
                            color: "white",
                            backgroundColor: "#B07F33",
                          }}
                          onClick={(e) => {
                            setRefId(res.ref_id);
                            applyToJob(e.target.value);
                          }}
                        >
                          Apply{console.log(id)}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              }
            })}
          {api !== undefined &&
            apiSearch !== undefined &&
            apiSearch.length === 0 && <div> No jobs found</div>}
        </div>
      </div>
    </div>
  );
};

export default JobHunting;
