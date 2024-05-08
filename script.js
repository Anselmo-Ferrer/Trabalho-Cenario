// Importe a biblioteca mathjs
const math = require('mathjs');
// npm install mathjs

let funcao = '-0.0028x^7 + 0.1048x^6 - 2.4379x^5 + 36.016x^4 - 333.3024x^3 + 1816.4963x^2 - 5006.4931x + 4476.7823'; // Função encontrada no geogebra
let velocidade = 1000; 
let tolerancia = 0.001; // tolerância de 1%
let maxIteracoes = 1000; 

// Função para calcular o método de Newton-Raphson
function newtonRaphson(funcao, velocidade, tolerancia, maxIteracoes) {
    let x = velocidade;
    let interacoes = 0;
    let diferenca = Infinity;
    let derivada = math.derivative(funcao, 'x');

    // loop para calcular o Newton-Raphson ate a diferença ser menor que 1%
    while (interacoes < maxIteracoes) {

        // transforma a função em uma expressão que o java script entenda
        let fx = math.evaluate(funcao, { x });
        // transforma a função em uma derivada e depois em um expressão que o javascript entenda
        let dfx = math.derivative(funcao, 'x').evaluate({ x });
        // calcula o newtonRaphson
        let deltaX =  x - (fx / dfx);

        // imprime os valores de x
        console.log(`x${interacoes} = ${x.toFixed(5)}`)
        
        // Calcula a diferença entre as aproximações sucessivas
        diferenca = ((deltaX-x) / x) * 100

        // x se torna o valor do resultado no ultimo newtonRaphson
        x = deltaX
        // incrementa mais 1 no numero de interações
        interacoes++;

        // se a diferenca for menor que o 1% loop para
        if (diferenca > -0.001 && diferenca < tolerancia) {
            break
        }

    }

    return x;
}

const resultado = newtonRaphson(funcao, velocidade, tolerancia, maxIteracoes)

console.log(`Instante Aproximado = ${resultado}`)