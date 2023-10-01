import express from "express";
import { addNewHotel, updateHotel, deleteHotel,getHotel,getHotels,countByCity,countByType } from "../controller/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/",verifyAdmin, addNewHotel);
router.put("/:id",verifyAdmin, updateHotel);
router.delete("/:id",verifyAdmin, deleteHotel);

router.get("/find/:id", getHotel);

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);


export default router;