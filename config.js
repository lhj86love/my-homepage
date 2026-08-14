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
  { image: "images/portfolio/logo-01.svg", title: "메리디안 커피", desc: "카페 로고 · 2025" },
  { image: "images/portfolio/card-01.svg", title: "블랙 골드 명함", desc: "컨설팅 명함 · 2025" },
  { image: "images/portfolio/logo-02.svg", title: "아우라 스튜디오", desc: "요가 스튜디오 로고 · 2025" },
  { image: "images/portfolio/card-02.svg", title: "미니멀 명함", desc: "디자인 스튜디오 명함 · 2024" },
  { image: "images/portfolio/logo-03.svg", title: "노르딕 가구", desc: "가구 브랜드 로고 · 2024" },
  { image: "images/portfolio/card-03.svg", title: "딥그린 명함", desc: "플라워샵 명함 · 2024" },
  { image: "images/portfolio/logo-04.svg", title: "블룸 플라워", desc: "꽃집 로고 · 2024" },
  { image: "images/portfolio/card-04.svg", title: "크래프트 명함", desc: "공방 명함 · 2024" },

  /* ★ 새 작업물은 이 아래에 한 줄씩 추가하세요 ★ */

];
