import logo from './logo.svg';
import './App.css';
import CategoryCard from "./CategoryCard.js";
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow'
import { PieChart } from "react-minimal-pie-chart";
import axios from 'axios';


function Insights() {

    const data = {
        "oldest_credit_account": 3,
        "newest_credit_account": 2,
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
                },
                // {
                //     "id": 2352,
                //     "limit": 2000,
                //     "spending": 1000,
                //     "accuracy_value": 1,
                //     "payment_deadline": "September 1, 2020"
                // }
            ]
        },
        "loans": {
            "loan_array": [
                {
                    "loan_type": "Student",
                    "accuracy_value": 0
                },
                {
                    "loan_type": "Credit Card",
                    "accuracy_value": 0,
                    "card_id": 9887
                }
                // {
                //     "loan_type": "Auto",
                //     "accuracy_value": 0
                // },
                // {
                //     "loan_type": "Student",
                //     "accuracy_value": 0
                // }
            ]
        }
    }
    let insights = null;

    const [mainEmoji, setMainEmoji] = useState('');
    const [modal1message1, setModal1Message1] = useState('');
    const [section1Emoji, setSection1Emoji] = useState('');
    const [section2Emoji, setSection2Emoji] = useState('');
    const [displayModal1, setDisplayModal1] = useState(false);
    const [displayModal2, setDisplayModal2] = useState(false);
    const [displayModal3, setDisplayModal3] = useState(false);
    const [displayModal4, setDisplayModal4] = useState(false);
    const [displayModal5, setDisplayModal5] = useState(false);

    React.useEffect(() => {
        console.log('componentDidMount');
        axios.post(`https://cors-anywhere.herokuapp.com/https://0uyz2m6qdd.execute-api.us-east-1.amazonaws.com/default/credit-score-breakdown-scripts`, data)
        .then(res => {
          insights = res.data;
          console.log(insights);
          setGeneralEmojiBasedOnScore();
          setModal1Message1(insights.section_one.message_one);
        })
    }, []);
    
    const setSection1EmojiFromScore = () => {

    }
   
    const setGeneralEmojiBasedOnScore = () => {
        let emojiScore = insights.overall_score;
        let emojiChar = ''
        switch(emojiScore) {
            case 1:
                emojiChar = '😱';
                break;
            case 2:
                emojiChar = '😐';
                break;
            case 3:
                emojiChar = '🙂';
                break;
            case 4:
                emojiChar = '🤩';
                break;
            case 5:
                emojiChar = '🤑'
        }
        setMainEmoji(emojiChar)
    }

    const setSectionEmojiBasedOnScore = (emojiScore) => {
        let emojiChar = '';
        switch(emojiScore) {
            case 1:
                emojiChar = '😱';
                break;
            case 2:
                emojiChar = '🙂';
                break;
            case 3:
                emojiChar = '🤑';
                break;
        }
    }
    
    const handleOpen1 = () => {
        setDisplayModal1(true);
      };
    
      const handleClose1 = () => {
        setDisplayModal1(false);
      };

      const handleOpen2 = () => {
        setDisplayModal2(true);
      };
    
      const handleClose2 = () => {
        setDisplayModal2(false);
      };

      const handleOpen3 = () => {
        setDisplayModal3(true);
      };
    
      const handleClose3 = () => {
        setDisplayModal3(false);
      };

      const handleOpen4 = () => {
        setDisplayModal4(true);
      };
    
      const handleClose4 = () => {
        setDisplayModal4(false);
      };

      const handleOpen5 = () => {
        setDisplayModal5(true);
      };
    
      const handleClose5 = () => {
        setDisplayModal5(false);
      };
      
  return (
    <div>
        <p>
          Credit Score: 888
        </p>
        <p>
        {mainEmoji}
        </p>
        <p className="overviewTagLine"> Short description of how you're doing in this period. You've spent very little, and that's a good thing. Keep it up, you champion of men.</p>
        <div style={{width: "80%", marginRight: "auto", marginLeft: "auto"}}>
        <div className="cardRow">
                <CategoryCard activateModal={handleOpen1} text="Payment History" emoji="😍" className="insightCard" id="card1"/>
                <CategoryCard activateModal={handleOpen2} text="Number of Credit Cards" emoji="😍" className="insightCard" id="card2"/>
                <CategoryCard activateModal={handleOpen3} text="Credit Utilization" emoji="😍" className="insightCard" id="card3"/>
        </div>
        <div className="secondRow cardRow">
            <CategoryCard activateModal={handleOpen4} text="Credit Mix" emoji="😍" className="insightCard" id="card4"/>
            <CategoryCard activateModal={handleOpen5} text="Credit History Length" emoji="😍" className="insightCard" id="card5"/>
        </div>
       </div>

       {/* PaymentHistory */}
        <Modal
            open={displayModal1}
            onClose={handleClose1}
            closeAfterTransition={true}
            className="modal">
                <Grow timeout={300} in={displayModal1}>
            <div className="modalText">
                <h2 id="simple-modal-title">Payment History</h2>
                {/* Pie Chart of How much its worht */}
                <PieChart className="pieChart"
                    data={[
                        { title: 'One', value: 10, color: '#E38627' },
                        { title: 'Two', value: 15, color: '#C13C37' },
                        { title: 'Three', value: 20, color: '#6A2135' },
                    ]}
                />

                <p id="simple-modal-description">
                    {modal1message1}
                </p>
                <p id="simple-modal-description">
                    Insight #2
                </p>
                <p id="simple-modal-description">
                    Insight #3
                </p>
             </div>
             </Grow>
        </Modal>
        {/* PaymentHistory */}
        <Modal
            open={displayModal2}
            onClose={handleClose2}
            closeAfterTransition
            className="modal">
                <Grow timeout={300} in={displayModal2}>
            <div className="modalText">
                <h2 id="simple-modal-title">New Credit</h2>
                {/* Pie Chart of How much its worht */}
                

                <p id="simple-modal-description">
                    Insight #1
                </p>
                <p id="simple-modal-description">
                    Insight #2
                </p>
                <p id="simple-modal-description">
                    Insight #3
                </p>
             </div>
             </Grow>
        </Modal>
        <Modal
            open={displayModal3}
            onClose={handleClose3}
            closeAfterTransition
            className="modal">
                <Grow timeout={300} in={displayModal3}>
            <div className="modalText">
                <h2 id="simple-modal-title">Credit Utilization</h2>
                {/* Pie Chart of How much its worht */}


                <p id="simple-modal-description">
                    Insight #1
                </p>
                <p id="simple-modal-description">
                    Insight #2
                </p>
                <p id="simple-modal-description">
                    Insight #3
                </p>
             </div>
             </Grow>
        </Modal>
        <Modal
            open={displayModal4}
            closeAfterTransition
            onClose={handleClose4}
            className="modal">
                <Grow timeout={300} in={displayModal4}>
            <div className="modalText">
                <h2 id="simple-modal-title">Length of Credit History</h2>
                {/* Pie Chart of How much its worth */}


                <p id="simple-modal-description">
                    Insight #1
                </p>
                <p id="simple-modal-description">
                    Insight #2
                </p>
                <p id="simple-modal-description">
                    Insight #3
                </p>
             </div>
             </Grow>
        </Modal>
        <Modal
            open={displayModal5}
            closeAfterTransition
            onClose={handleClose5}
            className="modal">
                <Grow timeout={300} in={displayModal5}>
            <div className="modalText">
                <h2 id="simple-modal-title">Credit Mix</h2>
                {/* Pie Chart of how much its worth */}


                <p id="simple-modal-description">
                    Insight #1
                </p>
                <p id="simple-modal-description">
                    Insight #2
                </p>
                <p id="simple-modal-description">
                    Insight #3
                </p>
                
             </div>
             </Grow>
        </Modal>
    </div>
  );
}

export default Insights;
