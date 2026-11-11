import { Router } from "express";
import { getEvents, getEventById, createEvent } from "../controllers/event-controller.js";

const router = Router();

// Zaten /events altındayız, o yüzden "/" kök dizini temsil eder
router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);

export default router;