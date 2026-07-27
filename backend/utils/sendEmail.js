

import nodemailer from 'nodemailer'

console.log('EMAIL_USER:', process.env.EMAIL_USER)
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Loaded ✅' : 'Missing ❌')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendEmail = async (options) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  const info = await transporter.sendMail(mailOptions)

  console.log('Email sent:', info.response)

  await sendEmail({
    email: user.email,
    subject: 'Password Reset Request',
    message,
  })
}
