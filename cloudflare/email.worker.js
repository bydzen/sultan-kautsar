export default {
    async fetch(request, env) {
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            const contentType = request.headers.get("content-type") || "";
            let data = {};

            if (contentType.includes("form")) {
                const formData = await request.formData();
                data = Object.fromEntries(formData.entries());
            } else {
                data = await request.json();
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

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                throw new Error("Invalid email format");
            }

            if (env.RESEND_API_KEY) {
                const sender = "hello@sultankautsar.com";

                await fetch("https://api.resend.com/emails", {
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
                        subject: `Inquiry confirmation: ${data.service.replace(/-/g, " ").replace(/^./, (str) => str.toUpperCase())} service`,
                        html: `
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f4f4f4;">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="520" style="background-color: #ffffff; border: 1px solid #e0e0e0; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
                                            <tr>
                                                <td height="6" style="background-color: #1152d4; font-size: 0px; line-height: 0px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 24px; color: #000000; font-size: 13px; line-height: 1.5;">
                                                    <h2 style="color: #1152d4; margin: 0 0 24px 0; font-size: 18px;">Thank you for reaching out!</h2>
                                                    <p style="margin: 0 0 10px 0;">Hello ${data.name},</p>
                                                    <p style="margin: 0 0 24px 0;">I have received your inquiry regarding <strong>${data.service.replace(/-/g, " ")}</strong>. I will review your project details and get back to you within <b>24 hours</b>.</p>
                                                    <h3 style="color: #1152d4; font-size: 14px; margin: 0 0 10px 0; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">Next steps</h3>
                                                    <ul style="padding: 0 0 0 20px; margin: 0 0 20px 0; color: #333333;">
                                                        <li style="margin-bottom: 8px;"><strong style="color: #1152d4;">Review your request:</strong> I'll carefully review your project details and requirements to understand your specific goals.</li>
                                                        <li style="margin-bottom: 8px;"><strong style="color: #1152d4;">Strategic proposal:</strong> I'll send you a detailed email outlining the recommended strategy, technical scope, and how we can achieve your objectives.</li>
                                                        <li style="margin-bottom: 8px;"><strong style="color: #1152d4;">Start working together:</strong> Once we align on the scope via email, we'll kick off your tracking implementation immediately.</li>
                                                    </ul>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-left: 4px solid #1152d4;">
                                                        <tr>
                                                            <td style="padding: 12px;">
                                                                <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 12px; color: #1152d4;">Summary of your request:</p>
                                                                <p style="margin: 0; font-style: italic; color: #555555; font-size: 12px;">"${data.message}"</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <hr style="border: 0; border-bottom: 1px solid #eeeeee; margin: 20px 0;">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td>
                                                                <p style="margin: 0 0 4px 0; font-weight: 600; color: #000000; font-size: 12px;">Sultan Kautsar</p>
                                                                <p style="margin: 0 0 4px 0; color: #1152d4; font-size: 12px; font-weight: 600;">Technical Tracking & GTM Expert</p>
                                                                <p style="margin: 0 0 4px 0; font-size: 12px; color: #777777;">€65/hour · Billed in 30-min increments</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        `,
                    }),
                });
            }

            return new Response(JSON.stringify({ status: "ok" }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }
    },
};
