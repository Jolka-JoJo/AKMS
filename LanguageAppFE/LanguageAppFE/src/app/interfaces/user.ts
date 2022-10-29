
export interface UserForRegistrationDto {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Role: string;
}

export interface RegistrationResponseDto {
  isSuccessfulRegistration: boolean;
  errros: string[];
}

export interface UserForAuthenticationDto {
  Email: string;
  Password: string;
}

export interface AuthResponseDto {
  IsAuthSuccessful: boolean;
  ErrorMessage: string;
  Token: string;
}
