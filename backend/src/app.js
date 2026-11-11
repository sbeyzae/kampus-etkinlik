import express from "express";
import cors from "cors";

// Birazdan oluşturacağımız route dosyasını içe aktarıyoruz
// import eventRoutes from "./routes/event-routes.js";

const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json()); // POST işlemlerinde gelen JSON body'sini okumak için şart

// Health Check Endpointi (Adım 4)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2211011030",
  });
});

// Etkinlik Route'ları (Route'ları yazdığımızda buranın yorumunu kaldıracağız)
// app.use("/events", eventRoutes);

// Tanımlanmayan bir route gelirse 404 dön
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;