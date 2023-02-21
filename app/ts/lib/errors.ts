export class NoElementsError extends Error {
  name = "NoElementsError";
  constructor(message: string | undefined) {
    super(message);
  }
}
