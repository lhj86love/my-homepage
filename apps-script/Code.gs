/**
 * 이건웍스 홈페이지 — 의뢰 요청서 접수용 스크립트
 *
 * 이 파일은 홈페이지가 아니라 "구글" 쪽에 붙이는 코드입니다.
 * 설치 방법은 docs/의뢰요청서-설정법.md 를 보세요.
 *
 * 하는 일
 *   1) 홈페이지에서 온 요청서를 구글시트에 한 줄씩 저장합니다.
 *   2) 같은 내용을 아래 NOTIFY_EMAIL 주소로 메일 발송합니다.
 *
 * 비용: 0원 (구글 계정만 있으면 됩니다)
 */

/* ★ 알림 메일을 받을 주소 — 본인 이메일로 바꾸세요 ★ */
var NOTIFY_EMAIL = 'lhj86love@gmail.com';

/* 시트 이름 (그대로 두셔도 됩니다) */
var SHEET_NAME = '의뢰요청서';

/* 시트에 기록할 항목과 순서 */
var FIELDS = ['보낸시각', '성함', '이메일', '연락처', '의뢰종류', '업종', '희망일정', '예산', '내용', '개인정보동의'];


function doPost(e) {
  try {
    var data = (e && e.parameter) || {};

    var sheet = getSheet_();
    var row = FIELDS.map(function (key) {
      return data[key] || '';
    });
    sheet.appendRow(row);

    sendMail_(data);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}


/* 브라우저에서 주소를 직접 열었을 때 잘 붙었는지 확인하는 용도 */
function doGet() {
  return json_({ ok: true, message: '의뢰 요청서 접수 준비 완료' });
}


function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  /* 맨 윗줄에 제목이 없으면 넣어줍니다 */
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(FIELDS);
    sheet.getRange(1, 1, 1, FIELDS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}


function sendMail_(data) {
  if (!NOTIFY_EMAIL) return;

  var who = data['성함'] || '이름 없음';
  var what = data['의뢰종류'] || '종류 미기재';

  var lines = FIELDS.map(function (key) {
    return key + ' : ' + (data[key] || '-');
  });

  lines.push('');
  lines.push('— 이건웍스 홈페이지 의뢰 요청서');

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: '[의뢰 요청서] ' + who + ' · ' + what,
    body: lines.join('\n'),
    replyTo: data['이메일'] || undefined
  });
}


function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
