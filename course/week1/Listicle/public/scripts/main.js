document.addEventListener('DOMContentLoaded', async () => {
    const carListContainer = document.getElementById('car-list-container');

    try {
        const response = await fetch('/api/cars');
        const cars = await response.json();

        const carCardsHTML = cars.map(car => `
            <a href="/cars/${car.id}" class="card-link">
            <div class="car-card">
                <img src="${car.imageURL}" alt="${car.make} ${car.model}" class="car-card__image">
                <div class="car-card__content">
                    <h3 class="car-card__title">${car.year} ${car.make} ${car.model}</h3>
                    <p class="car-card__description">${car.description}</p>
                    <div class="car-card__specs">
                        <div class="spec-item">
                            <span class="spec-label">Engine</span>
                            <span class="spec-value">${car.engine}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Horsepower</span>
                            <span class="spec-value">${car.horsepower} hp</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Top Speed</span>
                            <span class="spec-value">${car.topSpeed} mph</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">MSRP</span>
                            <span class="spec-value">$${car.price.toLocaleString()}</span>
                        </div>
                    </div>
                    <p class="car-card__fun-fact">${car.funFact}</p>
                </div>
            </div>
            </a>
            
        `).join('');

        carListContainer.innerHTML = carCardsHTML;

    } catch (error) {
        console.error('Error fetching car data:', error);
        carListContainer.innerHTML = '<p>Failed to load car data. Please try again later.</p>';
    }
});