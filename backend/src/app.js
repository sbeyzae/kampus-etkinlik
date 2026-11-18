import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotalar
app.use("/events", eventRoutes);

// Sağlık kontrolü (Öğrenci numaran sprint 7'den kalma şekilde duruyor)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2211011030"
  });
});

// Eşleşmeyen route'lar için 404
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// 4 parametreli hata yakalayıcı middleware (Sunucunun çökmesini engeller)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;