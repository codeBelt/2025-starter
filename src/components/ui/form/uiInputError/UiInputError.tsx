import type {AnyFieldApi} from '@tanstack/react-form';

interface Props {
  field: AnyFieldApi;
}

export function UiInputError({field}: Props) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.map((err) => err.message).join(', ')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}
