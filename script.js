// Select elements
const form = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");
const avgRating = document.getElementById("avgRating");

// Load from localStorage
let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

// Display feedback
function displayFeedback() {
    feedbackList.innerHTML = "";

    let total = 0;

    feedbacks.forEach((fb, index) => {
        total += Number(fb.rating);

        const div = document.createElement("div");
        div.classList.add("feedback-item");

        div.innerHTML = `
            <button class="delete-btn" onclick="deleteFeedback(${index})">X</button>
            <p><strong>${fb.name || "Anonymous"}</strong> (${fb.meal})</p>
            <p>Rating: ⭐ ${fb.rating}</p>
            <p>${fb.comment}</p>
        `;

        feedbackList.appendChild(div);
    });

    // Average rating
    const avg = feedbacks.length ? (total / feedbacks.length).toFixed(1) : 0;
    avgRating.innerText = avg;
}

// Form submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const meal = document.getElementById("meal").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    if (!meal || !rating || !comment) {
        alert("Please fill all required fields!");
        return;
    }

    const feedback = {
        name,
        meal,
        rating,
        comment
    };

    feedbacks.push(feedback);

    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    form.reset();
    displayFeedback();
});

// Delete feedback
function deleteFeedback(index) {
    feedbacks.splice(index, 1);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    displayFeedback();
}

// Initial load
displayFeedback();