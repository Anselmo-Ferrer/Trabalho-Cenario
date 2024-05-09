// Importe a biblioteca mathjs
const math = require('mathjs');
// npm install mathjs


// velocidade encontrada entre as medias das matriculas = 3 m/s
// função encontrada no geogebra = 0x^9 + 0x^8 - 0.0028x^7 + 0.1048x^6 - 2.4379x^5 + 36.016x^4 - 333.3024x^3 + 1816.4963x^2 - 5006.4931x + 4476.7823

// obs: o numero de interações depende do palpite inicial
// x0 = 1 -> 4 interações
// x0 = 3 -> 11 interações
// x0 = 5 -> 31 interações

// função minimizada pelo javascript
let funcao = '-0.0028x^7 + 0.1048x^6 - 2.4379x^5 + 36.016x^4 - 333.3024x^3 + 1816.4963x^2 - 5006.4931x + 4476.7823'; 
let x0 = 3; // palpite inicial
let tolerancia = 0.001; // tolerância de 1%
let maxInteracoes = 1000; // maximo de interações 

// Função para calcular o método de Newton-Raphson
function newtonRaphson(funcao, tolerancia, maxInteracoes, x0) {
    let x = x0; 
    let interacoes = 0;
    let diferenca = Infinity;

    // Informacoes sobre a função no console
    let derivada = math.derivative(funcao, 'x');
    console.log(`Funcao: ${funcao}`)
    console.log(`Derivada: ${derivada}`)
    console.log(`x0 = ${x0}`)
    console.log(`---------------------------------------------------`)

    // loop para calcular o Newton-Raphson ate a diferença ser menor que 1% ou o número de interações ser 1000
    while (interacoes < maxInteracoes) {

        // transforma a função em uma expressão que o java script entenda atraves da blibioteca mathjs
        let fx = math.evaluate(funcao, { x });
        // transforma a função em uma derivada 
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
            break;
        }

    }

    console.log(`---------------------------------------------------`)

    return x;
}

const resultado = newtonRaphson(funcao, tolerancia, maxInteracoes, x0)

// imprime o instante aproximado
console.log(`Instante aproximado em que o personagem atinge a velocidade de 3 m/s: ${resultado}`)