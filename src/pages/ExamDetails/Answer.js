import { useState } from "react";
import Tooltip from "../../components/Tooltip/Tooltip";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  infoIcon,
  noteDeleteButton,
  noteEditButton,
  noteText,
} from "./answer.styles";

const Answer = ({
  description,
  isCorrect,
  lastUpdated,
  notes,
  showNotesDefault,
  showAllNotes,
  indexQuestion,
  indexAnswer,
  examUpdater,
  userEmail,
}) => {
  const [showNotes, setShowNotes] = useState(showNotesDefault);
  const [noteToEditIndex, setNoteToEditIndex] = useState(null);
  const [note, setNote] = useState("");
  const color = isCorrect === null ? "grey" : isCorrect ? "green" : "red";

  const updateNotesHandler = () => {
    if (note === "") return;

    const newValue = `${userEmail}: ${note}`;
    const action = noteToEditIndex !== null ? "UPDATE" : "CREATE";

    examUpdater(action, indexQuestion, indexAnswer, newValue, noteToEditIndex);
    setNote("");
    setNoteToEditIndex(null);
  };

  const deleteNoteHandler = (index) => {
    examUpdater("DELETE", indexQuestion, indexAnswer, "", index);
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
        {description}
        {notes && notes.length > 0 && (
          <span className={infoIcon}>&#128712;</span>
        )}
      </span>
      {(showNotes || showAllNotes) && notes && (
        <>
          {notes.map((note, index) => (
            <div key={index} className={noteText}>
              {note}
              {note.includes(userEmail) && (
                <>
                  {noteToEditIndex === null && (
                    <span
                      className={noteEditButton}
                      onClick={() => {
                        setNoteToEditIndex(index);
                        setNote(note.split(" ")[1]);
                      }}
                    >
                      (edit)
                    </span>
                  )}
                  {noteToEditIndex !== null && (
                    <span
                      className={noteEditButton}
                      onClick={() => {
                        setNoteToEditIndex(null);
                        setNote("");
                      }}
                    >
                      (cancel)
                    </span>
                  )}
                  <span
                    className={noteDeleteButton}
                    onClick={() => deleteNoteHandler(index)}
                  >
                    (delete)
                  </span>
                </>
              )}
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
          <Button
            title={noteToEditIndex === null ? "Adauga" : "Update"}
            onClick={updateNotesHandler}
          />
        </div>
      )}
    </div>
  );
};

export default Answer;
