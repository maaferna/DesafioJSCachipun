document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const numRoundsInput = document.getElementById('numRounds');
    const resultText = document.getElementById('resultText');

    playButton.addEventListener('click', () => {
        const numRounds = parseInt(numRoundsInput.value);
        if (isNaN(numRounds) || numRounds <= 0) {
            alert('Por favor, ingresa un número válido de rondas.');
            return;
        }

        // Clear previous results
        resultText.innerHTML = '';

        let userWins = 0;
        let machineWins = 0;
        let draws = 0;

        for (let i = 0; i < numRounds; i++) {
            const userChoice = parseInt(prompt(`Ronda ${i + 1}: Elige tu jugada (0 = Piedra, 1 = Papel, 2 = Tijera)`));
            if (isNaN(userChoice) || userChoice < 0 || userChoice > 2) {
                alert('Selección no válida, por favor elige 0 para Piedra, 1 para Papel o 2 para Tijera.');
                i--; // redo the round
                continue;
            }

            const machineChoice = Math.floor(Math.random() * 3);
            const result = determineWinner(userChoice, machineChoice);

            if (result === 'user') {
                userWins++;
            } else if (result === 'machine') {
                machineWins++;
            } else {
                draws++;
            }

            // Append the result of the current round to the result text
            resultText.innerHTML += `
                <p>Ronda ${i + 1}: Tú elegiste ${choiceToString(userChoice)}, la máquina eligió ${choiceToString(machineChoice)}. ${result === 'user' ? '¡Ganaste!' : result === 'machine' ? 'Perdiste.' : 'Empate.'}</p>
            `;
        }

        // Display final results
        resultText.innerHTML += `
            <hr>
            <p>Rondas ganadas por el usuario: ${userWins}</p>
            <p>Rondas ganadas por la máquina: ${machineWins}</p>
            <p>Empates: ${draws}</p>
            <p>${userWins > machineWins ? '¡Felicidades! Ganaste el juego.' : machineWins > userWins ? 'Perdiste contra la máquina.' : 'El juego terminó en empate.'}</p>
        `;
    });

    function determineWinner(userChoice, machineChoice) {
        if (userChoice === machineChoice) {
            return 'draw';
        } else if (
            (userChoice === 0 && machineChoice === 2) || // Piedra vs Tijera
            (userChoice === 1 && machineChoice === 0) || // Papel vs Piedra
            (userChoice === 2 && machineChoice === 1)    // Tijera vs Papel
        ) {
            return 'user';
        } else {
            return 'machine';
        }
    }

    function choiceToString(choice) {
        switch (choice) {
            case 0: return 'Piedra';
            case 1: return 'Papel';
            case 2: return 'Tijera';
            default: return '';
        }
    }
});
