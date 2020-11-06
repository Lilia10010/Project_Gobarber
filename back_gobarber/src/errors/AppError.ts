class AppError {
  public readonly message: string;

  //codigo http do erro (ex: 404)
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
