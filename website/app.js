/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const apiKay = "00c463fd49392ee566e5011f28f4df49";

const generate = document.getElementById("generate");

// the generation function
generate.addEventListener("click", async () => {
  const zipCode = document.querySelector("#zip").value;
  const feelings = document.getElementById("feelings").value;

  const theUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKay}&units=metric`;

  getWeather(theUrl)
    .then((temp) => {
      return postData(temp, feelings);
    })
    .then((allData) => {
      updateUI(allData);
    }).catch;
});

//  weather function   //get weather details from weather API
const getWeather = async (theUrl) => {
  const response = await fetch(theUrl);
  try {
    const data = await response.json();
    const temp = data.main.temp;
    console.log(temp);

    return temp;
  } catch (error) {
    console.log("error", error);
  }
};

//POST request function

const postData = async (temp, feelings) => {
  const response = await fetch("/addData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      date: newDate,
      temp: temp,
      feelings: feelings,
    }),
  });

  try {
    const response = await fetch("/sendData"); //GET request
    const allData = await response.json();
    console.log(allData);
    return allData;
    updateUI(allData);
  } catch (error) {
    console.log("error", error);
  }
};

//update user interface with the final data

const updateUI = async (allData) => {
  document.getElementById("date").innerHTML = `The Date is: ${allData.date}`;
  document.getElementById("temp").innerHTML = `Temperature is: ${allData.temp}`;
  document.getElementById("content").innerHTML = `I feel: ${allData.feelings}`;
};
