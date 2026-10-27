# nomi.earth — working notes for Claude

nomi's personal site (nomi.earth). What nomi is and how it speaks: `docs/brand-story.md`, check new ideas against it. A single static `index.html`: no framework, no build step. One small Vercel function for the contact form.

## Who & how

- I'm nomi. Talk to me short, warm, to the point — no fluff.
- Privacy: the only name used anywhere is "asahina nomi" / "nomi". Never add other names, personal emails or identifying details to the site, commits or this repo.
- Push back when you don't agree, plainly, with why.
- Ask before changing my design or copy.

## Deploy

- Vercel is connected to this repo: every push to `main` deploys nomi.earth automatically (asahinanomi.com is the older address, also on Vercel).
- Work on `main` and push there. No steps needed from me.
- Once it's deployed, say plainly: "It's live, you can test."
- If Vercel needs me (login, approval, a failed deploy), tell me.

## Before pushing

- Check the page in a real browser at phone size (390×844 and 375×667). Playwright: use `playwright-core` with `executablePath: '/opt/pw-browsers/chromium'` against a local static server (`npx serve .`).
- Mobile-first.

## Notes

- Contact form: posts to `api/contact.js` (a Vercel function), which emails nomi through Resend (same Resend account as squared). Env vars in Vercel: `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`. A hidden `website` field traps bots.
