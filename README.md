<div align="center">

<img src="https://raw.githubusercontent.com/Studio1HQ/Studio1HQ/main/assets/banners/manage-tenants.webp" alt="Tenant Notifications with Permit.io: Property move-out emails gated by Permit.io permission checks" width="100%" />

<br />
<br />

# Tenant Notifications with Permit.io

### Property move-out emails gated by Permit.io permission checks

A Next.js property manager that runs a scheduled job to email tenants and co-signers move-out checklists and deposit details, sending each only if Permit.io allows it on that property.

<br />

[![Built by Studio1](https://img.shields.io/badge/Built_by_Studio1-f97316?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMzVDMCAxNi42ODA3IDE0LjA3NDQgMS42NDg0NCAzMiAwLjEyNjk1M1YxNDFINTEuMDUyM0M1Mi40MzA4IDEzNy4zNDQgNTQuNzQ0NiAxMzMuNjg5IDU3Ljk5MzggMTMwLjAzM0M2MS4xNDQ2IDEyNi41MDggNjQuNjg5MiAxMjMuNDQgNjguNjI3NyAxMjAuODI5QzcyLjU2NjIgMTE4LjM0OSA3Ni4zNTY5IDExNi43ODIgODAgMTE2LjEyOVY4Ni43NTQ0Qzc1LjQ3MDggODcuOTI5MiA3MS4zODQ2IDg5LjY5MTkgNjcuNzQxNSA5Mi4wNDE1QzY0IDk0LjUyMjUgNjAuNzUwOCA5Ny40NiA1Ny45OTM4IDEwMC44NTRDNTYuNTM0NSAxMDIuNzIgNTUuMjU0NSAxMDQuNjU5IDU0LjE1MzkgMTA2LjY3MVYwSDEyNUMxNDQuMzMgMCAxNjAgMTUuNjY5OSAxNjAgMzVWMTI1QzE2MCAxNDQuMzMgMTQ0LjMzIDE2MCAxMjUgMTYwSDEyNFYxOEgxMDQuOTQ4QzEwMy41NjkgMjEuNjgxNiAxMDEuMjU1IDI1LjM2MjggOTguMDA2MiAyOS4wNDQ0Qzk0Ljg1NTQgMzIuNTk0MiA5MS4zMTA4IDM1LjY4NDEgODcuMzcyMyAzOC4zMTRDODMuNDMzOCA0MC44MTIgNzkuNjQzMSA0Mi4zODk2IDc2IDQzLjA0NzRWNzIuNjMwNEM4MC41MjkyIDcxLjQ0NzMgODQuNjE1NCA2OS42NzI0IDg4LjI1ODUgNjcuMzA1N0M5MiA2NC44MDc2IDk1LjI0OTIgNjEuODQ5MSA5OC4wMDYyIDU4LjQzMDdDOTkuNDY1NSA1Ni41NTEzIDEwMC43NDUgNTQuNTk4NiAxMDEuODQ2IDUyLjU3MjNWMTYwSDM1QzE1LjY3IDE2MCAwIDE0NC4zMyAwIDEyNVYzNVoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4K)](https://studio1hq.com)
[![Built with Permit.io](https://img.shields.io/badge/Built_with_Permit.io-141414?style=for-the-badge)](https://permit.io)

[Permit.io docs](https://docs.permit.io) &nbsp;·&nbsp; [Permit.io](https://permit.io) &nbsp;·&nbsp; [More examples](https://github.com/Studio1HQ) &nbsp;·&nbsp; [studio1hq.com](https://studio1hq.com)

</div>

<br />

## Overview

A Next.js property management demo. Each property has a tenant, a co-signer and a move-out date. A scheduled job emails them a move-out checklist and deposit details, and sends each email only if Permit.io allows that user to see that item on that property.

The authorization model is relationship-based: `PERMITIO_SDK.check(user, action, "property:<key>")` runs on resource instances, with the actions `move-out-checklist` and `deposit-details`. No attributes are passed, so per-property roles and permissions in Permit.io decide the result. The policy itself is configured in Permit.io and is not in this repo.

## Features

- **Per-property permissions**: Checks `move-out-checklist` and `deposit-details` on `property:<propertyKey>`.
- **Scheduled notifications**: `node-cron` runs every 30 minutes and picks properties whose move-out date is within a day.
- **Email through Resend**: Sends checklist and deposit emails in a batch.
- **Tenant and co-signer**: Each is checked and notified separately.
- **Property list UI**: Home page with a property list and a Trigger Automation button that starts the cron job.
- **Local PDP**: `docker-compose.yml` runs the Permit.io PDP.

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 15, React 19 |
| Authorization | [Permit.io](https://permit.io) (`permitio` SDK, local PDP) |
| Email | [Resend](https://resend.com) |
| Scheduling | [node-cron](https://github.com/node-cron/node-cron) |
| UI | [Tailwind CSS](https://tailwindcss.com), shadcn/ui |

## Getting started

### Prerequisites

- Node.js 18.18 or later
- Docker (for the local PDP)
- A [Permit.io](https://permit.io) account with a `property` resource and the two actions defined
- A [Resend](https://resend.com) API key

### Installation

```bash
git clone https://github.com/Studio1HQ/manage-tenants.git
cd manage-tenants
npm install
```

### Environment variables

| Variable | Description |
| --- | --- |
| `PERMIT_API_KEY` | Permit.io API key. |
| `PDP_URL` | PDP URL. Defaults to `http://localhost:7766`. |
| `RESEND_API_KEY` | Resend API key. |
| `DEFAULT_EMAIL` | Optional. If set, every email goes to this address instead of the tenant, which is useful for testing. |

The compose file reads `PDP_API_KEY` for the PDP container.

### Run

Start the PDP, then the app:

```bash
docker compose up -d
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click Trigger Automation (it calls `/api/cron`).

## How it works

```text
app/
├── page.tsx           # landing page and property list
├── actions.ts         # permission checks and email sending
└── api/cron/route.ts  # starts the 30-minute cron job
lib/
├── permitio.ts        # Permit SDK client
└── resend.ts          # Resend client
properties.ts          # sample properties, tenants, co-signers, dates
```

1. The cron job calls `notifyPropertyUsers`.
2. `checkProperties` selects properties with a move-out date less than a day away.
3. For the tenant and the co-signer, `notifyUser` checks both permissions on `property:<propertyKey>`.
4. Emails for the allowed items are sent as one Resend batch.

## Resources

- [Permit.io docs](https://docs.permit.io): Resource instances, roles and the PDP.
- [Permit.io](https://permit.io): Account and API key.
- [Resend docs](https://resend.com/docs): Email API.

<br />

---

<div align="center">

<a href="https://studio1hq.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-dark.svg" />
    <img src="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-light.svg" alt="Studio1" width="160" />
  </picture>
</a>

Built by **[Studio1](https://studio1hq.com)**, the technical content and DevRel partner for devtool teams. Made with [Permit.io](https://permit.io).<br />
Browse more open-source examples at [github.com/Studio1HQ](https://github.com/Studio1HQ).

[![Website](https://img.shields.io/badge/studio1hq.com-0b0807?style=for-the-badge&logo=googlechrome&logoColor=white)](https://studio1hq.com)
[![Book a call](https://img.shields.io/badge/Book_a_strategy_call-f97316?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://cal.com/studio1/collab)
[![X](https://img.shields.io/badge/%40Studio1HQ-141414?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Studio1HQ)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/studio1hq/)

<sub><a href="https://studio1hq.com">studio1hq.com</a> · Technical content, docs, video and DevRel for devtools</sub>

</div>
