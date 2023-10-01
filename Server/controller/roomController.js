import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {

    const HotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const room = await newRoom.save();
        await Hotel.findByIdAndUpdate(HotelId, {$push: {rooms: room._id}});

        res.status(201).json(room);
    } catch (err) {
        next(err);
    }

}

export const updateRoom = async (req, res,next) => {
    try{
        // console.log(req.params.id);
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updatedRoom);                                             
    }catch(error){
        next(error);
    }
}

export const deleteRoom = async (req, res,next) => {
    const HotelId = req.params.hotelid;
    try{
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        await Hotel.findByIdAndUpdate(HotelId, {$pull: {rooms: req.params.id}});
        res.status(200).json(deletedRoom);
    }catch(error){
        next(error);
    }
}

export const getRooms = async (req, res, next) => {
    try{
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }catch(error){
        next(error);
    }
}

export const getRoom = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    }catch(error){
        next(error);
    }
}