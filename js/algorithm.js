class KnightTour {
    constructor(board) {
        this.board = board;
        this.size = board.size;
        // Sử dụng các bước di chuyển theo yêu cầu
        this.xMove = [2, 1, -1, -2, -2, -1, 1, 2];
        this.yMove = [1, 2, 2, 1, -1, -2, -2, -1];
        this.solution = [];
        this.isSolving = false;
        this.stepCount = 0;
        this.backtrackCount = 0;
        this.delay = 10; // Default delay
    }

    setDelay(delay) {
        this.delay = parseFloat(delay); // Support decimal values like 0.5ms
    }

    async solve(startRow, startCol) {
        this.isSolving = true;
        this.solution = [];
        this.stepCount = 0;
        this.backtrackCount = 0;
        const visited = Array(this.size).fill().map(() => Array(this.size).fill(false));
        
        // Initialize the solution array
        for (let i = 0; i < this.size; i++) {
            this.solution[i] = Array(this.size).fill(-1);
        }

        // Start the tour
        this.solution[startRow][startCol] = 0;
        visited[startRow][startCol] = true;
        this.stepCount = 1;
        this.board.markSquare(startRow, startCol, 'current');
        this.board.setSquareContent(startRow, startCol, '♞', 1);
        this.updateInfo(startRow, startCol);

        const success = await this.solveTour(startRow, startCol, 1, visited);
        
        this.isSolving = false;
        return success;
    }

    async solveTour(row, col, moveCount, visited) {
        if (moveCount === this.size * this.size) {
            return true;
        }

        // Sử dụng xMove và yMove để di chuyển
        for (let i = 0; i < 8; i++) {
            const newRow = row + this.xMove[i];
            const newCol = col + this.yMove[i];

            if (this.isValidMove(newRow, newCol, visited)) {
                // Show trying this position
                this.board.showTrying(newRow, newCol);
                await new Promise(resolve => setTimeout(resolve, this.delay));

                // Make move
                visited[newRow][newCol] = true;
                this.solution[newRow][newCol] = moveCount;
                this.stepCount = moveCount + 1;
                
                // Update visual representation
                this.board.markSquare(newRow, newCol, 'visited');
                this.board.setSquareContent(newRow, newCol, '♞', this.stepCount);
                this.board.markSquare(newRow, newCol, 'current');
                this.board.unmarkSquare(row, col, 'current');
                this.board.setSquareContent(row, col, '', this.stepCount - 1);
                
                this.updateInfo(newRow, newCol);

                // Add delay for visualization
                await new Promise(resolve => setTimeout(resolve, this.delay));

                // Recursively try to complete the tour
                if (await this.solveTour(newRow, newCol, moveCount + 1, visited)) {
                    return true;
                }

                // Backtrack - hiển thị quá trình quay lại
                this.backtrackCount++;
                this.board.showBacktrack(newRow, newCol);
                
                visited[newRow][newCol] = false;
                this.solution[newRow][newCol] = -1;
                this.board.unmarkSquare(newRow, newCol, 'visited');
                this.board.unmarkSquare(newRow, newCol, 'current');
                this.board.setSquareContent(newRow, newCol, '');
                this.board.markSquare(row, col, 'current');
                this.board.setSquareContent(row, col, '♞', moveCount);
                
                this.updateInfo(row, col);
                
                // Delay để hiển thị backtrack
                await new Promise(resolve => setTimeout(resolve, this.delay));
            }
        }

        return false;
    }

    isValidMove(row, col, visited) {
        return this.board.isValidPosition(row, col) && !visited[row][col];
    }

    updateInfo(row, col) {
        document.getElementById('stepCount').textContent = this.stepCount;
        document.getElementById('backtrackCount').textContent = this.backtrackCount;
        document.getElementById('currentPos').textContent = `(${row}, ${col})`;
    }

    getSolution() {
        return this.solution;
    }
}

let stepCount = 0;
let backtrackCount = 0;
let isRunning = false;
let knightPosition = null; // Store current knight position
const ANIMATION_DELAY = 100; // Fixed delay of 100ms
const BOARD_SIZE = 8; // Fixed board size
const TIMEOUT_MS = 5000; // 5 seconds timeout

function findKnightTourSolution(startX, startY) {
    const board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(-1));
    const moves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    
    const startTime = Date.now();
    
    function isValid(x, y) {
        return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE && board[x][y] === -1;
    }
    
    function getValidMoves(x, y) {
        return moves
            .map(([dx, dy]) => [x + dx, y + dy])
            .filter(([nx, ny]) => isValid(nx, ny));
    }
    
    function countMoves(x, y) {
        return getValidMoves(x, y).length;
    }
    
    function solve(x, y, moveCount) {
        // Check timeout
        if (Date.now() - startTime > TIMEOUT_MS) {
            return false;
        }
        
        if (moveCount === BOARD_SIZE * BOARD_SIZE) return true;
        
        // Get all valid moves and sort by Warnsdorff's rule (fewest onward moves first)
        const validMoves = getValidMoves(x, y)
            .map(([nx, ny]) => ({ x: nx, y: ny, count: countMoves(nx, ny) }))
            .sort((a, b) => a.count - b.count);
        
        for (const { x: nx, y: ny } of validMoves) {
            board[nx][ny] = moveCount;
            if (solve(nx, ny, moveCount + 1)) return true;
            board[nx][ny] = -1;
        }
        
        return false;
    }
    
    // Start position
    board[startX][startY] = 0;
    const result = solve(startX, startY, 1);
    return result ? board : null;
}

async function animateSolution(solution, startX, startY) {
    const moves = [];
    
    // Convert board solution to sequence of moves
    for (let step = 0; step < BOARD_SIZE * BOARD_SIZE; step++) {
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (solution[i][j] === step) {
                    moves.push([i, j, step + 1]);
                    break;
                }
            }
        }
    }
    
    // Clear board but keep knight at starting position
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('visited', 'current', 'trying', 'backtrack');
    });
    
    // Animate each move
    for (let i = 0; i < moves.length; i++) {
        const [x, y, moveNumber] = moves[i];
        
        // Remove knight from previous position
        if (i > 0) {
            const [prevX, prevY] = moves[i - 1];
            const prevCell = document.querySelector(`[data-x="${prevX}"][data-y="${prevY}"]`);
            if (prevCell) {
                prevCell.classList.remove('knight');
            }
        }
        
        // Show current move
        const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (cell) {
            cell.classList.add('visited', 'knight');
            cell.textContent = moveNumber;
        }
        
        // Update info
        stepCount = i + 1;
        updateInfo(x, y);
        
        // Add delay
        await new Promise(resolve => setTimeout(resolve, ANIMATION_DELAY));
    }
    
    // Remove knight after animation completes but keep the solution
    setTimeout(() => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('knight');
        });
        knightPosition = null; // Reset knight position after tour
    }, 1000);
}

function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = i;
            cell.dataset.y = j;
            
            // Add click event listener to each cell - only place knight
            cell.addEventListener('click', () => {
                console.log(`Clicked on cell (${i}, ${j})`); // Debug log
                if (!isRunning) {
                    placeKnight(i, j);
                } else {
                    console.log('Algorithm is running, cannot place knight');
                }
            });
            
            board.appendChild(cell);
        }
    }
    console.log(`Board created with size ${BOARD_SIZE}x${BOARD_SIZE}`); // Debug log
}

function placeKnight(x, y) {
    // Remove knight from previous position
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('knight');
    });
    
    // Place knight at new position
    const targetCell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    if (targetCell) {
        targetCell.classList.add('knight');
        knightPosition = { x: parseInt(x), y: parseInt(y) }; // Ensure integers
        updateInfo(x, y);
        console.log(`Knight placed at (${x}, ${y})`);
    }
}

function resetBoard() {
    if (isRunning) {
        console.log('Cannot reset while algorithm is running');
        return;
    }
    
    // Clear all cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('visited', 'knight', 'current', 'trying', 'backtrack');
    });
    
    // Reset counters and knight position
    stepCount = 0;
    backtrackCount = 0;
    knightPosition = null;
    
    // Reset info display
    updateInfo(0, 0);
    document.getElementById('currentPos').textContent = 'Chưa đặt quân mã';
    
    console.log('Board reset');
}

function updateInfo(x, y) {
    const stepCountElement = document.getElementById('stepCount');
    const currentPosElement = document.getElementById('currentPos');
    
    if (stepCountElement) {
        stepCountElement.textContent = stepCount;
    }
    if (currentPosElement && knightPosition) {
        currentPosElement.textContent = `(${x}, ${y})`;
    }
}

async function startTourFromKnightPosition() {
    if (!knightPosition) {
        alert('Hãy đặt quân mã trên bàn cờ trước!');
        return;
    }
    
    const startX = knightPosition.x;
    const startY = knightPosition.y;
    console.log(`Starting tour from knight position (${startX}, ${startY})`); // Debug log
    
    if (isRunning) {
        console.log('Tour is already running, ignoring click');
        return;
    }
    
    isRunning = true;
    
    // Reset counters but keep knight position
    stepCount = 0;
    backtrackCount = 0;
    
    // Clear previous tour but keep knight
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('visited', 'current', 'trying', 'backtrack');
        // Keep knight class only on the starting position
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        if (x !== startX || y !== startY) {
            cell.classList.remove('knight');
        }
    });
    
    // Reset info
    updateInfo(startX, startY);
    
    // Show finding solution message
    const statusDiv = document.createElement('div');
    statusDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border: 2px solid #333;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        z-index: 1000;
        font-size: 18px;
        text-align: center;
    `;
    statusDiv.textContent = 'Đang tìm lời giải...';
    document.body.appendChild(statusDiv);
    
    // Find solution first (silently) with small delay to show status
    setTimeout(async () => {
        try {
            console.log('Finding solution...');
            const solution = findKnightTourSolution(startX, startY);
            
            // Remove status message
            if (document.body.contains(statusDiv)) {
                document.body.removeChild(statusDiv);
            }
            
            if (solution) {
                console.log('Solution found, starting animation');
                alert(`Tìm thấy lời giải! Bắt đầu minh họa...`);
                
                // Animate the solution
                await animateSolution(solution, startX, startY);
                alert('Hoàn thành minh họa lời giải!');
            } else {
                console.log('No solution found within timeout');
                alert('Không tìm thấy lời giải Knight\'s Tour từ vị trí này trong thời gian cho phép! Hãy thử vị trí khác.');
            }
        } catch (error) {
            console.error('Error during tour execution:', error);
            if (document.body.contains(statusDiv)) {
                document.body.removeChild(statusDiv);
            }
            alert('Có lỗi xảy ra trong quá trình thực hiện!');
        }
        
        isRunning = false;
        console.log('Tour completed, isRunning set to false');
    }, 50); // Shorter delay
}

// Initialize board when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing board');
    createBoard();
    
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startTourFromKnightPosition);
        console.log('Start button event listener added');
    }
    
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetBoard);
        console.log('Reset button event listener added');
    }
    
    // Set initial info
    document.getElementById('currentPos').textContent = 'Chưa đặt quân mã';
});
  