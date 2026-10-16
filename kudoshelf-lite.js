/* Kudoshelf Lite: embed a testimonial wall from a JSON file. Zero dependencies. MIT.
   Usage: <div data-kudoshelf-lite="testimonials.json" data-limit="6"></div>
          <script src="kudoshelf-lite.js"></script> */
(function () {
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  function card(t) {
    return '<figure style="margin:0;padding:16px;border:1px solid #e2e8f0;border-radius:10px;background:#fff">' +
      '<blockquote style="margin:0 0 10px;font-size:15px;line-height:1.5">\u201c' + esc(t.text) + '\u201d</blockquote>' +
      '<figcaption style="font-size:13px;color:#4a5568"><b>' + esc(t.name) + '</b>' + (t.role ? " \u00b7 " + esc(t.role) : "") + "</figcaption></figure>";
  }
  function mount(el) {
    var limit = parseInt(el.getAttribute("data-limit"), 10) || 6;
    fetch(el.getAttribute("data-kudoshelf-lite")).then(function (r) { return r.json(); }).then(function (list) {
      el.style.cssText += ";display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(240px,1fr))";
      el.innerHTML = (Array.isArray(list) ? list : []).slice(0, limit).map(card).join("") +
        '<p style="grid-column:1/-1;font-size:12px;color:#a0aec0">Powered by <a href="https://github.com/jhodges3401-code/kudoshelf-lite">Kudoshelf Lite</a></p>';
    }).catch(function () { el.textContent = "Testimonials unavailable."; });
  }
  if (typeof window !== "undefined") {
    var run = function () { [].forEach.call(document.querySelectorAll("[data-kudoshelf-lite]"), mount); };
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", run) : run();
  }
  if (typeof module !== "undefined") module.exports = { card: card, esc: esc };
})();
