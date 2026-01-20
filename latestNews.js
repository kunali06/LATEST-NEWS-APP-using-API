const newsDiv = document.getElementById("news");
const loadBtn = document.getElementById("load");
const categorySelect = document.getElementById("category");

const API_KEY = "6363d11f180598d676580f216b757632"; 

loadBtn.addEventListener("click", loadNews);

async function loadNews() {
  const category = categorySelect.value;
  newsDiv.innerHTML = "Loading news...";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();
    displayNews(data.articles);

  } catch (error) {
    newsDiv.textContent = error.message;
  }
}

function displayNews(articles) {
  newsDiv.innerHTML = "";

  if (articles.length === 0) {
    newsDiv.textContent = "No news found";
    return;
  }

  articles.forEach(article => {
    const div = document.createElement("div");
    div.className = "article";

    div.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || ""}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    newsDiv.appendChild(div);
  });
}
