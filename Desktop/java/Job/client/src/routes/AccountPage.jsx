import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import background from "../images/background.png";
import logo from "../images/logo.jpg";
import Modal from "react-bootstrap/Modal";
import "../App.css";

const AccountPage = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [api, setApi] = useState();
  const [appliedJob, setAppliedJob] = useState();
  const [jobList, setJobList] = useState();
  const [chatHead,setChatHead]= useState()
  const [trigger,setTrigger] = useState(false)
  const [dialog,setDialog]= useState()
  const [messageText,setMessageText]= useState()
  const [userChat,setUsersChat]=useState()
  const [companyId,setCompanyId]=useState()
  const [companyList,setCompanyList]=useState()
  const [dialogName,setDialogName]=useState()
  const [descOpen,setDescOpen]=useState()
  const [userDesc,setUsersDesc]=useState()
  const [changeExp,setChangeExp]= useState(false)
  const [exp,setExp]=useState()

  const [showMessages, setShowMessages] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{user(id:"${id}"){name,surname,email,description,category,wish,exp}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setApi(res));
      const appliedJob = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{applied(acc_id:"${id}"){posting_id}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setAppliedJob(res));
      const jobs = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{jobs{id,ref_id,company,title,city,category,description,req,salary,remote,applied}}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setJobList(res));
        const chatHeads = await fetch("http://localhost:3001/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query{chatHead{id,company_id,account_id}}`,
          }),
        })
          .then((res) => res.json())
          .then((res) => setChatHead(res));
          const userChat = await fetch("http://localhost:3001/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `query{singleChatUser(account_id:"${id}"){id,company_id,account_id,company_text,account_text}}`,
            }),
          })
            .then((res) => res.json())
            .then((res) => setUsersChat(res));
            const companyList = await fetch("http://localhost:3001/api", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query: `query{companies{id,companyname}}`,
              }),
            })
              .then((res) => res.json())
              .then((res) => setCompanyList(res));
    };
    fetchData();
  }, [trigger]);
  let list = [];
  if (appliedJob !== undefined) {
    appliedJob.data.applied.map((res) => list.push(res.posting_id));
  }
  const handleMsgOpen = () => {
    setShowMessages(true);
  };
  const handleMsgClose = () => {
    setShowMessages(false);
  };
  const handleClose = () => {
    setDescOpen(false);
  };
  const handleOpen = () => {
    setDescOpen(true);
  };
  const handleOpenExp =()=>{
    setChangeExp(true)
  }
  const handleCloseExp =()=>{
    setChangeExp(false)
  }
  const sendMessages=async(e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddChat(id:"${dialog}",company_id:"${companyId}",account_id:"${id}",company_text:"",account_text:"${messageText}"){id}}`,
      }),
    });
    handleClose()
    setTrigger(!trigger)
  }

    const updateDesc = async()=>{
      if(userDesc === undefined || userDesc.length <= 50){
        alert("Description is too short")
        return;
      }
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation{ChangeDescUser(id:"${id}",description:"${userDesc}"){id}}`,
        }),
      });
      setTrigger(!trigger)
    }
    const updateExp = async()=>{
      if(exp === undefined || exp.length <= 50){
        alert("Experience is too short")
        return;
      }
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation{ChangeExpUser(id:"${id}",exp:"${exp}"){id}}`,
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
                  {api !== undefined
                    ? `${api.data.user[0].name} ${api.data.user[0].surname}`
                    : ""}
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
                        {api !== undefined
                          ? `About ${api.data.user[0].name}`
                          : ""}
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
                            <a className="dropdown-item"id="pointerClick" onClick={handleOpen}>
                              Change Description
                            </a>
                            <a className="dropdown-item"id="pointerClick" onClick={handleOpenExp}>
                              Change Experience
                            </a>
                    <Modal show={descOpen} onHide={handleClose}><Modal.Header>Please change your description:</Modal.Header>
                    <div className="card m-3">
                            <textarea style={{minHeight:"200px",maxHeight:"400px"}} type="text"  onChange={(e)=>{setUsersDesc(e.target.value)}}/>
                           <button onClick={()=>updateDesc()} className="btn btn-success mt-2" style={{width:"20%"}}>Save</button>
                          </div></Modal>
                          <Modal show={changeExp} onHide={handleCloseExp}><Modal.Header>Please change your experience:</Modal.Header>
                    <div className="card m-3">
                            <textarea style={{minHeight:"200px",maxHeight:"400px"}} type="text"  onChange={(e)=>{setExp(e.target.value)}}/>
                           <button onClick={()=>updateExp()} className="btn btn-success mt-2" style={{width:"20%"}}>Save</button>
                          </div></Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="card-text mt-2 "
                      style={{ maxWidth: "240px" }}
                    >
                      {api !== undefined
                        ? `${api.data.user[0].description}`
                        : ""}
                    </div>
                    <div
                      className="card-text mt-2 font-weight-bold"
                      style={{ maxWidth: "240px" }}
                    >
                      {api !== undefined
                        ? `${api.data.user[0].name} is mostly interested in: `
                        : ""}
                    </div>
                    <div className="card-text" style={{ maxWidth: "240px" }}>
                      {" "}
                      {api !== undefined
                        ? `${api.data.user[0].category}`
                        : "No user data"}
                    </div>
                    <div
                      className="card-text mt-2 font-weight-bold"
                      style={{ maxWidth: "240px" }}
                    >
                      {api !== undefined
                        ? `${api.data.user[0].name} experience :`
                        : ""}
                    </div>
                    <div className="card-text" style={{ maxWidth: "240px" }}>
                      {" "}
                      {api !== undefined
                        ? `${api.data.user[0].exp}`
                        : "No user data"}
                    </div>
                    <div
                      className="card-text mt-2 font-weight-bold"
                      style={{ maxWidth: "240px" }}
                    >
                      {api !== undefined
                        ? `${api.data.user[0].name} wants to be in 5 years :`
                        : ""}
                    </div>
                    <div className="card-text" style={{ maxWidth: "240px" }}>
                      {" "}
                      {api !== undefined
                        ? `${api.data.user[0].wish}`
                        : "No user data"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-6 row-1 ml-3  justify-content-center"
            style={{ borderRight: "1px solid gray" }}
          >
            <h1 className="text-center" style={{ fontSize: "25px" }}>
              Applied Jobs
            </h1>
            {jobList !== undefined &&
              jobList.data.jobs.map((res) => {
                if (list.includes(res.id)) {
                  return (
                    <div
                      className="card ml-2 mt-2 col mb-5"
                      style={{ width: "95%"}}
                      key={res.id}
                    >
                      <div className="card-title">
                        <label className="font-weight-bold" style={{maxWidth:"500px"}}>
                          {res.company}
                        </label>
                      </div>
                      <div className="card-text">
                        <label className="font-weight-bold">Title : </label>
                        <label>{res.title}</label>
                      </div>
                      <div className="card-text">                        <label className="font-weight-bold align-start" >
                          Description :
                        </label></div>
                      <div className="card-text">

                        <label style={{maxWidth:"500px"}}>{res.description}</label>
                      </div>
                      <div className="card-text">
                        <label className="font-weight-bold">
                          Requirements :
                        </label>
                        <label style={{maxWidth:"500px"}}>{res.req}</label>
                      </div>
                      <div className="card-text">
                        <label className="font-weight-bold">Category : </label>
                        <label style={{maxWidth:"500px"}}>{res.category}</label>
                      </div>
                      <div className="card-text">
                        <label className="font-weight-bold">Salary : </label>
                        <label style={{maxWidth:"500px"}}>{res.salary}</label>
                      </div>
                      <div className="card-text">
                        <label className="font-weight-bold">City : </label>
                        <label style={{maxWidth:"500px"}}>{res.city}</label>
                      </div>
                      <div className="card-text">
                        <label className="font-weight-bold">Remote : </label>
                        <label>{res.remote}</label>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
          <div className="col-3 row-1 ml-1  justify-content-center">
            <h1 className="text-center" style={{ fontSize: "25px" }}>
              Messages
            </h1>
            <div>{chatHead !== undefined && chatHead.data.chatHead.map((res)=>
                
                { return(<div>{companyList !== undefined && companyList.data.companies.map(companyRes =>{if(companyRes.id === res.company_id)
                {return(<div className="m-2 card"><div className="card-title m-2">{`${companyRes.companyname}`}</div>
                <footer>
                  <button className="btn btn-success m-2 align-self-end" value={res.id}
                  onClick={(e)=>{setDialog(e.target.value)
                    setCompanyId(res.company_id)
                    setDialogName(`${companyRes.companyname}`)
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
        {userChat !== undefined && userChat.data.singleChatUser.map(res=>{if(res.id === dialog && res.company_text.length === 0)
          {return(<div><div className=" card text-right p-1 bg-primary text-white my-2" >{res.account_text}</div></div>)}else if(res.id === dialog && res.account_text.length === 0){
            return(<div><div className=" card text-left p-1 bg-secondary text-white my-2" >{res.company_text}</div></div>)
          }})}
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

export default AccountPage;
