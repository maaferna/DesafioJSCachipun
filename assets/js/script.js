document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el botón "Jugar" del DOM, que será utilizado para iniciar el juego cuando el usuario haga clic en él.
    const playButton = document.getElementById('playButton');

    // Selecciona el campo de entrada donde el usuario ingresa el número de rondas que desea jugar.
    const numRoundsInput = document.getElementById('numRounds');

    // Selecciona el elemento del DOM donde se mostrarán los resultados de cada ronda y los resultados finales del juego.
    const resultText = document.getElementById('resultText');

    // Añade un evento 'click' al botón de jugar para ejecutar el juego cuando se haga clic.
    playButton.addEventListener('click', () => {
        // Obtiene y convierte el valor ingresado por el usuario para el número de rondas a un número entero.
        const numRounds = parseInt(numRoundsInput.value);

        // Valida si el número de rondas es un número válido y mayor que 0.
        if (isNaN(numRounds) || numRounds <= 0) {
            // Si el valor no es válido, muestra una alerta y termina la ejecución.
            alert('Por favor, ingresa un número válido de rondas.');
            return;
        }

        // Limpia el contenido previo de los resultados para preparar la tabla de resultados para las nuevas rondas.
        resultText.innerHTML = '';

        // Inicializa los contadores de victorias del usuario, victorias de la máquina y empates.
        let userWins = 0;
        let machineWins = 0;
        let draws = 0;

        // Inicia un ciclo que se ejecutará tantas veces como rondas haya indicado el usuario.
        for (let i = 0; i < numRounds; i++) {
            // Solicita al usuario que seleccione una opción en cada ronda mediante un prompt.
            const userChoice = parseInt(prompt(`Ronda ${i + 1}: Elige tu jugada (0 = Piedra, 1 = Papel, 2 = Tijera)`));
            
            // Valida si la elección del usuario es un número válido y dentro del rango permitido (0, 1, 2).
            if (isNaN(userChoice) || userChoice < 0 || userChoice > 2) {
                // Si la elección no es válida, muestra una alerta y vuelve a solicitar la jugada para la misma ronda.
                alert('Selección no válida, por favor elige 0 para Piedra, 1 para Papel o 2 para Tijera.');

                i--; // Reduce el contador del ciclo para repetir la ronda actual.
                continue;// Salta el resto de la iteración actual y vuelve a solicitar la jugada.
            }

            // Genera la jugada aleatoria de la máquina usando Math.random.
            const machineChoice = Math.floor(Math.random() * 3);

            // Determina el resultado de la ronda comparando la elección del usuario y la de la máquina.
            const result = determineWinner(userChoice, machineChoice);

            // Actualiza los contadores de victorias y empates según el resultado de la ronda.
            if (result === 'user') {
                userWins++;
            } else if (result === 'machine') {
                machineWins++;
            } else {
                draws++;
            }

            // Agrega el resultado de la ronda actual al texto de resultados en el HTML.
            resultText.innerHTML += `
                <p>Ronda ${i + 1}: Tú elegiste ${choiceToString(userChoice)}, la máquina eligió ${choiceToString(machineChoice)}. ${result === 'user' ? '¡Ganaste!' : result === 'machine' ? 'Perdiste.' : 'Empate.'}</p>
            `;
        }

        // Muestra los resultados finales del juego después de todas las rondas jugadas
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
    });

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
    

    function choiceToString(choice) {
        // Usamos if...else if...else para convertir el valor numérico en la opción correspondiente
        if (choice === 0) {
            // Si el valor es 0, la opción es 'Piedra'
            return 'Piedra';
        } else if (choice === 1) {
            // Si el valor es 1, la opción es 'Papel'
            return 'Papel';
        } else if (choice === 2) {
            // Si el valor es 2, la opción es 'Tijera'
            return 'Tijera';
        } else {
            // En caso de que el valor no sea 0, 1, o 2, devuelve una cadena vacía
            return '';
        }
    }
});
