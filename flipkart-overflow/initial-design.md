1. User
  - name
  - profession
  - Array<Topic> subscribedTopics

2. Topic
  - name

3. Question
  - name
  - createdByUser
  - noOfUpvotes
  - Array<Topic>
  - Array<Answer>

4. Answer
  - name
  - noOfUpvotes
  - createdByUser



UserManagementService
 - <name, User> users;
 - logggedInUser
 - signupUser
 - logoutUser

QuestionManagementService
 - <name, Questions>
 - addQuestion
 - showQuestion
 - acceptAnswer
 - upvoteAu
