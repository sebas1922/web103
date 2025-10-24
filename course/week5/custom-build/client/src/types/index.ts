// --- Option Types ---
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

export interface AllOptions {
    exteriorColors: ExteriorColor[];
    interiorColors: InteriorColor[];
    bodyStyles: BodyStyle[];
    wheels: Wheel[];
    performancePackages: PerformancePackage[];
}

// --- Custom Build Types ---
export interface CustomBuild {
    id: number;
    created_at: string;
    total_price: number;
    exterior_color_id: number;
    exterior_color_name: string;
    exterior_color_price: number;
    interior_color_id: number;
    interior_color_name: string;
    interior_color_price: number;
    body_style_id: number;
    body_style_name: string;
    body_style_price: number;
    wheels_id: number;
    wheels_name: string;
    wheels_price: number;
    performance_package_id: number;
    performance_package_name: string;
    performance_package_price: number;
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

// --- Configuration Types ---
export interface BuildConfiguration {
    exteriorColorId: number | null;
    interiorColorId: number | null;
    bodyStyleId: number | null;
    wheelsId: number | null;
    performancePackageId: number | null;
}

