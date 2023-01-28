import * as EmailValidator from 'email-validator';
 
export const validateEmail = (email: string) => EmailValidator.validate(email);