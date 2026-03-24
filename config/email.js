export default {
    async fetch(request, env) {
        const allowedOrigins = ["https://sultankautsar.com"];
        const requestOrigin = request.headers.get("origin") || "";
        const isOriginAllowed = allowedOrigins.includes(requestOrigin);

        const corsHeaders = {
            "Access-Control-Allow-Origin": isOriginAllowed ? requestOrigin : "",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            const contentType = request.headers.get("content-type") || "";
            let data = {};

            if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
                const formData = await request.formData();
                data = Object.fromEntries(formData.entries());
            } else if (contentType.includes("application/json")) {
                data = await request.json();
            } else {
                throw new Error("Unsupported content type");
            }

            if (data.website) {
                return new Response(JSON.stringify({ status: "ok" }), {
                    status: 200,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            }

            if (!data.name || !data.email || !data.message) {
                throw new Error("Missing required fields");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!emailRegex.test(data.email)) {
                throw new Error("Invalid email format");
            }

            if (typeof data.name !== "string" || data.name.trim().length === 0) {
                throw new Error("Invalid name");
            }

            if (typeof data.message !== "string" || data.message.trim().length === 0) {
                throw new Error("Invalid message");
            }

            if (env.RESEND_API_KEY) {
                const sender = "hello@sultankautsar.com";

                const serviceLabels = {
                    "tracking-integration": "Tracking Integration",
                    "conversion-setup": "Conversion Setup",
                    "consent-management": "Consent Management",
                    "ga4-configuration": "GA4 Configuration",
                    "gtm-audit": "GTM Container Audit",
                    "server-side": "Server-side Tracking",
                    consultation: "General Consultation",
                };

                let serviceLabel = "General Inquiry";
                if (data.service && typeof data.service === "string" && data.service.trim()) {
                    const serviceName = data.service.trim();
                    serviceLabel =
                        serviceLabels[serviceName] ||
                        serviceName
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ");
                }

                const unsubscribeMailto = `mailto:${sender}?subject=${encodeURIComponent("Unsubscribe request")}&body=${encodeURIComponent(`Please remove ${data.email} from future emails.`)}`;

                const resendResponse = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${env.RESEND_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from: sender,
                        to: [data.email],
                        bcc: [sender],
                        reply_to: sender,
                        headers: {
                            "List-Unsubscribe": `<${unsubscribeMailto}>`,
                        },
                        subject: `Inquiry confirmation: ${serviceLabel} service`,
                        text: `Hello ${data.name},\n\nThank you for reaching out about ${serviceLabel}. I received your request and will get back to you within 24 hours.\n\nSummary of your request:\n"${data.message}"\n\nYou received this email because this address was used to submit a contact form on sultankautsar.com.\nIf this was not you or you prefer not to receive follow-ups, reply with 'unsubscribe' or use: ${unsubscribeMailto}\n\nSultan Kautsar\nTechnical Tracking & GTM Expert`,
                        html: `
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f4f4f4">
                                <tr>
                                    <td align="center" style="padding: 20px 0">
                                        <table border="0" cellpadding="0" cellspacing="0" width="520" style="background-color: #ffffff; border: 1px solid #e0e0e0; font-family: 'Segoe UI', Helvetica, Arial, sans-serif">
                                            <tr>
                                                <td height="6" style="background-color: #1152d4; font-size: 0px; line-height: 0px">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 24px; color: #000000; font-size: 13px; line-height: 1.5">
                                                    <h2 style="color: #1152d4; margin: 0 0 24px 0; font-size: 18px">Thank you for reaching out!</h2>
                                                    <p style="margin: 0 0 10px 0">Hello ${data.name},</p>
                                                    <p style="margin: 0 0 24px 0">I have received your inquiry regarding <strong>${serviceLabel}</strong>. I will review your project details and get back to you within <b>24 hours</b>.</p>
                                                    <h3 style="color: #1152d4; font-size: 14px; margin: 0 0 10px 0; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px">Next steps</h3>
                                                    <ul style="padding: 0 0 0 20px; margin: 0 0 20px 0; color: #333333">
                                                        <li style="margin-bottom: 8px"><strong style="color: #1152d4">Review your request:</strong> I'll carefully review your project details and requirements to understand your specific goals.</li>
                                                        <li style="margin-bottom: 8px"><strong style="color: #1152d4">Strategic proposal:</strong> I'll send you a detailed email outlining the recommended strategy, technical scope, and how we can achieve your objectives.</li>
                                                        <li style="margin-bottom: 8px"><strong style="color: #1152d4">Start working together:</strong> Once we align on the scope via email, we'll kick off your tracking implementation immediately.</li>
                                                    </ul>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-left: 4px solid #1152d4">
                                                        <tr>
                                                            <td style="padding: 12px">
                                                                <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 12px; color: #1152d4">Summary of your request:</p>
                                                                <p style="margin: 0; font-style: italic; color: #555555; font-size: 12px">"${data.message}"</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <hr style="border: 0; border-bottom: 1px solid #eeeeee; margin: 20px 0" />
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td>
                                                                <p style="margin: 0 0 4px 0; font-weight: 600; color: #000000; font-size: 12px">Sultan Kautsar</p>
                                                                <p style="margin: 0 0 4px 0; color: #1152d4; font-size: 12px; font-weight: 600">Technical Tracking & GTM Expert</p>
                                                                <p style="margin: 0 0 4px 0; font-size: 12px; color: #777777">€65/hour · Billed in 30-min increments</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <hr style="border: 0; border-bottom: 1px solid #eeeeee; margin: 16px 0" />
                                                    <p style="margin: 0 0 6px 0; font-size: 11px; color: #777777">You received this email because this address was used to submit a contact form on sultankautsar.com.</p>
                                                    <p style="margin: 0; font-size: 11px; color: #777777">If this was not you or you prefer not to receive follow-ups, <a href="${unsubscribeMailto}" style="color: #1152d4; text-decoration: underline">unsubscribe here</a> or reply with 'unsubscribe'.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        `,
                    }),
                });

                if (!resendResponse.ok) {
                    const resendError = await resendResponse.text();
                    console.error("Resend API error:", resendError);
                    throw new Error("Failed to send email");
                }
            }

            return new Response(JSON.stringify({ status: "ok" }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        } catch (err) {
            console.error("Email worker error:", err);

            return new Response(JSON.stringify({ error: "An error occurred. Please try again later." }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }
    },
};
