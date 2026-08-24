import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import { db } from './db/database.js';
import { generateToken, requireAdminAuth } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Uploads directory setup
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'img-' + uniqueSuffix + ext);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DESTINATION_EMAIL = process.env.DESTINATION_EMAIL || 'sales@mobileswholesale.co.uk, regenerateglobal@gmail.com';

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));


// Rate Limiter: max 5 requests per 15 minutes per IP
const enquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    error: 'Too many enquiry requests from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Configure Nodemailer Transporter securely
const createTransporter = () => {
  // Option A: Gmail OAuth2
  if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_REFRESH_TOKEN && process.env.GMAIL_USER) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });
  }

  // Option B: Standard SMTP / Gmail App Password
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS.replace(/\s+/g, ''),
      },
    });
  }

  // Option C: Dev Mode Console Fallback (When credentials are not yet configured)
  return null;
};

// POST /api/enquiries Endpoint
app.post('/api/enquiries', enquiryRateLimiter, async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      phone,
      productCategory,
      quantity,
      grade,
      message,
      honeypot // Spam protection field
    } = req.body;

    // 1. Spam Protection (Honeypot check)
    if (honeypot && honeypot.trim() !== '') {
      // Quietly reject bot without error feedback
      return res.status(200).json({
        success: true,
        referenceNumber: 'ENQ-BOT-PREVENTED',
        message: 'Enquiry processed successfully.'
      });
    }

    // 2. Server-side Input Validations
    const errors = {};

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'A valid business email address is required.';
    }

    const phoneRegex = /^[\d\s\+\-\(\)]{7,25}$/;
    if (!phone || typeof phone !== 'string' || !phoneRegex.test(phone.trim())) {
      errors.phone = 'A valid phone or WhatsApp number is required (min 7 digits).';
    }

    if (!productCategory || typeof productCategory !== 'string' || !productCategory.trim()) {
      errors.productCategory = 'Product / Category selection is required.';
    }

    const parsedQty = parseInt(quantity, 10);
    if (isNaN(parsedQty) || parsedQty < 1) {
      errors.quantity = 'Quantity must be a valid positive number.';
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      errors.message = 'Enquiry message is required.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        fields: errors
      });
    }

    const submissionTime = new Date().toISOString();
    const referenceNumber = `ENQ-${Math.floor(100000 + Math.random() * 900000)}`;

    // 3. Compile Admin Notification HTML Email
    const adminSubject = `New Wholesale Enquiry — ${productCategory}`;
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
          .header { background: #000000; color: #22c55e; padding: 24px; text-align: left; border-bottom: 3px solid #22c55e; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase; tracking-wide; }
          .body { padding: 24px; }
          .table { w-full; width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
          .table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
          .table td.label { font-weight: 700; color: #64748b; width: 35%; }
          .table td.val { font-weight: 600; color: #0f172a; }
          .msg-box { background: #f1f5f9; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; margin-top: 16px; border-left: 4px solid #22c55e; }
          .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>Mobiles Wholesale • New B2B Enquiry</h1>
          </div>
          <div class="body">
            <p style="font-size: 15px; font-weight: 600; color: #0f172a;">A new trade stock enquiry has been submitted on the Mobiles Wholesale website.</p>
            
            <table class="table">
              <tr><td class="label">Reference:</td><td class="val" style="color:#22c55e; font-family:monospace;">${referenceNumber}</td></tr>
              <tr><td class="label">Customer Name:</td><td class="val">${fullName}</td></tr>
              <tr><td class="label">Company Name:</td><td class="val">${companyName || 'N/A'}</td></tr>
              <tr><td class="label">Email Address:</td><td class="val"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td class="label">Phone / WhatsApp:</td><td class="val">${phone}</td></tr>
              <tr><td class="label">Product / Category:</td><td class="val" style="font-weight:800;">${productCategory}</td></tr>
              <tr><td class="label">Quantity Required:</td><td class="val" style="font-weight:800; color:#2563eb;">${parsedQty} units</td></tr>
              <tr><td class="label">Grade Required:</td><td class="val">${grade || 'Any Grade / Flexible'}</td></tr>
              <tr><td class="label">Submission Time:</td><td class="val">${submissionTime}</td></tr>
            </table>

            <div class="msg-box">
              <strong style="display:block; margin-bottom:6px; color:#0f172a;">Enquiry Message / Notes:</strong>
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
          <div class="footer">
            Mobile Wholesale • London Trade Desk • Automated Notification
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Compile Automatic Customer Confirmation HTML Email
    const customerSubject = `Thank you for your wholesale enquiry — Mobiles Wholesale`;
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: #000000; color: #22c55e; padding: 24px; text-align: left; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase; }
          .body { padding: 24px; font-size: 15px; line-height: 1.6; color: #334155; }
          .ref-box { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px; border-radius: 8px; text-align: center; margin: 20px 0; font-weight: 700; color: #166534; }
          .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>Mobiles Wholesale UK</h1>
          </div>
          <div class="body">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for your wholesale enquiry. Our team will review your request and get back to you shortly with availability, trade pricing, and pro-forma details.</p>
            
            <div class="ref-box">
              Enquiry Reference: ${referenceNumber}
            </div>

            <p style="font-size:13px; color:#64748b;">
              Need instant response? Connect directly with our London trade desk on WhatsApp: <a href="https://wa.me/447400055536" style="color:#16a34a; font-weight:bold;">+44 7400055536</a>.
            </p>
          </div>
          <div class="footer">
            Mobile Wholesale Is A Trading Name Of Regenerate Global Limited.<br/>Registered in England & Wales.
          </div>
        </div>
      </body>
      </html>
    `;

    // 5. Send Emails via Transporter or Dev Console Fallback
    const transporter = createTransporter();

    if (transporter) {
      // Send Admin Email
      await transporter.sendMail({
        from: `"${fullName} (Mobiles Wholesale Web)" <${process.env.GMAIL_USER || process.env.SMTP_USER}>`,
        to: DESTINATION_EMAIL,
        replyTo: email,
        subject: adminSubject,
        html: adminHtml,
      });

      // Send Customer Confirmation Email
      await transporter.sendMail({
        from: `"Mobiles Wholesale Sales Desk" <${process.env.GMAIL_USER || process.env.SMTP_USER || DESTINATION_EMAIL}>`,
        to: email,
        subject: customerSubject,
        html: customerHtml,
      });
    } else {
      console.log('--- [DEV MODE ENQUIRY SUBMISSION LOGGED] ---');
      console.log('Reference:', referenceNumber);
      console.log('To Admin:', DESTINATION_EMAIL);
      console.log('To Customer:', email);
      console.log('Subject:', adminSubject);
      console.log('---------------------------------------------');
    }

    return res.status(200).json({
      success: true,
      referenceNumber,
      message: 'Thank you for your wholesale enquiry. Our team will review your request and get back to you shortly.'
    });

  } catch (error) {
    console.error('API /api/enquiries error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your enquiry. Please try again or contact us via WhatsApp.'
    });
  }
});

// POST /api/sell-to-us Valuation Endpoint
app.post('/api/sell-to-us', enquiryRateLimiter, async (req, res) => {
  try {
    const {
      name,
      company,
      email,
      phone,
      productType,
      brand,
      quantity,
      condition,
      description,
      stockListFileName,
      uploadedFiles,
      message,
      honeypot
    } = req.body;

    // 1. Spam Protection (Honeypot check)
    if (honeypot && honeypot.trim() !== '') {
      return res.status(200).json({
        success: true,
        referenceNumber: 'SELL-BOT-PREVENTED',
        message: 'Valuation enquiry processed successfully.'
      });
    }

    // 2. Server-side Input Validations
    const errors = {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      errors.name = 'Contact Name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'A valid business email address is required.';
    }

    const phoneRegex = /^[\d\s\+\-\(\)]{7,25}$/;
    if (!phone || typeof phone !== 'string' || !phoneRegex.test(phone.trim())) {
      errors.phone = 'A valid phone or WhatsApp number is required (min 7 digits).';
    }

    if (!productType || typeof productType !== 'string' || !productType.trim()) {
      errors.productType = 'Product type selection is required.';
    }

    if (!brand || typeof brand !== 'string' || !brand.trim()) {
      errors.brand = 'Brand selection is required.';
    }

    const parsedQty = parseInt(quantity, 10);
    if (isNaN(parsedQty) || parsedQty < 1) {
      errors.quantity = 'Quantity must be a valid positive number.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        fields: errors
      });
    }

    const submissionTime = new Date().toISOString();
    const referenceNumber = `VAL-${Math.floor(100000 + Math.random() * 900000)}`;

    const filesCount = Array.isArray(uploadedFiles) ? uploadedFiles.length : 0;
    const fileNames = Array.isArray(uploadedFiles)
      ? uploadedFiles.map(f => f.name).join(', ')
      : (stockListFileName || 'None');

    // 3. Admin Notification HTML
    const adminSubject = `Bulk Stock Offer — ${brand} ${productType} (${parsedQty} units)`;
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
          .header { background: #0f172a; color: #10b981; padding: 24px; text-align: left; border-bottom: 3px solid #10b981; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase; }
          .body { padding: 24px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
          .table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
          .table td.label { font-weight: 700; color: #64748b; width: 35%; }
          .table td.val { font-weight: 600; color: #0f172a; }
          .msg-box { background: #f8fafc; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; margin-top: 16px; border-left: 4px solid #10b981; }
          .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>Mobiles Wholesale • Purchasing & Liquidation Desk</h1>
          </div>
          <div class="body">
            <p style="font-size: 15px; font-weight: 600; color: #0f172a;">A seller has submitted a bulk inventory valuation request.</p>
            
            <table class="table">
              <tr><td class="label">Reference:</td><td class="val" style="color:#10b981; font-family:monospace;">${referenceNumber}</td></tr>
              <tr><td class="label">Seller Name:</td><td class="val">${name}</td></tr>
              <tr><td class="label">Company Name:</td><td class="val">${company || 'N/A'}</td></tr>
              <tr><td class="label">Email Address:</td><td class="val"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td class="label">Phone / WhatsApp:</td><td class="val">${phone}</td></tr>
              <tr><td class="label">Product Type:</td><td class="val" style="font-weight:800;">${productType}</td></tr>
              <tr><td class="label">Brand:</td><td class="val" style="font-weight:800;">${brand}</td></tr>
              <tr><td class="label">Quantity:</td><td class="val" style="font-weight:800; color:#2563eb;">${parsedQty} units</td></tr>
              <tr><td class="label">Condition:</td><td class="val">${condition || 'Not specified'}</td></tr>
              <tr><td class="label">Attached Files:</td><td class="val">${fileNames} (${filesCount} file(s))</td></tr>
              <tr><td class="label">Submission Time:</td><td class="val">${submissionTime}</td></tr>
            </table>

            ${description ? `
            <div class="msg-box">
              <strong style="display:block; margin-bottom:6px; color:#0f172a;">Stock Description / Device Breakdown:</strong>
              ${description.replace(/\n/g, '<br/>')}
            </div>` : ''}

            ${message ? `
            <div class="msg-box" style="border-left-color: #3b82f6;">
              <strong style="display:block; margin-bottom:6px; color:#0f172a;">Additional Message / Asking Price:</strong>
              ${message.replace(/\n/g, '<br/>')}
            </div>` : ''}
          </div>
          <div class="footer">
            Mobiles Wholesale • Purchasing & Liquidation Division
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Customer Confirmation HTML
    const customerSubject = `Valuation Received [${referenceNumber}] — Mobiles Wholesale Buying Desk`;
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: #0f172a; color: #10b981; padding: 24px; text-align: left; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase; }
          .body { padding: 24px; font-size: 15px; line-height: 1.6; color: #334155; }
          .ref-box { background: #ecfdf5; border: 1px solid #a7f3d0; padding: 12px; border-radius: 8px; text-align: center; margin: 20px 0; font-weight: 700; color: #065f46; }
          .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>Mobiles Wholesale UK</h1>
          </div>
          <div class="body">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for submitting your stock lot details for valuation. Our purchasing team is reviewing your inventory breakdown for <strong>${parsedQty} units</strong> of <strong>${brand} ${productType}</strong>.</p>
            
            <div class="ref-box">
              Valuation Reference: ${referenceNumber}
            </div>

            <p style="font-size:13px; color:#64748b;">
              Our buying desk will issue a firm valuation quote within 2 business hours. For urgent liquidations or fast payout, connect directly on WhatsApp: <a href="https://wa.me/447400055536" style="color:#16a34a; font-weight:bold;">+44 7400055536</a>.
            </p>
          </div>
          <div class="footer">
            Mobiles Wholesale Is A Trading Name Of Regenerate Global Limited.
          </div>
        </div>
      </body>
      </html>
    `;

    // 5. Transporter Send Mail or Log Fallback
    const transporter = createTransporter();

    if (transporter) {
      await transporter.sendMail({
        from: `"${name} (Stock Seller)" <${process.env.GMAIL_USER || process.env.SMTP_USER}>`,
        to: DESTINATION_EMAIL,
        replyTo: email,
        subject: adminSubject,
        html: adminHtml,
      });

      await transporter.sendMail({
        from: `"Mobiles Wholesale Buying Desk" <${process.env.GMAIL_USER || process.env.SMTP_USER || DESTINATION_EMAIL}>`,
        to: email,
        subject: customerSubject,
        html: customerHtml,
      });
    } else {
      console.log('--- [DEV MODE VALUATION SUBMISSION LOGGED] ---');
      console.log('Reference:', referenceNumber);
      console.log('To Admin:', DESTINATION_EMAIL);
      console.log('To Customer:', email);
      console.log('Subject:', adminSubject);
      console.log('----------------------------------------------');
    }

    return res.status(200).json({
      success: true,
      referenceNumber,
      message: 'Your valuation request has been submitted successfully. Our purchasing team will review your inventory and contact you shortly.'
    });

  } catch (error) {
    console.error('API /api/sell-to-us error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your valuation request. Please try again or contact us via WhatsApp.'
    });
  }
});

// ==========================================
// ADMIN AUTHENTICATION ENDPOINTS
// ==========================================

// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required.'
      });
    }

    const user = db.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials. User not found.'
      });
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials. Incorrect password.'
      });
    }

    const token = generateToken(user);
    const { passwordHash, ...userSafe } = user;

    return res.status(200).json({
      success: true,
      token,
      user: userSafe,
      message: 'Admin authentication successful.'
    });

  } catch (err) {
    console.error('API /api/admin/login error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// GET /api/admin/me (Protected)
app.get('/api/admin/me', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    user: req.adminUser
  });
});

// ==========================================
// PRODUCT CATALOG MANAGEMENT ENDPOINTS
// ==========================================

// GET /api/products (Public)
app.get('/api/products', (req, res) => {
  try {
    const products = db.getProducts();
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/:id (Public)
app.get('/api/products/:id', (req, res) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/products (Protected)
app.post('/api/products', requireAdminAuth, (req, res) => {
  try {
    const newProduct = db.addProduct(req.body);
    res.status(201).json({
      success: true,
      message: 'Product added successfully.',
      data: newProduct
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT /api/products/:id (Protected)
app.put('/api/products/:id', requireAdminAuth, (req, res) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }
    res.json({
      success: true,
      message: 'Product updated successfully.',
      data: updated
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE /api/products/:id (Protected)
app.delete('/api/products/:id', requireAdminAuth, (req, res) => {
  try {
    const deleted = db.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }
    res.json({
      success: true,
      message: 'Product deleted successfully.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// CATEGORY MANAGEMENT ENDPOINTS
// ==========================================

// GET /api/categories (Public)
app.get('/api/categories', (req, res) => {
  try {
    const categories = db.getCategories();
    res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/categories (Protected)
app.post('/api/categories', requireAdminAuth, (req, res) => {
  try {
    const newCategory = db.addCategory(req.body);
    res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      data: newCategory
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT /api/categories/:id (Protected)
app.put('/api/categories/:id', requireAdminAuth, (req, res) => {
  try {
    const updated = db.updateCategory(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Category not found.' });
    }
    res.json({
      success: true,
      message: 'Category updated successfully.',
      data: updated
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE /api/categories/:id (Protected)
app.delete('/api/categories/:id', requireAdminAuth, (req, res) => {
  try {
    const deleted = db.deleteCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Category not found.' });
    }
    res.json({
      success: true,
      message: 'Category deleted successfully.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// FILE / IMAGE UPLOAD ENDPOINT
// ==========================================

// POST /api/upload (Protected)
app.post('/api/upload', requireAdminAuth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file uploaded.' });
    }

    const host = req.get('host') || `localhost:${PORT}`;
    const protocol = req.protocol || 'http';
    const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Product image uploaded successfully.',
      imageUrl,
      filename: req.file.filename
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Mobiles Wholesale Express Backend running on http://localhost:${PORT}`);
});


