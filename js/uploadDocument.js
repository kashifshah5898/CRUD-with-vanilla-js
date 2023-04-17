let allInstiutionsRes, allInstiutions;
let title = document.getElementById("title");
let abstract = document.getElementById("abstract");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let affiliation = document.getElementById("affiliation");
let presenter = document.getElementById("presenter");
let file = document.getElementById("file");
let affiliationName = "";

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

const showAllAuthors = (author) => {
  const showAllAuthorsDiv = document.querySelector("#showAllAuthorsId");
  let authorId = allAuthors.length;
  const authorNameParagraph = document.createElement("p");
  authorNameParagraph.textContent = `${authorId}. Name:  ${author.firstName} ${author.lastName}`;
  authorNameParagraph.classList.add(`delete${authorId}`);

  const breakLine3 = document.createElement("br");
  breakLine3.classList.add(`delete${authorId}`);

  const authorEmailParagraph = document.createElement("p");
  authorEmailParagraph.textContent = `Email:  ${author.email}`;
  authorEmailParagraph.classList.add(`delete${authorId}`);

  const breakLine4 = document.createElement("hr");
  breakLine4.classList.add(`delete${authorId}`);

  const authorAffilationParagraph = document.createElement("p");
  authorAffilationParagraph.textContent = `Affiliation:  ${author.affiliation}`;
  authorAffilationParagraph.classList.add(`delete${authorId}`);

  const breakLine1 = document.createElement("br");
  breakLine1.classList.add(`delete${authorId}`);

  const authorIsPresenterParagraph = document.createElement("p");
  authorIsPresenterParagraph.textContent = `isPresenter:  ${author.presenter}`;
  authorIsPresenterParagraph.classList.add(`delete${authorId}`);

  const breakLine2 = document.createElement("br");
  breakLine2.classList.add(`delete${authorId}`);

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
  showAllAuthorsDiv.appendChild(authorEmailParagraph);
  showAllAuthorsDiv.appendChild(breakLine1);
  showAllAuthorsDiv.appendChild(authorAffilationParagraph);
  showAllAuthorsDiv.appendChild(breakLine2);
  showAllAuthorsDiv.appendChild(authorIsPresenterParagraph);
  showAllAuthorsDiv.appendChild(breakLine3);
  showAllAuthorsDiv.appendChild(breakLine4);
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
    affiliationName = allInstiutions.filter((item) => {
      return item.id == affiliation.value;
    });
    let author = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      affiliation: `${affiliation.value}. ${affiliationName[0].name}`,
      presenter: presenter.checked,
    };

    allAuthors.push(author);
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    affiliation.value = "";
    presenter.checked = false;
    affiliationName = "";

    showAllAuthors(author);
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
    .catch((error) => alert("error", error));
};

let id;
gettingResponse();
gettingId();

// npm install -g json-server
// json-server --watch papers.json

//My whatsapp number is +92-312-6292779 you can also contact me here if you have any questions or any further work
