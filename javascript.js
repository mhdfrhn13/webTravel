//menu
var tombolMenu = $(".tombol-menu");
var menu = $("nav .menu ul");

function klikMenu() {
  tombolMenu.click(function () {
    menu.toggle();
  });
  menu.click(function () {
    menu.toggle();
  });
}

$(document).ready(function () {
  var width = $(window).width();
  if (width < 990) {
    klikMenu();
  }
});

//check lebar
$(window).resize(function () {
  var width = $(window).width();
  if (width > 989) {
    menu.css("display", "block");
    //display:block
  } else {
    menu.css("display", "none");
  }
  klikMenu();
});

//efek scroll
$(document).ready(function () {
  var scroll_pos = 0;
  $(document).scroll(function () {
    scroll_pos = $(this).scrollTop();
    if (scroll_pos > 0) {
      $("nav").addClass("putih");
      $("nav img.hitam").show();
      $("nav img.putih").hide();
    } else {
      $("nav").removeClass("putih");
      $("nav img.hitam").hide();
      $("nav img.putih").show();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".gallery-container");
  const scrollAmount = 300; // Jarak geser tombol

  // 1. DUPLIKASI GAMBAR
  if (container) {
    container.innerHTML += container.innerHTML;
  }

  // --- LOGIKA "START DI TENGAH" ---
  // Fungsi untuk mengatur posisi awal agar tidak mentok kiri
  function initPosition() {
    if (container) {
      // Langsung pindah ke awal dari Set Kedua (Tengah)
      // Jadi di sebelah kiri ada 'ruang' (Set Pertama)
      container.scrollLeft = container.scrollWidth / 2;
    }
  }

  // Jalankan saat loading selesai
  // Kita beri jeda sedikit biar gambar loading sempurna dulu
  setTimeout(initPosition, 100);

  // 2. INFINITE LOOP MONITOR
  if (container) {
    container.addEventListener("scroll", function () {
      const oneSetWidth = container.scrollWidth / 2;

      // A. Jika user geser ke KIRI sampai mentok (Posisi 0)
      // Kita lempar balik ke TENGAH (Awal Set 2)
      if (container.scrollLeft <= 0) {
        container.style.scrollBehavior = "auto"; // Matikan animasi
        container.scrollLeft = oneSetWidth; // Teleport
        container.style.scrollBehavior = "smooth"; // Hidupkan lagi
      }

      // B. Jika user geser ke KANAN sampai habis (Akhir Set 2)
      // Kita lempar balik ke AKHIR Set 1 (Tengah)
      else if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth
      ) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = oneSetWidth - container.clientWidth;
        container.style.scrollBehavior = "smooth";
      }
    });
  }

  // 3. FUNGSI TOMBOL
  window.geserGallery = function (arah) {
    if (!container) return;

    // Pastikan scroll smooth aktif untuk tombol
    container.style.scrollBehavior = "smooth";

    if (arah === 1) {
      container.scrollLeft += scrollAmount;
    } else {
      container.scrollLeft -= scrollAmount;
    }
  };

  // --- LOGIKA POPUP (LIGHTBOX) ---
  const popup = document.getElementById("popup-gallery");
  const popupImg = document.getElementById("popup-img");
  // Ambil ulang gambar karena jumlahnya bertambah
  const allImages = document.querySelectorAll(".gallery-container img");

  allImages.forEach(function (img) {
    img.addEventListener("click", function () {
      if (popup && popupImg) {
        popup.style.display = "flex";
        popupImg.src = this.src;
      }
    });
  });

  const closeBtn = document.querySelector(".tombol-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      tutupPopup();
    });
  }
});

function tutupPopup() {
  const popup = document.getElementById("popup-gallery");
  if (popup) popup.style.display = "none";
}
