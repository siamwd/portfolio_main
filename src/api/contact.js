const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const FIELD_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 3000,
};

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function reply(res, status, body) {
  return res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(res, 405, { success: false, message: "Method not allowed." });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};

  if (clean(body.company)) {
    return reply(res, 200, { success: true, message: "Message sent successfully." });
  }

  const fields = {
    name: clean(body.name),
    email: clean(body.email),
    subject: clean(body.subject),
    message: clean(body.message),
  };

  for (const [field, maxLength] of Object.entries(FIELD_LIMITS)) {
    if (!fields[field]) {
      return reply(res, 422, { success: false, field, message: "This field is required." });
    }
    if (fields[field].length > maxLength) {
      return reply(res, 422, { success: false, field, message: "This field is too long." });
    }
  }

  if (fields.name.length < 2) {
    return reply(res, 422, { success: false, field: "name", message: "Please enter a valid name." });
  }
  if (!EMAIL_PATTERN.test(fields.email)) {
    return reply(res, 422, { success: false, field: "email", message: "Please enter a valid email address." });
  }
  if (fields.subject.length < 3) {
    return reply(res, 422, { success: false, field: "subject", message: "Please enter a longer subject." });
  }
  if (fields.message.length < 10) {
    return reply(res, 422, { success: false, field: "message", message: "Please write at least 10 characters." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO || "mdmahfujur295@gmail.com";
  const sender = process.env.CONTACT_FROM || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    return reply(res, 503, {
      success: false,
      message: "Email delivery is not configured yet. Please try again later.",
    });
  }

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: fields.email,
        subject: `Portfolio contact: ${fields.subject}`,
        text: [
          `Name: ${fields.name}`,
          `Email: ${fields.email}`,
          `Subject: ${fields.subject}`,
          "",
          "Message:",
          fields.message,
        ].join("\n"),
      }),
    });

    if (!emailResponse.ok) {
      console.error("Resend email delivery failed with status", emailResponse.status);
      return reply(res, 502, {
        success: false,
        message: "Email could not be sent right now. Please try again later.",
      });
    }

    return reply(res, 200, { success: true, message: "Message sent successfully." });
  } catch {
    return reply(res, 502, {
      success: false,
      message: "Email could not be sent right now. Please try again later.",
    });
  }
}