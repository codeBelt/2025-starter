import * as v from 'valibot';

export const ContactFormSchema = v.pipe(
  v.object({
    firstName: v.pipe(
      v.string(),
      v.startsWith('A', "First name must start with 'A'"),
      v.minLength(3, 'You must have a length of at least 3')
    ),
    lastName: v.pipe(v.string(), v.nonEmpty('Required.')),
    email: v.pipe(v.string(), v.email('The email address is badly formatted.')),
    password1: v.pipe(v.string(), v.minLength(8, 'Your password must have 8 characters or more.')),
    password2: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [['password1'], ['password2']],
      (input) => input.password1 === input.password2,
      'The two passwords do not match.'
    ),
    ['password2']
  )
);
export type ContactFormSchema = v.InferInput<typeof ContactFormSchema>;
