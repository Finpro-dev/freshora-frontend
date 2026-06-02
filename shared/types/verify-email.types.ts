export interface ServerActionReturnValue {
  success: boolean;
  error?: string | undefined;
  data?: any | undefined;
}

export interface verifyEmailTokenProps {
  tokenProps?: string;
  handleSubmitPassword: (
    password: string,
    confirmPassword: string,
    token: string,
  ) => Promise<ServerActionReturnValue>;
  handleResendLink: (email?: string) => void;
}
