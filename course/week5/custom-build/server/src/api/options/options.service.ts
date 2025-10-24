import pool from '../../config/db.js';

// --- Type Definitions ---
export interface ExteriorColor {
    id: number;
    name: string;
    price_modifier: number;
    image_url: string | null;
}

export interface InteriorColor {
    id: number;
    name: string;
    price_modifier: number;
    image_url: string | null;
}

export interface BodyStyle {
    id: number;
    name: string;
    price_modifier: number;
    image_url: string | null;
}

export interface Wheel {
    id: number;
    name: string;
    price_modifier: number;
    image_url: string | null;
}

export interface PerformancePackage {
    id: number;
    name: string;
    price_modifier: number;
    description: string | null;
}

// --- Service Functions ---

/**
 * Fetch all available exterior colors
 */
export const findAllExteriorColors = async (): Promise<ExteriorColor[]> => {
    const { rows } = await pool.query<ExteriorColor>(
        'SELECT id, name, price_modifier, image_url FROM exterior_colors ORDER BY price_modifier, name'
    );
    return rows;
};

/**
 * Fetch all available interior colors
 */
export const findAllInteriorColors = async (): Promise<InteriorColor[]> => {
    const { rows } = await pool.query<InteriorColor>(
        'SELECT id, name, price_modifier, image_url FROM interior_colors ORDER BY price_modifier, name'
    );
    return rows;
};

/**
 * Fetch all available body styles
 */
export const findAllBodyStyles = async (): Promise<BodyStyle[]> => {
    const { rows } = await pool.query<BodyStyle>(
        'SELECT id, name, price_modifier, image_url FROM body_styles ORDER BY price_modifier, name'
    );
    return rows;
};

/**
 * Fetch all available wheel options
 */
export const findAllWheels = async (): Promise<Wheel[]> => {
    const { rows } = await pool.query<Wheel>(
        'SELECT id, name, price_modifier, image_url FROM wheels ORDER BY price_modifier, name'
    );
    return rows;
};

/**
 * Fetch all available performance packages
 */
export const findAllPerformancePackages = async (): Promise<PerformancePackage[]> => {
    const { rows } = await pool.query<PerformancePackage>(
        'SELECT id, name, price_modifier, description FROM performance_packages ORDER BY price_modifier, name'
    );
    return rows;
};

/**
 * Fetch all options at once (useful for configurator page initialization)
 */
export const findAllOptions = async () => {
    const [exteriorColors, interiorColors, bodyStyles, wheels, performancePackages] = await Promise.all([
        findAllExteriorColors(),
        findAllInteriorColors(),
        findAllBodyStyles(),
        findAllWheels(),
        findAllPerformancePackages(),
    ]);

    return {
        exteriorColors,
        interiorColors,
        bodyStyles,
        wheels,
        performancePackages,
    };
};

