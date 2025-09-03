document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = [
        { image: '../images/gallery/1.jpg', title: 'Collaborative Hub', description: 'Our vibrant co-working space designed to foster creativity and collaboration among members.' },
        { image: '../images/gallery/2.jpg', title: 'Private Offices', description: 'Dedicated private offices for teams of all sizes, ensuring privacy and focus.' },
        { image: '../images/gallery/3.jpg', title: 'Relaxation Zone', description: 'A comfortable space to unwind and recharge with a cup of coffee.' },
        { image: '../images/gallery/4.jpg', title: 'Event Space', description: 'Flexible event space perfect for workshops, meetups, and presentations.' },
        { image: '../images/gallery/5.jpg', title: 'Lounge Area', description: 'A bright and airy lounge for informal meetings and networking.' },
        { image: '../images/gallery/6.jpg', title: 'Outdoor Patio', description: 'Enjoy a breath of fresh air and a change of scenery on our outdoor patio.' }
    ];

    const carouselInner = document.querySelector('.carousel-inner');
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    const carousel = bootstrap.Carousel.getOrCreateInstance(document.getElementById('galleryCarousel'));

    galleryItems.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) carouselItem.classList.add('active');
        carouselItem.innerHTML = `
    <img src="${item.image}" class="d-block w-100" alt="${item.title}">
    <div class="carousel-caption d-block">
    <h5 class="fw-bold">${item.title}</h5>
    <p class="text-secondary">${item.description}</p>
    </div>
    `;
        carouselInner.appendChild(carouselItem);

        const thumb = document.createElement('img');
        thumb.src = item.image;
        thumb.alt = item.title;
        thumb.className = 'thumbnail-img';
        if (index === 0) thumb.classList.add('active');

        thumb.addEventListener('click', () => carousel.to(index));
        thumbnailGallery.appendChild(thumb);
    });

    document.getElementById('galleryCarousel').addEventListener('slid.bs.carousel', () => {
        const newIndex = [...carouselInner.children].findIndex(item => item.classList.contains('active'));
        document.querySelectorAll('.thumbnail-img').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === newIndex);
        });
    });
});