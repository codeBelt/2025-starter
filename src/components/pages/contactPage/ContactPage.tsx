import {Button} from '@/components/ui/shadcn/button';
import {type AnyFieldApi, useForm} from '@tanstack/react-form';

function FieldInfo({field}: {field: AnyFieldApi}) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

export function ContactPage() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: async ({value}) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <div className="space-y-6 p-5 font-sans">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground ">
          Update your account settings. Set your preferred language and timezone.
        </p>
      </div>
      <div data-orientation="horizontal" className="shrink-0 bg-border h-[1px] w-full" />
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor=":r2eh:-form-item"
          >
            Name
          </label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Your name"
            id=":r2eh:-form-item"
            aria-describedby=":r2eh:-form-item-description"
            aria-invalid="false"
            name="name"
          />
          <p id=":r2eh:-form-item-description" className="text-[0.8rem] text-muted-foreground">
            This is the name that will be displayed on your profile and in emails.
          </p>
        </div>
        <div className="space-y-2 flex flex-col">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor=":r2ei:-form-item"
          >
            Date of birth
          </label>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-[240px] pl-3 text-left font-normal text-muted-foreground"
            id=":r2ei:-form-item"
            aria-describedby=":r2ei:-form-item-description"
            aria-invalid="false"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r2ej:"
            data-state="closed"
          >
            <span>Pick a date</span>
            icon
          </button>
          <p id=":r2ei:-form-item-description" className="text-[0.8rem] text-muted-foreground">
            Your date of birth is used to calculate your age.
          </p>
        </div>
        <div className="space-y-2 flex flex-col">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor=":r2ek:-form-item"
          >
            Language
          </label>
          <button
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-[200px] justify-between text-muted-foreground"
            id=":r2ek:-form-item"
            aria-describedby=":r2ek:-form-item-description"
            aria-invalid="false"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r2el:"
            data-state="closed"
          >
            Select language icon
          </button>
          <p id=":r2ek:-form-item-description" className="text-[0.8rem] text-muted-foreground">
            This is the language that will be used in the dashboard.
          </p>
        </div>

        <Button type={'submit'}>Submit</Button>
      </form>
    </div>
  );
}
