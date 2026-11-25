import mongoose from "mongoose";
import Event from "../models/event-model.js";
import { todayStart } from "../utils/date.js";

const KORUNAN_ALANLAR = ["_id", "createdAt", "updatedAt", "__v", "_v"];

function notFound(res) {
  return res.status(404).json({ error: { message: "Event not found" } });
}

function handleError(res, next, err) {
  if (err?.name === "ValidationError" || err?.name === "CastError") {
    return res.status(400).json({ error: { message: err.message } });
  }
  return next(err);
}

// Tüm etkinlikleri listele (arama, kategori filtresi ve tarihe göre sıralı)
export async function getEvents(req, res, next) {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      const guvenli = String(search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.title = { $regex: guvenli, $options: "i" };
    }

    const events = await Event.find(filter).sort({ date: 1, time: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// Bugün ve sonrasındaki yaklaşan etkinlikleri listele
export async function getUpcomingEvents(req, res, next) {
  try {
    const events = await Event.find({ date: { $gte: todayStart() } }).sort({
      date: 1,
      time: 1,
    });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// ID'ye göre tek etkinlik getir
export async function getEventById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return notFound(res);
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      return notFound(res);
    }
    res.json(event);
  } catch (err) {
    handleError(res, next, err);
  }
}

// Yeni etkinlik oluştur
export async function createEvent(req, res, next) {
  try {
    const event = await Event.create(req.body ?? {});
    res.status(201).json(event);
  } catch (err) {
    handleError(res, next, err);
  }
}

// Etkinliği kısmen güncelle (PATCH)
export async function updateEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return notFound(res);
    }

    const body = req.body ?? {};
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ error: { message: "Body is empty" } });
    }

    const korunan = Object.keys(body).filter((k) => KORUNAN_ALANLAR.includes(k));
    if (korunan.length > 0) {
      return res.status(400).json({
        error: { message: `${korunan.join(", ")} cannot be changed` },
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedEvent) {
      return notFound(res);
    }
    res.json(updatedEvent);
  } catch (err) {
    handleError(res, next, err);
  }
}

// Etkinliği sil (DELETE)
export async function deleteEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return notFound(res);
    }
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return notFound(res);
    }
    res.status(204).end();
  } catch (err) {
    handleError(res, next, err);
  }
}