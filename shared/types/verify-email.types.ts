export interface verifyEmailTokenProps {
  tokenProps?: string;
  handleSubmitPassword: (
    password: string,
    confirmPassword: string,
    token: string,
  ) => Promise<void>;
}
