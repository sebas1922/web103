import { carsData } from "../../data/cars";
export const findAllCars = () => {
    return carsData;
};
export const findCarById = (id) => {
    return carsData.find(car => car.id === id);
};
