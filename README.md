# CON MÃ ĐI TUẦN

Một ứng dụng web mô phỏng bài toán **Knight's Tour** (Hành trình của quân mã) sử dụng thuật toán **Quay lui (Backtracking)**.

## Giới thiệu

**Con mã đi tuần** là một bài toán cổ điển trong cờ vua, yêu cầu quân mã đi qua **mọi ô trên bàn cờ đúng một lần duy nhất**. Repo này sẽ giải quyết bài toán này bằng **phương pháp quay lui**.

## Chức năng chính

- Người dùng chọn ô bắt đầu 
- Hiển thị từng bước di chuyển của quân mã  
- Áp dụng thuật toán quay lui để tìm lời giải  

## Cách sử dụng

1. Tải hoặc clone repo này về máy:
    ```bash
    git clone https://github.com/ten-cua-ban/knights-tour.git
    cd knights-tour
    start index.html
    ```
2. Mở file `index.html` bằng trình duyệt
3. Chọn ô bất kì để đặt con mã

## Cấu trúc dự án
knights-tour/
│
├── index.html # Giao diện 
├── style.css # Giao diện và bố cục 
└── js/
├── main.js 
├── board.js # Tạo bàn cờ 
├── algorithm.js # Thuật toán backtrack
└── ui.js # Xử lý giao diện
