import { Profession } from "./models/profession";
import { Topic } from "./models/topic";
import { User } from "./models/user";
import { QuestionManagementService } from "./services/question-management.service";
import { UserManagementService } from "./services/user-management.service";

let userManagementService = new UserManagementService();
let questionManagementService = new QuestionManagementService(userManagementService);

let user1 = new User('USER1', Profession.DEVELOPER);
let user2 = new User('USER2', Profession.TECHLEAD);

user1.subscribeTopic(new Topic('NodeJs'));
userManagementService.signup(user1);
console.log(userManagementService.viewProfile());

questionManagementService.askQuestion('JAVA vs JAVASCript', [new Topic('JAVA'), new Topic('NodeJs')]);
questionManagementService.answerQuestion('JAVA vs JAVASCript', 'Both has its own benefits');

questionManagementService.upvoteQuestion('JAVA vs JAVASCript');
questionManagementService.viewQuestion('JAVA vs JAVASCript');
questionManagementService.upvoteAnswer('JAVA vs JAVASCript', 'Both has its own benefits');
questionManagementService.acceptAnswer('JAVA vs JAVASCript', 'Both has its own benefits');

console.log('FEED', questionManagementService.showFeed());
userManagementService.logout();

userManagementService.signup(user2);






