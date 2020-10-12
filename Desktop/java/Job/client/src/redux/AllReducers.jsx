import LogInReducer from "./LogInReducer";
import { combineReducers } from "redux";
import LogInCompanyReducer from "./LogInCompanyReducer";

const AllReducers = combineReducers({
  isLogged: LogInReducer,
  isLoggedCompany: LogInCompanyReducer,
});

export default AllReducers;
