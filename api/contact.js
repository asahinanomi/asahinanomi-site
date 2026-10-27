// asahinanomi.com — email each contact form note to nomi through Resend.
// Vercel → project → Settings → Environment Variables: RESEND_API_KEY, CONTACT_TO (where the email goes),
// and CONTACT_FROM (a sender on a domain verified in Resend, e.g. "asahina nomi <hello@squared.today>";
// defaults to Resend's test sender, which can only email the Resend account's own address).
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' })

  const { name = '', email = '', message = '', website = '' } = req.body || {}
  // The hidden "website" field is a spam trap: people never see it, bots fill it in. Pretend it worked.
  if (website) return res.status(200).json({ ok: true })

  const n = String(name).trim().slice(0, 200)
  const e = String(email).trim().slice(0, 200)
  const m = String(message).trim().slice(0, 5000)
  if (!n || !m || !EMAIL.test(e)) return res.status(400).json({ error: 'missing name, email or message' })

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'asahinanomi.com <onboarding@resend.dev>',
      to: process.env.CONTACT_TO,
      reply_to: e,
      subject: `hello from asahinanomi.com: ${n}`,
      text: `${m}\n\n${n} (${e})`,
    }),
  })
  if (!r.ok) {
    console.error('resend', r.status, await r.text())
    return res.status(500).json({ error: 'could not send' })
  }
  return res.status(200).json({ ok: true })
}
