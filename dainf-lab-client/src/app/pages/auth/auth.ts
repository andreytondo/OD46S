export interface AuthRequest {
  email: string;
  password: string;
  rememberMe?: boolean
}

export interface RecoveryRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface SignUpRequest {

}
