class Board {
    constructor() {
        this.board = document.getElementById('board');
        this.squares = [];
        this.size = 5;
        this.initializeBoard();
    }

    initializeBoard() {
        this.board.innerHTML = '';
        this.squares = [];

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const square = document.createElement('div');
                square.className = `square ${(row + col) % 2 === 0 ? 'white' : 'black'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                this.board.appendChild(square);
                this.squares.push(square);
            }
        }
    }

    getSquare(row, col) {
        return this.squares.find(square => 
            parseInt(square.dataset.row) === row && 
            parseInt(square.dataset.col) === col
        );
    }

    markSquare(row, col, className) {
        const square = this.getSquare(row, col);
        if (square) {
            square.classList.add(className);
        }
    }

    unmarkSquare(row, col, className) {
        const square = this.getSquare(row, col);
        if (square) {
            square.classList.remove(className);
        }
    }

    setSquareContent(row, col, content, stepNumber = null) {
        const square = this.getSquare(row, col);
        if (square) {
            square.innerHTML = '';
            if (content === '♞') {
                const knight = document.createElement('div');
                knight.className = 'knight';
                knight.textContent = content;
                square.appendChild(knight);
            }
            if (stepNumber !== null) {
                const stepDiv = document.createElement('div');
                stepDiv.className = 'step-number';
                stepDiv.textContent = stepNumber;
                square.appendChild(stepDiv);
            }
        }
    }

    showBacktrack(row, col) {
        const square = this.getSquare(row, col);
        if (square) {
            square.classList.add('backtrack');
            setTimeout(() => {
                square.classList.remove('backtrack');
            }, 800);
        }
    }

    showTrying(row, col) {
        const square = this.getSquare(row, col);
        if (square) {
            square.classList.add('trying');
            setTimeout(() => {
                square.classList.remove('trying');
            }, 500);
        }
    }

    resetBoard() {
        this.squares.forEach(square => {
            square.className = `square ${(parseInt(square.dataset.row) + parseInt(square.dataset.col)) % 2 === 0 ? 'white' : 'black'}`;
            square.innerHTML = '';
        });
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }
}
  