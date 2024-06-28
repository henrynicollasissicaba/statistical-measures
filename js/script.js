import { createArithmeticAverageBox, createWeightedAverageBox, createModeBox, createMedianBox } from "./createCalcBox.js"

const selectBtn = document.querySelector('#select-btn')

selectBtn.addEventListener('click', () => {
    const radioBtnValue = document.querySelector('input[name="calculation"]:checked').value
    
    switch (radioBtnValue){
        case "arithmetic-average":
            createArithmeticAverageBox()
            break
        
        case "weighted-arithmetic-average":
            createWeightedAverageBox()
            break

        case "mode":
            createModeBox()
            break

        case "median":
            createMedianBox()
            break
    }
})