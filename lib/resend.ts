import { Resend } from 'resend';

export const RESEND_SDK = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
