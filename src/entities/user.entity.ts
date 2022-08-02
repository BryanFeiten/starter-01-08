import { randomUUID } from "crypto";

export class User {
  uuid: string;

  constructor(
    public username: string,
    public name: string,
    public email: string,
    public password: string,
  ) {
    this.uuid = randomUUID();
  }

  toView = () => {
    return {
      username: this.username,
      name: this.name,
    }
  }
}