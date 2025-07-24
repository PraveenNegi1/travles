import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone, message, packageTitle, price } =
      await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const logoUrl = "https://travles-ten.vercel.app/logo/Animation-2.gif";

    const mailOptions = {
      from: `Travels <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Travel Booking from ${name}`,
      text: `Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Package: ${packageTitle || "Not provided"}
Price: ${price || "Not provided"}
Message: ${message}
      `,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${logoUrl}" alt="Logo" width="40" />
        </div>
        <h2>New Travel Booking </h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
         <p><strong>Package:</strong> ${packageTitle || "Not provided"}</p>
        <p><strong>Price:</strong> ${price || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
