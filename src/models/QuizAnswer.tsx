export class QuizAnswer {
  constructor(
    public id: string,
    public question: string,
    public questionId: string,
    public answerText: string,
    public isCorrect: boolean
  ) {
    this.id = id;
    this.question = question;
    this.questionId = questionId;
    this.answerText = answerText;
    this.isCorrect = isCorrect;
  }
}
