import React, { Fragment, useEffect, useContext } from "react";
import { useAlert } from "react-alert";
import { ErrorContext } from "../../context/errorContext";
import { MessageContext } from "../../context/messageContext";

function Alerts() {
  const { errors } = useContext(ErrorContext);
  const { messages } = useContext(MessageContext);
  const alert = useAlert();

  useEffect(() => {
    if (errors.msg.name) {
      alert.error(`Name: ${errors.msg.name.join()}`);
    }
    if (errors.msg.email) {
      alert.error(`Email: ${errors.msg.email.join()}`);
    }
    if (errors.msg.message) {
      alert.error(`Message: ${errors.msg.message.join()}`);
    }
    if (errors.msg.non_field_errors) {
      alert.error(errors.msg.non_field_errors.join());
    }
    if (errors.msg.username) {
      alert.error(errors.msg.username.join());
    }
  }, [errors]);

  useEffect(() => {
    if (messages.leadDeleted) {
      alert.success(messages.leadDeleted);
    }
    if (messages.leadAdded) {
      alert.success(messages.leadAdded);
    }
    if (messages.passwordsNotMatch) {
      alert.error(messages.passwordsNotMatch);
    }
  }, [messages]);

  return <Fragment />;
}
export default Alerts;
