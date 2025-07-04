import { baseURL } from "@/resources";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/*",
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
