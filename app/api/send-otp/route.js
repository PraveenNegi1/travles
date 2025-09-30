import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), { status: 400 });
    }

    // generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // save OTP in memory (for demo) → better use Redis/DB
    global.otpStore = global.otpStore || {};
    global.otpStore[email] = otp;

    // transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // your Gmail
        pass: process.env.SMTP_PASS, // app password
      },
    });

    // send mail
    await transporter.sendMail({
      from: `"Auth App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
