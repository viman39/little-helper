import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

const getLastUpdated = (oldValues, value) => {
  if (typeof oldValues === "string") {
    return [oldValues];
  } else {
    return oldValues.unshift(value);
  }
};

export const getExam = async (examId) => {
  const collectionRef = query(
    collection(db, "exams"),
    where("id", "==", examId)
  );
  const querySnapshot = await getDocs(collectionRef);

  const exams = querySnapshot.docs.map((doc) => ({
    uid: doc.id,
    data: doc.data(),
  }));

  return exams.length > 0 ? exams[0] : null;
};

export const getExamQuestions = (questionExams) => {
  let questions = [];

  questionExams.forEach((question) => {
    if (!questions.find((q) => q.id === question.question.id)) {
      questions.push({
        id: question.question.id,
        description: question.question.description,
        answers: question.answerExams.map(({ isChecked, answer }) => ({
          id: answer.id,
          description: answer.description,
          isChecked,
          isCorrect: answer.isCorrect,
        })),
      });
    }
  });

  return questions;
};

export const updateExam = async (questions, exam, userEmail) => {
  questions.forEach(({ id, answers }) => {
    const examQuestionIndex = exam.data.questions.findIndex(
      (el) => el.id === id
    );

    answers.forEach(({ id, isCorrect }) => {
      const examAnswerIndex = exam.data.questions[
        examQuestionIndex
      ].answers.findIndex((el) => el.id === id);

      if (
        exam.data.questions[examQuestionIndex].answers[examAnswerIndex]
          .isCorrect === null
      ) {
        exam.data.questions[examQuestionIndex].answers[
          examAnswerIndex
        ].isCorrect = isCorrect;
        exam.data.questions[examQuestionIndex].answers[
          examAnswerIndex
        ].lastUpdated = getLastUpdated(
          exam.data.questions[examQuestionIndex].answers[examAnswerIndex]
            .lastUpdated,
          `${userEmail} - EXAM: ${new Date().toString()}`
        );
      }
    });

    const examAnswers = exam.data.questions[examQuestionIndex].answers;
    const countCorrectAnswers = examAnswers.filter(
      (el) => el.isCorrect === true
    ).length;
    const countWrongAnswers = examAnswers.filter(
      (el) => el.isCorrect === false
    ).length;

    if (countCorrectAnswers + countWrongAnswers === 10) {
      exam.data.questions[examQuestionIndex].isCompleted = true;
    } else {
      if (countCorrectAnswers === 5) {
        examAnswers.forEach((answer) => {
          if (answer.isCorrect === null) {
            answer.isCorrect = false;
            answer.lastUpdated = getLastUpdated(
              answer.lastUpdated,
              `${userEmail} - FILLED: ${new Date().toString()}`
            );
          }
        });
        exam.data.questions[examQuestionIndex].isCompleted = true;
      } else if (countWrongAnswers === 5) {
        examAnswers.forEach((answer) => {
          if (answer.isCorrect === null) {
            answer.isCorrect = true;
            answer.lastUpdated = getLastUpdated(
              answer.lastUpdated,
              `${userEmail} - FILLED: ${new Date().toString()}`
            );
          }
        });
        exam.data.questions[examQuestionIndex].isCompleted = true;
      }
    }
  });

  const { answers, filledAnswers } = exam.data.questions.reduce(
    ({ answers, filledAnswers }, question) => {
      return {
        answers: answers + question.answers.length,
        filledAnswers:
          filledAnswers +
          question.answers.filter((answer) => answer.isCorrect != null).length,
      };
    },
    { answers: 0, filledAnswers: 0 }
  );

  exam.data.percentageFilled = Math.round((filledAnswers / answers) * 100);
  await updateDoc(doc(db, "exams", exam.uid), exam.data);
};
