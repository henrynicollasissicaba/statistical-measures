import { thereIsACalculationBox, arithmeticAverage, weightedAverage, mode, median } from "./operations.js"

const calculationArea = document.querySelector('.calculation-area')

export const createArithmeticAverageBox = () => createCalculationBox('Média Aritmética Simples', arithmeticAverage)
export const createWeightedAverageBox = () => createCalculationBox('Média Aritmética Ponderada', weightedAverage)
export const createModeBox = () => createCalculationBox('Moda', mode)
export const createMedianBox = () => createCalculationBox('Mediana', median)

const createCalculationBox = (title, calculateFunction) => {
    thereIsACalculationBox()

    // criando a div principal que vai agrupar todos os elementos filhos
    const calculationDiv = document.createElement('div')
    calculationDiv.className = 'calculation flex-column'

    // criando o nome da operação escolhida
    const headingDiv = document.createElement('h1')
    headingDiv.textContent = `${title}`

    // criando uma div de alertas
    const alertsDiv = createAlertsDiv()

    // criando a div de inputs
    const inputsDiv = document.createElement('div')
    inputsDiv.className = 'inputs flex-column'

    const button = createButton(calculateFunction)
    
    if(title === 'Média Aritmética Ponderada'){
        const inputValues = createInput('values', 'Insira os valores aqui.')
        const inputWeights = createInput('weights', 'Insira os pesos dos valores aqui.')
        inputsDiv.append(inputValues, inputWeights, button)
    } else {
        const inputValues = createInput('values', 'Insira os valores aqui.')
        inputsDiv.append(inputValues, button)
    }

    // criando o parágrafo de resultado
    const result = createResult()

    // adicionando tudo na página dinamicamente
    calculationDiv.append(headingDiv, alertsDiv, inputsDiv, result)
    calculationArea.append(calculationDiv)
}

const createAlertsDiv = () => {
    const alertsDiv = document.createElement('div')
    alertsDiv.className = 'alerts'

    const firtsAlert = document.createElement('p')
    firtsAlert.textContent = 'Utilize ponto (.) para números com casas decimais;'

    const secondAlert = document.createElement('p')
    secondAlert.textContent = `Use espaços ou vírgulas para separar os valores.`

    alertsDiv.append(firtsAlert, secondAlert)

    return alertsDiv
}

const createInput = (id, placeholder) => {
    const inputValues = document.createElement('input')
    inputValues.type = 'text'
    inputValues.id = `${id}`
    inputValues.placeholder = `${placeholder}`
    inputValues.autocomplete = 'off'

    return inputValues
}

const createButton = (calculateFunction) => {
    const inputButton = document.createElement('input')
    inputButton.type = 'button'
    inputButton.value = 'Calcular'
    inputButton.id = 'calculate'
    inputButton.className = 'btn'
    inputButton.addEventListener('click', calculateFunction)

    return inputButton
}

const createResult = () => {
    const result = document.createElement('p')
    result.id = 'result'
    result.textContent = 'Resultado: '

    return result
}

// html referência
/* <div class="calculation">
        <h1>Média Aritmética Simples</h1>
            <div class="alerts">
                <p>Utilize ponto (.) para números com casas decimais;</p>
                <p>Use espaços ou vírgulas para separar os valores.</p>
            </div>
            <div class="inputs">
                <input type="text" name="values" id="values" placeholder="Insira os valores aqui." autocomplete="off">
                <input type="button" value="Calcular" id="calculate" class="btn">
            </div>
            <p id="result">Resultado: <span id="highlighted-word"></span></p>
    </div> */
