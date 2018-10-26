import React from "react";
import { auth } from "../../firebase";
import FormField from "../FormField";

const PasswordChangePage = () => {
  return (
    <div>
      <h1>Password Change Page</h1>
      <PasswordChangeForm />
    </div>
  );
};

const INITIAL_STATE = {
  newPass1: "",
  newPass2: "",
  error: null
};

class PasswordChangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    auth
      .doPasswordUpdate(this.state.newPass1)
      .then(() => {
        alert("Your new pass is ready to go!");
        this.setState({ ...INITIAL_STATE });
      })
      .catch(e => {
        this.setState({ error: e });
      });
  };
  render() {
    const { newPass1, newPass2, error } = this.state;
    const allowed = newPass1 === newPass2;
    return (
      <form onSubmit={this.handleSubmit}>
        <FormField
          type="text"
          value={newPass1}
          onChange={e => this.setState({ newPass1: e.target.value })}
          label="Enter New Password"
          helper="Use 6 or more characters with a mix of letters, numbers & symbols"
          bar={true}
          req={true}
        />
        <FormField
          type="text"
          value={newPass2}
          onChange={e => this.setState({ newPass2: e.target.value })}
          label="Confirm New Password"
          req={true}
        /> 
        
        <button className="general-button" disabled={!allowed} type="submit">
          Submit Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordChangePage;
export { PasswordChangeForm };
