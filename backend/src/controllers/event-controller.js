import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

// Tüm etkinlikleri listele (kategori filtresi ve tarihe göre sıralı)
export async function getEvents(req, res, next) {
  try {
    const filter = req.query.category
      ? { category: req.query.category }
      : {};
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// ID'ye göre tek etkinlik getir
export async function getEventById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
}

// Yeni etkinlik oluştur
export async function createEvent(req, res, next) {
  try {
    const event = await Event.create(req.body ?? {});
    res.status(201).json(event);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}

// Etkinliği güncelle (PUT/PATCH)
export async function updateEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    res.json(updatedEvent);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}

// Etkinliği sil (DELETE)
export async function deleteEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}