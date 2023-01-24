import useQuestionStore from "../store/zustand";
import { useParams, useNavigate } from "react-router-dom";
import TimeStamp from "../components/TimeStamp";
import AnimateProvider from "../components/AnimateProvider";
import Question from "../components/Question";

function SingleQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    question: allQuestion,
    trueAction,
    falseAction,
    addAnswer,
  } = useQuestionStore();

  const singleQuestion = allQuestion?.[id - 1];
  const { correct_answer } = singleQuestion;

  const handleClick = (value) => {
    const getUrl = () =>
      Number(id) === allQuestion.length
        ? "/finish"
        : `/question/${Number(id) + 1}`;

    //Add answer
    addAnswer({ question: singleQuestion.question, answer: value });

    //Verify Answer
    if (value === correct_answer) {
      trueAction();
    } else {
      falseAction();
    }

    navigate(getUrl());
  };

  return (
    <AnimateProvider className="max-w-xl mx-auto">
      <div className="flex max-w-fit flex-col ml-auto space-x-3 mb-10">
        <TimeStamp />
      </div>

      <Question
        id={id}
        handleClick={handleClick}
        singleQuestion={singleQuestion}
      />
    </AnimateProvider>
  );
}

export default SingleQuestion;
