import { useState } from "react";

function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerSelection = (option) => {
    setSelectedAnswer(option);
    props.onAnswerSubmit(option);
  };

  const getButtonColor = (answer) => {
    if (!props.submitted && selectedAnswer === answer) {
      return "#D6DBF5"
    }
    else if (props.submitted) {
      if (answer === props.correctAnswer) {
        return "#94D7A2"
      } else if (selectedAnswer === answer && answer !== props.correctAnswer) {
        return "#F8BCBC"
      }
    }
  }

  return (
    <div className="question">
      <h3>{props.question}</h3>
      <div className="options">
        {props.choices.map((answer) => (
          <button
            key={answer}
            className="answer"
            onClick={() => {
                handleAnswerSelection(answer)
                
            }}
            disabled = {props.disabled}
            style={{
              //backgroundColor: selectedAnswer === answer ? "#D6DBF5" : props.submitted ? "#D9D9D9" : (props.submitted && selectedAnswer === props.correctAnswer ? "#94D7A2" : "#F8BCBC"),
              border: selectedAnswer === answer ? "none" : props.submitted ? "1px solid #F0F0F0" : "1px solid #293264",
              //backgroundColor: props.submitted && selectedAnswer === props.correctAnswer ? "94D7A2" : "F8BCBC"
              backgroundColor: getButtonColor(answer)
            }}
            
          >
            {answer}
          </button>
        ))}
      </div>
    </div> //checkScore
  );
}

export default Question;
//options
//options = {shuffleAnswers(item.correct_answer, item.incorrect_answers)}

/*onClick={() => {
              setSelectedAnswer(answer);
              props.onAnswerSubmit(answer);
            }} */

/*{props.shuffleAnswers(props.item.correct_answer, props.item.incorrect_answers).map(
          (answer) => (
            <button
              className="answer"
              onClick={() => {
                setSelectedAnswer(answer)
                props.onAnswerSubmit(answer, props.id)
              }}
              style={{backgroundColor: selectedAnswer === answer ? "#D6DBF5" : "white"}}  
            >
              {answer}
            </button>
          )
        )} */

/*{props.shuffleAnswers(props.item.correct_answer, props.item.incorrect_answers).map((option) => {
            <button className="answer" onClick={() => handleAnswerSelection(option)}> {option}</button>
        })} */
