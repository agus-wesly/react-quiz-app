import useQuestionStore from "../store/zustand";
import { useParams, useNavigate } from "react-router-dom";
import Option from "../components/Option";
import TimeStamp from "../components/TimeStamp";
import he from "he";

function SingleQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { question: allQuestion, trueAction, falseAction } = useQuestionStore();

  const singleQuestion = allQuestion?.[id - 1];
  const { question, incorrect_answers, correct_answer } = singleQuestion;

  const options = incorrect_answers
    .concat(correct_answer)
    .sort(() => Math.random() - 0.5);

  const handleClick = (value) => {
    const getUrl = () =>
      Number(id) === allQuestion.length
        ? "/finish"
        : `/question/${Number(id) + 1}`;

    //Verify Answer
    if (value === correct_answer) {
      trueAction();
    } else {
      falseAction();
    }

    navigate(getUrl());
  };

  return (
    <section className="max-w-xl mx-auto">
      <div className="flex max-w-fit flex-col ml-auto space-x-3 mb-10">
        <TimeStamp />
      </div>

      <div className="flex items-start space-x-3 text-lg mb-10">
        <h3 className="text-gray-800 font-semibold text-center">{id}.</h3>

        <h3 className="text-gray-800 font-semibold">{he.decode(question)}</h3>
      </div>

      {options.map((opt, i) => (
        <Option key={i} value={opt} idx={i} handleClick={handleClick} />
      ))}
    </section>
  );
}

export default SingleQuestion;
