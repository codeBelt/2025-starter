'use client';
import {contactFormDefaultValues} from '@/components/pages/contactPage/ContactPage.constants';
import {ContactFormSchema} from '@/components/pages/contactPage/ContactPage.schemas';
import {UiInputError} from '@/components/ui/form/uiInputError/UiInputError';
import {Button} from '@/components/ui/shadcn/button';
import {Input} from '@/components/ui/shadcn/input';
import {Label} from '@/components/ui/shadcn/label';
import {useForm} from '@tanstack/react-form';

export function ContactPage() {
  const form = useForm({
    defaultValues: contactFormDefaultValues,
    validators: {onSubmit: ContactFormSchema},
    onSubmit: async ({value}) => {
      console.info(value);
    },
  });

  return (
    <div className="space-y-6 p-5">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground ">
          Update your account settings. Set your preferred language and timezone.
        </p>
      </div>
      <div data-orientation="horizontal" className="shrink-0 bg-border h-[1px] w-full" />
      <form
        className="space-y-8"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="firstName"
            children={(field) => (
              <div className={'space-y-2'}>
                <Label htmlFor={field.name}>First Name:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                <UiInputError field={field} />
              </div>
            )}
          />
        </div>

        <div>
          <form.Field
            name="lastName"
            children={(field) => (
              <div className={'space-y-2'}>
                <Label htmlFor={field.name}>Last Name:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                <UiInputError field={field} />
              </div>
            )}
          />
        </div>

        <div>
          <form.Field
            name="email"
            children={(field) => (
              <div className={'space-y-2'}>
                <Label htmlFor={field.name}>Email:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                <UiInputError field={field} />
              </div>
            )}
          />
        </div>

        <div>
          <form.Field
            name="password1"
            children={(field) => (
              <div className={'space-y-2'}>
                <Label htmlFor={field.name}>Password:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                <UiInputError field={field} />
              </div>
            )}
          />
        </div>

        <div>
          <form.Field
            name="password2"
            children={(field) => (
              <div className={'space-y-2'}>
                <Label htmlFor={field.name}>Confirm Password:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                <UiInputError field={field} />
              </div>
            )}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className={'flex gap-2'}>
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </Button>
              <Button variant={'outline'} type="reset" onClick={() => form.reset()}>
                Reset
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  );
}
