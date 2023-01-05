import getRndInteger from "./aleatoryNumber.js"

const input = process.argv[2].toLowerCase()

const numeroAleatorioEntreUmATres = getRndInteger(1, 3)

if (!input) {
    console.log('envie "pedra", "papel" ou "tesoura"')
} else {
    if (input === 'tesoura' || input === 'pedra' || input === 'papel') {
        if (input === 'tesoura') {
            if (numeroAleatorioEntreUmATres === 3) {
                console.log('Voce escolheu tesoura e o computador escolheu tesoura. Empate')

            } else if (numeroAleatorioEntreUmATres === 1) {
                console.log('Voce escolheu tesoura e o computador escolheu pedra. Você Perdeu!')

            } else if (numeroAleatorioEntreUmATres === 2) {
                console.log('Voce escolheu tesoura e o computador escolheu Papel. Você Ganhou!')
            }
        }
        if (input === 'pedra') {
            if (numeroAleatorioEntreUmATres === 3) {
                console.log('Voce escolheu pedra e o computador escolheu tesoura. Voce Ganhou!')

            } else if (numeroAleatorioEntreUmATres === 1) {
                console.log('Voce escolheu pedra e o computador escolheu pedra. Empatou!')

            } else if (numeroAleatorioEntreUmATres === 2) {
                console.log('Voce escolheu pedra e o computador escolheu Papel. Você Perdeu!')
            }
        }
        if (input === 'papel') {
            if (numeroAleatorioEntreUmATres === 3) {
                console.log('Voce escolheu papel e o computador escolheu tesoura. Você Perdeu')

            } else if (numeroAleatorioEntreUmATres === 1) {
                console.log('Voce escolheu papel e o computador escolheu pedra. Você ganhou!')

            } else if (numeroAleatorioEntreUmATres === 2) {
                console.log('Voce escolheu papel e o computador escolheu Papel. Empatou!')
            }
        }
    } else {
        console.log('envie "pedra", "papel" ou "tesoura"')
    }

}
