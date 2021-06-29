import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  isAnswered: boolean;
  questionNo: number;
  totalQuestion: number;
  userAnswer: any;
};
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  isAnswered,
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
        {answers.map((answer) => (
          <div>
            <button disabled={isAnswered} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
