/* 主题切换：默认浅色，点击切换并在 localStorage 持久化 */
(function () {
  var STORAGE_KEY = 'site-theme';

  function current() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var next = theme === 'light' ? 'dark' : 'light';
    var label = theme === 'light' ? '深色模式' : '浅色模式';
    var icon = theme === 'light' ? '🌙' : '☀️';
    var btns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      // 内嵌在导航里的按钮显示文字，悬浮圆按钮只显示图标
      if (b.getAttribute('data-theme-toggle') === 'icon') {
        b.innerHTML = icon;
      } else {
        b.innerHTML = icon + '<span class="tl-text">' + label + '</span>';
      }
      b.title = '切换到' + label;
      b.setAttribute('aria-label', '切换到' + label);
    }
    // 同步其它实例（避免同一页多按钮不同步）
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    window.__siteTheme = theme;
  }

  function toggle() {
    apply(current() === 'light' ? 'dark' : 'light');
  }

  window.toggleTheme = toggle;
  window.applyTheme = apply;

  function bind() {
    var btns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < btns.length; i++) {
      (function (b) {
        if (b.__themeBound) return;
        b.__themeBound = true;
        b.addEventListener('click', function (e) { e.preventDefault(); toggle(); });
      })(btns[i]);
    }
  }

  // 初始化：优先用已保存的主题，否则默认浅色（尽早应用，避免闪白）
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  apply(saved === 'dark' ? 'dark' : 'light');

  // 绑定切换按钮：脚本可能在 <head> 执行（此时 body 未解析完），
  // 因此等 DOM 就绪后再绑定，且做幂等保护。
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
