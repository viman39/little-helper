const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export function* getRandomQuestion(questions) {
  while (true) {
    const shuffledQuestions = shuffleArray(questions);
    for (const question of shuffledQuestions) {
      yield {
        ...question,
        answers: shuffleArray(
          question.answers
            .filter((answer) => answer.isCorrect !== null)
            .map((answer) => ({ ...answer, isSelected: false }))
        ),
      };
    }
  }
}
