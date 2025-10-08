import pool from '../../config/database';

export const getAllStages = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM stages');
    return result.rows;
  } 
  catch (error) {
    console.error('Error getting all stages', error);
    throw error;
  }
  finally {
    client.release(); // CRITICAL: Always release the connection
  }
};

export const getStageById = async (id: string) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM stages WHERE id = $1', [id]);
    return result.rows[0];
  } 
  catch (error) {
    console.error('Error getting stage by id', error);
    throw error;
  }
  finally {
    client.release();
  }
};
