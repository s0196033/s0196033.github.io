const basePrices = {
    "bas": 1000,
    "nar": 2000,
    "nes": 3000
};

const optionMultipliers = {
    "d1": 1.0,
    "d2": 1.5,
    "d3": 2.0
};

const aquarium = 500;

function calculate() {
    let q = document.getElementById("quantity");
    let s = document.getElementsByName("service");
    let resultDiv = document.getElementById("result");
    let errorDiv = document.getElementById("error"); 

    let regex = /^\d+$/;
    if (q.value === "" || !regex.test(q.value) || parseInt(q.value) <= 0) {
        errorDiv.textContent = "Введите корректное количество!";
        errorDiv.style.display = "block";
        resultDiv.innerHTML = "";
        return false;
    } else {
        errorDiv.style.display = "none";
    }

    let selectedType = "";
    for (let radio of s) {
        if (radio.checked) {
            selectedType = radio.value;
            break;
        }
    }

    let price = basePrices[selectedType];
    let quantity = parseInt(q.value);
    let total = price * quantity;

    if (selectedType === "premium") {
        let optionsSelect = document.getElementById("options");
        let optionMultiplier = optionMultipliers[optionsSelect.value];
        total *= optionMultiplier;
    }

    if (selectedType === "custom") {
        let propertyCheckbox = document.getElementById("property");
        if (propertyCheckbox.checked) {
            total += propertyPrice * quantity;
        }
    }

    resultDiv.innerHTML = "Стоимость заказа: " + Math.round(total) + " руб.";
    return false;
}

function updateFormVisibility() {
    let s = document.getElementsByName("service");
    let optionsGroup = document.getElementById("optionsGroup");
    let propertyGroup = document.getElementById("propertyGroup");

    let selectedType = "";
    for (let radio of s) {
        if (radio.checked) {
            selectedType = radio.value;
            break;
        }
    }

    document.getElementById("options").value = "standard";
    document.getElementById("property").checked = false;

    switch(selectedType) {
        case 'basic':
            optionsGroup.style.display = "none";
            propertyGroup.style.display = "none";
            break;
        case 'premium':
            optionsGroup.style.display = "block";
            propertyGroup.style.display = "none";
            break;
        case 'custom':
            optionsGroup.style.display = "none";
            propertyGroup.style.display = "block";
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let calculateButton = document.getElementById("calculateButton");
    calculateButton.addEventListener("click", calculate);

    let s = document.getElementsByName("service");
    for (let radio of s) {
        radio.addEventListener("change", function() {
            updateFormVisibility();
        });
    }

    updateFormVisibility();
});
