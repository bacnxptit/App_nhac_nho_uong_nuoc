# Water Mate - Tài liệu mô tả chức năng

## Tổng quan
**Water Mate** là ứng dụng di động được xây dựng bằng React Native (Expo) giúp người dùng theo dõi và quản lý lượng nước uống hàng ngày. Ứng dụng cung cấp các công cụ thông minh để duy trì thói quen hydrat hóa lành mạnh.

---

## 1. Xác thực người dùng (Authentication)

### 1.1 Đăng ký tài khoản
- **Chức năng**: Tạo tài khoản mới bằng email và mật khẩu
- **Tính năng**:
  - Validation email và mật khẩu
  - Hiển thị/ẩn mật khẩu
  - Xử lý lỗi đăng ký (email đã tồn tại, mật khẩu yếu, v.v.)
  - Tự động chuyển đến màn hình nhập thông tin người dùng sau khi đăng ký thành công

### 1.2 Đăng nhập
- **Chức năng**: Đăng nhập vào tài khoản đã có
- **Tính năng**:
  - Đăng nhập bằng email và mật khẩu
  - Xử lý lỗi đăng nhập (sai thông tin, tài khoản không tồn tại)
  - Tự động đồng bộ dữ liệu từ cloud và local storage
  - Ghi nhớ trạng thái đăng nhập

### 1.3 Đăng xuất
- **Chức năng**: Đăng xuất khỏi tài khoản
- **Tính năng**:
  - Xác nhận trước khi đăng xuất
  - Xóa dữ liệu local (tùy chọn)
  - Chuyển về màn hình đăng nhập

### 1.4 Quản lý tài khoản
- **Xóa tài khoản**: Cho phép người dùng xóa vĩnh viễn tài khoản và dữ liệu
- **Đổi mật khẩu**: Cập nhật mật khẩu với xác thực lại

---

## 2. Onboarding (Giới thiệu ứng dụng)

### 2.1 Màn hình giới thiệu
- **Số bước**: 3 màn hình giới thiệu
- **Nội dung**:
  1. **Màn hình 1**: Giới thiệu về ứng dụng - "Người bạn đồng hành hydrat hóa tuyệt vời!"
  2. **Màn hình 2**: Tính năng theo dõi - "Theo dõi hydrat hóa & hình dung tiến trình"
  3. **Màn hình 3**: Thành tích và mục tiêu - "Đạt mục tiêu hydrat hóa ngay bây giờ"
- **Tính năng**:
  - Nút "Bỏ qua" để bỏ qua onboarding
  - Nút "Tiếp tục" để chuyển màn hình
  - Nút "Bắt đầu" ở màn hình cuối
  - Lưu trạng thái đã xem onboarding

---

## 3. Nhập thông tin người dùng (User Info)

### 3.1 Quy trình nhập thông tin (11 bước)
Ứng dụng hướng dẫn người dùng nhập thông tin qua timeline với 11 bước:

1. **Tên người dùng**
   - Nhập tên hiển thị
   - Validation tên không được để trống

2. **Tuổi**
   - Nhập tuổi (số nguyên)
   - Validation tuổi hợp lệ

3. **Giới tính**
   - Lựa chọn: Nam, Nữ, Khác, Không muốn nói
   - Ảnh hưởng đến tính toán mục tiêu nước

4. **Chiều cao**
   - Nhập chiều cao (cm)
   - Validation và gợi ý dựa trên giới tính

5. **Cân nặng**
   - Nhập cân nặng (kg)
   - Validation và gợi ý dựa trên giới tính

6. **Giờ thức dậy**
   - Chọn giờ thức dậy (HH:mm)
   - Sử dụng để tính toán lịch nhắc nhở thông minh

7. **Giờ đi ngủ**
   - Chọn giờ đi ngủ (HH:mm)
   - Sử dụng để tính toán lịch nhắc nhở thông minh

8. **Mức độ hoạt động**
   - Lựa chọn:
     - Ít vận động (Sedentary)
     - Hoạt động nhẹ (Light Activity)
     - Hoạt động vừa phải (Moderate Activity)
     - Rất năng động (Very Active)

9. **Khí hậu**
   - Lựa chọn: Nóng, Ôn hòa, Lạnh
   - Ảnh hưởng đến nhu cầu nước

10. **Tính toán mục tiêu cá nhân hóa**
    - Tự động tính toán mục tiêu nước hàng ngày dựa trên:
      - Cân nặng, chiều cao, tuổi, giới tính
      - Mức độ hoạt động
      - Khí hậu
      - Giờ thức dậy và đi ngủ
    - Hiển thị màn hình "Đang tạo kế hoạch cá nhân hóa"

11. **Xác nhận mục tiêu hàng ngày**
    - Hiển thị mục tiêu đã tính toán
    - Cho phép điều chỉnh thủ công (ml hoặc L)
    - Xác nhận và hoàn tất thiết lập

### 3.2 Tính năng đặc biệt
- **Timeline**: Hiển thị tiến trình qua các bước
- **Nút quay lại**: Quay lại bước trước
- **Lưu tạm thời**: Dữ liệu được lưu tạm trong quá trình nhập
- **Tự động tính toán**: Mục tiêu nước được tính tự động dựa trên thông tin sức khỏe

---

## 4. Trang chủ (Home)

### 4.1 Theo dõi lượng nước uống (Water Intake Tracker)
- **Hiển thị**:
  - Lượng nước đã uống hôm nay (ml)
  - Mục tiêu hàng ngày (ml)
  - Thanh tiến trình tròn (Circular Progress Bar)
  - Phần trăm hoàn thành

- **Tính năng**:
  - Thêm nước uống bằng cách chọn kích thước cốc
  - Các kích thước cốc mặc định: 100ml, 150ml, 200ml, 250ml, 300ml, 350ml, 400ml, 500ml, 750ml, 1000ml
  - Chọn loại đồ uống: Nước, Cà phê, Trà, Nước ép, Soda, v.v.
  - Cập nhật real-time lượng nước đã uống
  - Hiệu ứng animation khi thêm nước

### 4.2 Lịch sử uống nước hôm nay
- **Hiển thị**: Danh sách các lần uống nước trong ngày
- **Thông tin mỗi lần uống**:
  - Thời gian uống
  - Lượng nước (ml)
  - Loại đồ uống
  - Kích thước cốc
- **Tính năng**:
  - Sắp xếp theo thời gian (mới nhất trước)
  - Xóa lịch sử (swipe hoặc menu)
  - Hiển thị tổng lượng nước trong ngày

### 4.3 Thông báo thông minh
- **Thông báo buổi sáng**: Nhắc nhở mục tiêu nước khi thức dậy
- **Thông báo buổi tối**: Nhắc nhở uống nước trước khi đi ngủ
- **Thông báo thông minh**: 
  - Tự động phát hiện khi người dùng chưa uống nước trong 3+ giờ
  - Chỉ gửi khi lượng nước chưa đạt 50% mục tiêu
- **Thông báo đạt mục tiêu**: Chúc mừng khi đạt 95% mục tiêu

---

## 5. Lịch sử (History)

### 5.1 Lịch (Calendar)
- **Hiển thị**: Lịch tháng với đánh dấu các ngày có uống nước
- **Tính năng**:
  - Chọn ngày để xem lịch sử
  - Màu sắc khác nhau cho các ngày:
    - Ngày đạt mục tiêu (100%+)
    - Ngày chưa đạt mục tiêu
    - Ngày hôm nay
  - Hiển thị phần trăm hoàn thành trên mỗi ngày

### 5.2 Danh sách lịch sử theo ngày
- **Hiển thị**: Chi tiết các lần uống nước trong ngày được chọn
- **Thông tin**:
  - Nhãn ngày: "Hôm nay" hoặc "dd/MM/yyyy"
  - Danh sách các lần uống với:
    - Thời gian
    - Lượng nước
    - Loại đồ uống
    - Kích thước cốc
- **Tính năng**:
  - Sắp xếp theo thời gian (mới nhất trước)
  - Xóa từng lần uống
  - Nút "Hôm nay" để quay về ngày hiện tại
  - Empty state khi không có dữ liệu

---

## 6. Báo cáo (Report)

### 6.1 Bộ lọc thời gian
- **Các tùy chọn**:
  - **Hàng ngày**: Xem dữ liệu theo ngày
  - **Hàng tuần**: Xem dữ liệu theo tuần
  - **Hàng tháng**: Xem dữ liệu theo tháng
  - **Hàng năm**: Xem dữ liệu theo năm

### 6.2 Biểu đồ hoàn thành uống nước
- **Loại biểu đồ**: Bar Chart (Cột)
- **Hiển thị**: Phần trăm hoàn thành mục tiêu theo từng khoảng thời gian
- **Trục Y**: 0% - 100%
- **Tính năng**: 
  - Màu sắc khác nhau cho các mức hoàn thành
  - Tooltip hiển thị giá trị chính xác

### 6.3 Biểu đồ Hydrat hóa
- **Loại biểu đồ**: Bar Chart (Cột)
- **Hiển thị**: Lượng nước thực tế (L) theo từng khoảng thời gian
- **Trục Y**: Tự động điều chỉnh theo mục tiêu và dữ liệu
- **Tính năng**: 
  - Chuyển đổi từ ml sang L
  - So sánh với mục tiêu lý thuyết

### 6.4 Biểu đồ loại đồ uống
- **Loại biểu đồ**: Donut Chart (Tròn)
- **Hiển thị**: Phân bổ các loại đồ uống đã uống
- **Thông tin**:
  - Tỷ lệ phần trăm mỗi loại
  - Màu sắc phân biệt
  - Legend hiển thị tên và giá trị

---

## 7. Nhắc nhở uống nước (Drink Reminder)

### 7.1 Bật/Tắt nhắc nhở
- **Chức năng**: Bật hoặc tắt hệ thống nhắc nhở
- **Tính năng**:
  - Switch toggle để bật/tắt
  - Tự động hủy tất cả thông báo khi tắt
  - Yêu cầu quyền thông báo khi bật

### 7.2 Tần suất nhắc nhở
- **Các tùy chọn có sẵn**:
  - 30 phút
  - 1 giờ
  - 2 giờ
  - 3 giờ
  - Tùy chỉnh (Custom)

### 7.3 Nhắc nhở tùy chỉnh
- **Chức năng**: Đặt thời gian nhắc nhở tùy chỉnh
- **Tính năng**:
  - Nhập giờ và phút (HH:mm)
  - Preview thời gian đã chọn
  - Validation: Tối thiểu 1 phút
  - Tự động cập nhật reminder khi thay đổi thời gian (nếu đang active)
  - Nút "Đặt thời gian" để kích hoạt

### 7.4 Lịch nhắc nhở thông minh
- **Tính năng**:
  - Tự động tính toán lịch nhắc nhở dựa trên:
    - Giờ thức dậy (wakeUpTime)
    - Giờ đi ngủ (bedTime)
    - Khoảng thời gian nhắc nhở
  - Chỉ nhắc nhở trong khoảng thời gian thức
  - Lên lịch cho 3 ngày tới (tối đa 100 thông báo)
  - Thông báo không lặp lại (one-time notifications)

### 7.5 Thông báo nhắc nhở
- **Nội dung**: 
  - 6 loại thông báo khác nhau tùy theo giờ trong ngày
  - Tiêu đề và nội dung động
  - Icon và màu sắc phù hợp
- **Tính năng**:
  - Âm thanh và rung
  - Hoạt động ngay cả khi app đóng
  - Tự động hủy khi đạt mục tiêu

---

## 8. Hồ sơ (Profile)

### 8.1 Thông tin người dùng
- **Hiển thị**:
  - Tên người dùng
  - Email
  - Avatar (nếu có)

### 8.2 Thống kê tổng quan
Hiển thị 4 thẻ thống kê:

1. **Mục tiêu**
   - Mục tiêu nước hàng ngày (ml hoặc L)
   - Tự động chuyển đổi đơn vị

2. **Hôm nay**
   - Lượng nước đã uống hôm nay
   - Phần trăm hoàn thành
   - Thanh tiến trình

3. **Chuỗi ngày (Streak)**
   - Số ngày liên tiếp đạt mục tiêu
   - Tính từ ngày gần nhất đạt mục tiêu ngược lại
   - Reset khi có ngày không đạt mục tiêu

4. **Tổng quan**
   - Tổng số ngày đã đạt mục tiêu
   - Tính từ tất cả lịch sử

### 8.3 Menu tùy chọn
- **Danh sách tùy chọn**:
  - Thông tin tài khoản
  - Thông tin sức khỏe
  - Nhắc nhở uống nước
  - Cài đặt (nếu có)

### 8.4 Đăng xuất
- Nút đăng xuất với icon
- Xác nhận trước khi đăng xuất

---

## 9. Chỉnh sửa thông tin sức khỏe (Edit Health Info)

### 9.1 Các trường có thể chỉnh sửa
1. **Chiều cao** (cm)
   - Input số
   - Validation

2. **Cân nặng** (kg)
   - Input số
   - Validation

3. **Giờ thức dậy** (HH:mm)
   - Input với tự động format
   - Validation định dạng

4. **Giờ đi ngủ** (HH:mm)
   - Input với tự động format
   - Validation định dạng

5. **Mức độ hoạt động**
   - Lựa chọn: Ít vận động, Hoạt động nhẹ, Hoạt động vừa phải, Rất năng động

6. **Khí hậu**
   - Lựa chọn: Nóng, Ôn hòa, Lạnh

### 9.2 Tính toán mục tiêu tự động
- **Tính năng**:
  - Tự động tính toán lại mục tiêu khi thay đổi thông tin
  - Hiển thị badge "Tự động" bên cạnh mục tiêu
  - Công thức tính dựa trên:
    - Cân nặng, chiều cao, tuổi, giới tính
    - Mức độ hoạt động
    - Khí hậu
    - Giờ thức dậy và đi ngủ
  - Hiển thị mục tiêu được tính toán với format đẹp

### 9.3 Lưu thông tin
- Nút "Lưu thông tin"
- Validation tất cả trường
- Hiển thị loading khi đang lưu
- Thông báo thành công/lỗi
- Tự động cập nhật reminder nếu thay đổi giờ thức dậy/đi ngủ

---

## 10. Đồng bộ dữ liệu

### 10.1 Đồng bộ với Firebase Firestore
- **Dữ liệu được đồng bộ**:
  - Thông tin người dùng
  - Lịch sử uống nước
  - Mục tiêu và cài đặt

### 10.2 Lưu trữ local (AsyncStorage)
- **Dữ liệu được lưu local**:
  - Thông tin người dùng
  - Lịch sử uống nước
  - Cài đặt reminder
  - Trạng thái onboarding

### 10.3 Merge dữ liệu
- **Khi đăng nhập**:
  - Merge dữ liệu từ cloud và local
  - Ưu tiên dữ liệu local cho ngày hôm nay
  - Đồng bộ lịch sử từ cả hai nguồn

### 10.4 Reset hàng ngày
- Tự động reset `dailyIntake` về 0 vào đầu ngày mới
- Lưu `lastResetDate` để theo dõi

---

## 11. Thông báo (Notifications)

### 11.1 Quyền thông báo
- Yêu cầu quyền khi mở app lần đầu
- Hướng dẫn cấp quyền nếu bị từ chối

### 11.2 Các loại thông báo

1. **Nhắc nhở uống nước định kỳ**
   - Theo tần suất đã đặt
   - Hoạt động trong giờ thức

2. **Thông báo buổi sáng**
   - Gửi vào giờ thức dậy
   - Nhắc nhở mục tiêu nước hôm nay

3. **Thông báo buổi tối**
   - Gửi vào giờ đi ngủ
   - Nhắc nhở uống nước trước khi ngủ

4. **Thông báo thông minh**
   - Khi chưa uống nước 3+ giờ
   - Chỉ khi chưa đạt 50% mục tiêu

5. **Thông báo đạt mục tiêu**
   - Khi đạt 95% mục tiêu
   - Chỉ gửi 1 lần mỗi ngày
   - Tự động hủy các reminder khác

### 11.3 Quản lý thông báo
- Hủy tất cả thông báo khi đạt mục tiêu
- Tự động hủy khi tắt reminder
- Lên lịch lại khi thay đổi cài đặt

---

## 12. Tính năng bổ sung

### 12.1 Chọn kích thước cốc
- Modal chọn kích thước cốc
- Lưu kích thước cốc mặc định
- Các tùy chọn: 100ml - 1000ml

### 12.2 Chọn loại đồ uống
- Nước
- Cà phê
- Trà
- Nước ép
- Soda
- Và các loại khác

### 12.3 Xóa lịch sử
- Xóa từng lần uống
- Xác nhận trước khi xóa
- Cập nhật lại tổng lượng nước

### 12.4 Responsive Design
- Hỗ trợ nhiều kích thước màn hình
- Tự động scale font và component
- Safe area cho các thiết bị có notch

### 12.5 Dark Mode (nếu có)
- Tự động theo hệ thống
- Chuyển đổi theme

---

## 13. Công nghệ sử dụng

### 13.1 Framework & Libraries
- **React Native** với **Expo**
- **Expo Router** cho navigation
- **Firebase Authentication** cho xác thực
- **Firebase Firestore** cho database
- **Expo Notifications** cho thông báo
- **AsyncStorage** cho local storage
- **date-fns** cho xử lý ngày tháng

### 13.2 State Management
- **React Context API** cho global state
- **useState** và **useEffect** cho local state

### 13.3 UI Components
- Custom components với TypeScript
- Responsive design với ScreenDimension
- Theme system (ColorTheme, TextTheme, ButtonTheme)

---

## 14. Luồng hoạt động chính

### 14.1 Lần đầu sử dụng
1. Màn hình Onboarding (3 bước)
2. Nhập thông tin người dùng (11 bước)
3. Tính toán mục tiêu tự động
4. Vào màn hình chính

### 14.2 Sử dụng hàng ngày
1. Mở app → Trang chủ
2. Xem tiến trình hôm nay
3. Thêm nước uống
4. Xem lịch sử
5. Kiểm tra thống kê
6. Nhận thông báo nhắc nhở

### 14.3 Quản lý
1. Xem/chỉnh sửa thông tin sức khỏe
2. Đặt nhắc nhở
3. Xem báo cáo
4. Quản lý tài khoản

---

## 15. Tính năng nổi bật

1. **Tính toán mục tiêu thông minh**: Dựa trên nhiều yếu tố sức khỏe
2. **Lịch nhắc nhở thông minh**: Chỉ nhắc trong giờ thức
3. **Thông báo thông minh**: Phát hiện khi quên uống nước
4. **Đồng bộ đa nền tảng**: Cloud và local storage
5. **Thống kê chi tiết**: Nhiều biểu đồ và báo cáo
6. **Giao diện đẹp**: UI/UX hiện đại, dễ sử dụng
7. **Hoạt động offline**: Lưu trữ local, đồng bộ khi online

---

## 16. Bảo mật & Quyền riêng tư

- Xác thực bằng Firebase Authentication
- Dữ liệu được mã hóa trong Firestore
- Quyền truy cập dữ liệu chỉ cho chủ sở hữu tài khoản
- Local storage được bảo vệ
- Không chia sẻ dữ liệu với bên thứ ba

---

## 17. Hỗ trợ nền tảng

- **iOS**: Hỗ trợ đầy đủ
- **Android**: Hỗ trợ đầy đủ
- **Web**: Hỗ trợ cơ bản (một số tính năng bị giới hạn như notifications)

---

## 18. Phiên bản

- **Version**: 1.0.0
- **Package Name**: com.gtx.watermate
- **App Name**: Water Mate

---
