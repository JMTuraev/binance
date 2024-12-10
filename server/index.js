const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");

const app = express();
const PORT = 5000;
const botToken = "7691696064:AAF-407t3e5bkaibJLZzNwOEMkr2APYHlvc"; // O'z bot tokeningizni qo'ying

// Fayllarni yuklash uchun multer sozlamalari
const upload = multer({ dest: "uploads/" });

// Telegramdan fayl qabul qilish
app.post(`/bot${botToken}`, upload.single("file"), async (req, res) => {
  const message = req.body.message;

  if (message && message.document) {
    const fileId = message.document.file_id;

    // Fayl haqida ma'lumot olish
    try {
      const fileInfo = await axios.get(
        `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
      );
      const fileUrl = `https://api.telegram.org/file/bot${botToken}/${fileInfo.data.result.file_path}`;

      // Faylni yuklab olish
      const response = await axios({
        url: fileUrl,
        method: "GET",
        responseType: "stream",
      });

      const filePath = `./uploads/${message.document.file_name}`;
      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      writer.on("finish", () => {
        console.log(`Fayl muvaffaqiyatli yuklandi: ${filePath}`);
        res.send("Fayl muvaffaqiyatli yuklandi!");
      });

      writer.on("error", (error) => {
        console.error("Faylni yozishda xatolik yuz berdi:", error);
        res.status(500).send("Faylni saqlashda xatolik yuz berdi!");
      });
    } catch (error) {
      console.error("Faylni olishda xatolik yuz berdi:", error);
      res.status(500).send("Faylni yuklab olishda xatolik yuz berdi!");
    }
  } else {
    res.status(400).send("Hujjat topilmadi!");
  }
});

// Oddiy GET endpoint
app.get("/", (req, res) => {
  res.send("Server ishlamoqda! Telegram botga fayl yuboring.");
});

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} portida ishga tushdi`);
});
