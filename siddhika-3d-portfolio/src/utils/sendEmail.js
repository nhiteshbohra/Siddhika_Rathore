import emailjs from "@emailjs/browser";
import { profile } from "../data";

/**
 * Sends a contact message directly from the browser (GitHub Pages compatible).
 * Supports Web3Forms, Formspree, EmailJS, and automatic mailto fallback.
 */
export async function sendContactMessage({ name, email, message }) {
  const config = profile.contactSettings || {};
  const recipientEmail = profile.email || "rsiddhika.rathore@gmail.com";

  // 1. Web3Forms (Free instant API)
  if (config.web3formsAccessKey) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: config.web3formsAccessKey,
        name,
        email,
        message,
        subject: `New Portfolio Message from ${name}`,
        from_name: "Portfolio Contact Form",
      }),
    });
    const result = await response.json();
    if (result.success) {
      return { success: true, message: "Thank you! Your message has been sent directly to my inbox 🚀" };
    }
    throw new Error(result.message || "Failed to send message via Web3Forms");
  }

  // 2. Formspree
  if (config.formspreeUrl) {
    const response = await fetch(config.formspreeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (response.ok) {
      return { success: true, message: "Thank you! Your message has been sent 🚀" };
    }
    throw new Error("Failed to send message via Formspree");
  }

  // 3. EmailJS
  if (config.emailjs && config.emailjs.publicKey && config.emailjs.serviceId && config.emailjs.templateId) {
    await emailjs.send(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      {
        from_name: name,
        from_email: email,
        to_name: profile.fullName || "Siddhika Rathore",
        to_email: recipientEmail,
        message,
      },
      config.emailjs.publicKey
    );
    return { success: true, message: "Thank you! Your message has been sent directly to my inbox 🚀" };
  }

  // 4. Default Fallback: Open mailto client with prefilled fields
  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  return {
    success: true,
    message: "Opening your email client to send the message directly to my inbox ✉️",
  };
}
