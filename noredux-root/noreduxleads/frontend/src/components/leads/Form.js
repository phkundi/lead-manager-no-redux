import React from "react";
import useInputState from "../../hooks/useInputState";

function Form({ addLead }) {
  const [name, changeName, resetName] = useInputState("");
  const [email, changeEmail, resetEmail] = useInputState("");
  const [message, changeMessage, resetMessage] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const lead = { name, email, message };
    addLead(lead);
    resetName();
    resetEmail();
    resetMessage();
  };

  return (
    <div className="card card-body mt-4 mb-4">
      <h2>Add Lead</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={changeName}
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={changeEmail}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            className="form-control"
            type="text"
            name="message"
            onChange={changeMessage}
            value={message}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default Form;
