import express from "express";
import { addNewHotel, updateHotel, deleteHotel,getHotel,getHotels } from "../controller/hotelController.js";

const router = express.Router();

router.post("/", addNewHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/", getHotels);
router.get("/:id", getHotel);

export default router;