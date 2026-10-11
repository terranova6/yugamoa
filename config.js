/* 육아모아 앱 설정
   가족 공유 연결 정보를 여기에 넣어 두면, 가족들은 설정 없이 '가족 코드'만 입력하면 됩니다.
   둘 중 하나만 채우세요. (자세한 방법: docs/가족공유-설정.md) */
window.YUAMOA_CONFIG = {
  // Firebase 콘솔 → 프로젝트 설정 → 내 앱 → firebaseConfig 를 그대로 붙여 넣기
  firebase: null,
  // 예) firebase: { apiKey: "AIza...", authDomain: "xxx.firebaseapp.com", projectId: "xxx", appId: "1:...:web:..." },

  // NAS에서 scripts/sync-server.mjs 를 실행했다면 그 주소
  server: null,
  // 예) server: "https://my-nas.synology.me:8787",
};
