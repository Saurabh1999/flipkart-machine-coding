import { Answer } from "./answer";
import { Topic } from "./topic";
import { User } from "./user";

export class Question {
  constructor(name: string, topics: Array<Topic>, createdByUser?: User) {
    this.name = name;
    this.createdByUser = createdByUser;
    this.noOfUpvotes = 0;
    this.topics = topics;
    this.answers = [];
  }

  public getName(): string {
    return this.name;
  }

  public getCreatedByUser(): User | undefined {
    return this.createdByUser;
  }
  public setCreatedByUser(user: User): void {
    this.createdByUser = user;
  }

  public getNoOfUpvotes(): number {
    return this.noOfUpvotes;
  }

  public upvote(): void {
    this.noOfUpvotes++;
  }

  public getTopics(): Array<Topic> {
    return this.topics;
  }

  public addAnswer(answer: Answer): void {
    this.answers.push(answer);
  }

  public getAllAnswers(): Array<Answer> {
    return this.answers;
  }

  private name: string;
  private createdByUser: User | undefined;
  private noOfUpvotes: number;
  private topics: Array<Topic>;
  private answers: Array<Answer>;
}
