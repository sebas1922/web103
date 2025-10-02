import { carsData } from "../../data/cars.js";
export const findAllCars = () => {
    return carsData;
};
export const findCarById = (id) => {
    return carsData.find(car => car.id === id);
};
