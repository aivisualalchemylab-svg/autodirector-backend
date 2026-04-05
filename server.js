import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

app.post("/generate-video", async (req, res) => {
  try {
    const response = await fetch("https://api.kie.ai/api/v1/jobs/createTask", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.KIE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "seedance-2",
        input: {
          prompt: req.body.prompt,
          image: `data:image/jpeg;base64,${req.body.image}`
        }
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/video-status/:id", async (req, res) => {
  try {
    const response = await fetch(`https://api.kie.ai/api/v1/jobs/${req.params.id}`, {
      headers: {
        "Authorization": `Bearer ${process.env.KIE_API_KEY}`
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000);
