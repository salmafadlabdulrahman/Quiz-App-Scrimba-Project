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
              border: selectedAnswer === answer ? "none" : props.submitted ? "1px solid #F0F0F0" : "1px solid #293264",
              backgroundColor: getButtonColor(answer)
            }}
            
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
