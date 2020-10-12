const LogInCompanyReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGN_IN_COMPANY":
      return !state;
    default:
      return state;
  }
};

export default LogInCompanyReducer;
