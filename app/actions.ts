'use server';

import { PERMITIO_SDK } from '@/lib/permitio';
import { RESEND_SDK } from '@/lib/resend';
import { properties } from '@/properties';

const defaultAddress = process.env.DEFAULT_EMAIL || '';

export type PermissionType = 'move-out-checklist' | 'deposit-details';

export type Property = (typeof properties)[0];

// This function is used to get the properties data
const getProperties = async () => {
  return properties;
};

const checkPermission = async (
  userKey: string,
  permissionType: PermissionType,
  resourceInstance: string
) => {
  const permission = await PERMITIO_SDK.check(
    userKey,
    permissionType,
    `property:${resourceInstance}`
  );

  return permission;
};

const checkProperties = async () => {
  const properties = await getProperties();
  const today = new Date();

  const propertiesToNotify = [];

  for (const property of properties) {
    const moveOutDate = new Date(property.moveOutDate);
    const timeDiff = moveOutDate.getTime() - today.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    if (dayDiff < 1 && dayDiff >= 0) {
      propertiesToNotify.push(property);
    }
  }

  return propertiesToNotify;
};

const notifyUser = async (
  property: Property,
  user: Property['coSigner'] | Property['tenant']
) => {
  const moveOutChecklistTemplate = `
    <h1>Move Out Checklist</h1>
    <p>Dear ${user.name},</p>
    <p>
      Please complete the move-out checklist for the property
      <strong>${property.propertyName}</strong> before
      <strong>${property.moveOutDate}</strong>.
    </p>
    <p>Thank you.</p>
  `;

  const moveOutChecklistSubject = `Move Out Checklist for ${property.propertyName}`;

  const depositDetailsTemplate = `
    <h1>Deposit Details</h1>
    <p>Dear ${user.name},</p>
    <p>
      Here are the deposit details for the property
      <strong>${property.propertyName}</strong>.
    </p>
    <p>Thank you.</p>
  `;

  const depositDetailsSubject = `Deposit Details for ${property.propertyName}`;

  const hasMoveOutCheckListPermission = await checkPermission(
    user.email,
    'move-out-checklist',
    property.propertyKey
  );

  const hasDepositDetailsPermission = await checkPermission(
    user.email,
    'deposit-details',
    property.propertyKey
  );

  const emails = [];

  if (hasMoveOutCheckListPermission) {
    emails.push({
      from: 'Manage Tenants <onboarding@resend.dev>',
      to: defaultAddress || user.email,
      subject: moveOutChecklistSubject,
      html: moveOutChecklistTemplate,
    });
  }

  if (hasDepositDetailsPermission) {
    emails.push({
      from: 'Manage Tenants <onboarding@resend.dev>',
      to: defaultAddress || user.email,
      subject: depositDetailsSubject,
      html: depositDetailsTemplate,
    });
  }

  if (emails.length) {
    const { data, error } = await RESEND_SDK.batch.send(emails);

    if (error) {
      console.error(error);
    } else {
      console.log('Emails sent:', data);
    }
  }
};

export const notifyPropertyUsers = async () => {
  const properties = await checkProperties();

  for await (const property of properties) {
    await notifyUser(property, property.tenant);
    setTimeout(async () => {
      await notifyUser(property, property.coSigner);
    }, 2000);
  }
};
