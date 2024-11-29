// Variables
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");

let votesInteresting = 0;
let votesMindblowing = 0;
let totalUpvotes = 0;
let votesWrong = 0;

// Show and Hide form
btn.addEventListener("click", function() {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});
