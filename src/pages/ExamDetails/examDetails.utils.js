import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const filteredExamQuestions = (examQuestions, search) =>
  examQuestions && search !== ""
    ? examQuestions.filter(({ description, answers }) => {
        if (description.includes(search)) {
          return true;
        }

        return answers.some(({ description }) => description.includes(search));
      })
    : examQuestions;

export const getUpdater = (examUid, questions) => {
  return async (action, indexQuestion, indexAnswer, note, indexNote) => {
    if (action === "CREATE") {
      questions[indexQuestion].answers[indexAnswer].notes =
        questions[indexQuestion].answers[indexAnswer].notes !== undefined
          ? [...questions[indexQuestion].answers[indexAnswer].notes, note]
          : [note];
    }

    if (action === "UPDATE") {
      questions[indexQuestion].answers[indexAnswer].notes[indexNote] = note;
    }

    if (action === "DELETE") {
      questions[indexQuestion].answers[indexAnswer].notes = questions[
        indexQuestion
      ].answers[indexAnswer].notes.filter((note, index) => indexNote !== index);
    }

    try {
      await updateDoc(doc(db, "exams", examUid), { questions: questions });
    } catch (e) {
      console.log(e);
    }
  };
};
