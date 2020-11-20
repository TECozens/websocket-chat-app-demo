import dbService from './dbService'

export const getRooms = () => {
    return dbService.get("/rockpaperscissor/getRoomSchema");
}

export const addRoom = (roomToBeAdded) => {
    return dbService.post("/rockpaperscissor/addRoom", roomToBeAdded);
}

export const rmRoom = (roomToBeRemoved) => {
    return dbService.post("/rockpaperscissor/rmRoom", roomToBeRemoved);
}