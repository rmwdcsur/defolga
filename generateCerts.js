const selfsigned = require("selfsigned");
const fs = require("fs");

const attrs = [{ name: "commonName", value: "localhost" }];

async function generateCerts() {
  try {
    console.log("Generating certificate...");

    // Generate the certificates (async)
    const pems = await selfsigned.generate(attrs, { days: 365 });

    console.log("Certificate generation result:", pems);

    if (!pems.private || !pems.cert) {
      throw new Error("Certificate generation failed");
    }

    // Create the certs directory if it doesn't exist
    fs.mkdirSync("certs", { recursive: true });

    // Write the key and certificate files
    fs.writeFileSync("certs/key.pem", pems.private);
    fs.writeFileSync("certs/cert.pem", pems.cert);

    console.log("✅ SSL certificates generated successfully");
  } catch (error) {
    console.error("❌ Error generating SSL certificates:", error);
  }
}

// Run the async function
generateCerts();
