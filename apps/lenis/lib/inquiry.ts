/**
 * Project inquiry ("Start a project") fields and validation, shared by the
 * client form and the server action.
 */

export const WORK_KINDS = [
  'Workflow automation and internal tools',
  'AI agent or LLM',
  'Integrations',
  'Replace a legacy system',
  'Not sure yet',
] as const;

export type WorkKind = (typeof WORK_KINDS)[number];

export const LIMITS = {
  name: 200,
  company: 200,
  email: 320,
  message: 5000,
} as const;

export type InquiryField = 'name' | 'email' | 'company' | 'kind' | 'message';

export type Inquiry = {
  name: string;
  email: string;
  company: string;
  kind: WorkKind;
  message: string;
};

export type InquiryErrors = Partial<Record<InquiryField, string>>;

/** Order used to focus the first invalid field. */
export const FIELD_ORDER: InquiryField[] = ['name', 'email', 'company', 'kind', 'message'];

/** Name of the hidden anti-spam field. Real users never fill it in. */
export const HONEYPOT_FIELD = 'website';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: FormDataEntryValue | null | undefined): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function readInquiry(formData: FormData): Inquiry {
  const kind = text(formData.get('kind'));
  return {
    name: text(formData.get('name')),
    email: text(formData.get('email')),
    company: text(formData.get('company')),
    kind: (WORK_KINDS as readonly string[]).includes(kind) ? (kind as WorkKind) : 'Not sure yet',
    message: text(formData.get('message')),
  };
}

export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!inquiry.name) errors.name = 'Tell us your name.';
  else if (inquiry.name.length > LIMITS.name) errors.name = `Keep it under ${LIMITS.name} characters.`;

  if (!inquiry.email) errors.email = 'Add a work email so an engineer can reply.';
  else if (inquiry.email.length > LIMITS.email || !EMAIL_PATTERN.test(inquiry.email))
    errors.email = 'That email address doesn’t look right.';

  if (inquiry.company.length > LIMITS.company)
    errors.company = `Keep it under ${LIMITS.company} characters.`;

  if (!inquiry.message) errors.message = 'Tell us what isn’t working, even in a sentence or two.';
  else if (inquiry.message.length > LIMITS.message)
    errors.message = `Keep it under ${LIMITS.message} characters.`;

  return errors;
}

export function firstInvalidField(errors: InquiryErrors): InquiryField | undefined {
  return FIELD_ORDER.find((field) => errors[field]);
}

export type InquiryState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'invalid'; errors: InquiryErrors; values: Inquiry }
  | { status: 'error'; message: string; values: Inquiry };
