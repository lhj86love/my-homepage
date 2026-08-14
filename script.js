/* 이 파일은 사이트를 움직이게 하는 부분입니다.
   내용을 바꾸실 때는 config.js 만 고치시면 됩니다. */

(function () {
  "use strict";

  var $  = function (sel, el) { return (el || document).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };

  /* ---------- 채널 아이콘 ---------- */
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    threads:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M16.2 11.4c-.3-3-2.1-4.2-4.3-4.2-2.6 0-4.4 1.9-4.4 4.9 0 3.2 1.9 5.1 4.6 5.1 2.4 0 4-1.3 4.4-3.1.4-1.9-.9-3-2.8-3-1.4 0-2.4.7-2.4 1.7 0 .8.6 1.3 1.4 1.3 1.2 0 1.9-1 1.9-2.6"/><path d="M12 3.5c-5 0-8.5 3.2-8.5 8.5S7 20.5 12 20.5s8.5-3.2 8.5-8.5"/></svg>'
  };

  var CHANNEL_META = [
    { key: "instagram", label: "인스타그램" },
    { key: "threads",   label: "스레드" }
  ];

  var links = (SITE && SITE.links) || {};

  /* ---------- 1. 기본 문구 채우기 ---------- */
  $$("[data-brand]").forEach(function (el) { el.textContent = SITE.brandName; });
  $$("[data-brand-en]").forEach(function (el) { el.textContent = SITE.brandNameEn || ""; });
  document.title = SITE.brandName + " | 로고 · 명함 디자인";

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

  /* ---------- 2. 폰에서 쓰는 상단 메뉴 ---------- */
  var navToggle = $("#navToggle");
  var siteNav = $("#siteNav");

  function setNav(open) {
    siteNav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  }

  navToggle.addEventListener("click", function () {
    setNav(navToggle.getAttribute("aria-expanded") !== "true");
  });

  /* 메뉴에서 항목을 고르면 저절로 닫힙니다 */
  $$("a", siteNav).forEach(function (a) {
    a.addEventListener("click", function () { setNav(false); });
  });

  /* 바깥을 누르거나 ESC 를 누르면 닫힙니다 */
  document.addEventListener("click", function (e) {
    if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) setNav(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && siteNav.classList.contains("is-open")) {
      setNav(false);
      navToggle.focus();
    }
  });

  /* 화면이 넓어지면 열려 있던 메뉴를 정리합니다 */
  window.addEventListener("resize", function () {
    if (window.innerWidth > 720) setNav(false);
  });

  /* ---------- 3. 카카오톡 버튼 연결 ---------- */
  $$("[data-kakao-cta]").forEach(function (el) {
    if (links.kakao) {
      el.href = links.kakao;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
  });

  /* ---------- 4. 인스타 · 숨고 · 크몽 · 스레드 버튼 ----------
     주소를 하나라도 넣으면 → 주소가 있는 버튼만 보입니다.
     아직 하나도 안 넣었으면 → 미리보기용으로 흐린 버튼이 보입니다. */
  var anyChannel = CHANNEL_META.some(function (ch) { return links[ch.key]; });

  function buildChannels(box) {
    if (!box) return;
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
      box.appendChild(el);
    });
  }

  buildChannels($("#heroChannels"));   // 첫 화면, 카카오톡 버튼 옆
  buildChannels($("#channels"));       // 맨 아래 문의 섹션

  if (!anyChannel) {
    var hint = document.createElement("p");
    hint.className = "channels-hint";
    hint.textContent = "config.js 파일에 주소를 넣으면 눌리는 버튼으로 바뀝니다.";
    $("#channels").parentNode.appendChild(hint);
  }

  /* ---------- 5. 연락처 ---------- */
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

  /* ---------- 6. 포트폴리오 ----------
     config.js 의 PORTFOLIO 에 적은 순서 그대로, 전부 화면에 나옵니다.
     아래로 계속 추가하면 화면에서도 아래로 계속 이어집니다. */
  var gallery = $("#gallery");
  var emptyMsg = $("#galleryEmpty");
  var items = Array.isArray(PORTFOLIO) ? PORTFOLIO : [];

  items.forEach(function (it, index) {
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

  emptyMsg.hidden = items.length > 0;

  /* ---------- 7. 사진 크게 보기 ---------- */
  var lb = $("#lightbox");
  var lbImage = $("#lbImage");
  var lbTitle = $("#lbTitle");
  var lbDesc = $("#lbDesc");
  var current = 0;
  var lastFocused = null;

  function show(i) {
    if (!items.length) return;
    current = (i + items.length) % items.length;
    var it = items[current];
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

  /* ---------- 8. 의뢰 요청서 ----------
     config.js 의 formEndpoint 로 내용을 보냅니다.
     주소가 비어 있으면 "준비 중" 안내를 보여주고 전송 버튼을 잠급니다. */
  var form = $("#requestForm");
  var statusBox = $("#formStatus");
  var noteBox = $("#formNote");
  var submitBtn = $("#submitBtn");
  var endpoint = (SITE.formEndpoint || "").trim();
  var openedAt = Date.now();   /* 스팸 판별용 — 사람은 폼을 3초 안에 못 채웁니다 */

  function setStatus(kind, html) {
    statusBox.className = "form-status" + (kind ? " is-" + kind : "");
    statusBox.innerHTML = html;
    statusBox.hidden = false;
  }

  function kakaoFallback() {
    return links.kakao
      ? ' 번거로우시겠지만 <a href="' + links.kakao + '" target="_blank" rel="noopener noreferrer">카카오톡 채널</a>로 남겨주시면 바로 확인하겠습니다.'
      : "";
  }

  /* 아직 주소를 안 넣었을 때 */
  if (!endpoint) {
    submitBtn.disabled = true;
    noteBox.textContent = "요청서 접수 준비 중입니다.";
    setStatus("", "아직 요청서를 받을 주소가 연결되지 않았습니다. " +
      "config.js 의 formEndpoint 에 주소를 넣으면 바로 작동합니다." + kakaoFallback());
  } else {
    noteBox.textContent = "보통 하루 안에 답변드립니다.";
  }

  /* 빈칸 확인 — 브라우저 기본 경고 대신 한국어 안내를 직접 보여줍니다 */
  function clearErrors() {
    $$(".field.has-error", form).forEach(function (f) { f.classList.remove("has-error"); });
    $$(".field-error", form).forEach(function (el) { el.remove(); });
  }

  /* focusEl = 커서를 옮길 칸, box = 빨간 안내문을 붙일 자리 */
  function showError(focusEl, box, message) {
    if (box.classList.contains("field")) box.classList.add("has-error");
    var msg = document.createElement("p");
    msg.className = "field-error";
    msg.textContent = message;
    box.appendChild(msg);
    return focusEl;
  }

  function validate() {
    clearErrors();
    var problems = [];

    function check(condition, focusEl, box, message) {
      if (condition) problems.push(showError(focusEl, box, message));
    }

    var name = $("#f-name");
    check(!name.value.trim(), name, name.closest(".field"),
      "성함 또는 업체명을 적어주세요.");

    var email = $("#f-email");
    var mail = email.value.trim();
    check(!mail, email, email.closest(".field"),
      "답변을 받으실 이메일을 적어주세요.");
    check(!!mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail), email, email.closest(".field"),
      "이메일 주소를 다시 확인해 주세요.");

    var kinds = $$('input[name="의뢰종류"]', form);
    check(!$('input[name="의뢰종류"]:checked', form), kinds[0], $(".choices", form).closest(".field"),
      "무엇을 의뢰하실지 골라주세요.");

    var agree = $("#f-agree");
    check(!agree.checked, agree, agree.closest(".field"),
      "연락처 사용에 동의해 주세요.");

    return problems[0] || null;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!endpoint) return;

    /* 스팸 거르기 —
       (1) 사람 눈에 안 보이는 함정 칸이 채워졌거나
       (2) 페이지를 연 지 3초도 안 돼서 제출됐으면 자동 프로그램으로 봅니다.
       보낸 쪽에는 성공한 것처럼 보이게 두고, 실제로는 전송하지 않습니다. */
    var trap = $("#f-trap");
    var tooFast = Date.now() - openedAt < 3000;
    if ((trap && trap.value) || tooFast) {
      form.reset();
      clearErrors();
      setStatus("ok", "<strong>요청서를 보냈습니다.</strong> 적어주신 이메일로 하루 안에 답변드리겠습니다.");
      return;
    }

    var bad = validate();
    if (bad) {
      if (!statusBox.classList.contains("is-error")) statusBox.hidden = true;
      bad.focus();
      bad.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    statusBox.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "보내는 중…";

    var data = new FormData(form);
    data.append("보낸시각", new Date().toLocaleString("ko-KR"));

    fetch(endpoint, { method: "POST", body: data })
      .then(function (res) {
        if (!res.ok) throw new Error("서버 응답 " + res.status);
        return res.text();
      })
      .then(function () {
        form.reset();
        clearErrors();
        setStatus("ok", "<strong>요청서를 보냈습니다.</strong> 적어주신 이메일로 하루 안에 답변드리겠습니다.");
        statusBox.scrollIntoView({ block: "center", behavior: "smooth" });
      })
      .catch(function () {
        setStatus("error", "<strong>전송에 실패했습니다.</strong> 잠시 후 다시 시도해 주세요." + kakaoFallback());
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "요청서 보내기";
      });
  });
})();
