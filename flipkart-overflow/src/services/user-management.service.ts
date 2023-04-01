import { User } from "../models/user";

export class UserManagementService {
  constructor() {
    this.currentLoggedInUser = undefined;
    this.users = new Map<string, User>();
  }
  private currentLoggedInUser: User | undefined;

  public getCurrentLoggedInUser(): User | undefined {
    if (!this.currentLoggedInUser) {
      throw new Error('No User has logged in to the system');
    }
    return this.currentLoggedInUser;
  }

  public login(user: User): void {
    if (!this.users.has(user.getName())) {
      throw new Error('User Not Registerd!');
    }
    this.currentLoggedInUser = user;
  }

  public signup(user: User) {
    if (this.users.has(user.getName())) {
      throw new Error('User Already Registred with the same name!');
    }
    this.users.set(user.getName(), user);
    this.currentLoggedInUser = user;
  }

  public logout() {
    this.currentLoggedInUser = undefined;
  }

  public viewProfile() {
    return this.getCurrentLoggedInUser();
  }
  private users: Map<string, User>;
}
