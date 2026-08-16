/* ============================================================
   ★ 이 파일만 고치시면 됩니다 ★

   - 따옴표(" ") 안의 글자만 바꾸세요.
   - 줄 끝의 쉼표( , )는 지우지 마세요.
   - 아직 없는 링크는 빈칸("")으로 두시면 버튼이 자동으로 숨겨집니다.
   ============================================================ */

const SITE = {
  /* ---------- 1. 기본 정보 ---------- */
  brandName: "이건웍스",                 // 사이트 맨 위 왼쪽에 나오는 이름
  brandNameEn: "LEEGUN WORKS",          // 한글 이름 옆에 작게 나오는 영문 (필요 없으면 "")
  heroTitle: "브랜드의 첫인상을\n로고와 명함으로 완성합니다",  // \n 은 줄바꿈
  heroText: "작은 가게부터 1인 사업까지, 오래 쓸 수 있는 로고와 명함을 만듭니다.",
  aboutText:
    "10년 넘게 브랜드 디자인을 해왔습니다. 유행을 따라가기보다 " +
    "사장님이 오래 들고 다닐 수 있는 디자인을 만드는 것을 가장 중요하게 생각합니다.",

  /* ---------- 2. 링크 (실제 주소를 그대로 붙여넣으세요) ---------- */
  links: {
    kakao: "",       // 예: "https://pf.kakao.com/_abcdefg"  ← 카카오톡 채널 주소
    instagram: "",   // 예: "https://instagram.com/내아이디"
    threads: "",     // 스레드 주소
  },

  /* ---------- 3. 의뢰 요청서 받을 주소 ----------
     구글에서 만든 주소를 여기 붙여넣으면 요청서가 작동합니다.
     만드는 방법은 docs/의뢰요청서-설정법.md 에 그림처럼 순서대로 적어뒀습니다.
     비워두면 요청서 자리에 "준비 중" 안내가 나옵니다. */
  formEndpoint: "https://script.google.com/macros/s/AKfycbzfuerlfB5pggtKOLPWjDi5yCDV5Zp_X8emGFdMUUTw6sAlShMhQZsq6M5lEeUErupM/exec",  // 예: "https://script.google.com/macros/s/AKfyc.../exec"

  /* ---------- 4. 연락처 (안 쓰실 항목은 빈칸으로) ---------- */
  contact: {
    phone: "",       // 예: "010-1234-5678"
    email: "",       // 예: "hello@studio.kr"
    hours: "평일 10:00 – 19:00 · 주말·공휴일 휴무",
  },

};

/* ============================================================
   5. 포트폴리오 목록

   ★ 새 작업물 올리는 방법 (2단계) ★
   (1) 사진 파일을 images/portfolio/ 폴더에 넣습니다.
   (2) 아래 목록 맨 아래 ★ 표시 자리에 한 줄을 복사해서 붙여넣고 내용만 바꿉니다.

   여기에 적는 순서 그대로 화면에 나옵니다.
   맨 아래에 추가하면 홈페이지에서도 맨 아래에 이어서 붙습니다.
   몇 개를 넣든 전부 다 보입니다. ("더보기"로 숨기지 않습니다)
   ============================================================ */

const PORTFOLIO = [
  /* 1번째 줄 */
  { image: "images/portfolio/donwoong-logo.jpg",    title: "Don.woong",        desc: "인플루언서 로고" },
  { image: "images/portfolio/yulli-law-logo.jpg",   title: "율리 법무사무소",   desc: "법무사무소 로고" },
  { image: "images/portfolio/quietvison-logo.jpg",  title: "QUIET VISON",      desc: "뷰티샵 로고" },
  { image: "images/portfolio/nail-design-logo.jpg", title: "NAIL & DESIGN",    desc: "네일샵 로고" },
  { image: "images/portfolio/browx-logo.jpg",       title: "BROW X",           desc: "브로우샵 로고" },

  /* 2번째 줄 */
  { image: "images/portfolio/seopro-logo.jpg",      title: "서프로 공인중개사", desc: "공인중개사 로고" },
  { image: "images/portfolio/cafe-logo.jpg",        title: "카페 브랜드",       desc: "카페 로고" },
  { image: "images/portfolio/pub-logo.jpg",         title: "주점 브랜드",       desc: "주점 로고" },
  { image: "images/portfolio/nodam-labor-logo.jpg", title: "노담 노무사무소",   desc: "노무사무소 로고" },
  { image: "images/portfolio/winebar-logo.jpg",     title: "와인바 브랜드",     desc: "와인바 로고" },

  /* 3번째 줄 */
  { image: "images/portfolio/djuny-card.jpg",       title: "D Juny",           desc: "명함 디자인" },
  { image: "images/portfolio/djuny-tumbler.jpg",    title: "D Juny",           desc: "텀블러 각인" },
  { image: "images/portfolio/lgw-card.jpg",         title: "LGW",              desc: "명함 디자인" },

  /* ★ 새 작업물은 이 아래에 한 줄씩 추가하세요 ★
     한 줄에 5개씩 채워지고, 6번째부터 자동으로 아랫줄로 넘어갑니다. */

];
