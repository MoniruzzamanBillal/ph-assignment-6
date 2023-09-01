const categoryCardContainer = document.querySelector(".categoryCardContainer");
const cardContent = document.querySelector(".cardContent");

// console.log(categoryCardContainer);

// function for rendering category
function renderCategory(element) {
  const categoryButton = document.createElement("div");

  categoryButton.innerHTML = `
  <div
  class="categoryButton mr-2 sm:mr-4 bg-slate-200 py-[.3rem] px-4 sm:py-[.4rem] sm:px-6 font-semibold text-sm sm:text-base cursor-pointer rounded hover:shadow active:scale-[.97]" onclick="handleCategoryClick('${element.category_id}') "
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

  //   console.log(datas);

  categoryCardContainer.innerHTML = "";
  datas.map((ele, ind) => {
    renderCategory(ele);
  });
};

// function for render cards
function renderCard(element) {
  // console.log(element);
  //   console.log(`date = ${element?.others?.posted_date}`);
  // console.log(element.authors[0]);
  // console.log(element.authors[0].profile_picture);
  // console.log(element.authors[0].profile_name);
  //   console.log(element.authors[0].verified);

  let hour = parseInt(element?.others?.posted_date / 3600);
  let reminder = element?.others?.posted_date % 3600;
  let minute = parseInt(reminder / 60);

  const dataCard = document.createElement("div");

  dataCard.innerHTML = `
  
  <div class="dataCard">
  <!-- card top image starts  -->
  <div class="dataCardTop relative mb-2">
    <div class="dataCardImg rounded-md overflow-auto h-[14rem]  ">
      <img
        src=${element.thumbnail}
        class="w-full h-full object-cover "
        alt=""
      />
    </div>
    <!-- date show section starts  -->
    <div
      class="dateShow bg-[#171717] text-white py-1 px-3 rounded-md absolute transform -right-9 -bottom-1 -translate-x-1/2 -translate-y-1/2"
    >

    
     ${
       element?.others?.posted_date
         ? `  <h1>${hour}hrs ${minute} min ago </h1> `
         : ""
     }
  
    </div>
    <!-- date show section ends  -->
  </div>
  <!-- card top image ends -->

  <div class="dataCardBottom">
    <div class="dataCardBottomContainer flex justify-between">
      <!-- left side of data starts  -->
      <div class="dataCardBottomLeft w-[17%]">
        <div class="dataCardBottomImg w-[2.5rem] h-[2.5rem] m-auto">
          <img
            src=${element.authors[0].profile_picture}
            class="w-full h-full rounded-full"
            alt=""
          />
        </div>
      </div>
      <!-- left side of data starts  -->
      <!--  -->

      <!-- right side of data card starts  -->

      <div class="dataCardBottomRight w-[82%]">
        <!-- bottom right heading starts  -->
        <div
          class="bottomRightHeading font-semibold mb-2 text-sm lg:text-base"
        >
          <h1>${element.title}</h1>
        </div>
        <!-- bottom right heading starts  -->
      
        <!-- bottom card name starts  -->
  
        <div
          class="bottomCardName mb-1 flex items-center self-center"
        >
          <p
            class="inline mr-2 text-[#171717B2] text-sm lg:text-base"
          >
           
            ${element?.authors[0]?.profile_name}
          </p>
    
          <p class="inline">
            ${
              element?.authors[0]?.verified
                ? ' <img src="images/blueTic.svg"  />'
                : ""
            }
          </p>
        </div>
        <!-- bottom card name ends  -->

        <!--  -->
        <!-- bottom card views starts  -->
        <div
          class="bottomCardViews text-[#171717B2] text-sm lg:text-base"
        >
          <p>${element.others.views} views</p>
        </div>
        <!-- bottom card views ends  -->
      </div>

      <!-- right side of data card ends  -->
      <!--  -->
    </div>
  </div>
</div>
  
  
  `;

  cardContent.appendChild(dataCard);
}

// function for click category
async function handleCategoryClick(categoryId) {
  console.log("category button clicked");
  console.log(categoryId);

  const fetchedData = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );

  const promiseData = await fetchedData.json();
  const datas = promiseData.data;

  cardContent.innerHTML = "";

  //   console.log(datas);
  datas.map((ele, ind) => {
    renderCard(ele);
  });
}

fetchCategory();
handleCategoryClick(1000);

// https://openapi.programming-hero.com/api/videos/categories

// https://openapi.programming-hero.com/api/videos/category/${id}
