import { notifyPropertyUsers } from '@/app/actions';
import { NextResponse } from 'next/server';
import cron from 'node-cron';

export async function GET() {
  cron.schedule(
    // This cron job will run every 30 minutes
    '*/30 * * * *',
    async () => {
      await notifyPropertyUsers();
    },
    {
      name: 'notifyPropertyUsers',
    }
  );

  return NextResponse.json({
    message: 'Cron job started',
  });
}
