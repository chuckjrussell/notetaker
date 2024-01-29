import {AuthErrorCodes} from 'firebase/auth';

export const getErrorMessageFromCode = (code: string) => {
  switch (code) {
    case AuthErrorCodes.ARGUMENT_ERROR: {
      return 'Argument error.';
    }
    case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN: {
      return 'Please logout, re-login, and try again.';
    }
    case AuthErrorCodes.INVALID_PASSWORD: {
      return 'Incorrect password.';
    }
    case AuthErrorCodes.TOKEN_EXPIRED: {
      return 'Your token has expired.  Please logout and re-login.';
    }
    case AuthErrorCodes.USER_CANCELLED: {
      return 'Login process was stopped by you.';
    }
    case AuthErrorCodes.USER_DELETED: {
      return 'User does not exist.';
    }
    case AuthErrorCodes.USER_DISABLED: {
      return 'Your account has been disabled.';
    }
    case AuthErrorCodes.USER_MISMATCH: {
      return 'Credential given does not correspond to you.';
    }
    case AuthErrorCodes.USER_SIGNED_OUT: {
      return 'You are signed out.  Please re-sign in.';
    }
    case AuthErrorCodes.WEAK_PASSWORD: {
      return 'Your password is too weak.  It must be at least six characters long.';
    }
    case AuthErrorCodes.INVALID_EMAIL: {
      return 'The email address is improperly formatted.';
    }
    case AuthErrorCodes.INVALID_IDP_RESPONSE: {
      return 'Your email address or password is incorrect.';
    }
    case AuthErrorCodes.INTERNAL_ERROR: {
      return 'Internal Error.';
    }
    case AuthErrorCodes.INVALID_API_KEY: {
      return 'Invalid API key.';
    }
    case AuthErrorCodes.INVALID_APP_CREDENTIAL: {
      return 'Invalid app credential.';
    }
    case AuthErrorCodes.INVALID_APP_ID: {
      return 'Invalid app ID.';
    }
    case AuthErrorCodes.INVALID_AUTH: {
      return 'Invalid user token.';
    }
    case AuthErrorCodes.TIMEOUT: {
      return 'Authentication timeout.';
    }
    case AuthErrorCodes.UNVERIFIED_EMAIL: {
      return 'Your email address is not verified.  Please verify it.';
    }
    case AuthErrorCodes.WEB_STORAGE_UNSUPPORTED: {
      return 'Web storage is unsupported.  Please update or use a different browser.';
    }
    case AuthErrorCodes.ALREADY_INITIALIZED: {
      return 'Already initialized.';
    }
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER: {
      return 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
    }
    default: {
      return `Unknown error >> code = ${code}`;
    }
  }
};
