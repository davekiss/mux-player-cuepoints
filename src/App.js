import './App.css';

import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

// You'd typically pull questions like these from your database
// instead of hardcording them into your application, but this
// will do for demo purposes.
const MY_TOUGH_STUMPERS = [
  {
    time: 4,
    value: {
      question: "What color is the ink drop in the water?",
      options: [
        {
          label: "Red",
          value: "red",
          isCorrect: false
        },
        {
          label: "Green",
          value: "green",
          isCorrect: false
        },
        {
          label: "Blue",
          value: "blue",
          isCorrect: true
        }
      ]
    }
  },
  {
    time: 10,
    value: {
      question: "How about this one?",
      options: [
        {
          label: "C",
          value: "c",
          isCorrect: true
        },
        {
          label: "D",
          value: "d",
          isCorrect: false
        }
      ]
    }
  }
];

// export const EnumRenderer = ({
//   name,
//   value,
//   label,
//   onChange,
//   values,
// }) => {
//   const labelStr = label ?? toWordsFromCamel(name);
//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
//       <label>{labelStr} (<code>{name}</code>)</label>
//       <div>
//         <input
//           id={`${name}-none-control`}
//           type="radio"
//           onChange={() => onChange({ [name]: undefined })}
//           value=""
//           checked={value == undefined}
//         />
//         <label htmlFor={`${name}-none-control`}>None</label>
//         {values.map((enumValue, i) => {
//           return (<key={`${name}-${enumValue}`}>
//             <input
//               id={`${name}-${enumValue}-control`}
//               type="radio"
//               onChange={() => onChange({ [name]: values[i] })}
//               value={enumValue}
//               checked={value === enumValue}
//             />
//             <label htmlFor={`${name}-${enumValue}-control`}><code>{JSON.stringify(enumValue)}</code></label>
//             </>
//           )
//         })}
//       </div>
//     </div>
//   );
// };

const Question = ({ question, options = [], setCurrentQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (answer) => {
    setSelectedAnswer(answer);
    setIsError(!answer.isCorrect);
  };

  return (
    <div className="question">
      {isError && (
        <div className="error">Incorrect answer. Please try again.</div>
      )}
      <h2>{question}</h2>
      <div className="answers">
        {options.map((answer, i) => {
          return (
            <div key={i}>
              <input
                type="radio"
                id={`answer-${i}`}
                name="answer"
                value={answer.value}
                onChange={() => handleChange(answer)}
              />
              <label htmlFor={`answer-${i}`}>{answer.label}</label>
            </div>
          );
        })}
      </div>
      {!isError && selectedAnswer && (
        <button onClick={() => setCurrentQuestion(null)}>
          Correct! Continue &rarr;
        </button>
      )}
    </div>
  );
};

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null);

  return (
    <div className="App">
      <div style={{ position: "relative" }}>
        {currentQuestion && (
          <Question
            question={currentQuestion.question}
            options={currentQuestion.options}
            setCurrentQuestion={setCurrentQuestion}
          />
        )}
        <MuxPlayer
          style={!!currentQuestion ? { "--controls": "none" } : {}}
          muted
          defaultHiddenCaptions
          stream-type="on-demand"
          onLoadedMetadata={(e) => e.target.addCuePoints(MY_TOUGH_STUMPERS)}
          onCuePointChange={({ target }) => {
            target.pause();
            setCurrentQuestion(target.activeCuePoint.value);
          }}
          playbackId={`23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I`}
        />
      </div>

      <h1>Interactive Video Quiz</h1>
      <h2>Start playing the video to see the questions</h2>
    </div>
  );
}
