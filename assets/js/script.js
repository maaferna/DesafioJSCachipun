document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el botón "Jugar" del DOM, que será utilizado para iniciar el juego cuando el usuario haga clic en él.
    const playButton = document.getElementById('playButton');

    // Selecciona el campo de entrada donde el usuario ingresa el número de rondas que desea jugar.
    const numRoundsInput = document.getElementById('numRounds');

    // Selecciona el dropdown donde el usuario elige su jugada.
    const userChoiceInput = document.getElementById('userChoice');

    // Selecciona el elemento del DOM donde se mostrarán los resultados de cada ronda y los resultados finales del juego.
    const resultText = document.getElementById('resultText');

    // Inicializa los contadores y variables para controlar el juego
    let userWins = 0;
    let machineWins = 0;
    let draws = 0;
    let round = 0;
    let numRounds;

    // Añade un evento 'click' al botón de jugar para ejecutar el juego cuando se haga clic.
    playButton.addEventListener('click', () => {
        // Si es la primera vez que se hace clic en "Jugar", establecemos el número de rondas
        if (round === 0) {
            numRounds = parseInt(numRoundsInput.value);
            // Valida si el número de rondas es un número válido y mayor que 0.
            if (isNaN(numRounds) || numRounds <= 0) {
                alert('Por favor, ingresa un número válido de rondas.');
                return;
            }
            // Limpia el contenido previo de los resultados para preparar la tabla de resultados para las nuevas rondas.
            resultText.innerHTML = '';
        }

        // Ejecuta una ronda del juego
        playRound();

        // Incrementa el contador de rondas
        round++;

        // Si hemos llegado al número de rondas, mostramos los resultados finales y reiniciamos el juego
        if (round >= numRounds) {
            displayFinalResults(userWins, machineWins, draws);
            resetGame();
        }
    });

    /**
     * Ejecuta la lógica para una ronda del juego.
     */
    function playRound() {
        // Obtiene la elección del usuario desde el dropdown
        const userChoice = parseInt(userChoiceInput.value);

        const machineChoice = Math.floor(Math.random() * 3);
        const result = determineWinner(userChoice, machineChoice);

        // Actualiza los contadores de victorias y empates según el resultado de la ronda.
        if (result === 'user') {
            userWins++;
        } else if (result === 'machine') {
            machineWins++;
        } else {
            draws++;
        }

        // Actualiza el DOM con los resultados de la ronda actual
        resultText.innerHTML += `
            <p>Ronda ${round + 1}: Tú elegiste ${choiceToString(userChoice)}, la máquina eligió ${choiceToString(machineChoice)}. ${result === 'user' ? '¡Ganaste!' : result === 'machine' ? 'Perdiste.' : 'Empate.'}</p>
        `;
    }

    /**
     * Determina el ganador de la ronda comparando las elecciones del usuario y la máquina.
     * @param {number} userChoice - La elección del usuario.
     * @param {number} machineChoice - La elección de la máquina generada aleatoriamente.
     * @returns {string} - Devuelve 'user' si el usuario gana, 'machine' si la máquina gana, o 'draw' si es un empate.
     */
    function determineWinner(userChoice, machineChoice) {
        // Si la elección del usuario es igual a la elección de la máquina, es un empate.
        if (userChoice === machineChoice) {
            return 'draw';
        } else if (
            // Caso 1: El usuario elige Piedra (0) y la máquina elige Tijera (2)
            (userChoice === 0 && machineChoice === 2) ||
            // Caso 2: El usuario elige Papel (1) y la máquina elige Piedra (0)
            (userChoice === 1 && machineChoice === 0) ||
            // Caso 3: El usuario elige Tijera (2) y la máquina elige Papel (1)
            (userChoice === 2 && machineChoice === 1)
        ) {
            // Si alguna de las combinaciones anteriores se cumple, el usuario gana.
            return 'user';
        } else {
            // Si ninguna de las combinaciones anteriores se cumple y no es un empate, la máquina gana.
            return 'machine';
        }
    }

    /**
     * Convierte la elección numérica en su representación de cadena.
     * @param {number} choice - El valor numérico de la elección (0, 1, o 2).
     * @returns {string} - Devuelve 'Piedra', 'Papel', 'Tijera' según el valor de la elección.
     */
    function choiceToString(choice) {
        if (choice === 0) {
            return 'Piedra';
        } else if (choice === 1) {
            return 'Papel';
        } else if (choice === 2) {
            return 'Tijera';
        } else {
            return '';
        }
    }

    /**
     * Muestra los resultados finales del juego después de todas las rondas jugadas.
     * @param {number} userWins - El número total de rondas ganadas por el usuario.
     * @param {number} machineWins - El número total de rondas ganadas por la máquina.
     * @param {number} draws - El número total de rondas que terminaron en empate.
     */
    function displayFinalResults(userWins, machineWins, draws) {
        resultText.innerHTML += `
            <hr>
            <!-- Muestra el número total de rondas ganadas por el usuario -->
            <p>Rondas ganadas por el usuario: ${userWins}</p>
            
            <!-- Muestra el número total de rondas ganadas por la máquina -->
            <p>Rondas ganadas por la máquina: ${machineWins}</p>
            
            <!-- Muestra el número total de rondas que terminaron en empate -->
            <p>Empates: ${draws}</p>

            <!-- Determina y muestra el resultado final del juego con un mensaje personalizado dependiendo de quién ganó más rondas -->
            <p>${userWins > machineWins ? '¡Felicidades! Ganaste el juego.' : machineWins > userWins ? 'Perdiste contra la máquina.' : 'El juego terminó en empate.'}</p>  
        `;
    }

    /**
     * Reinicia el juego para permitir que el usuario juegue de nuevo.
     */
    function resetGame() {
        round = 0;
        userWins = 0;
        machineWins = 0;
        draws = 0;
    }
});
