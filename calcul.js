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
    let r = document.getElementById("result");
    let err = document.getElementById("error"); 

    let regex = /^\d+$/;
    if (q.value === "" || !regex.test(q.value) || parseInt(q.value) <= 0) {
        err.textContent = "Введите корректное количество!";
        err.style.display = "block";
        r.innerHTML = "";
        return false;
    } else {
        err.style.display = "none";
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

    if (selectedType === "nar") {
        let optionsSelect = document.getElementById("options");
        let optionMultiplier = optionMultipliers[optionsSelect.value];
        total *= optionMultiplier;
    }

    if (selectedType === "nes") {
        let a1 = document.getElementById("aquarium");
        if (a1.checked) {
            total += aquarium * quantity;
        }
    }

    r.innerHTML = "Стоимость заказа: " + Math.round(total) + " руб.";
    return false;
}

function update() {
    let s = document.getElementsByName("service");
    let op = document.getElementById("op");
    let aq = document.getElementById("aqua");

    let selectedType = "";
    for (let radio of s) {
        if (radio.checked) {
            selectedType = radio.value;
            break;
        }
    }

    document.getElementById("options").value = "d1";
    document.getElementById("aquarium").checked = false;

    switch(selectedType) {
        case 'bas':
            op.style.display = "none";
            aq.style.display = "none";
            break;
        case 'nar':
            op.style.display = "block";
            aq.style.display = "none";
            break;
        case 'nes':
            op.style.display = "none";
            aq.style.display = "block";
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let calculateButton = document.getElementById("calculateButton");
    calculateButton.addEventListener("click", calculate);

    let s = document.getElementsByName("service");
    for (let radio of s) {
        radio.addEventListener("change", function() {
            update();
        });
    }

    update();
});
