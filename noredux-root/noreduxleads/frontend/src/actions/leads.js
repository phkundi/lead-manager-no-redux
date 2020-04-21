import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

const getLeads = () => {
  axios
    .get("/api/leads")
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) => returnErrors(err.response.data, err.response.status));
};

const deleteLead = (id) => {
  axios
    .delete(`/api/leads/${id}/`)
    .then((res) => {
      dispatch({ type: DELETE_LEAD, payload: id });
      dispatchMessages(createMessage({ leadDeleted: "Lead Deleted" }));
    })
    .catch((err) => console.log(err));
};

const addLead = (lead) => {
  axios
    .post("/api/leads/", lead)
    .then((res) => {
      dispatch({ type: ADD_LEAD, payload: res.data });
      dispatchMessages(createMessage({ leadAdded: "Lead Added" }));
    })
    .catch((err) => returnErrors(err.response.data, err.response.status));
};
