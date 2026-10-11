import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.hostinger.com",
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: parseInt(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: "Your Verification Code - Aaple Guruji",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f97316;">Email Verification</h2>
          <p>Your verification code is:</p>
          <div style="background: #f97316; color: white; padding: 15px; font-size: 24px; text-align: center; border-radius: 8px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This code will expire in 5 minutes.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, error: error.message };
  }
};

export const sendBookingConfirmationEmail = async (email, bookingDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: "Booking Confirmation - Aaple Guruji",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f97316;">Booking Confirmed!</h2>
          <p>Thank you for your booking. Here are your details:</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Booking Reference:</strong> ${bookingDetails.bookingReference}</p>
            <p><strong>Puja:</strong> ${bookingDetails.pujaName}</p>
            <p><strong>Date:</strong> ${new Date(bookingDetails.createdAt).toLocaleDateString()}</p>
            <p><strong>Total Price:</strong> ₹${bookingDetails.totalPrice}</p>
          </div>
          <p>Our team will contact you shortly to confirm the details.</p>
          <p style="color: #666; font-size: 12px;">If you have any questions, please contact us.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return { success: false, error: error.message };
  }
};

export const sendAdminNotificationEmail = async (leadDetails, bookingDetails = null) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      return { success: false, error: "Admin email not configured" };
    }

    const subject = bookingDetails 
      ? "New Booking Received - Aaple Guruji"
      : "New Lead Captured - Aaple Guruji";

    let htmlContent = "";
    
    if (bookingDetails) {
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f97316;">New Booking Received</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Booking Reference:</strong> ${bookingDetails.bookingReference}</p>
            <p><strong>Customer Name:</strong> ${leadDetails.name}</p>
            <p><strong>Email:</strong> ${leadDetails.email}</p>
            <p><strong>Mobile:</strong> ${leadDetails.mobile}</p>
            <p><strong>Puja:</strong> ${bookingDetails.pujaName}</p>
            <p><strong>Samagri Option:</strong> ${bookingDetails.samagriOption}</p>
            <p><strong>Total Price:</strong> ₹${bookingDetails.totalPrice}</p>
            <p><strong>Status:</strong> ${bookingDetails.status}</p>
          </div>
        </div>
      `;
    } else {
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f97316;">New Lead Captured</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${leadDetails.name}</p>
            <p><strong>Email:</strong> ${leadDetails.email}</p>
            <p><strong>Mobile:</strong> ${leadDetails.mobile}</p>
            <p><strong>Puja Interest:</strong> ${leadDetails.pujaName || "Not specified"}</p>
            <p><strong>Funnel Stage:</strong> ${leadDetails.funnelStage}</p>
            <p><strong>Captured At:</strong> ${new Date(leadDetails.createdAt).toLocaleString()}</p>
          </div>
        </div>
      `;
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: adminEmail,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return { success: false, error: error.message };
  }
};

export default transporter;
