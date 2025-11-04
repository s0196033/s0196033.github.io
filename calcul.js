
const basePrices = {
    "basic": 500,
    "premium": 1000,
    "custom": 800
};

const optionMultipliers = {
    "standard": 1.0,
    "advanced": 1.5,
    "professional": 2.0
};

const propertyPrice = 200;

function calculate() {
    let quantityInput = document.getElementById("quantity");
    let serviceTypeRadios = document.getElementsByName("serviceType");
    let resultDiv = document.getElementById("result");
    let errorDiv = document.getElementById("error"); // Исправлено: Error -> error

    let regex = /^\d+$/;
    if (quantityInput.value === "" || !regex.test(quantityInput.value) || parseInt(quantityInput.value) <= 0) {
        errorDiv.textContent = "Введите корректное количество!";
        errorDiv.style.display = "block";
        resultDiv.innerHTML = "";
        return false;
    } else {
        errorDiv.style.display = "none";
    }

    let selectedType = "";
    for (let radio of serviceTypeRadios) {
        if (radio.checked) {
            selectedType = radio.value;
            break;
        }
    }

    let price = basePrices[selectedType];
    let quantity = parseInt(quantityInput.value);
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
    let serviceTypeRadios = document.getElementsByName("serviceType");
    let optionsGroup = document.getElementById("optionsGroup");
    let propertyGroup = document.getElementById("propertyGroup");

    let selectedType = "";
    for (let radio of serviceTypeRadios) {
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

    let serviceTypeRadios = document.getElementsByName("serviceType");
    for (let radio of serviceTypeRadios) {
        radio.addEventListener("change", function() {
            updateFormVisibility();
        });
    }

    updateFormVisibility();
});
