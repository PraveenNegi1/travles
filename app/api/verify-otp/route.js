export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    global.otpStore = global.otpStore || {};
    if (global.otpStore[email] && String(global.otpStore[email]) === String(otp)) {
      delete global.otpStore[email]; 
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 400 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

