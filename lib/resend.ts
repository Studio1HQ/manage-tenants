import { Resend } from 'resend';

export const RESEND_SDK = new Resend(process.env.RESEND_API_KEY);
