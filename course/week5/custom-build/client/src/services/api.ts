import type {
    AllOptions,
    ExteriorColor,
    InteriorColor,
    BodyStyle,
    Wheel,
    PerformancePackage,
    CustomBuild,
    CreateCustomBuildInput,
    UpdateCustomBuildInput,
} from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

// --- Options API ---

/**
 * Fetch all available options at once
 */
export const fetchAllOptions = async (): Promise<AllOptions> => {
    const response = await fetch(`${API_BASE_URL}/options`);
    if (!response.ok) {
        throw new Error('Failed to fetch options');
    }
    return response.json();
};

/**
 * Fetch exterior colors
 */
export const fetchExteriorColors = async (): Promise<ExteriorColor[]> => {
    const response = await fetch(`${API_BASE_URL}/options/exterior-colors`);
    if (!response.ok) {
        throw new Error('Failed to fetch exterior colors');
    }
    return response.json();
};

/**
 * Fetch interior colors
 */
export const fetchInteriorColors = async (): Promise<InteriorColor[]> => {
    const response = await fetch(`${API_BASE_URL}/options/interior-colors`);
    if (!response.ok) {
        throw new Error('Failed to fetch interior colors');
    }
    return response.json();
};

/**
 * Fetch body styles
 */
export const fetchBodyStyles = async (): Promise<BodyStyle[]> => {
    const response = await fetch(`${API_BASE_URL}/options/body-styles`);
    if (!response.ok) {
        throw new Error('Failed to fetch body styles');
    }
    return response.json();
};

/**
 * Fetch wheels
 */
export const fetchWheels = async (): Promise<Wheel[]> => {
    const response = await fetch(`${API_BASE_URL}/options/wheels`);
    if (!response.ok) {
        throw new Error('Failed to fetch wheels');
    }
    return response.json();
};

/**
 * Fetch performance packages
 */
export const fetchPerformancePackages = async (): Promise<PerformancePackage[]> => {
    const response = await fetch(`${API_BASE_URL}/options/performance-packages`);
    if (!response.ok) {
        throw new Error('Failed to fetch performance packages');
    }
    return response.json();
};

// --- Custom Builds API ---

/**
 * Fetch all saved custom builds
 */
export const fetchAllBuilds = async (): Promise<CustomBuild[]> => {
    const response = await fetch(`${API_BASE_URL}/builds`);
    if (!response.ok) {
        throw new Error('Failed to fetch builds');
    }
    return response.json();
};

/**
 * Fetch a single build by ID
 */
export const fetchBuildById = async (id: number): Promise<CustomBuild> => {
    const response = await fetch(`${API_BASE_URL}/builds/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch build');
    }
    return response.json();
};

/**
 * Create a new custom build
 */
export const createBuild = async (build: CreateCustomBuildInput): Promise<CustomBuild> => {
    const response = await fetch(`${API_BASE_URL}/builds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(build),
    });
    if (!response.ok) {
        throw new Error('Failed to create build');
    }
    return response.json();
};

/**
 * Update an existing build
 */
export const updateBuild = async (id: number, build: UpdateCustomBuildInput): Promise<CustomBuild> => {
    const response = await fetch(`${API_BASE_URL}/builds/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(build),
    });
    if (!response.ok) {
        throw new Error('Failed to update build');
    }
    return response.json();
};

/**
 * Delete a build
 */
export const deleteBuild = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/builds/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete build');
    }
};

