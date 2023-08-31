const categoryCardContainer = document.querySelector(".categoryCardContainer");

console.log(categoryCardContainer);

// function for rendering category
function renderCategory(element) {
  console.log(element);

  const categoryButton = document.createElement("div");

  categoryButton.innerHTML = `
  <div
  class="categoryButton mr-2 sm:mr-4 bg-slate-200 py-[.3rem] px-4 sm:py-[.4rem] sm:px-6 font-semibold text-sm sm:text-base cursor-pointer rounded hover:shadow active:scale-[.97]" onclick=" handleCategoryClick('${element.category_id}') "
>
  <h1> ${element.category} </h1>
</div>
  
  `;

  categoryCardContainer.appendChild(categoryButton);
}

// function for fetching category from API
const fetchCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );

  const responsePromise = await response.json();
  const datas = responsePromise.data;

  console.log(datas);

  datas.map((ele, ind) => {
    renderCategory(ele);
  });
};

// function for click category
function handleCategoryClick(categoryId) {
  console.log("category button clicked");
  console.log(categoryId);
}

fetchCategory();

// https://openapi.programming-hero.com/api/videos/categories
