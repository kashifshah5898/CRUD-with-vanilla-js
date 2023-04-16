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
};

const showAllAuthors = (aName) => {
  const showAllAuthorsDiv = document.querySelector("#showAllAuthorsId");
  let authorId = allAuthors.length;
  const authorNameParagraph = document.createElement("p");
  authorNameParagraph.textContent = `${authorId}. ${aName}`;
  authorNameParagraph.classList.add(`delete${authorId}`);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("btn", "btn-danger", "ml30", `delete${authorId}`);
  deleteButton.addEventListener("click", () => {
    handleDeleteButtonClick(`delete${authorId}`, authorId);
  });

  const breakLine = document.createElement("br");
  breakLine.classList.add(`delete${authorId}`);
  showAllAuthorsDiv.appendChild(authorNameParagraph);
  showAllAuthorsDiv.appendChild(deleteButton);
  showAllAuthorsDiv.appendChild(breakLine);
};

function handleDeleteButtonClick(index, authorId) {
  allAuthors[authorId - 1] = "thatSpecificIndex";
  const removeElement = document.getElementsByClassName(index);
  Array.from(removeElement).forEach((element) => {
    element.parentNode.removeChild(element);
  });
}

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

  allAuthors = allAuthors.filter((item) => item != "thatSpecificIndex");
  console.log("allAuthors", allAuthors);
  const myObj = {
    id: id,
    title: title.value,
    abstract: abstract.value,
    file: file.value,
    authors: allAuthors,
    reviewers: [users[randomIndexes[0]], users[randomIndexes[1]]],
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
      // alert("error", error);
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
gettingResponse();
gettingId();

// npm install -g json-server
// json-server --watch papers.json
