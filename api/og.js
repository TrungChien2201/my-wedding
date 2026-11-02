export default function handler(req, res) {
  const { name = "Quý Khách" } = req.query;
  const decodedName = decodeURIComponent(name.replace(/-/g, " "));

  const html = `
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8">
    <meta property="og:title" content="💖 Thiệp Cưới Online — Chiến & Liễu 💖 • 💌 Gửi: ${decodedName}" />
    <meta property="og:description" content="Trân trọng kính mời ${decodedName} đến dự tiệc cưới của Chiến & Liễu vào ngày 15/11/2026 ♡ ... ⏯️ NHẤN để xem thêm" />
    <meta property="og:url" content="https://dungmywedding.vercel.app/og?name=${name}" />
    <meta property="og:type" content="website" />
    <meta http-equiv="refresh" content="0; url=/?name=${name}" />
    <style>
      body {
        font-family: sans-serif;
        background: #fff5f8;
        color: #d63384;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    Tình yêu viết tiếp chuyện đôi mình,  <br />
    Thiệp hồng gửi bạn nghĩa chân tình 💌
  </body>
</html>
`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
