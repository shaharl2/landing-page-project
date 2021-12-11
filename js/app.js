/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const mySections = document.querySelectorAll("section");
// ******************************************
// converting the NodeList to an array
// ******************************************
const mySectionsArray = Array.from(mySections);
const myMain = document.querySelector("main");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// *****************************************************************************************************************
// for loop to populate the sections content. This loop adds 4 new sections but it should work with other values too
// *****************************************************************************************************************

for (let i = 1; i <= 4; i++) {
  // *************************************
  // storing the diffrent section elements
  // *************************************

  const newSection = document.createElement("section");
  const newDiv = document.createElement("div");
  const newHead = document.createElement("h2");
  const newPar = document.createElement("p");
  const newPar2 = document.createElement("p");

  // *************************************
  // creating id, class, data-* attributes
  // there are laready 3 sections built in HTML
  // and therefore I start build from 4
  // *************************************

  newSection.setAttribute("id", `section${3 + i}`);
  newSection.setAttribute("data-nav", `section ${3 + i}`);
  newDiv.className = "landing__container";

  // *************************************
  // creating the text content
  // *************************************
  newHead.textContent = `Section ${3 + i}`;
  newPar.textContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
  newPar2.textContent =
    "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";

  // *************************************
  // appending the elements in the section
  // *************************************

  newDiv.appendChild(newHead);
  newDiv.appendChild(newPar);
  newDiv.appendChild(newPar2);
  newSection.appendChild(newDiv);

  // ******************************************
  // adding the new section to my section array
  // ******************************************

  mySectionsArray.push(newSection);
}

// ******************************************
// appending the new sections to main
// starting from the 3rd element because
// 3 elements are already built in advance
// ******************************************

for (section of mySectionsArray.slice(3)) {
  myMain.appendChild(section);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// **************************************************
// dynamically building the nav
// **************************************************

const myNav = document.querySelector("#navbar__list");
for (const section of mySectionsArray) {
  const newLi = document.createElement("li");
  const newAnc = document.createElement("a");
  newAnc.setAttribute("class", "menu__link");

  newAnc.setAttribute("id", `section_${mySectionsArray.indexOf(section) + 1}`);

  newAnc.setAttribute(
    "href",
    `#section${mySectionsArray.indexOf(section) + 1}`
  );
  newAnc.textContent = `Section ${mySectionsArray.indexOf(section) + 1}`;
  newLi.appendChild(newAnc);
  myNav.appendChild(newLi);
}

// Add class 'active' to section when it is near top of viewport

function makeActive() {
  const myOldActiveSec = document.querySelector(".your-active-class");
  const box = section.getBoundingClientRect();

  // ********************************************************
  // if statement makes sure the sections are in the viewport
  // ********************************************************

  if (
    box.top > 0 &&
    box.top <
      mySectionsArray.length * section.clientHeight - section.clientHeight / 2
  ) {
    // **************************************************
    // finding which section is currently in the viewport
    // and store the value in the variable mySection
    // **************************************************

    let mySection = Math.round(
      mySectionsArray.length - box.top / section.clientHeight
    );
    const myNewActiveSec = document.querySelector(`#section${mySection}`);

    // **************************************************
    //  if statement to check if new section in the viewport
    // remove the old active class and set a new active class
    // this activates the CSS to distinguish the section that
    // is currently in the veiwport with the floating balls styling
    // **************************************************

    if (myOldActiveSec !== myNewActiveSec) {
      myOldActiveSec.classList.remove("your-active-class");
      myNewActiveSec.classList.add("your-active-class");
    }
  }
}

// Make sections active
document.addEventListener("scroll", function () {
  makeActive();
});

/**
 * End Main Functions
 * Begin Events
 *
 */

// **************************************************
//  add click event to myNavList but using Event Delegation
// to capture which nav element was clicked.
// the default functionallity of the anchor tag is
// being prevented
// **************************************************

const myNavList = document.querySelector("#navbar__list");
myNavList.addEventListener("click", function (evt) {
  evt.preventDefault();
  const navEvent = evt.target.getAttribute("id");

  // **************************************************
  //  caculating the total height of the header and the
  // nav menu. This will be used to find the value to give
  // to the scrollTo function
  // **************************************************

  const headLine = document.querySelector("h1");
  const style = getComputedStyle(headLine);
  const navHeader = document.querySelector(".page__header");
  const navHeaderHeight = navHeader.clientHeight;
  const totalBoxHeight =
    headLine.clientHeight +
    parseInt(style.marginTop) +
    parseInt(style.marginBottom);

  // **************************************************
  //  scrollTo function to scroll smoothly to the right
  // section on link click
  // **************************************************

  window.scrollTo({
    top: `${
      (navEvent.slice(8) - 1) * section.clientHeight +
      totalBoxHeight -
      navHeaderHeight
    }`,
    behavior: "smooth",
  });
});
