import { QuizAnswer } from "./QuizAnswer";

export class QuizQuestion {
  constructor(
    public id: string,
    public category: string,
    public type: string,
    public difficulty: string,
    public question: string,
    public answers: QuizAnswer[]
  ) {
    this.id = id;
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.question = question;
    this.answers = answers;
  }
}
