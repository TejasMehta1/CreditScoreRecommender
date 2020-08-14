import React, {Component} from "react";
import { BrowserRouter, Link, useHistory, withRouter } from "react-router-dom"
import './App.css';

class userForm extends Component {
    state = {
        credit_cards: [{four_digits:"", limit:"", spending:"",accuracy_value:"",payment_deadline:""}],
      };

      handleChange = (e) => {
        if (["four_digits", "limit", "spending","accuracy_value","payment_deadline"].includes(e.target.className) ) {
          let credit_cards = [...this.state.credit_cards]   
          credit_cards[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
          this.setState({ credit_cards }, () => console.log(this.state.credit_cards))
        } else {
          this.setState({ [e.target.name]: e.target.value.toUpperCase() })
        }
      }


      addCard = (e) => {
        this.setState((prevState) => ({
          credit_cards: [...prevState.credit_cards, {four_digits:"", limit:"", spending:"",accuracy_value:"",payment_deadline:""}],
        }));
      }


      handleSubmit = (e) => {
          e.preventDefault()
          
        }

    render() {
        let {credit_cards} = this.state
    return (
        <>
            <div className="form-title">Enter your information the best you can:</div>
            <form onSubmit={this.handleSubmit} onChange={this.handleChange} className="form-questions">
                    <button onClick={this.addCard}>Add a credit card</button>
                    {
                        credit_cards.map((val, idx) => {
                            let fourdigitsid = `four-digits-${idx}`, limitid = `limit-${idx}`, spendingid = `spending-${idx}`, accuracyvalueid = `accuracy_value-${idx}`, paymentdeadlineid = `payment_deadline-${idx}`
            return (
              <div key={idx}>
                  <h4>{`Card #${idx + 1}`}</h4>

                  <div className="a-question">
                <label htmlFor={fourdigitsid}>Last 4 digits of card:</label>
                <input
                  type="text"
                  name={fourdigitsid}
                  data-id={idx}
                  id={fourdigitsid}
                //   value={credit_cards[idx].four_digits} 
                  className="four-digits"
                /></div>

                  <div className="a-question">
                <label htmlFor={limitid}>Spending Limit</label>
                <input
                  type="text"
                  name={limitid}
                  data-id={idx}
                  id={limitid}
                //   value={credit_cards[idx].limit} 
                  className="limit"
                /></div>


<div className="a-question">
<label htmlFor={spendingid}>Current balance:</label>
                <input
                  type="text"
                  name={spendingid}
                  data-id={idx}
                  id={spendingid}
                //   value={credit_cards[idx].spending} 
                  className="spending"
                /></div>


                  <div className="a-question">
<label htmlFor={accuracyvalueid}>Have you paid most of your past balances on time? (y/n)</label>
                <input
                  type="text"
                  name={accuracyvalueid}
                  data-id={idx}
                  id={accuracyvalueid}
                //   value={credit_cards[idx].accuracy_value} 
                  className="accuracyvalue"
                /></div>

<div className="a-question">
<label htmlFor={paymentdeadlineid}>When is your next balance statement payment due? (Month Day, Year)</label>
                <input
                  type="text"
                  name={paymentdeadlineid}
                  data-id={idx}
                  id={paymentdeadlineid}
                //   value={credit_cards[idx].payment_deadline} 
                  className="paymentdeadline"
                /></div>
              </div>
                        )})
                    }

                    
                    
<button onClick={this.addCard}>Add a credit card</button>
                    {
                        credit_cards.map((val, idx) => {
                            let loantypeid = `loan_type-${idx}`, accuracyvalueid = `accuracy_value-${idx}`, cardid = `card_id-${idx}`
            return (
              <div key={idx}>
                  <h4>{`Loan #${idx + 1}`}</h4>

                  <div className="a-question">
                    <label htmlFor={loantypeid}>Type of loan:</label>
                    <select
                        name={loantypeid}
                        data-id={idx}
                        id={loantypeid}
                    //   value={credit_cards[idx].four_digits} 
                        className="loan_type"
                    >
                        <option value="credit">Credit</option>
                        <option value="student">Student</option>
                        <option value="auto">Auto</option>
                        <option value="home">Home</option>
                        <option value="credit">Credit</option>
                    </select>
                    </div>

                  <div className="a-question">
                <label htmlFor={limitid}>Spending Limit</label>
                <input
                  type="text"
                  name={limitid}
                  data-id={idx}
                  id={limitid}
                //   value={credit_cards[idx].limit} 
                  className="limit"
                /></div>

              </div>
                        )})
                    }


                    <input type="submit" value="submit" />
            </form>
        </>
    );}
}

export default userForm;



// "oldest_credit_account": 6,
// "newest_credit_account": 1,
// "cards": {
//     "card_array": [
//         {
//             "id": 4234,
//             "limit": 10000,
//             "spending": 5000,
//             "accuracy_value": 1,
//             "payment_deadline": "September 20, 2020"
//         },
//         {
//             "id": 9887,
//             "limit": 2000,
//             "spending": 1000,
//             "accuracy_value": 1,
//             "payment_deadline": "September 1, 2020"
//         }
//     ]
// },
// "loans": {
//     "loan_array": [
//         {
//             "loan_type": "Student",
//             "accuracy_value": 1
//         },
//         {
//             "loan_type": "Credit Card",
//             "accuracy_value": 1,
//             "card_id": 9887
//         },
//         {
//             "loan_type": "Auto",
//             "accuracy_value": 1
//         }
//     ]
// }
// }