import { User } from "./user";

export class Answer {
  constructor(name: string, createdByUser: User) {
    this.name = name;
    this.createdByUser = createdByUser;
    this.noOfUpvotes = 0;
    this.isAccepted = false;
  }

  public getName(): string {
    return this.name;
  }

  public getCreatedByUser(): User {
    return this.createdByUser;
  }

  public getNoOfUpvotes(): number {
    return this.noOfUpvotes;
  }

  public upvote(): void {
    this.noOfUpvotes++;
  }

  private name: string;
  private createdByUser: User;
  private noOfUpvotes: number;
  private isAccepted: boolean;

  public isAnswerAccepted(): boolean {
    return this.isAccepted;
  }

  public setIsAnswerAccepted(isAccepted: boolean): void {
    this.isAccepted = isAccepted;
  }

}
