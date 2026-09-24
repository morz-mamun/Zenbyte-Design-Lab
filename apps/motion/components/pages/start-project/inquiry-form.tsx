'use client';

import { useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';

import { submitInquiry } from '@/app/(site)/start-a-project/actions';
import { Button } from '@/components/ui/button';
import { form as copy } from '@/content/start-project';
import {
  HONEYPOT_FIELD,
  LIMITS,
  WORK_KINDS,
  firstInvalidField,
  readInquiry,
  validateInquiry,
  type InquiryErrors,
  type InquiryField,
  type InquiryState,
} from '@/lib/inquiry';
import { cn } from '@/lib/utils';

const initialState: InquiryState = { status: 'idle' };

function focusField(form: HTMLFormElement | null, field: InquiryField | undefined) {
  if (!form || !field) return;
  const element = form.elements.namedItem(field);
  if (element instanceof HTMLElement) element.focus();
}

const controlClass =
  'w-full rounded-xl border border-line bg-bg px-4 font-sans text-[16px] text-fg transition-colors duration-300 hover:border-muted focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent aria-invalid:border-accent';

type FieldProps = {
  name: InquiryField;
  label: string;
  error?: string;
  children: (props: { id: string; 'aria-invalid'?: true; 'aria-describedby'?: string }) => ReactNode;
};

function Field({ name, label, error, children }: FieldProps) {
  const id = `inquiry-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5 md:gap-2">
      <label htmlFor={id} className="label text-fg-2">
        {label}
      </label>
      {children({
        id,
        ...(error ? { 'aria-invalid': true, 'aria-describedby': errorId } : {}),
      })}
      {error && (
        <p id={errorId} className="text-sm leading-snug text-accent-text">
          {error}
        </p>
      )}
    </div>
  );
}

export function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const [clientErrors, setClientErrors] = useState<InquiryErrors | null>(null);

  const errors: InquiryErrors = clientErrors ?? (state.status === 'invalid' ? state.errors : {});
  const values = state.status === 'invalid' || state.status === 'error' ? state.values : undefined;

  // Server-side validation can still reject (e.g. JS-disabled first render).
  useEffect(() => {
    if (state.status === 'invalid') focusField(formRef.current, firstInvalidField(state.errors));
  }, [state]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const found = validateInquiry(readInquiry(new FormData(event.currentTarget)));
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      setClientErrors(found);
      focusField(event.currentTarget, firstInvalidField(found));
      return;
    }
    setClientErrors(null);
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="inquiry-title"
      className="card relative flex flex-col gap-5 p-6 md:p-8 xl:gap-6 xl:p-10"
    >
      <h2 id="inquiry-title" className="type-h3 xl:text-[40px]">
        {copy.title}
      </h2>

      <Field name="name" label="Name" error={errors.name}>
        {(props) => (
          <input
            {...props}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            defaultValue={values?.name}
            className={cn(controlClass, 'h-[52px]')}
          />
        )}
      </Field>

      <Field name="email" label="Work email" error={errors.email}>
        {(props) => (
          <input
            {...props}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            defaultValue={values?.email}
            className={cn(controlClass, 'h-[52px]')}
          />
        )}
      </Field>

      <Field name="company" label="Company" error={errors.company}>
        {(props) => (
          <input
            {...props}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            defaultValue={values?.company}
            className={cn(controlClass, 'h-[52px]')}
          />
        )}
      </Field>

      <Field name="kind" label="What kind of work?" error={errors.kind}>
        {(props) => (
          <select
            {...props}
            name="kind"
            defaultValue={values?.kind ?? WORK_KINDS[0]}
            className={cn(controlClass, 'h-[52px]')}
          >
            {WORK_KINDS.map((kind) => (
              <option key={kind}>{kind}</option>
            ))}
          </select>
        )}
      </Field>

      <Field name="message" label="What's not working?" error={errors.message}>
        {(props) => (
          <textarea
            {...props}
            name="message"
            required
            maxLength={LIMITS.message}
            defaultValue={values?.message}
            className={cn(controlClass, 'h-[140px] resize-none py-3.5 leading-[1.5]')}
          />
        )}
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`inquiry-${HONEYPOT_FIELD}`}>Leave this field empty</label>
        <input id={`inquiry-${HONEYPOT_FIELD}`} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" disabled={isPending} className="w-full md:w-full">
        {isPending ? copy.pending : copy.submit}
      </Button>

      {/* `contents` keeps the live region mounted without adding an empty flex gap. */}
      <div role="status" className="contents">
        {state.status === 'success' && !isPending && (
          <p className="type-body font-semibold text-fg">{copy.success}</p>
        )}
      </div>
      {state.status === 'error' && !isPending && (
        <p role="alert" className="type-body text-accent-text">
          {state.message}
        </p>
      )}
    </form>
  );
}
