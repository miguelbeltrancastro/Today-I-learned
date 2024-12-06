// Categories
const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" }
];

// Variables
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

let votesInteresting = 0;
let votesMindblowing = 0;
let totalUpvotes = 0;
let votesWrong = 0;

// Create DOM elements: Render facts in list
factsList.innerHTML = "";

// Load data from Supabase
async function loadFacts() {
  const res = await fetch(
    "https://ecnhnvoxfzdkfaadninf.supabase.co/rest/v1/facts",
    {
      headers: {
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbmhudm94Znpka2ZhYWRuaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NzE4NzQsImV4cCI6MjA0ODQ0Nzg3NH0.u4Q_kqDS9Uh6tOdGY58B00hRGIJP_jTD80DlqfK13fM",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbmhudm94Znpka2ZhYWRuaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NzE4NzQsImV4cCI6MjA0ODQ0Nzg3NH0.u4Q_kqDS9Uh6tOdGY58B00hRGIJP_jTD80DlqfK13fM"
      }
    }
  );
  const data = await res.json();
  const filteredData = data.filter(fact => fact.category === "society");
  createFactsList(data);
}

loadFacts();

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    fact => `<li class="fact">
  <p>
  ${fact.text}
    <a
      class="source"
      href="${fact.source}"
      target="_blank"
      >(Source)</a
    >
  </p>
  <span class="tag" style="background-color: ${
    CATEGORIES.find(cat => cat.name === fact.category).color
  }"
    >${fact.category}</span
  >
</li>`
  );
  const html = htmlArr.join("");

  factsList.insertAdjacentHTML("afterbegin", html);
}

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
