import { useState } from "react";
import Tooltip from "../../components/Tooltip/Tooltip";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { infoIcon, noteText } from "./answer.styles";

const Answer = ({
  description,
  isCorrect,
  lastUpdated,
  notes,
  showNotesDefault,
  examUpdater,
  indexAnswer,
  indexQuestion,
  exam,
  showAllNotes,
  userEmail,
}) => {
  const [showNotes, setShowNotes] = useState(showNotesDefault);
  const [note, setNote] = useState("");
  const color = isCorrect === null ? "grey" : isCorrect ? "green" : "red";

  const onClickHandler = () => {
    if (note === "") return;
    const newValue = `${userEmail}: ${note}`;
    const notes = exam.questions[indexQuestion].answers[indexAnswer]?.notes;
    exam.questions[indexQuestion].answers[indexAnswer].notes =
      notes === undefined ? [newValue] : [newValue, ...notes];
    examUpdater(exam);
    setNote("");
  };

  return (
    <div style={{ color: color }}>
      <span>
        {lastUpdated.length > 0 ? (
          <Tooltip text={lastUpdated.toString()}>
            <>-</>
          </Tooltip>
        ) : (
          <>-</>
        )}
      </span>
      <span onClick={() => setShowNotes((oldShowNotes) => !oldShowNotes)}>
        {description}{" "}
        {notes && notes.length > 0 && (
          <span className={infoIcon}>&#128712;</span>
        )}
      </span>
      {(showNotes || showAllNotes) && notes && (
        <>
          {notes.map((note, index) => (
            <div key={index} className={noteText}>
              {note}
            </div>
          ))}
        </>
      )}
      {showNotes && (
        <div>
          <Input
            type="text"
            placeholder="Notiță"
            style={{ width: "50vw" }}
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
          <Button title="Adauga" onClick={onClickHandler} />
        </div>
      )}
    </div>
  );
};

export default Answer;
