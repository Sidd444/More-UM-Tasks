const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/video', (req, res) => {
  const videoPath = path.join(__dirname, 'videos', 'rickRoll.mp4');
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = Math.min(start + 999999, fileSize - 1);
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });
    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
