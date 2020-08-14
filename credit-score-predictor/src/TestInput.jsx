import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Insights from "./Insights";
import "./App.css";
// i hate react router
class TestInput extends Component {
  constructor(props) {
    super(props);
    this.state = { req_data: "", submitted: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ req_data: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.setState({ req_data: e.target.value });
    console.log("SUBMITTED " + this.state.req_data);
    this.setState({ submitted: true });
  }

  render() {
    if (this.state.submitted) {
      console.log("REDIRECTING: " + this.state.req_data);

      //   return <Insights req_data={this.state.req_data} />;
      return (
        <Redirect
          to={{
            pathname: "/insights",
            //   search: "?utm=your+face",
            state: { req_data: this.state.req_data },
          }}
        />
      );
    }

    return (
      <>
        <form onSubmit={this.handleSubmit} className="test-form">
          <div className="form-header">Enter JSON data:</div>
          <label>
            <textarea
              className="text-area-section"
              value={this.state.value}
              onChange={this.handleChange}
              rows="25"
              cols="70"
              defaultValue='{
                "oldest_credit_account": 6,
                "newest_credit_account": 1,
                "cards": {
                    "card_array": [
                        {
                            "id": 4234,
                            "limit": 10000,
                            "spending": 5000,
                            "accuracy_value": 1,
                            "payment_deadline": "September 20, 2020"
                        },
                        {
                            "id": 9887,
                            "limit": 2000,
                            "spending": 1000,
                            "accuracy_value": 1,
                            "payment_deadline": "September 1, 2020"
                        }
                    ]
                },
                "loans": {
                    "loan_array": [
                        {
                            "loan_type": "Student",
                            "accuracy_value": 1
                        },
                        {
                            "loan_type": "Credit Card",
                            "accuracy_value": 1,
                            "card_id": 9887
                        },
                        {
                            "loan_type": "Auto",
                            "accuracy_value": 1
                        }
                    ]
                }
            }'
            />
          </label>
          <input
            id="text-input-button"
            type="button"
            value="Submit"
            onClick={this.handleSubmit}
          />
        </form>
      </>
    );
  }
}

export default withRouter(TestInput);
