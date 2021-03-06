function leadReducer(state, action) {
  switch (action.type) {
    case "GET_LEADS":
      return {
        ...state,
        leads: action.payload,
      };
    case "DELETE_LEAD":
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id != action.payload),
      };
    case "ADD_LEAD":
      return {
        ...state,
        leads: [...state.leads, action.payload],
      };
    default:
      return state;
  }
}
export default leadReducer;
