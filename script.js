/* 이 파일은 사이트를 움직이게 하는 부분입니다.
   내용을 바꾸실 때는 config.js 만 고치시면 됩니다. */

(function () {
  "use strict";

  var $  = function (sel, el) { return (el || document).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };

  /* ---------- 채널 아이콘 ---------- */
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    threads:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M16.2 11.4c-.3-3-2.1-4.2-4.3-4.2-2.6 0-4.4 1.9-4.4 4.9 0 3.2 1.9 5.1 4.6 5.1 2.4 0 4-1.3 4.4-3.1.4-1.9-.9-3-2.8-3-1.4 0-2.4.7-2.4 1.7 0 .8.6 1.3 1.4 1.3 1.2 0 1.9-1 1.9-2.6"/><path d="M12 3.5c-5 0-8.5 3.2-8.5 8.5S7 20.5 12 20.5s8.5-3.2 8.5-8.5"/></svg>',
    soomgo:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 10.5 12 3.8l8.5 6.7"/><path d="M5.6 12v7.2h12.8V12"/><path d="M9.8 19.2v-4.4h4.4v4.4"/></svg>',
    kmong:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 8.2 12 4l7.5 4.2v7.6L12 20l-7.5-4.2z"/><path d="M12 12l7.5-3.8M12 12v8M12 12 4.5 8.2"/></svg>'
  };

  var CHANNEL_META = [
    { key: "instagram", label: "인스타그램" },
    { key: "soomgo",    label: "숨고" },
    { key: "kmong",     label: "크몽" },
    { key: "threads",   label: "스레드" }
  ];

  var links = (SITE && SITE.links) || {};

  /* ---------- 1. 기본 문구 채우기 ---------- */
  $$("[data-brand]").forEach(function (el) { el.textContent = SITE.brandName; });
  document.title = SITE.brandName + " · 로고 · 명함 디자인";

  var titleEl = $("[data-hero-title]");
  if (titleEl) {
    titleEl.textContent = "";
    String(SITE.heroTitle).split("\n").forEach(function (line, i) {
      if (i) titleEl.appendChild(document.createElement("br"));
      titleEl.appendChild(document.createTextNode(line));
    });
  }
  $("[data-hero-text]").textContent  = SITE.heroText;
  $("[data-about-text]").textContent = SITE.aboutText;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- 2. 카카오톡 버튼 연결 ---------- */
  $$("[data-kakao-cta]").forEach(function (el) {
    if (links.kakao) {
      el.href = links.kakao;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
  });

  /* ---------- 3. 채널 버튼 ----------
     주소를 하나라도 넣으면 → 주소가 있는 버튼만 보입니다.
     아직 하나도 안 넣었으면 → 미리보기용으로 흐린 버튼이 보입니다. */
  var channelBox = $("#channels");
  var anyChannel = CHANNEL_META.some(function (ch) { return links[ch.key]; });

  CHANNEL_META.forEach(function (ch) {
    var url = links[ch.key];
    if (anyChannel && !url) return;

    var el = document.createElement(url ? "a" : "span");
    el.className = "channel" + (url ? "" : " is-placeholder");
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
    el.innerHTML = ICONS[ch.key];
    el.appendChild(document.createTextNode(ch.label));
    channelBox.appendChild(el);
  });

  if (!anyChannel) {
    var hint = document.createElement("p");
    hint.className = "channels-hint";
    hint.textContent = "config.js 파일에 주소를 넣으면 눌리는 버튼으로 바뀝니다.";
    channelBox.parentNode.appendChild(hint);
  }

  /* ---------- 4. 연락처 ---------- */
  var contactBox = $("#contact-list");
  var c = SITE.contact || {};
  function addContact(text, href) {
    var li = document.createElement("li");
    if (href) {
      var a = document.createElement("a");
      a.href = href;
      a.textContent = text;
      li.appendChild(a);
    } else {
      li.textContent = text;
    }
    contactBox.appendChild(li);
  }
  if (c.phone) addContact(c.phone, "tel:" + c.phone.replace(/[^0-9+]/g, ""));
  if (c.email) addContact(c.email, "mailto:" + c.email);
  if (c.hours) addContact(c.hours);

  /* ---------- 5. 가격 안내 ---------- */
  var svcBox = $("#services-list");
  (SITE.services || []).forEach(function (s) {
    var card = document.createElement("article");
    card.className = "svc";

    var h3 = document.createElement("h3");
    h3.textContent = s.title;

    var price = document.createElement("p");
    price.className = "price";
    price.textContent = s.price;

    var desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = s.desc;

    var ul = document.createElement("ul");
    (s.items || []).forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });

    card.append(h3, price, desc, ul);
    svcBox.appendChild(card);
  });

  /* ---------- 6. 작업 과정 ---------- */
  var procBox = $("#process-list");
  (SITE.process || []).forEach(function (p) {
    var li = document.createElement("li");
    var num = document.createElement("span");
    num.className = "num";
    num.textContent = p.step;
    var h3 = document.createElement("h3");
    h3.textContent = p.title;
    var desc = document.createElement("p");
    desc.textContent = p.desc;
    li.append(num, h3, desc);
    procBox.appendChild(li);
  });

  /* ---------- 7. 포트폴리오 ---------- */
  var gallery = $("#gallery");
  var emptyMsg = $("#galleryEmpty");
  var items = Array.isArray(PORTFOLIO) ? PORTFOLIO : [];
  var visible = items.slice();

  function render(filter) {
    visible = filter === "all" ? items.slice() : items.filter(function (it) { return it.category === filter; });
    gallery.textContent = "";

    visible.forEach(function (it, index) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "card-item";
      btn.setAttribute("aria-label", it.title + " 크게 보기");

      var thumb = document.createElement("div");
      thumb.className = "thumb";
      var img = document.createElement("img");
      img.src = it.image;
      img.alt = it.title;
      img.loading = "lazy";
      img.decoding = "async";
      thumb.appendChild(img);

      var meta = document.createElement("div");
      meta.className = "meta";
      var strong = document.createElement("strong");
      strong.textContent = it.title;
      var span = document.createElement("span");
      span.textContent = it.desc || "";
      meta.append(strong, span);

      btn.append(thumb, meta);
      btn.addEventListener("click", function () { openLightbox(index); });
      gallery.appendChild(btn);
    });

    emptyMsg.hidden = visible.length > 0;
  }

  $$(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      $$(".filter").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      render(btn.dataset.filter);
    });
  });

  render("all");

  /* 첫 화면 아래 흐르는 사진 띠 */
  var strip = $("[data-hero-strip]");
  items.slice(0, 8).forEach(function (it) {
    var img = document.createElement("img");
    img.src = it.image;
    img.alt = "";
    img.loading = "lazy";
    strip.appendChild(img);
  });

  /* ---------- 8. 사진 크게 보기 ---------- */
  var lb = $("#lightbox");
  var lbImage = $("#lbImage");
  var lbTitle = $("#lbTitle");
  var lbDesc = $("#lbDesc");
  var current = 0;
  var lastFocused = null;

  function show(i) {
    if (!visible.length) return;
    current = (i + visible.length) % visible.length;
    var it = visible[current];
    lbImage.src = it.image;
    lbImage.alt = it.title;
    lbTitle.textContent = it.title;
    lbDesc.textContent = it.desc || "";
  }

  function openLightbox(i) {
    lastFocused = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.classList.add("lb-open");
    document.body.style.overflow = "hidden";
    $(".lb-close", lb).focus();
  }

  function closeLightbox() {
    lb.hidden = true;
    document.body.classList.remove("lb-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  $(".lb-close").addEventListener("click", closeLightbox);
  $(".lb-prev").addEventListener("click", function () { show(current - 1); });
  $(".lb-next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });

  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
