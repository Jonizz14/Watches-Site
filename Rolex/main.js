const watches = [
    {
        id: 1,
        name: "Submariner Date",
        brand: "Rolex",
        price: 8999,
        image: "./Images/Img1.avif",
        status: "in-stock"
    },
    {
        id: 2,
        name: "Daytona",
        brand: "Rolex",
        price: 13500,
        image: "./Images/Img2.jpg",
        status: "in-stock"
    },
    {
        id: 3,
        name: "Speedmaster Moonwatch",
        brand: "Omega",
        price: 6300,
        image: "./Images/Img3.avif",
        status: "in-stock"
    },
    {
        id: 4,
        name: "Seamaster Diver 300M",
        brand: "Omega",
        price: 5200,
        image: "./Images/Img4.avif",
        status: "out-of-stock"
    },
    {
        id: 5,
        name: "Nautilus 5711",
        brand: "Patek Philippe",
        price: 35000,
        image: "./Images/Img5.avif",
        status: "in-stock"
    },
    {
        id: 6,
        name: "Royal Oak",
        brand: "Audemars Piguet",
        price: 22000,
        image: "./Images/Img6.avif",
        status: "in-stock"
    },
    {
        id: 7,
        name: "Datejust 36",
        brand: "Rolex",
        price: 7500,
        image: "./Images/Img7.jpeg",
        status: "out-of-stock"
    },
    {
        id: 8,
        name: "Aqua Terra",
        brand: "Omega",
        price: 5800,
        image: "./Images/Img8.jpeg",
        status: "in-stock"
    }
];

const catalog = document.getElementById('watchCatalog');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const brandFilter = document.getElementById('brandFilter');
const priceFilter = document.getElementById('priceFilter');
const sortFilter = document.getElementById('sortFilter');
const signupBtn = document.getElementById('signupBtn');
const signupModal = document.getElementById('signupModal');
const closeModal = document.getElementById('closeModal');

function renderWatches(filteredWatches) {
    catalog.innerHTML = '';
    filteredWatches.forEach((watch, index) => {
        const card = document.createElement('div');
        card.className = 'watch-card';
        card.style.animationDelay = `${1.2 + index * 0.1}s`;

        card.innerHTML = `
            <div class="watch-image-container">
                <img src="${watch.image}" alt="${watch.name}" class="watch-image">
                <span class="watch-badge">${watch.status.replace('-', ' ')}</span>
            </div>
            <div class="watch-content">
                <p class="watch-brand">${watch.brand}</p>
                <h3 class="watch-name">${watch.name}</h3>
                <p class="watch-description">Luxury timepiece with timeless design and precision. Perfect for collectors and everyday elegance.</p>
                <div class="watch-price-container">
                    <span class="watch-price">$${watch.price.toLocaleString()}</span>
                    <span class="watch-status ${watch.status === 'in-stock' ? 'in-stock' : 'out-of-stock'}">
                        ${watch.status.replace('-', ' ')}
                    </span>
                </div>
                <div class="watch-actions">
                    <button class="watch-btn watch-btn-primary">Buy Now</button>
                    <button class="watch-btn watch-btn-secondary">Details</button>
                </div>
            </div>
        `;
        catalog.appendChild(card);
    });
}


function applyFilters() {
    let filtered = [...watches];

    const keyword = searchInput.value.toLowerCase();
    if (keyword) {
        filtered = filtered.filter(w =>
            w.name.toLowerCase().includes(keyword) ||
            w.brand.toLowerCase().includes(keyword)
        );
    }

    const brand = brandFilter.value;
    if (brand) {
        filtered = filtered.filter(w => w.brand === brand);
    }

    const price = priceFilter.value;
    if (price) {
        if (price === "50000") {
            filtered = filtered.filter(w => w.price > 50000);
        } else {
            const [min, max] = price.split('-').map(Number);
            filtered = filtered.filter(w => w.price >= min && w.price <= max);
        }
    }

    const sort = sortFilter.value;
    if (sort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    renderWatches(filtered);
}

searchBtn.addEventListener('click', applyFilters);
brandFilter.addEventListener('change', applyFilters);
priceFilter.addEventListener('change', applyFilters);
sortFilter.addEventListener('change', applyFilters);

signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'flex';
});
closeModal.addEventListener('click', () => {
    signupModal.style.display = 'none';
});

window.addEventListener('click', e => {
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

renderWatches(watches);