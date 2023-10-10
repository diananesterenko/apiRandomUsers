"use strict";

const options = {
  results: 5,
  page: 1,
  seed: "pe2023",
};
var selectedUsers = [];
loadUsers(options);
function loadUsers({ results, page, seed }) {
  fetch(`https://randomuser.me/api/?page=${page}&results=${results}&seed=${seed}
`)
    .then((response) => response.json())
    .then((data) => renderUsers(data))
    .catch((err) => console.log(err));
}

function prevBtnHandler() {
  if (options.page > 1) {
    options.page -= 1;
    loadUsers(options);
  }
}
function nextBtnHandler() {
  options.page += 1;
  loadUsers(options);
}
function firstPageBtnHandler() {
  options.page = 1;
  loadUsers(options);
}
function renderUsers(users) {
  const headerEl = createHeaderEl();

  document.body.append(headerEl);

  const selectedUsersList = document.createElement("div");

  document.body.append(selectedUsersList);

  const usersList = document.createElement("ul");
  usersList.classList.add("usersList");

  const userListItems = users.results.map((u) =>
    createUserItem(u, selectedUsersList)
  );
  usersList.replaceChildren(...userListItems);
  document.body.replaceChildren(headerEl);
  document.body.append(selectedUsersList);
  document.body.append(usersList);
  return usersList;
}
function createHeaderEl() {
  const headerEl = document.createElement("div");
  headerEl.classList.add("header");
  document.body.append(headerEl);

  const firstPageBtn = document.createElement("button");
  firstPageBtn.textContent = "<<";
  headerEl.append(firstPageBtn);

  const prevBtn = document.createElement("button");
  prevBtn.classList.add("prevBtn");
  prevBtn.textContent = "Prev";
  headerEl.append(prevBtn);
  const nextBtn = document.createElement("button");
  nextBtn.classList.add("nextBtn");
  nextBtn.textContent = "Next";
  headerEl.append(nextBtn);
  firstPageBtn.addEventListener("click", firstPageBtnHandler);
  prevBtn.addEventListener("click", prevBtnHandler);
  nextBtn.addEventListener("click", nextBtnHandler);

  return headerEl;
}
function createUserItem(
  {
    name: { first: firstName, last: lastName },
    picture: { large: img },
    dob: { age },
    phone,
    email,
    gender,
    location: { city, country },
  },
  selectedUsersList
) {
  const userEl = document.createElement("li");
  userEl.classList.add("users");
  gender === "female"
    ? ((userEl.style.border = "rgb(191, 0, 153) 2px solid"),
      (userEl.style.boxShadow = "rgb(191, 0, 153) 0 0 5px"))
    : ((userEl.style.border = "rgb(0, 27, 177) 2px solid"),
      (userEl.style.boxShadow = "rgb(0, 27, 177) 0 0 5px"));

  userEl.addEventListener("click", highlightNewHandler);
  let isSelected = false;

  function highlightNewHandler(e) {
    isSelected = !isSelected;

    const selectedUsersEl = document.createElement("p");

    if (isSelected) {
      //e.currentTarget.style.border = "yellow 2px solid";
      userHeaderEl.style.background = "pink";
      userContentEl.style.background = "pink";
      selectedUsers.push(` ${firstName} ${lastName} `);

      selectedUsersEl.textContent = selectedUsers;
      selectedUsersList.replaceChildren(selectedUsersEl);
    } else {
      userHeaderEl.style.background = " white";
      userContentEl.style.background = " rgb(219, 219, 219)";
      const foundIndex = selectedUsers.findIndex(
        (item) => item === ` ${firstName} ${lastName} `
      );
      console.log(foundIndex);
      selectedUsers.splice(foundIndex, 1);
      selectedUsersEl.textContent = selectedUsers;
      selectedUsersList.replaceChildren(selectedUsersEl);
      console.log(selectedUsers);
    }
  }

  const userHeaderEl = createUserHeaderEl(firstName, lastName, img, age);
  userEl.append(userHeaderEl);

  const userContentEl = createUserContentEl(city, country, phone, email);
  userEl.append(userContentEl);

  return userEl;
}
function createUserHeaderEl(firstName, lastName, img, age) {
  const userHeaderEl = document.createElement("div");
  userHeaderEl.classList.add("usersHeader");

  const avatarEl = document.createElement("div");
  avatarEl.classList.add("avatar");
  userHeaderEl.append(avatarEl);

  const userImgEl = createImgUser(img);
  avatarEl.append(userImgEl);

  const likeIconEl = createLikeIcon();
  userHeaderEl.append(likeIconEl);

  const aboutUserEl = document.createElement("div");
  aboutUserEl.classList.add("about-user");
  userHeaderEl.append(aboutUserEl);

  const userTitleEl = document.createElement("h2");
  userTitleEl.classList.add("newsTitle");
  userTitleEl.textContent = `${firstName} ${lastName}`;
  aboutUserEl.append(userTitleEl);

  const userAgeEl = document.createElement("p");
  userAgeEl.classList.add("age");
  userAgeEl.textContent = `${age} years`;
  aboutUserEl.append(userAgeEl);

  return userHeaderEl;
}
function createImgUser(img) {
  const userImgEl = document.createElement("img");
  userImgEl.classList.add("photo");
  userImgEl.src = img;
  userImgEl.onerror = () => {
    userImgEl.src = "./imgs/defaultImg.png";
  };
  return userImgEl;
}
function createLikeIcon() {
  const likeIconEl = document.createElement("i");
  likeIconEl.classList.add("fa-regular");
  likeIconEl.classList.add("fa-heart");
  likeIconEl.classList.add("like");

  likeIconEl.addEventListener("click", likeNews);

  function likeNews(e) {
    likeIconEl.classList.toggle("onlike");
    e.stopPropagation();
  }
  return likeIconEl;
}
function createUserContentEl(city, country, phone, email) {
  const userContentEl = document.createElement("div");
  userContentEl.classList.add("userContent");

  const countryEl = document.createElement("h5");
  countryEl.classList.add("country");
  countryEl.textContent = `${city}, ${country}`;
  userContentEl.append(countryEl);

  const phoneEl = document.createElement("p");
  phoneEl.classList.add("phone");
  phoneEl.textContent = `${phone}`;
  userContentEl.append(phoneEl);

  const emailEl = document.createElement("p");
  emailEl.classList.add("email");
  emailEl.textContent = `${email}`;
  userContentEl.append(emailEl);

  return userContentEl;
}
