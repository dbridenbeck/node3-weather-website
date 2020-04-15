const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.getElementById("error");
const message2 = document.getElementById("forecast");

const getWeatherOnClick = (address) => {
  const url = `http://localhost:3000/weather?address=${address}`
  fetch(url)
    .then(response => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
    })
    .then(({forecast, location, error}) => {
      if (!error) { 
        message1.textContent = `Location: ${location}`;
        message2.textContent = `${forecast}`;
      } else {
        message1.textContent = error;
      }
    })
    .catch(error => message1.textContent = "Error connecting to weather service.");
};

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  message1.textContent = "Loading...";
  message2.textContent = "";
  const address = search.value;
  getWeatherOnClick(address)
  search.value = '';
});