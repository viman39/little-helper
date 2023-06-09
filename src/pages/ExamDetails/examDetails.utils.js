export const filteredExamQuestions = (examQuestions, search) =>
  examQuestions && search !== ""
    ? examQuestions.filter(({ description, answers }) => {
        if (description.includes(search)) {
          return true;
        }

        return answers.some(({ description }) => description.includes(search));
      })
    : examQuestions;
