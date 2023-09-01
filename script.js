const categoryCardContainer = document.querySelector(".categoryCardContainer");
const cardContent = document.querySelector(".cardContent");
const nothingFoundCard = document.querySelector(".nothingFoundCard");
const loader = document.querySelector(".loader");
const sortByView = document.querySelector(".sortByView");
let categoryId_Global;

loader.classList.add("hidden");

// function for rendering category
function renderCategory(element) {
  const categoryButton = document.createElement("div");

  categoryButton.innerHTML = `
  <div
  class="categoryButton  mr-2 sm:mr-4 font-semibold text-sm sm:text-base " onclick="handleCategoryClick('${element.category_id}') " 
>
  <h1 class=" buttons defaultBg py-[.3rem]  px-4 sm:py-[.4rem] sm:px-6 cursor-pointer rounded hover:shadow active:scale-[.97] " > ${element.category} </h1>
</div>
  
  `;

  categoryCardContainer.appendChild(categoryButton);

  const categoryButtons = document.querySelectorAll(".categoryButton");

  categoryButtons[0].childNodes[1].classList.remove("defaultBg");
  categoryButtons[0].childNodes[1].classList.add("activeBg");

  categoryButtons.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      document.querySelectorAll(".buttons").forEach((button) => {
        button.classList.add("defaultBg");
        button.classList.remove("activeBg");
      });

      if (e.target.classList.contains("defaultBg")) {
        e.target.classList.add("activeBg");
        e.target.classList.remove("defaultBg");
      }
    });
  });

  // console.log(categoryButtons);
}

// function for fetching category from API
const fetchCategory = async () => {
  loader.classList.remove("hidden");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );

  const responsePromise = await response.json();
  const datas = responsePromise.data;

  categoryCardContainer.innerHTML = "";
  loader.classList.add("hidden");
  datas.map((ele, ind) => {
    renderCategory(ele);
  });
};

// function for render cards
function renderCard(element) {
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
      class="dateShow ${
        element?.others?.posted_date ? " bg-[#171717] " : ""
      } text-white py-1 px-3 rounded-md absolute transform -right-9 -bottom-1 -translate-x-1/2 -translate-y-1/2"
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
  categoryId_Global = categoryId;

  loader.classList.remove("hidden");
  // console.log("category button clicked");
  // console.log(`category id from category click function = ${categoryId}`);
  const fetchedData = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );

  const promiseData = await fetchedData.json();
  const datas = promiseData.data;

  cardContent.innerHTML = "";
  nothingFoundCard.innerHTML = "";

  // console.log(datas.length);
  loader.classList.add("hidden");

  if (datas.length === 0) {
    const dataCard = document.createElement("div");

    dataCard.innerHTML = `
    <div class="dataCard">
            <div
              class="dataCardWrapper w-full flex flex-col justify-center items-center self-center"
            >
              <div
                class="nothingIcon mt-4 sm:mt-6 md:mt-14 mb-5 sm:mb-6 md:mb-8 w-[9rem] sm:w-[10rem] md:w-[11rem]"
              >
                <img src="images/Icon.png" class="w-full h-full" alt="" />
              </div>
              <!--  -->
              <!--  -->

              <div
                class="nothingHeading text-center w-[70%] sm:w-[52%] md:w-[40%] lg:w-[25%] font-bold text-xl sm:text-2xl"
              >
                <h1>Oops!! Sorry, There is no content here</h1>
              </div>

              <!--  -->
              <!--  -->
            </div>
          </div>
    
    `;
    nothingFoundCard.appendChild(dataCard);
  } else {
    datas.map((ele, ind) => {
      renderCard(ele);
    });
  }
}

// sort by view functionality
sortByView.addEventListener("click", async () => {
  loader.classList.remove("hidden");

  const fetchedData = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId_Global}`
  );

  const promiseData = await fetchedData.json();
  const unsortedDatas = promiseData.data;

  // sorting data
  const sortedData = unsortedDatas.sort((a, b) => {
    const viewsA = parseInt(a.others.views);
    const viewsB = parseInt(b.others.views);

    return viewsB - viewsA;
  });

  cardContent.innerHTML = "";
  nothingFoundCard.innerHTML = "";

  loader.classList.add("hidden");

  if (sortedData.length === 0) {
    const dataCard = document.createElement("div");

    dataCard.innerHTML = `
    <div class="dataCard">
            <div
              class="dataCardWrapper w-full flex flex-col justify-center items-center self-center"
            >
              <div
                class="nothingIcon mt-4 sm:mt-6 md:mt-14 mb-5 sm:mb-6 md:mb-8 w-[9rem] sm:w-[10rem] md:w-[11rem]"
              >
                <img src="images/Icon.png" class="w-full h-full" alt="" />
              </div>
              <!--  -->
              <!--  -->

              <div
                class="nothingHeading text-center w-[70%] sm:w-[52%] md:w-[40%] lg:w-[25%] font-bold text-xl sm:text-2xl"
              >
                <h1>Oops!! Sorry, There is no content here</h1>
              </div>

              <!--  -->
              <!--  -->
            </div>
          </div>
    
    `;
    nothingFoundCard.appendChild(dataCard);
  } else {
    sortedData.map((ele, ind) => {
      renderCard(ele);
    });
  }
});

fetchCategory();
handleCategoryClick(1000);

// https://openapi.programming-hero.com/api/videos/categories

// https://openapi.programming-hero.com/api/videos/category/${id}
