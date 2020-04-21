function errorReducer(state, action) {
  switch (action.type) {
    case "GET_ERRORS":
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };

    default:
      return state;
  }
}
export default errorReducer;
