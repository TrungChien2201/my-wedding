// Hiệu ứng khi click mở thiệp + pháo hoa + particles
const startbtn = document.getElementById("startbtn");
const content = document.getElementById("page");
const music = document.getElementById("music");
const bg = document.getElementsByClassName("my-bg")[0];
music.volume = 0.3;

startbtn.addEventListener("click", () => {
  bg.style.display = "none";
  music.play().then(() => {
    content.style.display = "block";

    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
    });

    particlesJS("particles-js", {
      particles: {
        number: { value: 10, density: { enable: true, value_area: 800 } },
        shape: {
          type: "image",
          image: {
            src: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
            width: 32,
            height: 32,
          },
        },
        opacity: { value: 0.8 },
        size: { value: 20, random: true },
        move: {
          direction: "bottom",
          out_mode: "out",
          speed: 1.5,
        },
      },
      interactivity: {
        events: {
          onhover: { enable: false },
          onclick: { enable: false },
        },
      },
      retina_detect: true,
    });
  });
});

// Đếm ngược
var d = new Date(new Date("2025-07-02 10:30:00"));
gallery = [];
for (let n = 1; n <= 9; n++) {
  gallery.push(`images/gallery-${n}.jpg`);
}
$("#num-of-photos").html(gallery.length + " Photos");

simplyCountdown(".simply-countdown-one", {
  year: d.getFullYear(),
  month: d.getMonth() + 1,
  day: d.getDate(),
  hours: d.getHours(),
  minutes: d.getMinutes(),
  seconds: d.getSeconds(),
});

// Xử lý xác nhận tham dự
document.getElementById("yes-btn").addEventListener("click", async (event) => {
  const guest_name = $("#name").val();
  const guest_type = $("#guest-types").val();

  if (!guest_name) {
    showAlertPopup();
    return;
  }

  fetch(
    "https://script.google.com/macros/s/AKfycbxUJBxDmKevkfg7kCm8eevUYhdC5J0gTVwZ6L5kgMi_j7mkMI1h3Jtw87HWGSg29a59wg/exec",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name: guest_name,
        type: guest_type,
        attend: "1",
      }),
    }
  );

  $("#name").val("");
  document.getElementById("myModalYes").style.display = "flex";
});

document.getElementById("no-btn").addEventListener("click", async (event) => {
  const guest_name = $("#name").val();
  const guest_type = $("#guest-types").val();
  if (!guest_name) {
    showAlertPopup();
    return;
  }

  fetch(
    "https://script.google.com/macros/s/AKfycbxUJBxDmKevkfg7kCm8eevUYhdC5J0gTVwZ6L5kgMi_j7mkMI1h3Jtw87HWGSg29a59wg/exec",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name: guest_name,
        type: guest_type,
        attend: "0",
      }),
    }
  );

  $("#name").val("");
  document.getElementById("myModal").style.display = "flex";
});

// Mở lightbox gallery
function showLightBox() {
  var lightbox = new FsLightbox();
  lightbox.props.sources = gallery;
  lightbox.open();
}

// Đổi hình nền nếu trên mobile
document.addEventListener("DOMContentLoaded", (event) => {
  var w = window.innerWidth;
  if (innerWidth < 512)
    document.getElementById("fh5co-header").style.backgroundImage =
      'url("images/img_bg_1.jpg")';
});

// Mừng cưới QR code
function showDialogDonate() {
  document.querySelector(`#popupQR`).style.display = "flex";
  disableScroll();
}
function hideDialogDonate() {
  document.querySelector(`#popupQR`).style.display = "none";
  enableScroll();
  document.body.style.pointerEvents = "auto";
}
function disableScroll() {
  document.body.style.overflowY = "hidden";
  document.querySelector("html").style.overflowY = "hidden";
  document.body.addEventListener("touchmove", preventDefault, {
    passive: false,
  });
}
function enableScroll() {
  document.body.style.overflowY = "auto";
  document.querySelector("html").style.overflowY = "auto";
  document.body.removeEventListener("touchmove", preventDefault);
}
function preventDefault(e) {
  e.preventDefault();
}

// Ripple Button Effect
document.querySelectorAll(".ripple-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    circle.classList.add("ripple");
    this.appendChild(circle);

    const d = Math.max(this.clientWidth, this.clientHeight);
    circle.style.width = circle.style.height = d + "px";

    const rect = this.getBoundingClientRect();
    circle.style.left = e.clientX - rect.left - d / 2 + "px";
    circle.style.top = e.clientY - rect.top - d / 2 + "px";

    setTimeout(() => circle.remove(), 600);
  });
});

// Cấm chuột phải & phím tắt devtools
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey && (e.key === "u" || e.key === "U")) ||
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J"))
  ) {
    e.preventDefault();
    alert("Tính năng bị tắt để bảo vệ nội dung. 😊");
  }
});

// Validate popup
function showAlertPopup() {
  document.getElementById("alert-popup").style.display = "flex";
}
function hideAlertPopup() {
  document.getElementById("alert-popup").style.display = "none";
}

// Animate on scroll
document.addEventListener("DOMContentLoaded", function () {
  const fadeEls = document.querySelectorAll(
    ".fade-in-up, .fade-in-left, .fade-in-right"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeEls.forEach((el) => observer.observe(el));
});

// Lưu vào lịch iOS và Android
function isiOS() {
  return /iPhone|iPad|Macintosh/i.test(navigator.userAgent);
}
function handleCalendarClick() {
  if (isiOS()) {
    window.location.href = "wedding.ics";
  } else {
    window.open(
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Đám%20Cưới%20Chiến%20%26%20Liễu&dates=20250702T103000/20250702T123000&details=Chiến%20%26%20Liễu%20hân%20hoan%20kính%20mời%20bạn%20đến%20chung%20vui%20cùng%20gia%20đình%20trong%20ngày%20trọng%20đại%20của%20chúng%20mình.&location=Trung%20Tâm%20Tiệc%20Cưới%20A.Dõng%20Palace%2C%2064%20Trần%20Phú%2C%20Hà%20Lam%2C%20Thăng%20Bình&ctz=Asia/Ho_Chi_Minh",
      "_blank"
    );
  }
}
