import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import background from "../images/background.png";
import logo from "../images/logo.jpg";
import Modal from "react-bootstrap/Modal";
import "../App.css";
import shortId from 'shortid'

const CompanyPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState();
  const [jobPostingTitle, setJobPostingTitle] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobSalary, setJobSalary] = useState();
  const [jobReq, setJobReq] = useState();
  const [showMessages, setShowMessages] = useState(false);
  const [city, setCity] = useState();
  const [remote, setRemote] = useState();
  const [companyApi, setCompanyApi] = useState();
  const [companyJob, setCompanyJobs] = useState();
  const [trigger, setTrigger] = useState(true);
  const [showId, setShowId] = useState();
  const [showApplicants, setShowApplicants] = useState(false);
  const [applicantList, setApplicantList] = useState();
  const list = [];
  const [nextStage, setNextStage] = useState();
  const [companyChat, setCompanyChat] = useState();
  const [chatHead,setChatHead]=useState()
  const [dialog,setDialog]= useState()
  const [usersList,setUsersList]= useState();
  const [dialogName,setDialogName]=useState();
  const [userId,setUserId]=useState()
  const [messageText,setMessageText]=useState()
  const [nameOpen,setNameOpen]=useState(false)
  const [descOpen,setDescOpen] = useState(false)
  const [companyDesc,setCompanyDesc]= useState()
  const [companyName,setCompanyName]= useState()

  const { id } = useParams();
  const AccId = sessionStorage.getItem("id");
  const randomId = shortId.generate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{company(id:"${id}"){companyname,description}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setCompanyApi(res));

      const companyChats = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{singleChatCompany(company_id:"${id}"){id,company_id,account_id,company_text,account_text}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setCompanyChat(res));
        const chatHeads = await fetch("http://localhost:3001/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query{chatHead{id,company_id,account_id}}`,
          }),
        })
          .then((res) => res.json())
          .then((res) => setChatHead(res));

      const jobResponse = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{jobs{id,ref_id,title,city,category,description,req,salary,remote,applied}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setCompanyJobs(res));
      const jobsApplied = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{appliedAll{id,posting_id,ref_id,acc_id,name,surname,category,description,exp}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setApplicantList(res));
      
      const allUsers = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{users{id,name,surname}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setUsersList(res));
    };
    fetchData();
  }, [trigger]);
  const handleSubmit = async () => {
    if (
      jobPostingTitle === undefined ||
      category === undefined ||
      jobDesc === undefined ||
      jobSalary === undefined ||
      jobReq === undefined ||
      remote === undefined ||
      city === undefined
    ) {
      alert("Dont leave any blank forms");
      return;
    }
    if (jobDesc.length <= 30) {
      alert("Please write a longer description");
      return;
    }

    const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddPosting(ref_id:"${id}",company:"${companyApi.data.company[0].companyname}",title:"${jobPostingTitle}",description:"${jobDesc}",city:"${city}",category:"${category}",req:"${jobReq}",salary:"${jobSalary}",remote:"${remote}"){id}}`,
      }),
    });
    setTrigger(!trigger);

    handleClose();
  };
  const handleMsgOpen = () => {
    setShowMessages(true);
  };
  const handleMsgClose = () => {
    setShowMessages(false);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  const handleShowApplicants = () => {
    setShowApplicants(true);
  };
  const handleCloseApplicants = () => {
    setShowApplicants(false);
  };
  const changeNameOpen=()=>{
    setNameOpen(true)
  }
  const changeNameClose=()=>{
    setNameOpen(false)
  }
  const changeDescOpen=async ()=>{
    setDescOpen(true)

  }
const changeDescClose=()=>{
  setDescOpen(false)
}
const updateDescription = async()=>{

  const response = await fetch("http://localhost:3001/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation{ChangeDescCompany(id:"${id}",description:"${companyDesc}"){id}}`,
    }),
  });
  changeDescClose()
  setTrigger(!trigger)
}
const updateName = async()=>{
  
  const response = await fetch("http://localhost:3001/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation{ChangeNameCompany(id:"${id}",companyname:"${companyName}"){id}}`,
    }),
  });
  changeNameClose()
  setTrigger(!trigger)
  return
}
  if (applicantList !== undefined) {
    applicantList.data.appliedAll.map((res) => list.push(res.posting_id));
  }
  const postDelete = async (res) => {
    const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{DeleteJob(id:${res}){id}}`,
      }),
    });
    const deleteApplied = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{DeleteApplied(posting_id:${res}){id}}`,
      }),
    });
    setTrigger(!trigger);
  };
  const sendToNextStage = async (res) => {
    const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddChat(id:"${randomId}",company_id:"${id}",account_id:"${res}",company_text:"You have been selected in the job ${nextStage}!",account_text:""){id}}`,
      }),
    });
    const setChatHead = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddChatHead(id:"${randomId}",company_id:"${id}",account_id:"${res}"){id}}`,
      }),
    });
    postDelete(showId);
    handleCloseApplicants();
    setTrigger(!trigger)
  };
  const sendMessages=async(e)=>{
    e.preventDefault()
    console.log(dialog,id,userId,messageText)
    const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddChat(id:"${dialog}",company_id:"${id}",account_id:"${userId}",company_text:"${messageText}",account_text:""){id}}`,
      }),
    });
    setTrigger(!trigger)
  }
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
                  href={`/Company/${id}`}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  For Companies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="container-fluid
      "
      >
        <div className="row row-cols-3 ">
          <div
            className="col-3 row justify-content-center "
            style={{ borderRight: "1px solid gray" }}
          >
            <div className="row.row-cols-1 ml-2">
              <div className=" text-center mt-2">
                <h1 style={{ fontSize: "25px" }}>
                  {companyApi !== undefined
                    ? `${companyApi.data.company[0].companyname}`
                    : "No user data"}
                </h1>
              </div>
              <div>
                <div className="card m-3 ">
                  <div className="m-2">
                    <div className="ml-1 row row-cols-2 ">
                      <div
                        className="card-title font-weight-bold"
                        style={{ width: "200px" }}
                      >
                        About the company
                      </div>
                      <div className="text-right pr-4">
                        <div className="dropdown">
                          <i
                            id="dropdownMenuButton"
                            className="fas fa-bars dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          ></i>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item"id="pointerClick" onClick={()=>{changeDescOpen()}}>
                              Change Description
                            </a>
                            <a className="dropdown-item"id="pointerClick"  onClick={()=>{changeNameOpen()}}>
                              Change Company Name
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Modal show={descOpen}
                          onHide={changeDescClose}><Modal.Header>Please change your company's description:</Modal.Header>
                          <div className="card m-3">
                            <textarea style={{minHeight:"200px",maxHeight:"400px"}} type="text"  onChange={(e)=>{setCompanyDesc(e.target.value)}}/>
                           <button onClick={()=>updateDescription()} className="btn btn-success mt-2" style={{width:"20%"}}>Save</button>
                          </div>
                          </Modal>
                    <Modal show={nameOpen} onHide={changeNameClose}><Modal.Header>Please change your company's name:</Modal.Header>
                    <div className="card m-3">
                            <input style={{Height:"60px",}} type="text"  onChange={(e)=>{setCompanyName(e.target.value)}}/>
                           <button onClick={()=>updateName()} className="btn btn-success mt-2" style={{width:"20%"}}>Save</button>
                          </div></Modal>
                    <div className="card-text" style={{ maxWidth: "300px" }}>
                      {companyApi !== undefined
                        ? `${companyApi.data.company[0].description}`
                        : "No user data"}
                    </div>
                    <button
                      className="btn my-2 btn-success"
                      style={{

                        color: "white",
                      }}
                      onClick={handleOpen}
                    >
                      Post a job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-6 row-1 ml-3  justify-content-center overflow-auto"
            style={{ borderRight: "1px solid gray", height: "650px" }}
          >
            <h1 className="text-center" style={{ fontSize: "25px" }}>
              Posted jobs
            </h1>
            <div>
              {companyJob !== undefined &&
                companyJob.data.jobs.map((res) => {
                  if (res.ref_id === id) {
                    return (
                      <div
                        className="card my-5 ml-3 col"
                        style={{ width: "95%" }}
                        key={res.id}
                        value={res.id}
                      >
                        <div className="card-title ">
                          <h1 style={{ fontSize: "25px" }}>{res.title}</h1>
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
                          <button
                            value={res.id}
                            className="btn btn-danger"
                            onClick={(e) => {
                              postDelete(e.target.value);
                            }}
                          >
                            Delete posting
                          </button>
                          <button
                            className="align-self-end m-2 btn "
                            style={{ color: "white", backgroundColor: "green" }}
                            value={res.id}
                            disabled={!list.includes(res.id) ? true : false}
                            onClick={(e) => {
                              setNextStage(res.title);
                              setShowId(e.target.value);
                              handleShowApplicants();
                            }}
                          >
                            See applicants
                          </button>
                        </div>
                        <Modal
                          show={showApplicants}
                          onHide={handleCloseApplicants}
                        >
                          <Modal.Header>{`Select one candidate who you think should go to the next stage!`}</Modal.Header>
                          <div
                            className="overflow-auto"
                            style={{ height: "600px" }}
                          >
                            {applicantList !== undefined &&
                              applicantList.data.appliedAll.map((response) => {
                                if (response.posting_id == showId) {
                                  return (
                                    <div>
                                      <div className="card m-2">
                                        <div className="card-title m-2">{`Name : ${response.name} ${response.surname}`}</div>
                                        <div className="card-text m-2">
                                          {`Description : ${response.description}`}
                                        </div>
                                        <div className="card-text m-2">
                                          {`Experience : ${response.exp}`}
                                        </div>
                                        <button
                                          className="btn btn-success m-2 align-self-end"
                                          style={{ width: "25%" }}
                                          value={response.acc_id}
                                          onClick={(e) => {
                                            sendToNextStage(e.target.value);
                                          }}
                                        >
                                          Accept
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </Modal>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <div className="col-3 row-1 ml-1  justify-content-center">
            <h1 className="text-center" style={{ fontSize: "25px" }}>
              Messages
            </h1>
              <div>{chatHead !== undefined && chatHead.data.chatHead.map((res)=>
                
                { return(<div>{usersList !== undefined && usersList.data.users.map(userRes =>{if(userRes.id === res.account_id)
                {return(<div className="m-2 card"><div className="card-title m-2">{`${userRes.name} ${userRes.surname}`}</div>
                <footer>
                  <button className="btn btn-success m-2 align-self-end" value={res.id}
                  onClick={(e)=>{setDialog(e.target.value)
                    setUserId(res.account_id)
                    setDialogName(`${userRes.name} ${userRes.surname}`)
                    handleMsgOpen()
                  }}>Open Chat</button>
                </footer>
                </div>)}})}
                      </div>) 
                }
)//
                }
                </div>


          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add job listing</Modal.Title>
        </Modal.Header>
        <form className="container">
          <div className="form-group">
            <label htmlFor="category">Select job category</label>
            <select
              className="form-control"
              style={{ width: "400px" }}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "100%" }}
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
            <label htmlFor="title">Job title:</label>{" "}
            <div>
              <input
                type="text"
                placeholder="Enter job title"
                onChange={(e) => setJobPostingTitle(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="title">City:</label>{" "}
            <div>
              <input
                type="text"
                placeholder="Enter city"
                onChange={(e) => setCity(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="desc">Job description:</label>{" "}
            <div>
              {" "}
              <textarea
                type="text"
                placeholder="Enter job description"
                onChange={(e) => setJobDesc(e.target.value)}
                style={{ width: "100%", minHeight: "150px" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="req">Job requirements:</label>{" "}
            <div>
              {" "}
              <input
                type="text"
                placeholder="Enter job requirements"
                onChange={(e) => setJobReq(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary:</label>{" "}
            <div>
              {" "}
              <input
                type="text"
                placeholder="Enter job salary"
                onChange={(e) => setJobSalary(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="remote">Remote Availability:</label>
          </div>
          <div className="form-group ">
            <label className="mr-1" htmlFor="yes">
              Yes
            </label>
            <input
              type="checkbox"
              className="mr-1"
              value="yes"
              onClick={(e) => setRemote(e.target.value)}
            />
            <label className="mr-1" htmlFor="no">
              No
            </label>
            <input
              type="checkbox"
              className="mr-1"
              value="no"
              onClick={(e) => setRemote(e.target.value)}
            />
          </div>
        </form>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleClose}>
            Close
          </button>
          <button
            className="btn "
            style={{ backgroundColor: "green", color: "white" }}
            onClick={handleSubmit}
          >
            Post
          </button>
        </Modal.Footer>
      </Modal>
      {showMessages ? (
        <div
          className="card "
          style={{
            position: "absolute",
            bottom: "0px",
            right: "0px",
            minHeight: "300px",
            maxHeight: "300px",
            minWidth: "400px",
            maxWidth:"420px"
          }}
        >
          <div className="m-2 row row-cols-2 ">
          <div
          className="card-title font-weight-bold"
          style={{ width: "200px" }}
          > 
          {dialogName}
          </div>
          <div className="text-right mb-2">
          <button style={{color:"red"}} className="btn" onClick={handleMsgClose}>x</button>
          </div>
          </div>
          <div className="overflow-auto" style={{ minHeight:"140px",maxHeight: "140px" ,maxWidth:"400px"}}>          
          <div className="m-2 align-self-end" >
        {companyChat !== undefined && companyChat.data.singleChatCompany.map(res=>{if(res.id === dialog && res.account_text.length === 0)
          {return(<div><div className=" card text-right p-1 bg-primary text-white my-2" >{res.company_text}</div></div>)}else if(res.id=== dialog && res.company_text.length === 0)
          {return(<div><div className=" card text-left p-1 bg-secondary text-white my-2" >{res.account_text}</div></div>)}})}
          </div>
          </div>
          

          <div className="d-inline card-footer">
            <input
              type="text"
              className="col"
              value={messageText}
              style={{ maxWidth: "280px", height: "37px" }}
              onChange={(e)=>{setMessageText(e.target.value)}}
            />
            <button className="btn btn-primary" onClick={(e)=>{setMessageText("")
              sendMessages(e)}}>send</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CompanyPage;
