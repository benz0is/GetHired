import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./routes/Home";
import Register from "./routes/Register";
import StepTwoRegister from "./routes/StepTwoRegister";
import LogInPage from "./routes/LogInPage";
import JobHunting from "./routes/JobHunting";
import AccountPage from "./routes/AccountPage";
import CompanyPage from "./routes/CompanyPage";
import CompanyRegisterPage from "./routes/CompanyRegisterPage";
import { useSelector } from "react-redux";

function App() {
  const [AccLogIn, setAccLogIn] = useState();
  const [CompanyLogIn, setCompanyLogIn] = useState();
  const [id, setId] = useState();
  const CID = sessionStorage.getItem("CompanyId");
  useEffect(() => {
    const SetData = async () => {
      await setAccLogIn(sessionStorage.getItem("loggedAcc"));
      // await setCompanyLogIn(sessionStorage.getItem("loggedCompany"));
      await setId(sessionStorage.getItem("id"));
    };
    SetData();
  }, []);
  const isLoggedAcc = useSelector((state) => {
    return state.isLogged;
  });
  const isLoggedCompany = useSelector((state) => {
    return state.isLoggedCompany;
  });

  function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
      <Route
        render={(props) =>
          authed === true ? <Component {...props} /> : <Redirect to="/Login" />
        }
      />
    );
  }
  function PrivateHomeRoute({ component: Component, authed, ...rest }) {
    return (
      <Route
        render={(props) =>
          authed === false ? <Component {...props} /> : <Redirect to="/Login" />
        }
      />
    );
  }

  return (
    <Router>
      <Switch>
        <Route authed={false} exact path="/" component={Home}></Route>
        <Route exact path="/Register" component={Register}></Route>
        <Route exact path="/Register/:id" component={StepTwoRegister}></Route>
        <Route exact path="/Login" component={LogInPage}></Route>
        <Route exact path="/JobHunting/:id" component={JobHunting}>
          {sessionStorage.getItem("loggedAcc") === "true" ? (
            <Route
              exact
              path={`/JobHunting/:id`}
              component={JobHunting}
            ></Route>
          ) : (
            <Redirect to="/Login" />
          )}
        </Route>
        <Route
          authed={sessionStorage.getItem("loggedAcc") === "true"}
          exact
          path="/Account/:id"
          component={AccountPage}
        >
          {" "}
          {sessionStorage.getItem("loggedAcc") === "true" ? (
            <Route exact path={`/Account/:id`} component={AccountPage}></Route>
          ) : (
            <Redirect to="/Login" />
          )}
        </Route>
        <Route
          authed={sessionStorage.getItem("loggedCompany") === "true"}
          exact
          path="/Company/:id"
          component={CompanyPage}
        >
          {sessionStorage.getItem("loggedCompany") === "true" ? (
            <Route exact path={`/Company/:id`} component={CompanyPage}></Route>
          ) : (
            <Redirect to="/Login" />
          )}
        </Route>
        <Route
          exact
          path="/RegisterCompany"
          component={CompanyRegisterPage}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
