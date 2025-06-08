class UI {
    constructor(board, knightTour) {
        this.board = board;
        this.knightTour = knightTour;
        this.statusText = document.getElementById('statusText');
        this.resetBtn = document.getElementById('resetBtn');
        this.solveBtn = document.getElementById('solveBtn');
        this.speedSelect = document.getElementById('speedSelect');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Add click event to each square
        this.board.squares.forEach(square => {
            square.addEventListener('click', () => this.handleSquareClick(square));
        });

        // Add click event to reset button
        this.resetBtn.addEventListener('click', () => this.handleReset());

        // Add click event to solve button
        this.solveBtn.addEventListener('click', () => this.handleSolve());

        // Add change event to speed select
        this.speedSelect.addEventListener('change', () => this.handleSpeedChange());
        
        // Set initial speed
        this.handleSpeedChange();
    }

    handleSpeedChange() {
        const selectedSpeed = parseFloat(this.speedSelect.value);
        this.knightTour.setDelay(selectedSpeed);
    }

    async handleSquareClick(square) {
        if (this.knightTour.isSolving) return;

        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);

        this.updateStatus('Solving Knight\'s Tour...');
        this.disableControls();

        const success = await this.knightTour.solve(row, col);

        if (success) {
            this.updateStatus('🎉 Knight\'s Tour completed successfully!');
        } else {
            this.updateStatus('❌ No solution found from this position. Try another square.');
            this.board.resetBoard();
            this.resetInfo();
        }

        this.enableControls();
    }

    handleReset() {
        if (this.knightTour.isSolving) return;
        
        this.board.resetBoard();
        this.resetInfo();
        this.updateStatus('Click on any square to start the knight\'s tour');
    }

    async handleSolve() {
        if (this.knightTour.isSolving) return;

        this.updateStatus('Solving Knight\'s Tour...');
        this.disableControls();

        // Try to solve from position (0,0)
        const success = await this.knightTour.solve(0, 0);

        if (success) {
            this.updateStatus('🎉 Knight\'s Tour completed successfully!');
        } else {
            this.updateStatus('❌ No solution found. Try another starting position.');
            this.board.resetBoard();
            this.resetInfo();
        }

        this.enableControls();
    }

    updateStatus(message) {
        this.statusText.textContent = message;
    }

    resetInfo() {
        document.getElementById('stepCount').textContent = '0';
        document.getElementById('backtrackCount').textContent = '0';
        document.getElementById('currentPos').textContent = '-';
    }

    disableControls() {
        this.resetBtn.disabled = true;
        this.solveBtn.disabled = true;
        this.speedSelect.disabled = true;
        this.board.squares.forEach(square => {
            square.style.pointerEvents = 'none';
        });
    }

    enableControls() {
        this.resetBtn.disabled = false;
        this.solveBtn.disabled = false;
        this.speedSelect.disabled = false;
        this.board.squares.forEach(square => {
            square.style.pointerEvents = 'auto';
        });
    }
}
  