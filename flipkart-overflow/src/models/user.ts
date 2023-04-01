import { Profession } from "./profession";
import { Topic } from "./topic";

export class User {
  constructor(name: string, profession: Profession) {
    this.name = name;
    this.profession = profession;
    this.subscribedTopics = [];
  };

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getProfession(): Profession {
    return this.profession;
  }

  public setProfession(profession: Profession): void {
    this.profession = profession;
  }

  public getSubscribedTopics(): Array<Topic> {
    return this.subscribedTopics;
  }

  public subscribeTopic(topic: Topic): void {
    this.subscribedTopics.push(topic);
  }

  public isTopicSubscribed(topic: Topic) {
    return this.subscribedTopics.filter(subcribedTopic => subcribedTopic.getName() == topic.getName()).length > 0;
  }

  private name: string;
  private profession: Profession;
  private subscribedTopics: Array<Topic>;

}
