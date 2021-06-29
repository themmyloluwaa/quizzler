import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNo: number;
  totalQuestion: number;
};
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNo,
  totalQuestion,
}) => {
  return (
    <div>
      <p className="number">
        Question: {questionNo} / {totalQuestion}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer, i) => (
          <div key={i}>
            <button value={answer} disabled={userAnswer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
