import { Resend } from 'resend'

const recipient = 'connect@aksos.net'

function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character] ?? character)
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>
    const required = ['name', 'email', 'objective', 'vision']
    if (required.some((field) => !String(body[field] ?? '').trim()) || !String(body.needs ?? '').trim()) {
      return Response.json({ error: 'Please complete the required fields.' }, { status: 400 })
    }

    const email = String(body.email).trim()
    const domain = process.env.RESEND_EMAIL_DOMAIN || 'aksos.net'
    const fields = Object.entries(body).map(([key, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #ddd;font-weight:bold">${escapeHtml(key)}</td><td style="padding:8px 12px;border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`).join('')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from: `AKSOS Applications <connect@${domain}>`,
      to: [recipient],
      replyTo: email,
      subject: `Project Batana application — ${String(body.name).trim()}`,
      html: `<h2>New Project Batana pilot application</h2><p>Reply directly to <strong>${escapeHtml(email)}</strong> to follow up.</p><table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${fields}</table>`,
    }, { idempotencyKey: `batana-application/${crypto.randomUUID()}` })

    if (error) return Response.json({ error: error.message }, { status: 502 })
    return Response.json({ id: data?.id })
  } catch {
    return Response.json({ error: 'Unable to send application.' }, { status: 500 })
  }
}
