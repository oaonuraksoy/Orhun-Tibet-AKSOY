/**
 * ORHUN TİBET AKSOY — DİJİTAL MİRAS & ZAMAN ÇİZELGESİ
 * Dynamic Multi-Year Age Calculator, Scroll Reveal & Interactive Behaviors
 */

(function () {
  'use strict';

  // Doğum Tarihi: 21 Mayıs 2025
  const BIRTH_DATE = new Date(2025, 4, 21, 0, 0, 0); // 4 = Mayıs

  /**
   * Tam Dinamik Yaş ve Zaman Ticker Hesaplayıcısı (Yıllar geçse de otomatik güncellenir)
   */
  function updateAgeTicker() {
    const now = new Date();

    let years = now.getFullYear() - BIRTH_DATE.getFullYear();
    let months = now.getMonth() - BIRTH_DATE.getMonth();
    let days = now.getDate() - BIRTH_DATE.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalMonths = (years * 12) + months;

    // Saat, dakika, saniye
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Toplam geçen gün
    const diffTime = Math.abs(now - BIRTH_DATE);
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Elementleri güncelle
    const elYears = document.getElementById('ticker-years');
    const elMonths = document.getElementById('ticker-months');
    const elDays = document.getElementById('ticker-days');
    const elHours = document.getElementById('ticker-hours');
    const elSeconds = document.getElementById('ticker-seconds');
    const elTotalBadge = document.getElementById('ticker-total-days');
    const elNavBadge = document.getElementById('nav-age-badge');

    if (elYears) elYears.textContent = years;
    if (elMonths) elMonths.textContent = months;
    if (elDays) elDays.textContent = days;
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
    
    if (elTotalBadge) {
      elTotalBadge.textContent = `${totalDays}. Günlük Yolculuk (${totalMonths} Ay)`;
    }

    // Üst navigasyondaki yaş rozeti (tamamen dinamik)
    if (elNavBadge) {
      if (years === 0) {
        elNavBadge.textContent = `${totalMonths} Aylık`;
      } else if (years === 1) {
        elNavBadge.textContent = `1 Yaşında (${totalMonths} Aylık)`;
      } else {
        elNavBadge.textContent = `${years} Yaşında`;
      }
    }
  }

  /**
   * Scroll Reveal (IntersectionObserver)
   */
  function initScrollReveal() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      timelineItems.forEach(item => observer.observe(item));
    } else {
      timelineItems.forEach(item => item.classList.add('revealed'));
    }
  }

  /**
   * Header Scroll Efekti
   */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /**
   * Sayfa İçi Yumuşak Kaydırma (Anchor Links)
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Başlatma
  document.addEventListener('DOMContentLoaded', () => {
    updateAgeTicker();
    setInterval(updateAgeTicker, 1000);
    initScrollReveal();
    initHeaderScroll();
    initSmoothScroll();
  });
})();
