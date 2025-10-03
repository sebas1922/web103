// src/api/cars/cars.service.ts
import { PgClient } from "../../config/database.js";

export const findAllCars = async () => {
    try {
    const client = PgClient();
    await client.connect();
    const res = await client.query('SELECT * FROM cars');
    await client.end();
    return res.rows;
    } catch (error) {
        console.error('Error finding all cars:', error);
        throw error;
    }
};

export const findCarById = async (id: number) => {
    try {
        const client = PgClient();
        await client.connect();
        const res = await client.query('SELECT * FROM cars WHERE id = $1', [id]);
        await client.end();
        return res.rows[0];
    } catch (error) {
        console.error('Error finding car by id:', error);
        throw error;
    }       
};