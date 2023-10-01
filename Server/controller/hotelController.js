 import Hotel from '../models/Hotel.js'

export const addNewHotel = async (req, res,next) => {
    const newHotel = new Hotel(req.body);
    // console.log(req.body);
    try {
        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async (req, res,next) => {
    try{
        // console.log(req.params.id);
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updatedHotel);                                             
    }catch(error){
        next(error);
    }
}

export const deleteHotel = async (req, res,next) => {
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedHotel);
    }catch(error){
        next(error);
    }
}

export const getHotel = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }catch(error){
        next(error);
    }
}

export const getHotels = async (req, res, next) => {
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }catch(error){
        next(error);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city});
        }))
        const hotels = await Hotel.find();
        res.status(200).json(list);
    }catch(error){
        next(error);
    }
}

export const countByType = async (req, res, next) => {
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }catch(error){
        next(error);
    }
}



