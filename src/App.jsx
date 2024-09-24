import { useState } from "react";
import "./index.scss";

const questions = [
  {
    title: "React - это ... ?",
    variants: ["библиотека", "фреймворк", "приложение"],
    correct: 0,
  },
  {
    title: "Компонент - это ... ",
    variants: [
      "приложение",
      "часть приложения или страницы",
      "то, что я не знаю что такое",
    ],
    correct: 1,
  },
  {
    title: "Что такое JSX?",
    variants: [
      "Это простой HTML",
      "Это функция",
      "Это тот же HTML, но с возможностью выполнять JS-код",
    ],
    correct: 2,
  },
];

function Result({ correct, seeAnswers }) {
  return (
    <div className="result">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
        alt="Result"
      />
      <h2>
        Вы отгадали {correct} ответа из {questions.length}
      </h2>
      <a href="/">
        <button>Попробовать снова</button>
      </a>
      <button onClick={seeAnswers}>Подивитись відповіді</button>
    </div>
  );
}

function Answers({ questions }) {
  return (
    <div className="answers-block">
      {questions.map((elem, elemIndex) => (
        <div key={elemIndex}>
          <h1>{elem.title}</h1>
          <ul>
            {elem.variants.map((text, index) => (
              <li
                id={`${index}`}
                key={index}
                className={index === elem.correct ? "true-v" : ""}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Game({ question, onClickVariant, step }) {
  const percentage = Math.round((step / questions.length) * 100);
  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${percentage}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => (
          <li id={index} key={text} onClick={() => onClickVariant(index)}>
            {text}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const question = questions[step];
  const [correct, setCorect] = useState(0);
  const [answers, setAnswers] = useState(false);

  const seeAnswers = () => {
    setAnswers(!answers);
  };

  const onClickVariant = (index) => {
    const corectElement = document.getElementById(index);
    if (index == question.correct) {
      corectElement.className = "true-v";
      setCorect(correct + 1);
    } else {
      corectElement.className = "false-v";
    }
    setTimeout(() => {
      setStep(step + 1);
    }, 1000);
  };

  return (
    <div className="App">
      {step !== questions.length ? (
        <Game step={step} question={question} onClickVariant={onClickVariant} />
      ) : (
        <Result correct={correct} seeAnswers={seeAnswers} />
      )}
      {answers && <Answers questions={questions} />}
    </div>
  );
}

export default App;
