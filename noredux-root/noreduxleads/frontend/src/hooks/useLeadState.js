import { useContext } from "react";
import { LeadContext } from "../context/leadContext";
import { MessageContext } from "../context/messageContext";
import { ErrorContext } from "../context/errorContext";
import { AuthContext } from "../context/authContext";
import { tokenConfig } from "../actions/auth";
import { returnErrors, createMessage } from "../actions/messages";
import axios from "axios";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "../actions/types";

const useLeadState = () => {
  const { leads, dispatchLeads } = useContext(LeadContext);
  const { dispatchMessages } = useContext(MessageContext);
  const { dispatchErrors } = useContext(ErrorContext);
  const { auth } = useContext(AuthContext);

  const getLeads = () => {
    axios
      .get("/api/leads", tokenConfig(auth))
      .then((res) => {
        dispatchLeads({
          type: GET_LEADS,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };

  const deleteLead = (id) => {
    axios
      .delete(`/api/leads/${id}/`, tokenConfig(auth))
      .then((res) => {
        dispatchLeads({ type: DELETE_LEAD, payload: id });
        dispatchMessages(createMessage({ leadDeleted: "Lead Deleted" }));
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };

  const addLead = (lead) => {
    axios
      .post("/api/leads/", lead, tokenConfig(auth))
      .then((res) => {
        dispatchLeads({ type: ADD_LEAD, payload: res.data });
        dispatchMessages(createMessage({ leadAdded: "Lead Added" }));
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };

  return {
    getLeads,
    deleteLead,
    addLead,
    leads,
  };
};

export default useLeadState;
