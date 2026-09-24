'use server';

import { siteConfig } from '@/constants/site-config';
import {
  HONEYPOT_FIELD,
  readInquiry,
  validateInquiry,
  type InquiryState,
} from '@/lib/inquiry';

const fallbackMessage = `We couldn't send your note just now. Email us at ${siteConfig.contact.email} and an engineer will reply within one business day.`;

export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Bots fill every field; people never see this one. Pretend it worked.
  if (typeof formData.get(HONEYPOT_FIELD) === 'string' && formData.get(HONEYPOT_FIELD) !== '') {
    return { status: 'success' };
  }

  const values = readInquiry(formData);
  const errors = validateInquiry(values);
  if (Object.keys(errors).length > 0) {
    return { status: 'invalid', errors, values };
  }

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[inquiry] INQUIRY_WEBHOOK_URL is not set; received:', values);
    } else {
      console.error('[inquiry] INQUIRY_WEBHOOK_URL is not set; inquiry was not delivered.');
    }
    return { status: 'error', message: fallbackMessage, values };
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: `${siteConfig.url}/start-a-project`,
        submittedAt: new Date().toISOString(),
        ...values,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    console.error('[inquiry] delivery failed:', error);
    return { status: 'error', message: fallbackMessage, values };
  }

  return { status: 'success' };
}
