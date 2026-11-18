import "dotenv/config"; // En üste mutlaka bu eklenmeli!
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Önce MongoDB'ye bağlan
    await connectDatabase();
    
    // Sonra sunucuyu dinlemeye başla
    app.listen(PORT, () => {
      console.log(`API çalışıyor: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Veritabanı bağlantı hatası:", err.message);
  }
}

startServer();