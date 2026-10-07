export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  profile: {
    phone?: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}
