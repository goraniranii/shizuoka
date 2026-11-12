/**
 * ✏️ 이 파일만 수정하면 여행 페이지의 일정, 체크리스트, 숙소 정보를 바꿀 수 있어요.
 * - 문구는 따옴표(" ") 안에서 수정하세요.
 * - 항목을 추가하려면 기존 { ... }, 묶음을 복사해 아래에 붙여 넣으세요.
 * - 쉼표(,)와 대괄호([ ])를 지우지 않도록 주의하세요.
 * - 변경 후 GitHub에 data.js를 다시 업로드하면 페이지에 반영됩니다.
 */
window.TRIP_DATA = {
  meta: {
    title: "겨울의 시즈오카",
    subtitle: "푸른 산과 느린 산책, 맛있는 세 번의 하루",
    startDate: "2026-12-10",
    endDate: "2026-12-12",
    dateDisplay: "2026. 12. 10 — 12. 12",
    travelers: "2인 여행",
    destination: "SHIZUOKA, JAPAN"
  },

  before: [
    {
      id: "visit-japan",
      title: "비짓재팬 입국 수속",
      detail: "출발 전 등록하고 QR코드 확인하기",
      url: "https://services.digital.go.jp/ko/visit-japan-web/",
      linkLabel: "비짓재팬 열기"
    },
    { id: "insurance", title: "여행자보험 가입", detail: "보험 증서와 긴급 연락처도 확인하기" },
    { id: "esim", title: "eSIM 준비", detail: "설치 및 활성화 방법 미리 확인하기" },
    {
      id: "travelcard",
      title: "여행 카드 충전 및 챙기기",
      detail: "트래블월렛 / 트래블로그 / 쏠트래블"
    }
  ],

  packingNote: "숙소 어메니티 제공 · 개인적으로 필요한 것 위주로 챙기기",
  packing: [
    { id: "toiletries", title: "세면도구", detail: "칫솔, 트리트먼트 등 필요한 것" },
    { id: "adapter", title: "돼지코 (변환 어댑터)", detail: "일본 콘센트용" },
    { id: "battery", title: "보조배터리", detail: "기내 반입 규정 확인하기" },
    { id: "medicine", title: "상비약", detail: "평소 복용약 포함" }
  ],

  hotel: {
    name: "호텔 그랜드 힐스 시즈오카",
    enName: "Hotel Grand Hills Shizuoka",
    checkIn: "14:00",
    checkOut: "11:00",
    phone: "+815031857809",
    address: "18-1 Minamicho, Suruga Ward, Shizuoka, 422-8575 일본",
    mapUrl: "https://maps.app.goo.gl/bLCvTYuFP1P5j9Kb7?g_st=ic",
    access: "JR 시즈오카역 남쪽 출구에서 도보 약 1분. 연결 데크와 엘리베이터로 호텔 2층 진입 가능 (07:00~23:00).",
    note: "체크아웃 후 짐 맡겼다가 마지막 날 공항버스 타기 전에 픽업하기"
  },

  days: [
    {
      id: "day1",
      number: "01",
      date: "2026-12-10",
      dateLabel: "12.10 THU",
      weekday: "목요일",
      title: "시즈오카에 도착",
      subtitle: "푸른 도시를 걷고, 오뎅으로 마무리하는 날",
      highlights: ["시내 산책", "쇼핑", "아오바요코초"],
      items: [
        {
          id: "airport-arrival",
          time: "09:10",
          title: "공항 도착",
          category: "이동",
          notes: ["입국 심사 후 버스 승강장으로 이동"]
        },
        {
          id: "airport-bus-in",
          time: "10:10",
          title: "공항버스 탑승",
          category: "중요 · 이동",
          important: true,
          notes: ["3번 승강장 · 성인 편도 1,200엔", "정상 탑승 시 시즈오카역 11:07 도착", "다음 편 10:50 탑승 시 11:47 도착"]
        },
        {
          id: "hotel-drop",
          time: "11:20~",
          title: "호텔에 짐 맡기기",
          category: "숙소",
          mapUrl: "https://maps.app.goo.gl/bLCvTYuFP1P5j9Kb7?g_st=ic",
          notes: ["호텔 그랜드 힐스 시즈오카", "JR 시즈오카역 남쪽 출구 도보 1분", "연결 데크·엘리베이터로 호텔 2층 진입 (07:00~23:00)"]
        },
        {
          id: "asty-lunch",
          time: "점심",
          title: "아스티 시즈오카에서 점심",
          category: "맛집",
          mapQuery: "ASTY Shizuoka Japan",
          notes: ["토가쿠시소바 또는 그날 끌리는 메뉴로 자유롭게!"]
        },
        {
          id: "sunpu-park",
          time: "오후",
          title: "슨푸성 공원 · 모미지야마 정원",
          category: "관광",
          mapQuery: "Sunpu Castle Park Momijiyama Garden Shizuoka",
          notes: ["공원과 정원 산책하며 여유롭게 둘러보기"]
        },
        {
          id: "nanaya",
          time: "오후",
          title: "나나야 시즈오카점",
          category: "디저트",
          mapQuery: "Nanaya Shizuoka matcha gelato",
          notes: ["진한 말차 아이스크림 먹기 🍵"]
        },
        {
          id: "matsukiyo",
          time: "쇼핑",
          title: "마츠모토 키요시 고후쿠초점",
          category: "쇼핑",
          mapQuery: "Matsumoto Kiyoshi Gofukucho Shizuoka",
          notes: ["화장품 구매"]
        },
        {
          id: "liquor-mountain",
          time: "쇼핑",
          title: "리커마운틴 시즈오카 료가에초",
          category: "쇼핑",
          mapQuery: "Liquor Mountain Shizuoka Ryogaecho",
          notes: ["위스키 구경 및 구매"]
        },
        {
          id: "parco-loft",
          time: "쇼핑",
          title: "PARCO · 로프트",
          category: "쇼핑",
          mapQuery: "Shizuoka PARCO LOFT",
          notes: ["문구용품 구매"]
        },
        {
          id: "matsuzakaya",
          time: "쇼핑",
          title: "마쓰자카야 시즈오카점",
          category: "쇼핑",
          mapQuery: "Matsuzakaya Shizuoka",
          notes: ["위스키 구매"]
        },
        {
          id: "hotel-reset",
          time: "저녁 전",
          title: "호텔에 들러 짐 놓기",
          category: "숙소",
          mapUrl: "https://maps.app.goo.gl/bLCvTYuFP1P5j9Kb7?g_st=ic",
          notes: ["잠깐 쉬었다가 저녁 먹으러 나가기"]
        },
        {
          id: "aoba",
          time: "저녁",
          title: "아오바요코초 · 오뎅거리",
          category: "맛집",
          mapQuery: "Aoba Oden Street Shizuoka",
          notes: ["오뎅바에서 시즈오카 오뎅 + 사케"]
        },
        {
          id: "beer",
          time: "밤",
          title: "호텔 복귀, 하루 마무리",
          category: "휴식",
          notes: ["숙소에서 간단히 맥주 한 잔 정도 :)"]
        }
      ]
    },
    {
      id: "day2",
      number: "02",
      date: "2026-12-11",
      dateLabel: "12.11 FRI",
      weekday: "금요일",
      title: "후지산을 만나는 날",
      subtitle: "꿈의 대교에서 폭포와 호수까지",
      highlights: ["후지산 투어", "후지노미야", "참치회"],
      items: [
        {
          id: "tour-meet",
          time: "08:40",
          title: "투어 집합",
          category: "중요 · 투어",
          important: true,
          notes: ["별도 입장료 예상: 꿈의 대교 2인 200엔", "세계유산센터 2인 1,000엔"]
        },
        {
          id: "dream-bridge",
          time: "09:30",
          title: "꿈의 대교",
          category: "관광",
          mapQuery: "Fujisan Yumeno Ohashi Fuji Shizuoka",
          notes: ["후지산 사진 남기기 📷"]
        },
        {
          id: "fujinomiya-lunch",
          time: "11:50",
          title: "이온몰 후지노미야 · 자유 점심",
          category: "맛집 · 쇼핑",
          mapQuery: "AEON Mall Fujinomiya",
          notes: ["세계유산센터 / 본궁 센겐대사도 함께 둘러보기", "시간이 되면 이온몰 무인양품, 칼디(스프레드) 쇼핑", "점심 후보 ① 우나텐 — 장어덮밥", "점심 후보 ② 고코쿠 — 일본식 가정식", "점심 후보 ③ 파스타야잇초메 — 파스타"],
          links: [{ label: "고코쿠 식당 후기", url: "https://m.blog.naver.com/conch2232/224156539132" }]
        },
        {
          id: "heritage-center",
          time: "동선 내",
          title: "후지산 세계유산센터 · 본궁 센겐대사",
          category: "관광",
          mapQuery: "Mt Fuji World Heritage Centre Shizuoka",
          notes: ["투어 자유시간과 이동 동선에 맞춰 방문"]
        },
        {
          id: "waterfall-lake",
          time: "13:50–15:55",
          title: "시라이토 폭포 · 타누키호",
          category: "관광",
          mapQuery: "Shiraito Falls Fujinomiya Shizuoka",
          notes: ["폭포 관람과 호수 풍경 즐기기"]
        },
        {
          id: "return-station",
          time: "17:20",
          title: "시즈오카역 복귀",
          category: "이동",
          notes: ["호텔 들렀다가 저녁 먹으러 이동"]
        },
        {
          id: "shimizuko-minami",
          time: "저녁",
          title: "시미즈코 미나미",
          category: "맛집",
          mapQuery: "Shimizuko Minami Shizuoka tuna restaurant",
          notes: ["참치 모둠회 먹기", "시즈오카 사케 추천: 이소지만 / 가류바이 / 쇼세츠"]
        }
      ]
    },
    {
      id: "day3",
      number: "03",
      date: "2026-12-12",
      dateLabel: "12.12 SAT",
      weekday: "토요일",
      title: "마지막 맛과 산책",
      subtitle: "함바그를 먹고 기념품을 챙겨 집으로",
      highlights: ["사와야카", "미술관", "공항버스"],
      items: [
        {
          id: "sawayaka-line",
          time: "09:30",
          title: "사와야카 순번 접수 시도",
          category: "중요 · 사전 확인",
          important: true,
          notes: ["메모해둔 LINE 접수 방식·가능 여부를 출발 전 공식 채널에서 재확인", "실제 대기 순번과 호출 시간에 따라 아침 동선 조정"]
        },
        {
          id: "checkout",
          time: "10:00",
          title: "호텔 체크아웃",
          category: "숙소",
          mapUrl: "https://maps.app.goo.gl/bLCvTYuFP1P5j9Kb7?g_st=ic",
          notes: ["호텔 프런트에 짐 맡겨두기", "공항버스 타기 전에 짐을 반드시 찾아오기"]
        },
        {
          id: "sawayaka",
          time: "10:30",
          title: "사와야카 시즈오카인터점",
          category: "맛집",
          mapQuery: "Sawayaka Shizuoka Inter restaurant",
          notes: ["겐코츠 함바그로 아점! 🍖", "대기가 길어지면 이후 미술관·쇼핑 시간을 줄이기", "순번 호출 뒤 지각 시 취소될 수 있으니 접수 안내 확인"]
        },
        {
          id: "city-return",
          time: "~12:00",
          title: "시즈오카역 주변 복귀",
          category: "이동",
          notes: ["이동 시간과 교통 상황을 고려해 여유롭게"]
        },
        {
          id: "art-shopping",
          time: "~14:40",
          title: "시즈오카 시립미술관 · 파르쉐 식채관",
          category: "관광 · 쇼핑",
          mapQuery: "Shizuoka City Museum of Art",
          notes: ["미술관 관람 후 파르쉐에서 마지막 기념품 쇼핑", "사와야카 대기가 길어지면 파르쉐만 짧게 들러도 OK"],
          links: [{ label: "파르쉐 위치", url: "https://www.google.com/maps/search/?api=1&query=Parche%20Shizuoka" }]
        },
        {
          id: "luggage-pickup",
          time: "~14:50",
          title: "호텔에서 짐 픽업",
          category: "중요 · 숙소",
          important: true,
          mapUrl: "https://maps.app.goo.gl/bLCvTYuFP1P5j9Kb7?g_st=ic",
          notes: ["남쪽 출구 호텔에서 짐 찾고 북쪽 출구로 이동", "15:15 전후까지 버스 승강장 도착 목표"]
        },
        {
          id: "airport-bus-out",
          time: "15:35",
          title: "공항버스 탑승",
          category: "중요 · 이동",
          important: true,
          mapQuery: "Shizuoka Station North Exit Bus Stop 14",
          notes: ["시즈오카역 북쪽 출구 14번 승강장", "성인 편도 1,200엔", "계획대로 탑승 시 공항 16:26 도착", "다음 편 15:55 탑승 시 공항 16:46 도착(출발 전 시간표 재확인)"]
        }
      ]
    }
  ],

  /** 출발 전에 공항버스·운영시간 등 변동 가능한 사항을 꼭 다시 확인하세요. */
  notice: "교통 시간표, 요금, 영업시간 및 순번 접수 방식은 변경될 수 있으니 출발 전에 다시 확인해 주세요."
};
