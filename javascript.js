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

// --- KODE GABUNGAN: CAROUSEL INFINITE & POPUP ---

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".gallery-container");
  const scrollAmount = 300; // Jarak geser per klik

  // --- 1. SETUP INFINITE LOOP (DUPLIKASI GAMBAR) ---
  // Kita copy semua gambar asli dan tempelkan lagi di sebelahnya
  // Jadinya: [Gambar 1-8] + [Gambar 1-8]
  if (container) {
    container.innerHTML += container.innerHTML;
  }

  // --- 2. FUNGSI TOMBOL GESER (MODIFIED) ---
  // Kita pasang di window agar bisa dipanggil dari HTML onclick
  window.geserGallery = function (arah) {
    if (!container) return;

    if (arah === 1) {
      // --- TOMBOL KANAN ---
      // Cek dulu: Apakah sudah di ujung kanan (area hasil duplikat)?
      // Jika ya, teleportasi dulu ke area awal (tengah kiri) secara instan
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
      // Baru geser halus
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      // --- TOMBOL KIRI ---
      // Cek dulu: Apakah sudah mentok kiri (0)?
      // Jika ya, teleportasi dulu ke area duplikat (tengah kanan) secara instan
      if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth / 2;
      }
      // Baru geser halus
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  // --- 3. EVENT LISTENER SCROLL (PENJAGA LOOP) ---
  // Ini untuk menangani jika user scroll pakai jari/touchpad (bukan tombol)
  if (container) {
    container.addEventListener("scroll", function () {
      // Jika user scroll manual sampai ujung kanan
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0; // Banting ke awal (loop)
      }
      // Jika user scroll manual sampai mentok kiri
      // (Opsional: biasanya browser menahan scroll negatif, tapi ini jaga-jaga)
      if (container.scrollLeft === 0) {
        // Kita biarkan user merasa di awal, tapi kalau dia geser kiri lagi
        // Logic tombol di atas yang akan menangani
      }
    });
  }

  // --- 4. LOGIKA POP-UP GAMBAR (LIGHTBOX) ---
  const popup = document.getElementById("popup-gallery");
  const popupImg = document.getElementById("popup-img");

  // Karena gambar diduplikasi, kita harus ambil list gambar TERBARU
  const allImages = document.querySelectorAll(".gallery-container img");

  // Pasang fungsi klik ke SETIAP gambar (termasuk hasil duplikat)
  allImages.forEach(function (img) {
    img.addEventListener("click", function () {
      if (popup && popupImg) {
        popup.style.display = "flex";
        popupImg.src = this.src;
      }
    });
  });

  // Tombol Close
  const closeBtn = document.querySelector(".tombol-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      tutupPopup();
    });
  }
});

// Fungsi Tutup Popup
function tutupPopup() {
  const popup = document.getElementById("popup-gallery");
  if (popup) popup.style.display = "none";
}
