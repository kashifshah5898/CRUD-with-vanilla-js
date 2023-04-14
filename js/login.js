async function login(event) {
  event.preventDefault(); // Prevent form submission

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const usersRes = await fetch('users.json');
  const users = await usersRes.json(); 

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password.");
  } else {
    alert("Succussful login, welcome!.");
    location.href = `${user.role}.html`;
  }
}

const wrapper = document.querySelector('.wrapper');
const btnPopup = document.querySelector('.nav__link--btn');
const iconClose = document.querySelector('.icon-close');

btnPopup.addEventListener('click', ()=> {
    wrapper.style.display = 'initial';
});

iconClose.addEventListener('click', ()=> {
    wrapper.style.display = 'none';
});