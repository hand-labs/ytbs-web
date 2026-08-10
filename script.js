/* ==========================================================================
   YAYASAN TARUNA BENGAWAN SOLO (YTBS) - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Sticky Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggle.querySelector('i')) {
          mobileToggle.querySelector('i').className = 'fas fa-bars';
        }
      });
    });
  }

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // 4. Toast Notification System
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  window.showToast = function(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // 5. Copy Account Number Function
  window.copyAccount = function(accountNumber, bankName) {
    navigator.clipboard.writeText(accountNumber).then(() => {
      window.showToast(`Nomor rekening ${bankName} (${accountNumber}) berhasil disalin!`);
    }).catch(() => {
      // Fallback
      const input = document.createElement('input');
      input.value = accountNumber;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      window.showToast(`Nomor rekening ${bankName} (${accountNumber}) berhasil disalin!`);
    });
  };

  // 6. Business Unit Order Modal & WhatsApp Integration
  const orderModal = document.getElementById('orderModal');
  const modalClose = document.getElementById('modalClose');
  const orderForm = document.getElementById('orderForm');
  const selectedProductInput = document.getElementById('selectedProduct');

  window.openOrderModal = function(productName) {
    if (selectedProductInput) {
      selectedProductInput.value = productName;
    }
    if (orderModal) {
      orderModal.classList.add('active');
    }
  };

  if (modalClose && orderModal) {
    modalClose.addEventListener('click', () => {
      orderModal.classList.remove('active');
    });

    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) {
        orderModal.classList.remove('active');
      }
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const product = document.getElementById('selectedProduct').value;
      const name = document.getElementById('custName').value;
      const phone = document.getElementById('custPhone').value;
      const note = document.getElementById('custNote').value;

      const waNumber = '6281234567890'; // Yayasan admin WA
      const text = `Halo Admin Yayasan Taruna Bengawan Solo,%0A%0ASaya mau pesan/inquiry unit usaha berikut:%0A- *Produk/Layanan*: ${encodeURIComponent(product)}%0A- *Nama*: ${encodeURIComponent(name)}%0A- *No. WA*: ${encodeURIComponent(phone)}%0A- *Catatan/Jumlah*: ${encodeURIComponent(note || '-')}%0A%0AMohon info ketersediaan dan prosedur selanjutnya. Terima kasih!`;

      window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
      orderModal.classList.remove('active');
      orderForm.reset();
      window.showToast('Mengarahkan ke WhatsApp Admin YTBS...');
    });
  }

  // 7. Animated Counter for Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function runCounter() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerText = prefix + Math.ceil(count) + suffix;
          setTimeout(updateCount, 30);
        } else {
          stat.innerText = prefix + target + suffix;
        }
      };
      updateCount();
    });
  }

  // Scroll listener for stats counter
  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    window.addEventListener('scroll', () => {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight;
      if (sectionPos < screenPos && !animated) {
        animated = true;
        runCounter();
      }
    });
  }
});
