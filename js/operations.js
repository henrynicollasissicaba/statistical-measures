export const arithmeticAverage = () => {
    performCalculation(arithmeticCalc)
}

export const weightedAverage = () => {
    performCalculation(weightedCalc)
}

export const mode = () => {
    performCalculation(modeCalc)
}

export const median = () => {
    performCalculation(medianCalc)
}

const performCalculation = (calculateFunction) => {
    if(calculateFunction === weightedCalc){
        const valuesInput = document.querySelector('#values').value.trim()
        const weightsInput = document.querySelector('#weights').value.trim()

        const isCheckedValues = checkUserInput(valuesInput)
        const isCheckedWeights = checkUserInput(weightsInput)
    
        const numberValues = stringToNumber(valuesInput)
        const numberWeights = stringToNumber(weightsInput)

        if(isCheckedValues && isCheckedWeights && (numberValues.length === numberWeights.length)){
            const result = weightedCalc(numberValues, numberWeights)
            showResultOutput(result)

        } else if(numberValues.length !== numberWeights.length){
            showErrorMessage('O número de "VALORES" e de "PESOS" devem ser iguais!')
        }

    } else {
        const values = document.querySelector('#values').value.trim()
        const isCheckedInputs = checkUserInput(values)

        if(isCheckedInputs){
            const numbers = stringToNumber(values)
            const result = calculateFunction(...numbers)
            showResultOutput(result)
        }
    }
}

const showResultOutput = (resultValue) => {
    const result = document.querySelector('#result')
    const resultOutput = `Resultado: <span id="highlighted-word">${resultValue}</span>`

    result.textContent = `Resultado: Calculando...`
    setTimeout(() => {
        result.innerHTML = resultOutput
    }, 1000)
}

const arithmeticCalc = (...numbers) => {
    const sum = numbers.reduce((accumulator, number) => accumulator + number, 0)
    const average = (sum / numbers.length)

    return average
}

const weightedCalc = (numbers, weights) => {
    const sum = numbers.reduce((accumulator, number, index) => accumulator + (number * weights[index]), 0)
    const weightSum = weights.reduce((accumulator, weight) => accumulator + weight, 0)

    const average = sum / weightSum
    return average
}

const modeCalc = (...numbers) => {
    let frequency = {}

    numbers.forEach((number) => {
        if(frequency[number]){
            frequency[number]++
        } else {
            frequency[number] = 1
        }
    })

    let mode = []
    let maxFrequency = 0

    for(let number in frequency){
        if(frequency[number] > maxFrequency){
            maxFrequency = frequency[number]
            mode = [number]

        } else if(frequency[number] === maxFrequency){
            mode.push(number)
        }
    }

    return mode.join(', ')
}

const medianCalc = (...numbers) => {
    const orderedNumbers = numbers.sort((a, b) => a - b)
    const middleNumber = Math.floor(orderedNumbers.length / 2)

    if(orderedNumbers.length % 2 === 0){
        return arithmeticCalc(orderedNumbers[middleNumber - 1] ,orderedNumbers[middleNumber])
    } else {
        return orderedNumbers[middleNumber]
    }
}

const stringToNumber = (input) => {
    // Remove espacos ao redor das virgulas e substitui espacos restantes por virgulas
    const stringNumbers = input.replace(/,\s*/g, ',').replace(/\s+/g, ',')

    // Converte a string em array de numeros
    return stringNumbers.split(',').map(Number)
}

const checkUserInput = (input) => {
    const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', ',', '.']
    // Transformando o dado do usuario em um array de caracteres 
    const entry = input.split('')

    if(!input){
        showErrorMessage('Insira valores válidos!')
        return
    }

    // Verificando cada caractere se e valido com o que e permitido
    for(let char of entry){
        if(!allowedChars.includes(char)){
            showErrorMessage('Insira valores válidos!')
            return false
        }
    }
    return true
}

const showErrorMessage = (text) => {
    return Swal.fire({
            title: 'Error!',
            text: `${text}`,
            icon: 'error',
            confirmButtonText: 'Tentar novamente'
         })
}
