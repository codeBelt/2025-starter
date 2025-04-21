import {describe, expect, test} from 'bun:test';
import {contactFormDefaultValues} from '@/components/pages/contactPage/ContactPage.constants';
import {ContactFormSchema} from '@/components/pages/contactPage/ContactPage.schemas';
import {flatten, safeParse} from 'valibot';

describe('ContactPage', () => {
  const validInputs: ContactFormSchema = {
    firstName: 'Alex',
    lastName: 'Smith',
    email: 'alex@example.com',
    password1: 'securePass123',
    password2: 'securePass123',
  };

  test('ContactFormSchema - valid input', () => {
    const result = safeParse(ContactFormSchema, validInputs);

    expect(result.success).toBe(true);
  });

  test('ContactFormSchema - invalid input', () => {
    const result = safeParse(ContactFormSchema, contactFormDefaultValues);
    const issues = result.issues ? flatten(result.issues) : {};

    expect(issues).toEqual({
      nested: {
        firstName: ["First name must start with 'A'", 'You must have a length of at least 3'],
        lastName: ['Required.'],
        email: ['The email address is badly formatted.'],
        password1: ['Your password must have 8 characters or more.'],
      },
    });
  });
});
