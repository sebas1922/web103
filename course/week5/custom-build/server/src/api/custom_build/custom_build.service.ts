import pool from '../../config/db.js';

// --- Type Definitions ---
export interface CustomBuild {
    id?: number;
    created_at?: Date;
    exterior_color_id: number;
    interior_color_id: number;
    body_style_id: number;
    wheels_id: number;
    performance_package_id: number;
    total_price: number;
}

export interface CreateCustomBuildInput {
    exterior_color_id: number;
    interior_color_id: number;
    body_style_id: number;
    wheels_id: number;
    performance_package_id: number;
    total_price: number;
}

export interface UpdateCustomBuildInput {
    exterior_color_id?: number;
    interior_color_id?: number;
    body_style_id?: number;
    wheels_id?: number;
    performance_package_id?: number;
    total_price?: number;
}

// --- Service Functions ---

/**
 * Fetch all custom builds with full option details
 */
export const findAllCustomBuilds = async (): Promise<any[]> => {
    const query = `
        SELECT 
            cb.id,
            cb.created_at,
            cb.total_price,
            ec.id as exterior_color_id,
            ec.name as exterior_color_name,
            ec.price_modifier as exterior_color_price,
            ic.id as interior_color_id,
            ic.name as interior_color_name,
            ic.price_modifier as interior_color_price,
            bs.id as body_style_id,
            bs.name as body_style_name,
            bs.price_modifier as body_style_price,
            w.id as wheels_id,
            w.name as wheels_name,
            w.price_modifier as wheels_price,
            pp.id as performance_package_id,
            pp.name as performance_package_name,
            pp.price_modifier as performance_package_price
        FROM custom_builds cb
        LEFT JOIN exterior_colors ec ON cb.exterior_color_id = ec.id
        LEFT JOIN interior_colors ic ON cb.interior_color_id = ic.id
        LEFT JOIN body_styles bs ON cb.body_style_id = bs.id
        LEFT JOIN wheels w ON cb.wheels_id = w.id
        LEFT JOIN performance_packages pp ON cb.performance_package_id = pp.id
        ORDER BY cb.created_at DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
};

/**
 * Fetch a single custom build by ID with full option details
 */
export const findCustomBuildById = async (id: number): Promise<any> => {
    const query = `
        SELECT 
            cb.id,
            cb.created_at,
            cb.total_price,
            ec.id as exterior_color_id,
            ec.name as exterior_color_name,
            ec.price_modifier as exterior_color_price,
            ic.id as interior_color_id,
            ic.name as interior_color_name,
            ic.price_modifier as interior_color_price,
            bs.id as body_style_id,
            bs.name as body_style_name,
            bs.price_modifier as body_style_price,
            w.id as wheels_id,
            w.name as wheels_name,
            w.price_modifier as wheels_price,
            pp.id as performance_package_id,
            pp.name as performance_package_name,
            pp.price_modifier as performance_package_price
        FROM custom_builds cb
        LEFT JOIN exterior_colors ec ON cb.exterior_color_id = ec.id
        LEFT JOIN interior_colors ic ON cb.interior_color_id = ic.id
        LEFT JOIN body_styles bs ON cb.body_style_id = bs.id
        LEFT JOIN wheels w ON cb.wheels_id = w.id
        LEFT JOIN performance_packages pp ON cb.performance_package_id = pp.id
        WHERE cb.id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

/**
 * Create a new custom build
 */
export const createCustomBuild = async (build: CreateCustomBuildInput): Promise<CustomBuild> => {
    const query = `
        INSERT INTO custom_builds (
            exterior_color_id,
            interior_color_id,
            body_style_id,
            wheels_id,
            performance_package_id,
            total_price
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
    const { rows } = await pool.query<CustomBuild>(query, [
        build.exterior_color_id,
        build.interior_color_id,
        build.body_style_id,
        build.wheels_id,
        build.performance_package_id,
        build.total_price,
    ]);
    return rows[0];
};

/**
 * Update an existing custom build
 */
export const updateCustomBuild = async (id: number, build: UpdateCustomBuildInput): Promise<CustomBuild | null> => {
    // Build dynamic update query based on provided fields
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (build.exterior_color_id !== undefined) {
        updates.push(`exterior_color_id = $${paramCount++}`);
        values.push(build.exterior_color_id);
    }
    if (build.interior_color_id !== undefined) {
        updates.push(`interior_color_id = $${paramCount++}`);
        values.push(build.interior_color_id);
    }
    if (build.body_style_id !== undefined) {
        updates.push(`body_style_id = $${paramCount++}`);
        values.push(build.body_style_id);
    }
    if (build.wheels_id !== undefined) {
        updates.push(`wheels_id = $${paramCount++}`);
        values.push(build.wheels_id);
    }
    if (build.performance_package_id !== undefined) {
        updates.push(`performance_package_id = $${paramCount++}`);
        values.push(build.performance_package_id);
    }
    if (build.total_price !== undefined) {
        updates.push(`total_price = $${paramCount++}`);
        values.push(build.total_price);
    }

    if (updates.length === 0) {
        // No fields to update
        return null;
    }

    values.push(id);
    const query = `
        UPDATE custom_builds
        SET ${updates.join(', ')}
        WHERE id = $${paramCount}
        RETURNING *
    `;

    const { rows } = await pool.query<CustomBuild>(query, values);
    return rows[0];
};

/**
 * Delete a custom build
 */
export const deleteCustomBuild = async (id: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM custom_builds WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
};
