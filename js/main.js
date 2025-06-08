document.addEventListener('DOMContentLoaded', () => {
    // Initialize the board
    const board = new Board();
    
    // Initialize the Knight's Tour algorithm
    const knightTour = new KnightTour(board);
    
    // Initialize the UI
    const ui = new UI(board, knightTour);
});
