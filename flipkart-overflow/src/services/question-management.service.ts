import { Answer } from "../models/answer";
import { Question } from "../models/question";
import { Topic } from "../models/topic";
import { User } from "../models/user";
import { UserManagementService } from "./user-management.service";

export class QuestionManagementService {
  constructor(userManagementService: UserManagementService) {
    this.userManagementService = userManagementService;
    this.questions = new Map<string, Question>();
  }
  private userManagementService: UserManagementService;
  private questions: Map<string, Question>;

  public askQuestion(name: string, topics: Array<Topic>) {
    let loggedInUser = this.userManagementService.getCurrentLoggedInUser();
    if (this.questions.has(name)) {
      throw new Error('Duplicate Question');
    }
    let createdQuestion = new Question(name, topics, loggedInUser);
    if (loggedInUser) {
      this.validateUserHasSubscribedTheQuestionTopic(createdQuestion, loggedInUser);
    }
    this.questions.set(name, createdQuestion);
  }

  private validateUserHasSubscribedTheQuestionTopic(questionInstance: Question, loggedInUser: User) {
    let isUserHasSubscribedTheQuestionTopic = (questionInstance?.getTopics() ?? [])
      .filter(topic => loggedInUser?.isTopicSubscribed(topic)).length > 0;
    if (!isUserHasSubscribedTheQuestionTopic) {
      throw new Error('User Has not subscribed to this topic');
    }
    return true;
  }

  public answerQuestion(question: string, answer: string) {
    let loggedInUser = this.userManagementService.getCurrentLoggedInUser();
    if (!this.questions.has(question)) {
      throw new Error('Invalid Question');
    }
    let questionInstance = this.questions.get(question);
    if (questionInstance && loggedInUser) {
      this.validateUserHasSubscribedTheQuestionTopic(questionInstance, loggedInUser);
      let createdAnswer = new Answer(answer, loggedInUser)
      questionInstance?.addAnswer(createdAnswer);
    }
  }

  public acceptAnswer(question: string, answer: string) {
    let loggedInUser = this.userManagementService.getCurrentLoggedInUser();
    if (!this.questions.has(question)) {
      throw new Error('Invalid Question');
    }
    let questionInstance = this.questions.get(question);
    if (questionInstance && loggedInUser) {
      if (questionInstance.getCreatedByUser()?.getName() != loggedInUser.getName()) {
        throw new Error('User has not created this question');
      }
      this.validateUserHasSubscribedTheQuestionTopic(questionInstance, loggedInUser);
      let answerInstance = questionInstance.getAllAnswers().find(answerInstance => answerInstance.getName() == answer);
      if (!answerInstance) {
        throw new Error('Invalid Answer');
      }
      answerInstance.setIsAnswerAccepted(true);
      console.log(answerInstance);
    }
  }

  public upvoteAnswer(question: string, answer: string) {
    let loggedInUser = this.userManagementService.getCurrentLoggedInUser();
    if (!this.questions.has(question)) {
      throw new Error('Invalid Question');
    }
    let questionInstance = this.questions.get(question);
    if (questionInstance && loggedInUser) {
      this.validateUserHasSubscribedTheQuestionTopic(questionInstance, loggedInUser);
      let answerInstance = questionInstance.getAllAnswers().find(answerInstance => answerInstance.getName() == answer);
      if (!answerInstance) {
        throw new Error('Invalid Answer');
      }
      answerInstance.upvote();
    }
  }

  public upvoteQuestion(question: string) {
    let loggedInUser = this.userManagementService.getCurrentLoggedInUser();
    if (!this.questions.has(question)) {
      throw new Error('Invalid Question');
    }
    let questionInstance = this.questions.get(question);
    if (questionInstance && loggedInUser) {
      this.validateUserHasSubscribedTheQuestionTopic(questionInstance, loggedInUser);
      questionInstance.upvote();
    }
  }

  public viewQuestion(question: string) {
    let loggedInUser = this.userManagementService.getCurrentLoggedInUser();
    if (!this.questions.has(question)) {
      throw new Error('Invalid Question');
    }
    let questionInstance = this.questions.get(question);
    if (loggedInUser && questionInstance) {
      console.log('QUESTION DETAILS', questionInstance);
    }
    return questionInstance;
  }

  public showFeed(topicName?: string, isAnswered?: boolean) {
    let loggedInUser = this.userManagementService.getCurrentLoggedInUser();
    let allQuestions = Array.from(this.questions.values());
    if (topicName) {
      allQuestions = allQuestions
        .filter(question => question.getTopics().filter(topic => topic.getName() == topicName).length > 0);
    }
    if (isAnswered) {
      allQuestions = allQuestions
        .filter(question => question.getAllAnswers().length);
    }
    if (!allQuestions.length) {
      throw new Error('No Questions Available based on the filter');
    }
    return allQuestions;
  }
}
