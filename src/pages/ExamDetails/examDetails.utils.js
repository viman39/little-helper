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

export const getUpdater = (examUid) => {
  return async (examData) => {
    try {
      await updateDoc(doc(db, "exams", examUid), examData);
    } catch (e) {
      console.log(e);
    }
  };
};
