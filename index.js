const express = require("express");
const Canvas = require("@napi-rs/canvas");

const app = express();

// ===== BO GÓC =====
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// ===== AUTO FONT =====
function applyText(canvas, text, maxWidth, startSize) {
  const ctx = canvas.getContext("2d");

  let size = startSize;

  do {
    ctx.font = `bold ${size}px Sans`;
    size--;
  } while (ctx.measureText(text).width > maxWidth && size > 20);

  return ctx.font;
}

app.get("/", (req, res) => {
  res.send("Welcome API Online");
});

app.get("/welcome", async (req, res) => {
  try {

    const avatarURL = req.query.avatar;

    if (!avatarURL)
      return res.status(400).send("Missing avatar");

    const username = decodeURIComponent(
      req.query.username || "Member"
    );

    const serverName = decodeURIComponent(
      req.query.server || "CAPY SHOP"
    );

    const canvas = Canvas.createCanvas(1200, 500);
    const ctx = canvas.getContext("2d");
        // ===== BACKGROUND =====

    try {
      const bg = await Canvas.loadImage(
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600"
      );

      ctx.drawImage(bg, 0, 0, 1200, 500);

    } catch {

      ctx.fillStyle = "#0d0d0d";
      ctx.fillRect(0, 0, 1200, 500);

    }

    // Overlay tối
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(0, 0, 1200, 500);

    // ===== VẠCH TRANG TRÍ =====

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(520, 95);
    ctx.lineTo(950, 95);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(520, 330);
    ctx.lineTo(950, 330);
    ctx.stroke();

    // ===== CHỮ DỌC WELCOME =====

    ctx.save();

    ctx.translate(1120, 100);
    ctx.rotate(Math.PI / 2);

    ctx.font = "bold 70px Sans";
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;

    ctx.strokeText("WELCOME", 0, 0);
    ctx.strokeText("WELCOME", 0, 90);

    ctx.restore();

    // ===== GÓC TRANG TRÍ =====

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(40, 40, 40, 4);
    ctx.fillRect(40, 55, 40, 4);

    ctx.fillRect(1120, 40, 40, 4);
    ctx.fillRect(1120, 55, 40, 4);
        // ===== AVATAR =====

    const avatar = await Canvas.loadImage(avatarURL);

    // Glow
    ctx.shadowColor = "#ff6ec7";
    ctx.shadowBlur = 40;

    ctx.beginPath();
    ctx.arc(180, 250, 115, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fill();

    ctx.shadowBlur = 0;

    // Viền trắng
    ctx.beginPath();
    ctx.arc(180, 250, 105, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Avatar tròn
    ctx.save();

    ctx.beginPath();
    ctx.arc(180, 250, 95, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatar, 85, 155, 190, 190);

    ctx.restore();

    // Viền RGB
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.arc(180, 250, 103, 0, Math.PI * 2);
    ctx.strokeStyle = "#ff6ec7";
    ctx.stroke();

    // Username
    ctx.fillStyle = "#ffcc66";
    ctx.font = applyText(canvas, username, 500, 55);
    ctx.fillText(username, 450, 90);

    // DISCORD SERVER
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Sans";
    ctx.fillText("DISCORD SERVER", 520, 145);

    // ===== WELCOME RGB =====

    ctx.font = "bold 100px Sans";

    ctx.fillStyle = "#00e5ff";
    ctx.fillText("WELCOME", 523, 235);

    ctx.fillStyle = "#ff4db8";
    ctx.fillText("WELCOME", 517, 230);

    ctx.fillStyle = "#ffffff";
    ctx.fillText("WELCOME", 520, 232);

    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Sans";

    ctx.fillText(
      "HOPE YOU HAVE A GREAT TIME HERE!",
      520,
      270
    );
        // ===== CHÀO MỪNG =====

    ctx.fillStyle = "#00e5ff";
    ctx.font = applyText(
      canvas,
      "CHÀO MỪNG ĐẾN VỚI " + serverName,
      700,
      55
    );

    ctx.fillText(
      "CHÀO MỪNG ĐẾN VỚI " + serverName,
      450,
      360
    );

    // ===== LOGO GIỮA DƯỚI =====

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 45px Sans";
    ctx.fillText("S", 690, 430);

    ctx.fillStyle = "#ff6ec7";
    ctx.fillText("Y", 725, 460);

    ctx.fillStyle = "#ffffff";
    ctx.fillText("N", 710, 430);

    ctx.fillStyle = "#ffffff";
    ctx.fillText("C", 745, 460);

    // ===== HẠT SÁNG =====

    for (let i = 0; i < 40; i++) {

      const x = Math.random() * 1200;
      const y = Math.random() * 500;
      const size = Math.random() * 3;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);

      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fill();

    }

    // ===== VIỀN DƯỚI =====

    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(450, 390);
    ctx.lineTo(900, 390);
    ctx.stroke();
        // ===== CHỮ DỌC BÊN TRÁI =====

    ctx.save();

    ctx.translate(70, 420);
    ctx.rotate(-Math.PI / 2);

    ctx.font = "bold 65px Sans";
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 2;

    ctx.strokeText("WELCOME", 0, 0);
    ctx.strokeText("WELCOME", 0, 90);

    ctx.restore();

    // ===== MŨI TÊN TRANG TRÍ =====

    ctx.fillStyle = "#ffffff";

    ctx.beginPath();
    ctx.moveTo(1010, 80);
    ctx.lineTo(1040, 95);
    ctx.lineTo(1010, 110);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(1045, 80);
    ctx.lineTo(1075, 95);
    ctx.lineTo(1045, 110);
    ctx.fill();

    // ===== GÓC PHẢI DƯỚI =====

    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(1030, 430);
    ctx.lineTo(1130, 430);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1130, 430);
    ctx.lineTo(1130, 390);
    ctx.stroke();

    // ===== EXPORT PNG =====

    const buffer = canvas.toBuffer("image/png");

    res.setHeader(
      "Content-Type",
      "image/png"
    );

    res.end(buffer);

  } catch (err) {

    console.error(err);

    res.status(500).send(
      err.toString()
    );

  }

});

// ===== PORT =====

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Welcome API Online | Port ${PORT}`
  );

});
