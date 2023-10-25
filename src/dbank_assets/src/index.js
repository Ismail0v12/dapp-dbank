import {dbank} from "../../declarations/dbank";



window.addEventListener("DOMContentLoaded", async () => {
    let form = document.querySelector("form"),
        formSelect = form.querySelector("select");

    let withdrawContainer = document.querySelector(".withdraw__container"),
        withdrawInput = withdrawContainer.querySelector("input");
                           
    let topUpContainer = document.querySelector(".topUp__container"),
        topUpContainerInput = topUpContainer.querySelector("input");

    const submitButton = document.getElementById('submit-btn');
    let currentSelectedType;

    function disableButton(isSubmiting) {
        if(!currentSelectedType || isSubmiting) {
            submitButton.setAttribute("disabled", true)
        } else {
            submitButton.removeAttribute("disabled")
        }
    }

    async function updateCurrentValue() {
        const currentAmount = await dbank.checkBalance();
        document.getElementById("value").innerText = currentAmount.toFixed(2);
    }

    await updateCurrentValue();
    disableButton();

    formSelect.addEventListener("change", (selectEvent) => {
        currentSelectedType = selectEvent.currentTarget.value;
        if(selectEvent.currentTarget.value === "topUp__container") {
            topUpContainer.classList.remove("d-none");
            if(!withdrawContainer.classList.contains("d-none")) {
                withdrawContainer.classList.add("d-none");
                withdrawInput.value = 0;
            }
        } else if(selectEvent.currentTarget.value === "withdraw__container") {
            withdrawContainer.classList.remove("d-none");
            if(!topUpContainer.classList.contains("d-none")) {
                topUpContainer.classList.add("d-none");
                topUpContainerInput.value = 0;
            }
        } else {
            topUpContainer.classList.add("d-none");
            topUpContainerInput.value = 0;

            withdrawContainer.classList.add("d-none");
            withdrawInput.value = 0;

        }
        disableButton()
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if(currentSelectedType === "withdraw__container" && withdrawInput.value.length != 0) {
            disableButton(true);    
            await dbank.withdrawl(parseFloat(withdrawInput.value));
            await updateCurrentValue();
            withdrawInput.value = 0;
            disableButton(false)
        } else if(currentSelectedType === "topUp__container" && topUpContainerInput.value.length != 0) {
            disableButton(true)
            await dbank.topUp(parseFloat(topUpContainerInput.value));
            await updateCurrentValue();
            topUpContainerInput.value = 0;
            disableButton(false)
        }
    })
        
    await dbank.compound();

})