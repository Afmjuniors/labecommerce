import getRndInteger from "./aleatoryNumber.js";

const computer = getRndInteger(0, 10)

const dev = process.argv[2].toLowerCase()
const devNumber = process.argv[3]
let frase = 'Voce Perdeu!'
if (dev === 'impar' || dev === 'par' || Number(devNumber) !== NaN) {
    const total = computer + Number(devNumber)
    const isPar = (total) % 2 === 0
    if (dev === 'par' && isPar) {
        frase = 'Você Ganhou!'
    }
    if (dev === 'impar' && !isPar) {
        frase = 'Você Ganhou!'
    }
    console.log(`Você escolheu ${dev} e o computador escolheu ${dev == 'par' ? 'impar' : 'par'}. O resultado foi ${total}. ${frase}`)
} else[
    console.log("Favor digitar impar ou par e um numero")
]

