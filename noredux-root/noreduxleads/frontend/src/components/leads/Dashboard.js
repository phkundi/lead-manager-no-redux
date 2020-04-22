import React, { useContext } from "react";
import Form from "./Form";
import Leads from "./Leads";
import useLeadState from "../../hooks/useLeadState";

export default function Dashboard() {
  const { getLeads, deleteLead, addLead, leads } = useLeadState();

  return (
    <>
      <Form addLead={addLead} />
      <Leads getLeads={getLeads} deleteLead={deleteLead} leads={leads} />
    </>
  );
}
