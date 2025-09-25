import { carsData } from "../../data/cars.js";

export const findAllCars = () => {
    return carsData;
};

export const findCarById = (id: number) => {
    return carsData.find(car => car.id === id);
};