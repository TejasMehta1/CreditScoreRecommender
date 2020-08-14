
import './App.css';
import CategoryCard from "./CategoryCard.js";
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow' 
import axios from 'axios';
import Card from 'react-bootstrap/Card'
// import paymentHistoryImg from './images/payment-history.png';


function Insights() {

    const creditCardUrl = "https://www.capitalone.com/credit-cards/";

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
                    "accuracy_value": 0,
                    "id": 2468
                },
                {
                    "loan_type": "Credit Card",
                    "accuracy_value": 0,
                    "card_id": 9887,
                    "id": 1357
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

    const [creditScore, setCreditScore] = useState(0);
    const [mainEmoji, setMainEmoji] = useState('');
    const [section1Emoji, setSection1Emoji] = useState('');
    const [section2Emoji, setSection2Emoji] = useState('');
    const [section3Emoji, setSection3Emoji] = useState('');
    const [section4Emoji, setSection4Emoji] = useState('');
    const [section5Emoji, setSection5Emoji] = useState('');
    const [section1Score, setSection1Score] = useState(0);
    const [section2Score, setSection2Score] = useState(0);
    const [section3Score, setSection3Score] = useState(0);
    const [section4Score, setSection4Score] = useState(0);
    const [section5Score, setSection5Score] = useState(0);
    const [modal1message1, setModal1Message1] = useState('');
    const [lateLoans, setLateLoans] = useState([]);
    const [modal2message2, setModal2Message2] = useState('');
    const [creditCards, setCreditCards] = useState([]);
    const [modal3message3, setModal3Message3] = useState('');
    const [cardRatios, setCardRatios] = useState({});
    const [modal4message4, setModal4Message4] = useState('');
    const [modal5message5, setModal5Message5] = useState('');
    const [showCCUrl, setShowCCUrl] = useState(false);
    const [displayModal1, setDisplayModal1] = useState(false);
    const [displayModal2, setDisplayModal2] = useState(false);
    const [displayModal3, setDisplayModal3] = useState(false);
    const [displayModal4, setDisplayModal4] = useState(false);
    const [displayModal5, setDisplayModal5] = useState(false);

    

    React.useEffect(() => {
        console.log('componentDidMount');
        axios.post(process.env.REACT_APP_LAMBDA_ENDPOINT, data)
        .then(res => {
          insights = res.data;
          console.log(insights);
          setGeneralEmojiBasedOnScore();
          setSection1EmojiFromScore();
          setSection2EmojiFromScore();
          setSection3EmojiFromScore();
          setSection4EmojiFromScore();
          setSection5EmojiFromScore();
          setSection1Score(insights.section_one.score_one);
          setSection2Score(insights.section_two.score_two);
          setSection3Score(insights.section_three.score_three);
          setSection4Score(insights.section_four.score_four);
          setSection5Score(insights.section_five.score_five);
          setCreditScore(parseInt(insights.credit_score));
          setModal1Message1(insights.section_one.message_one);
          setLateLoans(insights.section_one.late_loans);
          setCardRatios(insights.section_three.per_card_ratio);
          setShowCCUrl(insights.section_two.show_credit_url);
          setModal2Message2(insights.section_two.message_two);
          setCreditCards(insights.section_two.credit_card_deadlines);
          setModal3Message3(insights.section_three.message_three);
          setModal4Message4(insights.section_four.message_four);
          setModal5Message5(insights.section_five.message_five);
        })
    }, []);
    


    const setSection1EmojiFromScore = () => {
        let emojiScore = insights.section_one.score_one;
        let emojiChar = setSectionEmojiBasedOnScore(emojiScore);
        setSection1Emoji(emojiChar);
    }
    const setSection2EmojiFromScore = () => {
        let emojiScore = insights.section_two.score_two;
        let emojiChar = setSectionEmojiBasedOnScore(emojiScore);
        setSection2Emoji(emojiChar);
    }
    const setSection3EmojiFromScore = () => {
        let emojiScore = insights.section_three.score_three;
        let emojiChar = setSectionEmojiBasedOnScore(emojiScore);
        setSection3Emoji(emojiChar);
    }
    const setSection4EmojiFromScore = () => {
        let emojiScore = insights.section_four.score_four;
        let emojiChar = setSectionEmojiBasedOnScore(emojiScore);
        setSection4Emoji(emojiChar);
    }
    const setSection5EmojiFromScore = () => {
        let emojiScore = insights.section_five.score_five;
        let emojiChar = setSectionEmojiBasedOnScore(emojiScore);
        setSection5Emoji(emojiChar);
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
        return emojiChar;
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
        <Card className="text-center results">
            <Card.Body>
                <Card.Title className="scoreResults">Credit Score: {creditScore}</Card.Title>
                <Card.Text className="emojiResults">
                    {mainEmoji}
                </Card.Text>
            </Card.Body>
        </Card>
        <div style={{width: "80%", marginRight: "auto", marginLeft: "auto"}}>
        <div className="cardRow">
                <CategoryCard borderColor={"rgba(71,152,211,.25)"} hovercard={true} activateModal={handleOpen1} text="Payment History" emoji={section1Emoji} id="card1"/>
                <CategoryCard hovercard={true} activateModal={handleOpen2} text="Number of Credit Cards" emoji={section2Emoji} id="card2"/>
                <CategoryCard hovercard={true} activateModal={handleOpen3} text="Credit Utilization" emoji={section3Emoji} id="card3"/>
        </div>
        <div className="secondRow cardRow">
            <CategoryCard hovercard={true} activateModal={handleOpen4} text="Credit History Length" emoji={section4Emoji} id="card4"/>
            <CategoryCard hovercard={true} activateModal={handleOpen5} text="Credit Mix" emoji={section5Emoji} id="card5"/>
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
            <h2 id="simple-modal-title">Payment History ({section1Score} out of 5)</h2>
                {/* Pie Chart of How much its worth */}
                {/* <img className="paymentHistory" src={paymentHistoryImg}></img> */}
                <p id="simple-modal-description">
                    {modal1message1}
                </p>
                {lateLoans.map(loan => 
                    <p id="simple-modal-description" >
                        <b>
                            Be sure to pay Loan #{loan.id} on time!
                        </b>
                    </p>
                )}
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
                <h2 id="simple-modal-title">Number of Credit Cards ({section2Score} out of 5)</h2>
                {/* Pie Chart of How much its worht */}
                <p id="simple-modal-description">
                {modal2message2} {showCCUrl ? <a href={creditCardUrl}>{creditCardUrl}</a> : "."} 
                </p>
                {creditCards.map(card => 
                    <p id="simple-modal-description" >
                        <b>
                            Credit Card #{card.id} payment is due on {card.payment_deadline}!
                        </b>
                    </p>
                )}
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
                <h2 id="simple-modal-title">Credit Utilization ({section3Score} out of 5)</h2>
                {/* Pie Chart of How much its worht */}
                <p id="simple-modal-description">
                    {modal3message3}
                </p>
                
                {Object.keys(cardRatios).map(key => (
                    <p id="simple-modal-description" >
                        <b>
                            You are using Card #{key} at {cardRatios[key] * 100}% of your card limit!
                        </b>
                    </p>
                ))}
                </div>
                </Grow>
        </Modal>

        <Modal
            open={displayModal4}
            onClose={handleClose4}
            closeAfterTransition
            onClose={handleClose4}
            className="modal">
                <Grow timeout={300} in={displayModal4}>
            <div className="modalText">
                <h2 id="simple-modal-title">Credit History Length ({section4Score} out of 5)</h2>
                {/* Pie Chart of How much its worth */}
                <p id="simple-modal-description">
                    {modal4message4}
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
                <h2 id="simple-modal-title">Credit Mix ({section5Score} out of 5)</h2>
                {/* Pie Chart of how much its worth */}
                <p id="simple-modal-description">
                    {modal5message5}
                </p>
            </div>
            </Grow>
            </Modal>
            </div>
  )
}
export default Insights;