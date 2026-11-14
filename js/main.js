/* ============================================================
   FY 的个人网站 · 交互
   只做四件小事：导航状态 / 滚动淡入 / 关键词轮换 / 复制邮箱
   ============================================================ */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 滚动后给导航加一条细线 ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 2. 滚动淡入 ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (revealEls.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- 3. 首屏关键词轮换高亮 ---------- */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  if (chips.length) {
    chips[0].classList.add('on');
    if (!reduced) {
      var idx = 0;
      window.setInterval(function () {
        chips[idx].classList.remove('on');
        idx = (idx + 1) % chips.length;
        chips[idx].classList.add('on');
      }, 2200);
    }
  }

  /* ---------- 4. 点击复制邮箱 ---------- */
  var toastEl = document.querySelector('.toast');
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2200);
  }

  function legacyCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  var copyBtn = document.querySelector('[data-copy]');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-copy') || '';
      var done = function () { toast('邮箱已复制 ✓'); };
      var fail = function () { toast('复制失败了，请手动选中邮箱'); };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          legacyCopy(text) ? done() : fail();
        });
      } else {
        legacyCopy(text) ? done() : fail();
      }
    });
  }

  /* ---------- 页脚年份 ---------- */
  var yearEls = document.querySelectorAll('[data-year]');
  var year = String(new Date().getFullYear());
  Array.prototype.forEach.call(yearEls, function (el) { el.textContent = year; });
})();
