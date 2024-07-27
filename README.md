<div align='center'>
  <h1>Hướng Dẫn Testing Dự Án React</h1>
  <p>Hướng dẫn cài đặt, cấu hình, và thực hiện kiểm tra các thành phần React trong dự án.</p>
</div>


## Chạy Các Bài Kiểm Tra

Để chạy các bài kiểm tra, bạn có thể sử dụng các lệnh sau:

### Run Test

```bash
npm test
```

### Run Coverage Reporting

```bash
npm test -- --coverage
```
Tham khảo: https://create-react-app.dev/docs/running-tests/

# Rule:

- File Test: Đặt tên các file test theo định dạng *.test.tsx hoặc *.spec.tsx.
  Ví dụ: Button.test.tsx.
- Thư Mục Test: Đặt file test trong thư mục __tests__ hoặc cùng thư mục với file gốc.

# Mocks

- Thư mục: __mocks__
- Mục đích: Cung cấp các phiên bản mô phỏng (mock) của các module hoặc tệp tin trong quá trình thử nghiệm
- Tác dung:
  + Tạo Mô Phỏng Module
  + Cô Lập Môi Trường Kiểm Thử
  + Giảm Phụ Thuộc Vào Môi Trường Thực
  + Cung Cấp Dữ Liệu Kiểm Thử

