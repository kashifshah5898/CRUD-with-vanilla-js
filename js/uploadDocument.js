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
  console.log("Remove called");
};
const addAuthor = () => {
  console.log("addAuthor called");
};

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();
  console.log(`
  title: ${title.value}
abstract: ${abstract.value}
firstName: ${firstName.value}
lastName: ${lastName.value}
email: ${email.value}
affiliation: ${affiliation.value}
presenter: ${presenter.checked}
file: ${file.value}`);

  // Reset the form to its initial state
  // form.reset();
});
