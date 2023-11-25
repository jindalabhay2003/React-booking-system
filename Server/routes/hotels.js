import express from "express";
import { addNewHotel, updateHotel, deleteHotel,getHotel,getHotels,countByCity,countByType, getHotelRooms } from "../controller/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/",verifyAdmin, addNewHotel);
router.put("/find/:id",verifyAdmin, updateHotel);
router.delete("/find/:id",verifyAdmin, deleteHotel);

router.get("/find/:id", getHotel);

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id",getHotelRooms);


export default router;