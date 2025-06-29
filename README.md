# CON MÃ ĐI TUẦN

Trực quan hướng giải bài toán **Knight's Tour** sử dụng thuật toán **Quay lui (Backtracking)**.

## Giới thiệu

**Con mã đi tuần** là một bài toán cổ điển trong cờ vua, yêu cầu quân mã đi qua **mọi ô trên bàn cờ đúng một lần duy nhất**. Repo này sẽ giải quyết bài toán này bằng **phương pháp quay lui**.

## Chức năng chính

- Người dùng chọn ô bắt đầu 
- Hiển thị từng bước di chuyển của quân mã  
- Áp dụng thuật toán quay lui để tìm lời giải  

## Cách sử dụng

1. Tải hoặc clone repo này về máy:
    ```bash
    git clone https://github.com/VietHoagf/Knight_Tour.git
    cd knights-tour
    start index.html
    ```
2. Mở file `index.html` bằng trình duyệt
3. Chọn ô bất kì để đặt con mã
4. Hoặc dùng link https://knight-tour-five.vercel.app/
## 📁 Cấu trúc dự án

<pre>
knights-tour/
│
├── index.html         # Giao diện chính của ứng dụng
├── style.css          # Giao diện và bố cục (responsive layout)
└── js/                # Thư mục chứa mã JavaScript
    ├── main.js        # Khởi tạo và load ứng dụng
    ├── board.js       # Tạo và quản lý bàn cờ
    ├── algorithm.js   # Cài đặt thuật toán backtracking
    └── ui.js          # Xử lý giao diện và sự kiện người dùng
</pre>

