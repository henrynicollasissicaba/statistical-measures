const btns = document.querySelectorAll('#btn')
const closePopupBtn = document.querySelector('#close-btn')
const popup = document.querySelector('.popup')

// Removendo o popup de error
closePopupBtn.addEventListener('click', () => {
    popup.classList.remove('show')
})

btns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        switch (index) {
            case 0:
                arithmeticAverage()
                break
            case 1:
                weightedAverage()
                break
            case 2:
                mode()
                break
            case 3:
                median()
                break
        }
    })
})

const arithmeticAverage = () => {
    const inputText = document.querySelector('#arithmetic-average-input').value

    performCalculation(inputText, averageCalc, 0)
}

const weightedAverage = () => {
    const inputValue = document.querySelector('#value-input').value
    const inputWeight = document.querySelector('#weight-input').value

    if(areInputsValid(inputValue, inputWeight)){
        const values = stringToNumber(inputValue)
        const weights = stringToNumber(inputWeight)
        const result = weightedAverageCalc(values, weights)
        showResult(result, 1)
    } else if(inputValue.length !== inputWeight.length){
        showErrorMessage('O número de "valores" e de "pesos" DEVEM  ser iguais!')
    } else {
        showErrorMessage('Insira números válidos!')
    }
}

const mode = () => {
    const inputText = document.querySelector('#mode').value

    performCalculation(inputText, modeCalc, 2)
}

const median = () => {
    const inputText = document.querySelector('#median').value

    performCalculation(inputText, medianCalc, 3)
}

// Funcao para calcular a media aritmetica, moda e mediana
const performCalculation = (userInput, calcFunction, indexOfBtn) => {
    if(checkInput(userInput)){
        const result = calcFunction(...stringToNumber(userInput))
        showResult(result, indexOfBtn)
    } else {
        showErrorMessage('Insira números válidos!')
    }
}

const stringToNumber = arrayString => {
    // Remove espacos ao redor das virgulas e substitui espacos restantes por virgulas
    const stringNumbers = arrayString.replace(/,\s*/g, ',').replace(/\s+/g, ',')

    // Converte a string em array de numeros
    return stringNumbers.split(',').map(Number)
}

// Verificar se o caractere digitado e permitido e se o conteudo e vazio ou 0 (zero)
const checkInput = (input) => {
    const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', ',', '.']
    // Transformando o dado do usuario em um array de caracteres 
    const entry = input.split('')

    // Verificando se a entrada nao possui valor ou so tenha valor 0 (zero)
    if(input.length === 0 || input === 0){
        showErrorMessage('Insira números válidos!')
        return
    }

    // Verificando cada caractere se e valido com o que e permitido
    for(let char of entry){
        if(!allowedChars.includes(char)){
            return false
        }
    }
    return true
}

const areInputsValid = (values, weights) => {
    return checkInput(values) && checkInput(weights) && (values.length === weights.length)
}

const averageCalc = (...numbers) => {
    const sum = numbers.reduce((accumulator, number) => accumulator + number, 0)
    const average = sum / numbers.length

    return average
}

const weightedAverageCalc = (numbers, weights) => {
    const sum = numbers.reduce((accumulator, number, index) => accumulator + (number * weights[index]), 0)
    const weightSum = weights.reduce((accumulator, weight) => accumulator + weight, 0)

    const average = sum / weightSum
    return average
}

const modeCalc = (...numbers) => {
    // Retornando um array bidimensional para a variavel "quantities" [ [number, qtd] ...]
    const quantities = numbers.map(number => [
        number, // numero
        numbers.filter(num => number === num).length // repeticao do numero
    ])
    // Colocando o array em ordem decrescente, assim o numero que repetir mais vezes, sera
    // o primeiro elemento
    quantities.sort((a, b) => b[1] - a[1]) 

    return quantities[0][0]
}

const medianCalc = (...numbers) => {
    const orderedNumbers = numbers.sort((a, b) => a - b)
    const middleNumber = Math.floor(orderedNumbers.length / 2)

    if(orderedNumbers.length % 2 !== 0){
        return orderedNumbers[middleNumber]
    } else {
        return averageCalc(orderedNumbers[middleNumber - 1], orderedNumbers[middleNumber])
    }
}

const showResult = (resultValue, indexOfBtn) => {
    const result = document.querySelectorAll('#result')[indexOfBtn]
    const resultOutput = `Resultado: <span id="main-word">${resultValue}</span>`

    result.textContent = `Resultado: Calculando...`
    setTimeout(() => {
        result.innerHTML = resultOutput
    }, 1000)
}

const showErrorMessage = (message) => {
    document.querySelector('.popup-content p').textContent = message
    popup.classList.add('show')
}