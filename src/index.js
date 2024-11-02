// Imports your SCSS stylesheet
import './style.scss';

import data from './data.json'

const formYear = document.querySelector("#year");
const formMake = document.querySelector("#make");
const formModel = document.querySelector("#model");

const carYears = new Set();

// Iterates through data and adds car years to a set
data.forEach((car) => {
  carYears.add(car.year);
});

// Sorts the years by ascending order, then reverses it to be descending
const sortedYears = new Array(...carYears).sort().reverse();

// Adds the sorted years to the year select in the DOM
sortedYears.forEach(year => {
  const option = document.createElement("option");
  option.value = year;
  option.innerText = year;
  formYear.append(option);
})

const populateMakeSelect = (year) => {
  const makes = new Set();
  // Iterates through data and adds a car's make to a set if the car's year matches the selected year
  data.forEach(car => {
    if (car.year === parseInt(year)) {
      makes.add(car.Manufacturer);
    }
  })

  formMake.innerHTML = '<option value="">Vehicle Make</option>';

  // Adds the makes to the make select in the DOM
  makes.forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.innerText = make;
    formMake.append(option);
    formMake.parentElement.disabled = false;
  })
}

const populateModelSelect = (year, make) => {
  const models = new Set();
  // Iterates through data and adds a car's model to a set if the car's year and make match the selected ones
  data.forEach(car => {
    if (car.year === parseInt(year) && car.Manufacturer === make) {
      models.add(car.model);
    }
  })

  formModel.innerHTML = '<option value="">Vehicle Model</option>';
  // Adds the models to the model select in the DOM
  models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.innerText = model;
    formModel.append(option);
    formModel.parentElement.disabled = false;
  })
}

// Triggers when the form inputs change
const handleChange = (e) => {
  // If vehicle year is changed
  if (e.target.name === "year") {
    formMake.innerHTML = '<option value="">Vehicle Make</option>';
    if (e.target.value !== "") {
      populateMakeSelect(e.target.value);
    } else {
      formMake.parentElement.disabled = true;
    }
    formModel.innerHTML = '<option value="">Vehicle Model</option>';
    formModel.parentElement.disabled = true;
  }

  // If vehicle make is changed
  if (e.target.name === "make") {
    if (e.target.value !== "") {
      populateModelSelect(formYear.value, e.target.value);
    } else {
      formModel.innerHTML = '<option value="">Vehicle Model</option>';
      formModel.parentElement.disabled = true;
    }
  }

  // If vehicle model is changed
  if (e.target.name === "model") {
    if (e.target.value !== "") {
      // Finds a car that matches all selected details and logs it
      console.log(data.find(car =>
        car.year === parseInt(formYear.value) && 
        car.Manufacturer === formMake.value &&
        car.model === e.target.value
      ));
    }
  }
}

// Add the handleChange function to the form
document.querySelector("form").addEventListener("change", handleChange);