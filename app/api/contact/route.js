import nodemailer from 'nodemailer'

// Escape HTML special characters to prevent XSS in email templates
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Simple in-memory rate limiter: max 5 requests per IP per minute
const rateLimit = new Map()
const RATE_LIMIT_WINDOW = 60 * 1000
const RATE_LIMIT_MAX = 5

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { start: now, count: 1 })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

export async function POST(request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { fname, lname, email, phone, message, website } = await request.json()

    // Honeypot check — real users never fill this hidden field
    if (website) {
      // Return success to not tip off bots, but don't send anything
      return Response.json({ success: true })
    }

    // Validate required fields
    if (!fname || !lname || !email || !phone || !message) {
      return Response.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Validate field lengths
    if (fname.length > 100 || lname.length > 100 || email.length > 254 || phone.length > 20 || message.length > 5000) {
      return Response.json(
        { error: 'One or more fields exceed the maximum allowed length.' },
        { status: 400 }
      )
    }

    // Sanitize all user inputs before embedding in HTML
    const safeFname = escapeHtml(fname.trim())
    const safeLname = escapeHtml(lname.trim())
    const safeEmail = escapeHtml(email.trim())
    const safePhone = escapeHtml(phone.trim())
    const safeMessage = escapeHtml(message.trim())

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Production reliability: connection timeouts and pooling
      pool: true,
      maxConnections: 3,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })

    // Verify transporter connection
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError.message)
      return Response.json(
        { error: 'Email service is not configured. Please contact the website administrator.' },
        { status: 500 }
      )
    }

    await transporter.sendMail({
      from: `"Hasharc Studio Website" <${process.env.EMAIL_USER}>`,
      to: 'hasharcstudio@gmail.com',
      replyTo: email.trim(),
      subject: `New Contact Form Message from ${safeFname} ${safeLname}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeFname} ${safeLname}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, '<br>')}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return Response.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
