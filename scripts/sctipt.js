const quickAccessData = [
  {
    icon: "book-open",
    title: "Seamless Booking",
    description: "Find and reserve your perfect workspace with ease.",
    link: "./booking.html",
    button: "Book Now",
  },
  {
    icon: "image",
    title: "Explore Our Spaces",
    description:
      "Discover stunning photos of our modern and versatile workspaces.",
    link: "#",
    button: "View Gallery",
  },
  {
    icon: "coffee",
    title: "Delightful Cafe",
    description:
      "Order your favorite beverages and snacks from our in-house cafe.",
    link: "./cafe.html",
    button: "Order Now",
  },
  {
    icon: "user",
    title: "Your Profile",
    description: "Manage your personal details, bookings, and preferences.",
    link: "./profile.html",
    button: "View Profile",
  },
];
let html = ``;
const quickAccess = document.querySelector(".js-quick-access");
quickAccessData.forEach((item) => {
  html += `
  <div class="card" style="width: 24%; height: 300px">
    <div class="card-body d-grid justify-content-center align-items-center">
      <div class="icons d-flex justify-content-center align-items-center">
        <i data-feather="${item.icon}" style="width: 100" class=""></i>
      </div>
      <div class="d-flex flex-column align-items-center text-center">
        <h5 class="card-title" style="height: 40px;">${item.title}</h5>
        <p class="card-text" style="height: 60px;">${item.description}</p>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <a href="${item.link}" class="btn btn-light">${item.button}</a>
      </div>
    </div>
  </div>
  `;
});
quickAccess.innerHTML = html;

feather.replace();