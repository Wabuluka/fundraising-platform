import "dotenv/config";

export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),
  database: {
    uri: process.env.MONGODB_TEST_URI!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: "7d",
    refreshExpiresIn: "30d",
    refresh: process.env.JWT_REFRESH_SECRET!,
  } as const,
  flutterwave: {
    publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY || "",
    secretKey: process.env.FLUTTERWAVE_SECRET_KEY || "",
    encryptionKey: process.env.FLUTTERWAVE_ENCRYPTION_KEY || "",
    webhookHash: process.env.FLUTTERWAVE_WEBHOOK_HASH || "",
    apiUrl: process.env.FLUTTERWAVE_API_URL,
  },

  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
};
