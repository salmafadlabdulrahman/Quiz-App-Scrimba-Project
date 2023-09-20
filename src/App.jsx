import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Question from "./Question";
import Confetti from "react-confetti";

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [test, setTest] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [replay, setReplay] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const startQuiz = async () => {
    try {
      Axios.get(
        "https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple"
      ).then((response) => {
        const formattedQuestions = response.data.results.map((element) => ({
          question: element.question,
          choices: shuffleAnswers(
            element.correct_answer,
            element.incorrect_answers
          ),
          correctAnswer: element.correct_answer,
          incorrectAnswers: element.incorrect_answers,
        }));
        

        setAllQuestions(formattedQuestions);
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    startQuiz();
  }, []);

  function shuffleAnswers(correctAnswer, incorrect) {
    let answers = [correctAnswer, ...incorrect];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  const handleAnswerSubmission = (questionId, answer) => {
    // Check if the answer for the current question already exists in the answers array
    const existingAnswerIndex = allAnswers.findIndex(
      (ans) => ans.questionId === questionId
    );

    if (existingAnswerIndex !== -1) {
      // If an answer already exists, update it
      setAllAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, answer };
        return updatedAnswers;
      });
    } else {
      // If no answer exists for the question, add a new answer
      setAllAnswers((prevAnswers) => [...prevAnswers, { questionId, answer }]);
    }
  };

  function checkScore() {
    if (allAnswers.length < 5) {
      alert("You need to answer all the questions");
    } else {
      allAnswers.map((el) => {
        allQuestions.map((question) => {
          if (el.answer === question.correctAnswer) {
            setScore((prevScore) => prevScore + 1);
            setReplay((prev) => !prev);
          }
        });
      });
      setSubmitted((prev) => !prev);
    }

    if (submitted) {
      startQuiz();
      setScore(0);
    }
  }

  return (
    <div>
      {score === 5 && <Confetti />}
      {!test ? (
        <div>
          <h1>Quizzical</h1>
          <h3>Ready for the quiz?</h3>
          <button
            className="start-btn"
            onClick={() => setTest((prev) => !prev)}
          >
            Start quiz
          </button>{" "}
        </div>
      ) : (
        <div className="questions">
          {allQuestions.map((item, index) => (
            <Question
              item={item}
              question={item.question}
              choices={item.choices}
              correctAnswer={item.correctAnswer}
              disabled={submitted}
              submitted={submitted}
              key={index}
              id={index}
              onAnswerSubmit={(answer) => handleAnswerSubmission(index, answer)}
            />
          ))}

          {submitted ? (
            <div className="result-container">
              <h4>You scored {score}/5 correct answers</h4>
              <button className="check-answers" onClick={checkScore}>
                Play Again
              </button>
            </div>
          ) : (
            <button className="check-answers" onClick={checkScore}>
              {!replay ? "Check answers" : "Play Again"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
