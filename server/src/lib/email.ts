import nodemailer from 'nodemailer'
import { config } from '../config/env'

export const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
})

export async function sendRFQNotification(data: {
  clientName: string
  hospitalName: string
  email: string
  phone: string
  productName: string
  productBrand: string
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #0D2149;">
      <h2 style="color: #0D2149; font-size: 20px; margin-bottom: 8px;">New Equipment Quote Request</h2>
      <p style="color: #6B7280; font-size: 14px; margin-bottom: 16px;">Hello Medelec Team,</p>
      <p style="color: #6B7280; font-size: 14px; margin-bottom: 20px;">You have received a new equipment inquiry.</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px; width: 140px;">Client Name</td><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; color: #0D2149; font-size: 13px;">${data.clientName}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">Hospital/Clinic</td><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; color: #0D2149; font-size: 13px;">${data.hospitalName}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">Contact Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; color: #0D2149; font-size: 13px;">${data.phone}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">Requested Machine</td><td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; color: #0D2149; font-size: 13px;">${data.productName} (${data.productBrand})</td></tr>
      </table>
      <p style="color: #6B7280; font-size: 13px;">Please log into your <a href="/admin" style="color: #00A896;">admin dashboard</a> to update this lead's status.</p>
    </div>
  `

  await transporter.sendMail({
    from: config.emailFrom,
    to: config.emailTo,
    subject: `New Equipment Quote Request: ${data.hospitalName}`,
    html,
  })
}