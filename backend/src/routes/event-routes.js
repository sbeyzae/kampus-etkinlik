import { Router } from "express";
import { 
  getEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from "../controllers/event-controller.js";

const router = Router();

// Zaten /events altındayız, o yüzden "/" kök dizini temsil eder
router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;