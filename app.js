const user_url = "https://randomuser.me/api/?results=12";
const output = document.getElementById("gallery");
const body = document.querySelector("body");

/// FETCH FUNCTIONS ///

/**
 * This function will get the necessary data from the public API
 */

const getData = async () => {
  try {
    const response = await fetch(user_url);
    const result = await response.json();
    const user = result.results;

    user.forEach((item, index) => {
      generateHTML(item);
      generateModal(item, index);
    });
    createSearch();
    searchUser();
  } catch (e) {
    console.log("Uh Oh, something went wrong!", e);
  }
};

getData();

/// HELPER FUNCTIONS ///

/**
 * @param Data - Data retrieved in getData function - The 12 users.
 * This function will display and create the HTML using template literal
 */

function generateHTML(data) {
  const outputHTML = `  
    <div id="cards" class="card">
    <div id="card-container" class="card-img-container">
        <img id="card-img" class="card-img" src="${data.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
        <p class="card-text">${data.email}</p>
        <p class="card-text cap">${data.location.city}, ${data.location.city}</p>
    </div>
</div>`;
  // Insert HTML
  output.insertAdjacentHTML("beforeend", outputHTML);
}

/**
 *
 * @param {Data} data - Retreives data from fetch request
 * @param {Index} index - The index selects the correct item to show in the modal rather than all modal containers
 */

function generateModal(data, index) {
  // Generate Modal HTML
  const modalHTML = ` 
    <div class="modal-container">

    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${
          data.picture.large
        }" alt="profile picture">
        <h3 id="name" class="modal-name cap">${data.name.first}</h3>
        <p class="modal-text">${data.email}</p>
        <p class="modal-text cap">${data.location.city}</p>
        <hr>
        <p class="modal-text"> ${data.cell} </p>
        <p class="modal-text">${data.location.street.name}, ${
    data.location.city
  }, ${data.location.postcode}</p>
        <p class="modal-text">Birthday: ${data.dob.date.slice(0, 10)}</p>

        <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    </div>

    `;
  // Insert the HTML
  body.insertAdjacentHTML("afterbegin", modalHTML);

  const modalContainer = document.querySelector(".modal-container");
  // set style display to none
  modalContainer.style.display = "none";
  // addEventListner to show
  let cards = document.querySelectorAll(".card");
  cards[index].addEventListener("click", () => {
    modalContainer.style.display = "block";
  });

  // Event listener to button to hide the modal
  const btn = document.querySelector("button");
  btn.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
}

/**
 * Creates the search area on the page
 */

function createSearch() {
  const searchArea = document.querySelector(".search-container");

  const searchHTML = `

  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
    
    `;

  searchArea.insertAdjacentHTML("beforeend", searchHTML);
}

/**
 * Funciton allows a search function.
 * Loops through each name and compares with the input text
 */

function searchUser() {
  const searchInput = document.getElementById("search-input");
  const userName = document.querySelectorAll("#name");

  userName.forEach((name) => {
    const cardDiv = name.parentElement.parentElement;

    searchInput.addEventListener("keyup", (e) => {
      const inputValue = e.target.value.toLowerCase();
      if (name.textContent.toLowerCase().includes(inputValue)) {
        cardDiv.style.display = "";
      } else {
        cardDiv.style.display = "none";
      }
    });
  });
}
