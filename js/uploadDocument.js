let allInstiutionsRes, allInstiutions;
let title = document.getElementById("title");
let abstract = document.getElementById("abstract");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let affiliation = document.getElementById("affiliation");
let presenter = document.getElementById("presenter");
let file = document.getElementById("file");

const gettingResponse = async () => {
  allInstiutionsRes = await fetch("institutions.json");
  allInstiutions = await allInstiutionsRes.json();

  settingAffiliation();
};

gettingResponse();

const settingAffiliation = () => {
  const select = document.querySelector("#affiliation");

  allInstiutions.forEach((institution) => {
    const option = document.createElement("option");
    option.value = institution.id;
    option.text = institution.name;
    select.appendChild(option);
  });
};

const remove = () => {
  const removeElement = document.getElementById("showAllAuthorsId");
  removeElement.innerHTML = "";

  allAuthors = [];
};

const showAllAuthors = (aName) => {
  const showAllAuthorsDiv = document.querySelector("#showAllAuthorsId");
  const authorNameParagraph = document.createElement("p");
  authorNameParagraph.textContent = allAuthors.length + ". " + aName;
  authorNameParagraph.classList.add(allAuthors.length);

  const breakLine = document.createElement("br");

  showAllAuthorsDiv.appendChild(authorNameParagraph);

  showAllAuthorsDiv.appendChild(breakLine);
};

let allAuthors = [];
const addAuthor = () => {
  if (firstName.value && lastName.value && email.value && affiliation.value) {
    let author = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      affiliation: affiliation.value,
      presenter: presenter.checked,
    };

    allAuthors.push(author);
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    affiliation.value = "";
    presenter.checked = false;

    showAllAuthors(author.firstName);
  } else {
    alert("Please fill all fields");
  }
};

const form = document.getElementById("form");
form.addEventListener("submit", async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  let anyTrue = 0;
  allAuthors.map((item) => {
    if (item?.presenter) {
      anyTrue += 1;
    }
  });

  if (!anyTrue) {
    return alert("Add atlease one author as presenter");
  }

  const usersRes = await fetch("users.json");
  const users = await usersRes.json();

  const numIndexes = 2;
  const randomIndexes = [];

  while (randomIndexes.length < numIndexes) {
    const randomIndex = Math.floor(Math.random() * users.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }

  const myObj = {
    id: id,
    title: title.value,
    abstract: abstract.value,
    file: file.value,
    authors: allAuthors,
    reviewers: [
      users[randomIndexes[0]].first_name + " " + users[randomIndexes[0]].last_name,
      users[randomIndexes[1]].first_name + " " + users[randomIndexes[1]].last_name,
    ],
  };

  await addDataToJson(myObj);
  alert("Developed By Kashif_65 ( Fiverr.com ) ");
  allAuthors = [];
  form.reset();
  remove();
});

const gettingId = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:3000/papers", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      id = result.length + 1;
    })
    .catch((error) => {
      console.log(error);
      alert("error", error);
    });
};

const addDataToJson = (payLoad) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(payLoad);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/papers", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

let id;
gettingId();

// npm install -g json-server
// json-server --watch papers.json
