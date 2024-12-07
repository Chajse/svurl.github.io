const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const QRCode = require("qrcode");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const urlMap = new Map();
const baseUrl = "http://localhost:3000";

app.post("/shorten", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortId = Math.random().toString(36).substring(2, 8);
  const shortUrl = `${baseUrl}/${shortId}`;
  urlMap.set(shortId, url);

  const qrCode = await QRCode.toDataURL(shortUrl);
  res.json({ shortUrl, qrCode });
});

app.get("/:id", (req, res) => {
  const originalUrl = urlMap.get(req.params.id);
  if (!originalUrl) return res.status(404).send("URL not found");

  res.redirect(originalUrl);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
