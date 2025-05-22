$(function () {
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  $('#register-form').on('submit', function (e) {
    e.preventDefault();

    // Xóa lỗi cũ
    $('.error').text('');

    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();

    let isValid = true;

    if (!name) {
      $('#error-name').text('Họ tên không được để trống');
      isValid = false;
    }
    if (!validateEmail(email)) {
      $('#error-email').text('Email không hợp lệ');
      isValid = false;
    }
    if (password.length < 6) {
      $('#error-password').text('Mật khẩu phải >= 6 ký tự');
      isValid = false;
    }

    if (!isValid) return;

    // Gửi AJAX
    $.post('https://jsonplaceholder.typicode.com/posts', {
      name: name,
      email: email,
      password: password,
    })
      .done(function (data) {
        $('#register-form').slideUp();
        $('#success-message').slideDown();
      })
      .fail(function () {
        alert('Lỗi server, vui lòng thử lại sau!');
      });
  });

  $('#toggle-detail').on('click', function () {
    $('#details').slideToggle();
  });
});
