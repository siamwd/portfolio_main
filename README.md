# Mahfujur Rahman — Clean React Portfolio

A clean, responsive developer portfolio built with React + Vite + Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

## Contact form email setup

The contact form sends messages through `/api/contact` and the Resend email API. The API key stays on the server and is never included in the browser bundle. The endpoint runs in Vite during local development and as a Vercel serverless function after deployment.

1. Create a Resend account and generate an API key.
2. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`. Optionally set `CONTACT_TO` to the inbox that should receive messages.
3. Run `npm run dev`; the `/api/contact` endpoint is available on the same Vite server.
4. Deploy the project on Vercel and add `RESEND_API_KEY`, `CONTACT_TO`, and `CONTACT_FROM` under Project Settings → Environment Variables.
5. Resend's `onboarding@resend.dev` sender is for testing and has recipient restrictions. For production, verify a domain in Resend and set `CONTACT_FROM` to an address on that domain.

Do not commit `.env.local` or paste the API key into frontend code. Messages arrive as email, and replying to the message uses the sender's submitted email address.

## Customize

- Replace `public/profile.jpg` with your preferred profile image.
- Update content in `src/App.jsx`.
- Update colors, spacing and typography in `src/styles.css`.
- Add more projects to the `projects` array.
