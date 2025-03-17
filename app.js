let users = [];

// Fetch user data from API
const fetchdata = async () => {
    try {
        const usersfetch = await fetch("https://dummyjson.com/users");
        const data = await usersfetch.json();
        users = data.users;
        displayUsers(users);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Function to display users
const displayUsers = (items) => {
    const container = document.getElementById("container");
    container.innerHTML = items.map(item => {
        return `
        <div class="card" id="user-${item.id}">
            <img src="${item.image}" alt="${item.firstName} ${item.lastName}">
            <h2>${item.firstName} ${item.lastName}</h2>
            <button class="btn" data-id="${item.id}">View More</button>
        </div>
        `;
    }).join("");

    // Add event listeners to all "View More" buttons
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const userId = event.target.getAttribute("data-id");
            const user = users.find(u => u.id == userId);
            showPopup(user);
        });
    });
};

// Function to show the popup modal
const showPopup = (user) => {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `
        <h2>${user.firstName} ${user.lastName}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Address:</strong> ${user.address.address}, 
         ${user.address.city}, ${user.address.state}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
    `;

    modal.classList.add("show"); // Ensure modal appears properly
};

// Close button functionality
const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.remove("show"); // Hide modal smoothly
};

document.getElementById("close-modal").addEventListener("click", closeModal);

document.getElementById("modal").addEventListener("click", (event) => {
    if (event.target === document.getElementById("modal")) {
        closeModal();
    }
});

// Fetch data when page loads
fetchdata();
