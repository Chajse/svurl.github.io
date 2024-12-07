import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { nanoid } from "nanoid";
import QRCode from "qrcode";

// Define the structure for each URL entry
interface UrlEntry {
  originalUrl: string;
  shortUrl: string;
  qrCodeData: string;
}

// In-memory storage for URLs with the correct type
const urlDatabase: Record<string, UrlEntry> = {};

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/api/shortened-urls", (req, res) => {
  res.json(urlDatabase);
});

app.post("/api/shortened-urls", async (req, res) => {
  const { originalUrl, customAlias } = req.body;

  // Generate a unique ID if no customAlias is provided
  const shortUrl = customAlias || nanoid(6);
  const fullShortUrl = `${req.protocol}://${req.get('host')}/${shortUrl}`;

  try {
    // Generate QR code
    const qrCodeData = await QRCode.toDataURL(fullShortUrl);

    // Store the URL and QR code in the database
    urlDatabase[shortUrl] = {
      originalUrl,
      shortUrl: fullShortUrl,
      qrCodeData,
    };

    res.json({
      originalUrl,
      shortUrl: fullShortUrl,
      qrCodeData,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
