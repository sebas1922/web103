import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllOptions, createBuild, updateBuild, fetchBuildById } from '../services/api';
import type { AllOptions, BuildConfiguration } from '../types';
import '../styles/Configurator.css';

const BASE_PRICE = 30000; // Base car price

const ConfiguratorPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [options, setOptions] = useState<AllOptions | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const [config, setConfig] = useState<BuildConfiguration>({
        exteriorColorId: null,
        interiorColorId: null,
        bodyStyleId: null,
        wheelsId: null,
        performancePackageId: null,
    });

    // Fetch options on mount
    useEffect(() => {
        const loadOptions = async () => {
            try {
                const data = await fetchAllOptions();
                setOptions(data);

                if (isEditMode && id) {
                    // Load existing build for editing
                    const build = await fetchBuildById(parseInt(id, 10));
                    setConfig({
                        exteriorColorId: build.exterior_color_id,
                        interiorColorId: build.interior_color_id,
                        bodyStyleId: build.body_style_id,
                        wheelsId: build.wheels_id,
                        performancePackageId: build.performance_package_id,
                    });
                } else {
                    // Set defaults for new build
                    setConfig({
                        exteriorColorId: data.exteriorColors[0]?.id || null,
                        interiorColorId: data.interiorColors[0]?.id || null,
                        bodyStyleId: data.bodyStyles[0]?.id || null,
                        wheelsId: data.wheels[0]?.id || null,
                        performancePackageId: data.performancePackages[0]?.id || null,
                    });
                }
            } catch (err) {
                setError('Failed to load options');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadOptions();
    }, [id, isEditMode]);

    // Calculate total price
    const calculateTotalPrice = (): number => {
        if (!options) return BASE_PRICE;

        let total = BASE_PRICE;

        if (config.exteriorColorId) {
            const color = options.exteriorColors.find((c) => c.id === config.exteriorColorId);
            if (color) total += color.price_modifier;
        }

        if (config.interiorColorId) {
            const color = options.interiorColors.find((c) => c.id === config.interiorColorId);
            if (color) total += color.price_modifier;
        }

        if (config.bodyStyleId) {
            const style = options.bodyStyles.find((s) => s.id === config.bodyStyleId);
            if (style) total += style.price_modifier;
        }

        if (config.wheelsId) {
            const wheel = options.wheels.find((w) => w.id === config.wheelsId);
            if (wheel) total += wheel.price_modifier;
        }

        if (config.performancePackageId) {
            const pkg = options.performancePackages.find((p) => p.id === config.performancePackageId);
            if (pkg) total += pkg.price_modifier;
        }

        return total;
    };

    const handleSave = async () => {
        if (
            !config.exteriorColorId ||
            !config.interiorColorId ||
            !config.bodyStyleId ||
            !config.wheelsId ||
            !config.performancePackageId
        ) {
            alert('Please select all options');
            return;
        }

        setSaving(true);
        try {
            const buildData = {
                exterior_color_id: config.exteriorColorId,
                interior_color_id: config.interiorColorId,
                body_style_id: config.bodyStyleId,
                wheels_id: config.wheelsId,
                performance_package_id: config.performancePackageId,
                total_price: calculateTotalPrice(),
            };

            if (isEditMode && id) {
                await updateBuild(parseInt(id, 10), buildData);
                alert('Build updated successfully!');
            } else {
                await createBuild(buildData);
                alert('Build saved successfully!');
            }
            navigate('/gallery');
        } catch (err) {
            alert('Failed to save build');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="configurator-page">
                <div className="loading">Loading configurator...</div>
            </div>
        );
    }

    if (error || !options) {
        return (
            <div className="configurator-page">
                <div className="error">{error || 'Failed to load options'}</div>
            </div>
        );
    }

    const totalPrice = calculateTotalPrice();

    return (
        <div className="configurator-page">
            <header className="configurator-header">
                <h1>{isEditMode ? 'Edit Your Build' : 'Build Your Dream Car'}</h1>
                <button className="nav-button" onClick={() => navigate('/gallery')}>
                    View Gallery
                </button>
            </header>

            <div className="configurator-content">
                {/* Car Preview */}
                <div className="car-preview">
                    <div className="preview-placeholder">
                        <svg viewBox="0 0 400 200" className="car-svg">
                            <rect x="50" y="80" width="300" height="80" rx="10" fill="currentColor" opacity="0.2" />
                            <rect x="80" y="50" width="160" height="60" rx="5" fill="currentColor" opacity="0.3" />
                            <circle cx="120" cy="160" r="25" fill="currentColor" opacity="0.4" />
                            <circle cx="280" cy="160" r="25" fill="currentColor" opacity="0.4" />
                        </svg>
                        <p className="preview-text">Car Preview</p>
                    </div>
                </div>

                {/* Options Panel */}
                <div className="options-panel">
                    <div className="price-display">
                        <h2>Total Price</h2>
                        <div className="price">${totalPrice.toLocaleString()}</div>
                    </div>

                    {/* Exterior Color */}
                    <div className="option-section">
                        <h3>Exterior Color</h3>
                        <div className="option-grid">
                            {options.exteriorColors.map((color) => (
                                <button
                                    key={color.id}
                                    className={`option-button ${config.exteriorColorId === color.id ? 'selected' : ''}`}
                                    onClick={() => setConfig({ ...config, exteriorColorId: color.id })}
                                >
                                    <div className="option-content">
                                        <span className="option-name">{color.name}</span>
                                        <span className="option-price">
                                            {color.price_modifier > 0 ? `+$${color.price_modifier}` : 'Included'}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Interior Color */}
                    <div className="option-section">
                        <h3>Interior Color</h3>
                        <div className="option-grid">
                            {options.interiorColors.map((color) => (
                                <button
                                    key={color.id}
                                    className={`option-button ${config.interiorColorId === color.id ? 'selected' : ''}`}
                                    onClick={() => setConfig({ ...config, interiorColorId: color.id })}
                                >
                                    <div className="option-content">
                                        <span className="option-name">{color.name}</span>
                                        <span className="option-price">
                                            {color.price_modifier > 0 ? `+$${color.price_modifier}` : 'Included'}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Body Style */}
                    <div className="option-section">
                        <h3>Body Style</h3>
                        <div className="option-grid">
                            {options.bodyStyles.map((style) => (
                                <button
                                    key={style.id}
                                    className={`option-button ${config.bodyStyleId === style.id ? 'selected' : ''}`}
                                    onClick={() => setConfig({ ...config, bodyStyleId: style.id })}
                                >
                                    <div className="option-content">
                                        <span className="option-name">{style.name}</span>
                                        <span className="option-price">
                                            {style.price_modifier > 0 ? `+$${style.price_modifier}` : 'Included'}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Wheels */}
                    <div className="option-section">
                        <h3>Wheels</h3>
                        <div className="option-grid">
                            {options.wheels.map((wheel) => (
                                <button
                                    key={wheel.id}
                                    className={`option-button ${config.wheelsId === wheel.id ? 'selected' : ''}`}
                                    onClick={() => setConfig({ ...config, wheelsId: wheel.id })}
                                >
                                    <div className="option-content">
                                        <span className="option-name">{wheel.name}</span>
                                        <span className="option-price">
                                            {wheel.price_modifier > 0 ? `+$${wheel.price_modifier}` : 'Included'}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Performance Package */}
                    <div className="option-section">
                        <h3>Performance Package</h3>
                        <div className="option-grid">
                            {options.performancePackages.map((pkg) => (
                                <button
                                    key={pkg.id}
                                    className={`option-button ${config.performancePackageId === pkg.id ? 'selected' : ''}`}
                                    onClick={() => setConfig({ ...config, performancePackageId: pkg.id })}
                                >
                                    <div className="option-content">
                                        <span className="option-name">{pkg.name}</span>
                                        <span className="option-price">
                                            {pkg.price_modifier > 0 ? `+$${pkg.price_modifier}` : 'Included'}
                                        </span>
                                    </div>
                                    {pkg.description && <p className="option-description">{pkg.description}</p>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Save Button */}
                    <button className="save-button" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : isEditMode ? 'Update Build' : 'Save Build'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfiguratorPage;

