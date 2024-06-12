export class UserSequence {
  private static instance: UserSequence;

  private constructor(private next: number) {}

  private initialSequence(initial: number) {
    this.next = initial++;
  }

  public static getInstance(): UserSequence {
    if (!UserSequence.instance) {
      const currentMaxId = Math.random() * 1000;
      UserSequence.instance = new UserSequence(currentMaxId + 1);
    }
    return UserSequence.instance;
  }

  public getNext(): number {
    const next = this.next;
    this.next++;
    return next;
  }
}
