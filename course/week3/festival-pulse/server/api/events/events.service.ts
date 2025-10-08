import pool from '../../config/database';

export const getAllEvents = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM events ORDER BY start_time ASC');
    return result.rows;
  }
  catch (error) {
    console.error('Error getting all events', error);
    throw error;
  }
  finally {
    client.release();
  }
};

export const getEventById = async (id: string) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM events WHERE id = $1', [id]);
    return result.rows[0];
  }
  catch (error) {
    console.error('Error getting event by id', error);
    throw error;
  }
  finally {
    client.release();
  }
};

export const getEventsByStageId = async (id: string) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM events WHERE stage_id = $1 ORDER BY start_time ASC', [id]);
    return result.rows;
  }
  catch (error) {
    console.error('Error getting event by stage id', error);
    throw error;
  }
  finally {
    client.release();
  }
};

