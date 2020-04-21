import React, { useContext } from "react";
import axios from "axios";
import { LeadContext } from "../../context/leadContext";
import { MessageContext } from "../../context/messageContext";
import { ErrorContext } from "../../context/errorContext";
import { returnErrors, createMessage } from "../../actions/messages";
import Form from "./Form";
import Leads from "./Leads";
import { tokenConfig } from "../../actions/auth";

export default function Dashboard({ auth }) {
  const { state, dispatch } = useContext(LeadContext);
  const { dispatchMessages } = useContext(MessageContext);
  const { dispatchErrors } = useContext(ErrorContext);

  const getLeads = () => {
    axios
      .get("/api/leads", tokenConfig(auth))
      .then((res) => {
        dispatch({
          type: "GET_LEADS",
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
        dispatch({ type: "DELETE_LEAD", payload: id });
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
        dispatch({ type: "ADD_LEAD", payload: res.data });
        dispatchMessages(createMessage({ leadAdded: "Lead Added" }));
      })
      .catch((err) =>
        dispatchErrors(returnErrors(err.response.data, err.response.status))
      );
  };

  return (
    <>
      <Form addLead={addLead} />
      <Leads getLeads={getLeads} deleteLead={deleteLead} state={state} />
    </>
  );
}
