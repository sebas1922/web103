document.addEventListener('DOMContentLoaded', async () => {
    // 1. Get the container
    const detailContainer = document.getElementById('car-detail-container');

    // Get the ID from the URL's pathname
    const path = window.location.pathname; // e.g., "/cars/3"
    const pathParts = path.split('/'); // ["", "cars", "3"]
    const carId = pathParts[pathParts.length - 1]; // Get the last part, which is the ID


    // 3. If there's no ID, show an error
    if (!carId) {
        detailContainer.innerHTML = '<h1>Car not found!</h1>';
        return;
    }

    // 4. Fetch the data for this specific car
    try {
        const response = await fetch(`/api/cars/${carId}`);
        const car = await response.json();

        // 5. Build the detailed HTML
        detailContainer.innerHTML = `
            <div class="car-detail">
                <img src="${car.imageURL}" alt="${car.make} ${car.model}" class="car-detail__image">
                <h1 class="car-detail__title">${car.year} ${car.make} ${car.model}</h1>
                <p class="car-detail__description">${car.description}</p>
                <div class="car-detail__specs">
                    <h2>Specifications</h2>
                    <p><strong>Engine:</strong> ${car.engine}</p>
                    <p><strong>Horsepower:</strong> ${car.horsepower} hp</p>
                    <p><strong>Top Speed:</strong> ${car.topSpeed} mph</p>
                    <p><strong>Drivetrain:</strong> ${car.drivetrain}</p>
                    <p><strong>MSRP:</strong> $${car.price.toLocaleString()}</p>
                </div>
                <div class="car-detail__fun-fact">
                    <h3>Fun Fact</h3>
                    <p>${car.funFact}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching car details:', error);
        detailContainer.innerHTML = '<h1>Error loading car details.</h1>';
    }
});