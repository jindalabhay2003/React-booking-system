 import Hotel from '../models/Hotel.js'
 import Room from '../models/Room.js'

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
    const { min, max, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city});
        }))
        // const hotels = await Hotel.find();
        res.status(200).json(list);
    }catch(error){
        next(error);
    }
}

export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };



