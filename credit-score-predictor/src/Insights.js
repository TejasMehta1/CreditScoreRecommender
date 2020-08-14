
import './App.css';
import CategoryCard from "./CategoryCard.js";
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow' 
import ProgressBar from 'react-animated-progress-bar';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import paymentHistoryImg from './images/payment-history-01.png';
import creditMixImg from './images/credit-mix-02.png';
import creditHistoryImg from './images/credit-history-03.png';
import creditUtilizationImg from './images/credit-utilization-04.png';
import numCardsImg from './images/num-cards-05.png';


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
    const [uselessBoolean, setUselessBoolean] = useState('');
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
    const [section1Rank, setSection1Rank] = useState('');
    const [section2Rank, setSection2Rank] = useState('');
    const [section3Rank, setSection3Rank] = useState('');
    const [section4Rank, setSection4Rank] = useState('');
    const [section5Rank, setSection5Rank] = useState('');
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
        axios.post(process.env.REACT_APP_LAMBDA_ENDPOINT, 
            data)
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
          setSection1RankFromScore();
          setSection2RankFromScore();
          setSection3RankFromScore();
          setSection4RankFromScore();
          setSection5RankFromScore();
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

    const setSection1RankFromScore = () => {
        let score = insights.section_one.score_one;
        let ranking = setSectionRankBasedOnScore(score);
        setSection1Rank(ranking);
    }
    const setSection2RankFromScore = () => {
        let score = insights.section_two.score_two;
        let ranking = setSectionRankBasedOnScore(score);
        setSection2Rank(ranking);
    }
    const setSection3RankFromScore = () => {
        let score = insights.section_three.score_three;
        let ranking = setSectionRankBasedOnScore(score);
        setSection3Rank(ranking);
    }
    const setSection4RankFromScore = () => {
        let score = insights.section_four.score_four;
        let ranking = setSectionRankBasedOnScore(score);
        setSection4Rank(ranking);
    }
    const setSection5RankFromScore = () => {
        let score = insights.section_five.score_five;
        let ranking = setSectionRankBasedOnScore(score);
        setSection5Rank(ranking);
    }

    const setSectionRankBasedOnScore = (score) => {
        let ranking = '';
        switch(score) {
            case 1:
                ranking = 'You rank as the bottom 33% of all users 🙄';
                break;
            case 2:
                ranking = 'You rank as the top 50% of all users 😏';
                break;
            case 3:
                ranking = 'You rank as the top 33% of all users 🤑';
                break;
        }
        return ranking;
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
    
    const uselessOpen = () => {
        setUselessBoolean(true);
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
        <div className="text-center results">
            <div>
                <Card.Title className="scoreResults">Credit Score:</Card.Title>
                <CircularProgressbar value={(creditScore-300)/550*100} text={`${creditScore} ${mainEmoji}`} />
            </div>
        </div>
        <div style={{width: "80%", marginRight: "auto", marginLeft: "auto", marginTop: "-300px"}}>
        <div className="firstRow cardRow">
                <CategoryCard hovercard={true} activateModal={handleOpen1} text="Payment History" emoji={section1Emoji} colorId="card1"/>
                <CategoryCard displayCard={"invisible"} activateModal={uselessOpen} colorId="invisibleCard"/>
                <CategoryCard hovercard={true} activateModal={handleOpen3} text="Credit Utilization" emoji={section3Emoji} colorId="card3"/>
        </div>
        <div className="secondRow cardRow">
        <CategoryCard hovercard={true} activateModal={handleOpen2} text="Number of Credit Cards" emoji={section2Emoji} colorId="card2"/>
            <CategoryCard hovercard={true} activateModal={handleOpen4} text="Credit History Length" emoji={section4Emoji} colorId="card4"/>
            <CategoryCard hovercard={true} activateModal={handleOpen5} text="Credit Mix" emoji={section5Emoji} colorId="card5"/>
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
            <h2 id="simple-modal-title">Payment History (Your Score: {section1Score}/3)</h2>
                {/* Pie Chart of How much its worth */}
                <img className="pieChartImg" src={paymentHistoryImg}></img>
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
                <p id="modal-ranking">
                    {section1Rank}
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
                <h2 id="simple-modal-title">Number of Credit Cards (Your Score: {section2Score}/3)</h2>
                {/* Pie Chart of How much its worht */}
                <img className="pieChartImg" src={numCardsImg}></img>
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
                <p id="modal-ranking">
                    {section2Rank}
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
                <h2 id="simple-modal-title">Credit Utilization (Your Score: {section3Score}/3)</h2>
                {/* Pie Chart of How much its worht */}
                <img className="pieChartImg" src={creditUtilizationImg}></img>
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
                <p id="modal-ranking">
                    {section3Rank}
                </p>
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
                <h2 id="simple-modal-title">Credit History Length (Your Score: {section4Score}/3)</h2>
                {/* Pie Chart of How much its worth */}
                <img className="pieChartImg" src={creditHistoryImg}></img>
                <p id="simple-modal-description">
                    {modal4message4}
                </p>
                <p id="modal-ranking">
                    {section4Rank}
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
                <h2 id="simple-modal-title">Credit Mix (Your Score: {section5Score}/3)</h2>
                {/* Pie Chart of how much its worth */}
                <img className="pieChartImg" src={creditMixImg}></img>
                <p id="simple-modal-description">
                    {modal5message5}
                </p>
                <p id="modal-ranking">
                    {section5Rank}
                </p>
            </div>
            </Grow>
            </Modal>
            </div>
  )
}
export default Insights;