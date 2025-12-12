export class UserAlreadyExistsError extends Error {
  constructor() {
    super("Pet Organization Already Exists.");
  }
}
