// ========================================
// 사용자 & 역할
// ========================================
export const users = [
    { id: 1, name: '김철수', email: 'chulsoo.kim@parkplay.com', role: 'SUPER_ADMIN', tenant: '본사', status: 'Active' },
    { id: 2, name: '이영희', email: 'younghee.lee@parkingcorp.co.kr', role: 'OPERATOR', tenant: '서울주차관리(주)', status: 'Active' },
    { id: 3, name: '박민수', email: 'minsoo.park@site-a.com', role: 'FIELD_MANAGER', tenant: '강남점', status: 'Active' },
    { id: 4, name: '최지혜', email: 'jihye.choi@finance.com', role: 'ACCOUNTANT', tenant: '서울주차관리(주)', status: 'Inactive' },
    { id: 5, name: '정대표', email: 'ceo.jung@gfc-asset.com', role: 'OWNER', tenant: 'GFC 자산관리', status: 'Active' },
    { id: 6, name: '한조회', email: 'viewer.han@parkplay.com', role: 'VIEWER', tenant: '본사', status: 'Active' },
];

export const roles = [
    { code: 'SUPER_ADMIN', name: '슈퍼 어드민', description: '전체 시스템 관리 및 설정' },
    { code: 'OWNER', name: '주차장 소유주', description: 'PHI, 매출, 시뮬레이터 등 의사결정 화면 조회' },
    { code: 'OPERATOR', name: '운영사 관리자', description: '다수 주차장 통합 운영 및 정산 관리' },
    { code: 'FIELD_MANAGER', name: '현장 관리자', description: '개별 주차장 입출차 관제 및 장비 제어' },
    { code: 'ACCOUNTANT', name: '회계 담당자', description: '매출 조회 및 세무 증빙 관리' },
    { code: 'VIEWER', name: '조회 전용', description: '읽기 전용 대시보드 접근' },
];

// ========================================
// 테넌트
// ========================================
export const tenants = [
    { id: 'TNT-001', name: '본사', type: 'HQ', contact: '02-1234-5678', email: 'admin@parkplay.com', status: 'Active', plan: 'Enterprise', joinedDate: '2024-01-01' },
    { id: 'TNT-002', name: '서울주차관리(주)', type: 'Corporation', contact: '02-9876-5432', email: 'contact@parkingcorp.co.kr', status: 'Active', plan: 'Premium', joinedDate: '2024-03-15' },
    { id: 'TNT-003', name: '스타트업 파킹', type: 'Individual', contact: '010-1111-2222', email: 'ceo@startupparking.com', status: 'Suspended', plan: 'Basic', joinedDate: '2024-06-20' },
];

// ========================================
// 시스템 헬스
// ========================================
export const systemHealth = {
    lpr: { status: 'operational', message: '정상 작동 중', lastCheck: '방금 전', latency: '45ms' },
    pg: { status: 'operational', message: '결제 모듈 정상', lastCheck: '1분 전', latency: '120ms' },
    erp: { status: 'degraded', message: '지연 발생 (배치 대기 중)', lastCheck: '10분 전', latency: '2500ms' },
};

// ========================================
// 주차장
// ========================================
export const parkingLots = [
    {
        id: 'PL-001',
        name: '강남 파이낸스 센터',
        address: '서울시 강남구 테헤란로 152',
        owner: 'GFC 자산관리',
        totalSpaces: 500,
        currentOccupancy: 420,
        evSpaces: 30,
        evOccupancy: 25,
        regularPassCount: 280,
        status: 'Operational',
        type: 'Commercial'
    },
    {
        id: 'PL-002',
        name: '서초 마제스타 시티',
        address: '서울시 서초구 서초대로 38',
        owner: '마제스타 관리단',
        totalSpaces: 300,
        currentOccupancy: 150,
        evSpaces: 15,
        evOccupancy: 8,
        regularPassCount: 80,
        status: 'Operational',
        type: 'Mixed-Use'
    },
    {
        id: 'PL-003',
        name: '판교 테크노벨리 공영',
        address: '경기도 성남시 분당구 판교역로',
        owner: '성남도시공사',
        totalSpaces: 1200,
        currentOccupancy: 1150,
        evSpaces: 50,
        evOccupancy: 48,
        regularPassCount: 900,
        status: 'Maintenance',
        type: 'Public'
    },
];

// ========================================
// 입출차 로그 (확장: ticketType, vehicleType, stayDuration 추가)
// ========================================
export const entryExitLogs = [
    { id: 'LOG-001', vehicleNo: '12가 3456', parkingLot: '강남 파이낸스 센터', parkingLotId: 'PL-001', entryTime: '2026-02-07 08:30:00', exitTime: '-', status: 'Parked', fee: 0, image: 'https://placehold.co/150', ticketType: 'regular', vehicleType: 'general', stayDuration: null },
    { id: 'LOG-002', vehicleNo: '34나 5678', parkingLot: '서초 마제스타 시티', parkingLotId: 'PL-002', entryTime: '2026-02-07 07:15:00', exitTime: '2026-02-07 08:45:00', status: 'Exited', fee: 5000, image: 'https://placehold.co/150', ticketType: 'hourly', vehicleType: 'general', stayDuration: 90 },
    { id: 'LOG-003', vehicleNo: '56다 7890', parkingLot: '판교 테크노벨리 공영', parkingLotId: 'PL-003', entryTime: '2026-02-06 18:00:00', exitTime: '-', status: 'Parked', fee: 0, image: 'https://placehold.co/150', ticketType: 'regular', vehicleType: 'ev', stayDuration: null },
    { id: 'LOG-004', vehicleNo: '78라 1234', parkingLot: '강남 파이낸스 센터', parkingLotId: 'PL-001', entryTime: '2026-02-06 14:00:00', exitTime: '2026-02-06 16:30:00', status: 'Paid', fee: 12000, image: 'https://placehold.co/150', ticketType: 'hourly', vehicleType: 'general', stayDuration: 150 },
    { id: 'LOG-005', vehicleNo: '90마 5678', parkingLot: '서초 마제스타 시티', parkingLotId: 'PL-002', entryTime: '2026-02-06 09:00:00', exitTime: '2026-02-06 18:00:00', status: 'Exited', fee: 25000, image: 'https://placehold.co/150', ticketType: 'discount', vehicleType: 'general', stayDuration: 540 },
    { id: 'LOG-006', vehicleNo: '11바 2233', parkingLot: '강남 파이낸스 센터', parkingLotId: 'PL-001', entryTime: '2026-02-07 09:00:00', exitTime: '2026-02-07 12:30:00', status: 'Paid', fee: 15000, image: 'https://placehold.co/150', ticketType: 'hourly', vehicleType: 'ev', stayDuration: 210 },
    { id: 'LOG-007', vehicleNo: '22사 4455', parkingLot: '강남 파이낸스 센터', parkingLotId: 'PL-001', entryTime: '2026-02-07 07:50:00', exitTime: '-', status: 'Parked', fee: 0, image: 'https://placehold.co/150', ticketType: 'regular', vehicleType: 'general', stayDuration: null },
    { id: 'LOG-008', vehicleNo: '33아 6677', parkingLot: '판교 테크노벨리 공영', parkingLotId: 'PL-003', entryTime: '2026-02-07 06:30:00', exitTime: '2026-02-07 15:00:00', status: 'Paid', fee: 8000, image: 'https://placehold.co/150', ticketType: 'hourly', vehicleType: 'compact', stayDuration: 510 },
    { id: 'LOG-009', vehicleNo: '44자 8899', parkingLot: '서초 마제스타 시티', parkingLotId: 'PL-002', entryTime: '2026-02-07 10:00:00', exitTime: '2026-02-07 10:30:00', status: 'Paid', fee: 2000, image: 'https://placehold.co/150', ticketType: 'discount', vehicleType: 'general', stayDuration: 30 },
    { id: 'LOG-010', vehicleNo: '55차 1122', parkingLot: '강남 파이낸스 센터', parkingLotId: 'PL-001', entryTime: '2026-02-06 22:00:00', exitTime: '2026-02-07 07:00:00', status: 'Paid', fee: 10000, image: 'https://placehold.co/150', ticketType: 'daily', vehicleType: 'general', stayDuration: 540 },
    { id: 'LOG-011', vehicleNo: '66카 3344', parkingLot: '판교 테크노벨리 공영', parkingLotId: 'PL-003', entryTime: '2026-02-07 08:00:00', exitTime: '-', status: 'Parked', fee: 0, image: 'https://placehold.co/150', ticketType: 'free', vehicleType: 'disabled', stayDuration: null },
    { id: 'LOG-012', vehicleNo: '77타 5566', parkingLot: '강남 파이낸스 센터', parkingLotId: 'PL-001', entryTime: '2026-02-07 11:00:00', exitTime: '2026-02-07 14:00:00', status: 'Paid', fee: 13000, image: 'https://placehold.co/150', ticketType: 'hourly', vehicleType: 'ev', stayDuration: 180 },
    { id: 'LOG-013', vehicleNo: '88파 7788', parkingLot: '서초 마제스타 시티', parkingLotId: 'PL-002', entryTime: '2026-02-07 08:30:00', exitTime: '-', status: 'Parked', fee: 0, image: 'https://placehold.co/150', ticketType: 'regular', vehicleType: 'general', stayDuration: null },
    { id: 'LOG-014', vehicleNo: '99하 9900', parkingLot: '판교 테크노벨리 공영', parkingLotId: 'PL-003', entryTime: '2026-02-07 13:00:00', exitTime: '2026-02-07 17:30:00', status: 'Paid', fee: 6000, image: 'https://placehold.co/150', ticketType: 'hourly', vehicleType: 'general', stayDuration: 270 },
    { id: 'LOG-015', vehicleNo: '10거 1234', parkingLot: '강남 파이낸스 센터', parkingLotId: 'PL-001', entryTime: '2026-02-07 16:00:00', exitTime: '2026-02-07 18:00:00', status: 'Paid', fee: 8000, image: 'https://placehold.co/150', ticketType: 'discount', vehicleType: 'general', stayDuration: 120 },
];

// ========================================
// 요금 정책
// ========================================
export const feePolicies = [
    { id: 'POL-001', name: '일반 요금 (강남점)', type: 'Time-based', baseTime: 30, baseRate: 3000, unitTime: 10, unitRate: 1000, maxDaily: 50000, gracePeriod: 10, isActive: true, parkingLotId: 'PL-001' },
    { id: 'POL-002', name: '야간 할인 (강남점)', type: 'Flat-rate', baseTime: 0, baseRate: 10000, unitTime: 0, unitRate: 0, maxDaily: 10000, gracePeriod: 0, isActive: true, parkingLotId: 'PL-001' },
    { id: 'POL-003', name: '표준 요금 (판교)', type: 'Time-based', baseTime: 60, baseRate: 0, unitTime: 10, unitRate: 500, maxDaily: 20000, gracePeriod: 20, isActive: false, parkingLotId: 'PL-003' },
    { id: 'POL-004', name: '전사 기본 정책', type: 'Time-based', baseTime: 30, baseRate: 2000, unitTime: 10, unitRate: 500, maxDaily: 30000, gracePeriod: 15, isActive: true, parkingLotId: 'All' },
];

// ========================================
// 매출 데이터
// ========================================
export const revenueData = {
    daily: [
        { date: '2/1', amount: 1250000, count: 154 },
        { date: '2/2', amount: 1380000, count: 162 },
        { date: '2/3', amount: 980000, count: 110 },
        { date: '2/4', amount: 1100000, count: 134 },
        { date: '2/5', amount: 1450000, count: 180 },
        { date: '2/6', amount: 1680000, count: 210 },
        { date: '2/7', amount: 1550000, count: 195 },
    ],
    monthly: [
        { month: '8월', amount: 35000000 },
        { month: '9월', amount: 38000000 },
        { month: '10월', amount: 42000000 },
        { month: '11월', amount: 41000000 },
        { month: '12월', amount: 48000000 },
        { month: '1월', amount: 45000000 },
    ],
    paymentMethods: [
        { name: '신용카드', value: 65, color: '#3b82f6' },
        { name: '앱 결제', value: 25, color: '#10b981' },
        { name: '현금', value: 5, color: '#f59e0b' },
        { name: '기타', value: 5, color: '#64748b' },
    ]
};

// ========================================
// 정기권
// ========================================
export const regularPasses = [
    { id: 'PASS-001', name: '월 정기권 (강남점)', type: 'Monthly', price: 150000, parkingLot: '강남 파이낸스 센터', parkingLotId: 'PL-001', description: '매월 1일 갱신, 평일/주말 모두 사용 가능', isActive: true },
    { id: 'PASS-002', name: '평일 주간권 (서초점)', type: 'Monthly', price: 120000, parkingLot: '서초 마제스타 시티', parkingLotId: 'PL-002', description: '평일 09:00 ~ 18:00 사용 가능', isActive: true },
    { id: 'PASS-003', name: '1일 정기권 (판교)', type: 'Daily', price: 15000, parkingLot: '판교 테크노벨리 공영', parkingLotId: 'PL-003', description: '24시간 자유 입출차 가능', isActive: true },
    { id: 'PASS-004', name: '전사 임직원 패스', type: 'Monthly', price: 0, parkingLot: '전체', parkingLotId: 'All', description: '전사 임직원 무료 주차', isActive: true },
];

// ========================================
// 할인권
// ========================================
export const discountTickets = [
    { id: 'DISC-001', name: '방문객 1시간 할인', code: 'VISIT1H', type: 'Time', value: 60, validityPeriod: '2026-12-31', isActive: true, parkingLotId: 'All' },
    { id: 'DISC-002', name: '입주사 50% 할인 (강남)', code: 'TENANT50', type: 'Percentage', value: 50, validityPeriod: '2026-12-31', isActive: true, parkingLotId: 'PL-001' },
    { id: 'DISC-003', name: '주말 3000원 할인 (서초)', code: 'WKND3000', type: 'Fixed', value: 3000, validityPeriod: '2026-06-30', isActive: false, parkingLotId: 'PL-002' },
];

// ========================================
// 계약
// ========================================
export const contracts = [
    {
        id: 'CON-001',
        landlordName: 'GFC 자산관리',
        parkingLotId: 'PL-001',
        parkingLotName: '강남 파이낸스 센터',
        startDate: '2025-01-01',
        endDate: '2027-12-31',
        settlementDay: 10,
        operatorShare: 30,
        landlordShare: 70,
        accountInfo: '신한은행 110-123-456789 (예금주: GFC자산)',
        status: 'Active',
        deductions: [
            { name: '카드 수수료', type: 'Percentage', value: 2.5 },
            { name: '시스템 유지보수비', type: 'Fixed', value: 500000 }
        ]
    },
    {
        id: 'CON-002',
        landlordName: '마제스타 관리단',
        parkingLotId: 'PL-002',
        parkingLotName: '서초 마제스타 시티',
        startDate: '2025-03-01',
        endDate: '2028-02-28',
        settlementDay: 25,
        operatorShare: 40,
        landlordShare: 60,
        accountInfo: '우리은행 1002-987-654321',
        status: 'Active',
        deductions: [
            { name: '카드 수수료', type: 'Percentage', value: 2.3 },
        ]
    }
];

// ========================================
// 정산
// ========================================
export const settlements = [
    {
        id: 'SET-202601-001',
        contractId: 'CON-001',
        landlordName: 'GFC 자산관리',
        parkingLotName: '강남 파이낸스 센터',
        period: '2026-01',
        totalRevenue: 45000000,
        deductionAmount: 1625000,
        netRevenue: 43375000,
        operatorAmount: 13012500,
        landlordAmount: 30362500,
        status: 'Completed',
        processedDate: '2026-02-10'
    },
    {
        id: 'SET-202601-002',
        contractId: 'CON-002',
        landlordName: '마제스타 관리단',
        parkingLotName: '서초 마제스타 시티',
        period: '2026-01',
        totalRevenue: 28000000,
        deductionAmount: 644000,
        netRevenue: 27356000,
        operatorAmount: 10942400,
        landlordAmount: 16413600,
        status: 'Pending',
        processedDate: '-'
    }
];

// ========================================
// 장비 (정산기, EV 충전기, 초음파 센서 추가)
// ========================================
export const devices = [
    { id: 'DEV-001', name: '강남 정문 입구 LPR', type: 'LPR', location: 'Entry', status: 'Online', state: 'Idle', parkingLotId: 'PL-001' },
    { id: 'DEV-002', name: '강남 정문 출구 LPR', type: 'LPR', location: 'Exit', status: 'Online', state: 'Idle', parkingLotId: 'PL-001' },
    { id: 'DEV-003', name: '강남 정문 차단기', type: 'Breaker', location: 'Entry', status: 'Online', state: 'Closed', parkingLotId: 'PL-001' },
    { id: 'DEV-004', name: '강남 정문 출구 차단기', type: 'Breaker', location: 'Exit', status: 'Online', state: 'Closed', parkingLotId: 'PL-001' },
    { id: 'DEV-005', name: '강남 정문 전광판', type: 'Display', location: 'Entry', status: 'Online', state: '만차', parkingLotId: 'PL-001' },
    { id: 'DEV-006', name: '서초 정문 입구 LPR', type: 'LPR', location: 'Entry', status: 'Online', state: 'Idle', parkingLotId: 'PL-002' },
    { id: 'DEV-007', name: '서초 정문 차단기', type: 'Breaker', location: 'Entry', status: 'Offline', state: 'Closed', parkingLotId: 'PL-002' },
    { id: 'DEV-008', name: '강남 B1 정산기', type: 'PayStation', location: 'B1', status: 'Online', state: 'Idle', parkingLotId: 'PL-001' },
    { id: 'DEV-009', name: '강남 B2 정산기', type: 'PayStation', location: 'B2', status: 'Online', state: 'Idle', parkingLotId: 'PL-001' },
    { id: 'DEV-010', name: '서초 1F 정산기', type: 'PayStation', location: '1F', status: 'Online', state: 'Idle', parkingLotId: 'PL-002' },
    { id: 'DEV-011', name: '강남 EV 충전기 #1', type: 'EVCharger', location: 'B1-EV', status: 'Online', state: 'Charging', parkingLotId: 'PL-001' },
    { id: 'DEV-012', name: '강남 EV 충전기 #2', type: 'EVCharger', location: 'B1-EV', status: 'Online', state: 'Idle', parkingLotId: 'PL-001' },
    { id: 'DEV-013', name: '서초 EV 충전기 #1', type: 'EVCharger', location: '1F-EV', status: 'Online', state: 'Charging', parkingLotId: 'PL-002' },
    { id: 'DEV-014', name: '판교 EV 충전기 #1', type: 'EVCharger', location: 'B1-EV', status: 'Offline', state: 'Error', parkingLotId: 'PL-003' },
    { id: 'DEV-015', name: '강남 B1 초음파센서 (50면)', type: 'UltrasonicSensor', location: 'B1', status: 'Online', state: '42/50 점유', parkingLotId: 'PL-001' },
    { id: 'DEV-016', name: '강남 B2 초음파센서 (50면)', type: 'UltrasonicSensor', location: 'B2', status: 'Online', state: '48/50 점유', parkingLotId: 'PL-001' },
    { id: 'DEV-017', name: '서초 1F 초음파센서 (30면)', type: 'UltrasonicSensor', location: '1F', status: 'Online', state: '15/30 점유', parkingLotId: 'PL-002' },
];

// ========================================
// PHI (Parking Health Index) 데이터
// ========================================
const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];
const hourLabels = Array.from({ length: 24 }, (_, i) => `${i}시`);

// 요일(7) × 시간대(24) 점유율 데이터 (0~100)
const generateOccupancyHeatmap = () => {
    const data = [];
    dayLabels.forEach((day, dayIdx) => {
        hourLabels.forEach((hour, hourIdx) => {
            let base;
            const isWeekday = dayIdx < 5;
            if (isWeekday) {
                if (hourIdx >= 8 && hourIdx <= 10) base = 85 + Math.random() * 15;        // 출근 피크
                else if (hourIdx >= 11 && hourIdx <= 14) base = 90 + Math.random() * 10;   // 점심 피크
                else if (hourIdx >= 17 && hourIdx <= 19) base = 80 + Math.random() * 15;   // 퇴근 피크
                else if (hourIdx >= 6 && hourIdx <= 7) base = 40 + Math.random() * 20;     // 이른 아침
                else if (hourIdx >= 20 && hourIdx <= 22) base = 30 + Math.random() * 20;   // 저녁
                else base = 10 + Math.random() * 20;                                        // 심야
            } else {
                if (hourIdx >= 10 && hourIdx <= 16) base = 50 + Math.random() * 25;        // 주말 낮
                else if (hourIdx >= 17 && hourIdx <= 20) base = 40 + Math.random() * 20;   // 주말 저녁
                else base = 10 + Math.random() * 15;                                        // 주말 기타
            }
            data.push({ day, hour, dayIdx, hourIdx, value: Math.round(base) });
        });
    });
    return data;
};

export const phiData = {
    'PL-001': {
        occupancyRate: 84,       // 가동률 (%)
        turnoverRate: 3.2,       // 회전율 (대/면/일)
        avgStayByType: {
            regular: 540,        // 정기권 평균 체류 (분)
            hourly: 145,         // 시간제
            discount: 95,        // 할인권
            free: 480,           // 무료
            daily: 720,          // 일주차
        },
        regularEncroachment: 56, // 정기권 잠식도 (%)
        peakBottleneck: 72,      // 피크 병목 지수 (0~100)
        peakBottleneckType: '정기권',
        grade: 'C',
        gradeLabel: '비효율',
        diagnosis: '정기권 점유가 과도하여 시간제 매출 기회를 잠식 중입니다.',
        heatmapData: generateOccupancyHeatmap(),
    },
    'PL-002': {
        occupancyRate: 50,
        turnoverRate: 4.8,
        avgStayByType: {
            regular: 510,
            hourly: 90,
            discount: 60,
            free: 300,
            daily: 600,
        },
        regularEncroachment: 27,
        peakBottleneck: 38,
        peakBottleneckType: '외부차량',
        grade: 'B',
        gradeLabel: '잠재',
        diagnosis: '비어 있는 시간대에 외부차량 유치 시 추가 매출 가능성이 큽니다.',
        heatmapData: generateOccupancyHeatmap(),
    },
    'PL-003': {
        occupancyRate: 96,
        turnoverRate: 1.5,
        avgStayByType: {
            regular: 600,
            hourly: 320,
            discount: 180,
            free: 540,
            daily: 840,
        },
        regularEncroachment: 75,
        peakBottleneck: 92,
        peakBottleneckType: '정기권',
        grade: 'D',
        gradeLabel: '과밀',
        diagnosis: '피크 시간대 정기권 차량이 95% 이상 점유하여 외부차량 진입이 불가합니다.',
        heatmapData: generateOccupancyHeatmap(),
    },
    ALL: {
        occupancyRate: 86,
        turnoverRate: 2.8,
        avgStayByType: {
            regular: 550,
            hourly: 155,
            discount: 100,
            free: 450,
            daily: 720,
        },
        regularEncroachment: 53,
        peakBottleneck: 67,
        peakBottleneckType: '정기권',
        grade: 'C',
        gradeLabel: '비효율',
        diagnosis: '현재 정기권 점유가 과도하여, 시간제 매출 손실이 발생 중입니다.',
        heatmapData: generateOccupancyHeatmap(),
    }
};

// ========================================
// CIP Flow 데이터
// ========================================
export const cipFlowData = {
    // 시간대별 입출차 건수
    hourlyFlow: hourLabels.map((hour, idx) => {
        let entry, exit;
        if (idx >= 7 && idx <= 9) { entry = 80 + Math.round(Math.random() * 40); exit = 10 + Math.round(Math.random() * 15); }
        else if (idx >= 11 && idx <= 13) { entry = 30 + Math.round(Math.random() * 20); exit = 25 + Math.round(Math.random() * 20); }
        else if (idx >= 17 && idx <= 19) { entry = 10 + Math.round(Math.random() * 15); exit = 70 + Math.round(Math.random() * 40); }
        else if (idx >= 5 && idx <= 6) { entry = 20 + Math.round(Math.random() * 15); exit = 5 + Math.round(Math.random() * 10); }
        else if (idx >= 20 && idx <= 22) { entry = 5 + Math.round(Math.random() * 10); exit = 20 + Math.round(Math.random() * 15); }
        else { entry = 2 + Math.round(Math.random() * 8); exit = 2 + Math.round(Math.random() * 8); }
        return { hour, hourIdx: idx, entry, exit };
    }),
    // 체류시간 분포 (히스토그램)
    stayDistribution: [
        { range: '~30분', count: 120, type: 'short' },
        { range: '30분~1시간', count: 210, type: 'short' },
        { range: '1~2시간', count: 350, type: 'medium' },
        { range: '2~3시간', count: 280, type: 'medium' },
        { range: '3~5시간', count: 190, type: 'long' },
        { range: '5~8시간', count: 310, type: 'long' },
        { range: '8~12시간', count: 420, type: 'overnight' },
        { range: '12시간~', count: 180, type: 'overnight' },
    ],
    // 주차권 유형별 점유 비율
    occupancyByType: [
        { name: '정기권', value: 53, color: '#6366f1' },
        { name: '시간제(일반)', value: 25, color: '#3b82f6' },
        { name: '할인권', value: 10, color: '#10b981' },
        { name: 'EV', value: 7, color: '#f59e0b' },
        { name: '무료/장애인', value: 5, color: '#64748b' },
    ],
    // 장기 체류 비율
    longStayRate: 28.7,
    // 입차→체류→출차 흐름 요약
    flowSummary: {
        totalEntry: 1145,
        avgStay: 245,    // 평균 체류 (분)
        totalExit: 1082,
        currentParked: 63,
    }
};

// ========================================
// 시뮬레이터 기준 데이터
// ========================================
export const simulatorBaseline = {
    hourlyRate: 3000,           // 시간당 기본 요금 (원)
    externalAllowRate: 40,      // 외부차량 허용률 (%)
    regularPassCount: 280,      // 정기권 수량 (대)
    discountRate: 10,           // 평균 할인율 (%)
    monthlyRevenue: 45000000,   // 현재 월 매출 (원)
    monthlyEntryCount: 4500,    // 월 입차 대수
    occupancyRate: 84,          // 가동률 (%)
    turnoverRate: 3.2,          // 회전율
    avgDailyExternal: 120,      // 일평균 외부차량
    regularPassPrice: 150000,   // 정기권 단가 (원)
};

// ========================================
// EV 데이터
// ========================================
export const evData = {
    summary: {
        totalEvSpaces: 95,
        occupiedEvSpaces: 81,
        avgEvStayDuration: 285,       // 분
        avgGeneralStayDuration: 155,  // 분 (비교용)
        evRevenueShare: 4.2,          // EV 매출 기여 (%)
        evOccupancyShare: 8.5,        // EV 점유 비율 (%)
        evEfficiencyScore: 49,        // 0~100 (매출기여/점유 비율)
        chargingUtilization: 72,      // 충전기 이용률 (%)
    },
    // 주차장별 EV 현황
    byLot: [
        { lotId: 'PL-001', lotName: '강남 파이낸스 센터', evSpaces: 30, evOccupied: 25, avgStay: 260, revenueShare: 5.1, chargers: 2, chargingNow: 1 },
        { lotId: 'PL-002', lotName: '서초 마제스타 시티', evSpaces: 15, evOccupied: 8, avgStay: 190, revenueShare: 3.8, chargers: 1, chargingNow: 1 },
        { lotId: 'PL-003', lotName: '판교 테크노벨리 공영', evSpaces: 50, evOccupied: 48, avgStay: 350, revenueShare: 3.2, chargers: 1, chargingNow: 0 },
    ],
    // EV vs 일반 체류시간 비교 (시간대별)
    stayComparison: [
        { hour: '06시', ev: 180, general: 90 },
        { hour: '08시', ev: 320, general: 145 },
        { hour: '10시', ev: 290, general: 120 },
        { hour: '12시', ev: 260, general: 100 },
        { hour: '14시', ev: 300, general: 140 },
        { hour: '16시', ev: 250, general: 110 },
        { hour: '18시', ev: 200, general: 90 },
        { hour: '20시', ev: 340, general: 180 },
    ],
    // EV 존 시뮬레이션 기준
    zoneSimulation: {
        currentEvSpaces: 95,
        totalSpaces: 2000,
        currentTurnover: 1.8,
        projectedTurnoverOnReduce5: 2.1,
        projectedTurnoverOnExpand5: 1.6,
        currentRevenueLoss: 1850000,  // EV 점유로 인한 매출 손실 추정
    },
    // 충전 완료 후 미출차 현황
    overstayAfterCharge: [
        { vehicleNo: '56다 7890', lot: '판교 테크노벨리 공영', chargeEnd: '2026-02-07 10:30', overstayMin: 210 },
        { vehicleNo: '12가 3456', lot: '강남 파이낸스 센터', chargeEnd: '2026-02-07 11:00', overstayMin: 150 },
    ]
};

// ========================================
// 대시보드 Action Card 데이터
// ========================================
export const dashboardActions = [
    { id: 'ACT-001', icon: 'chart', color: 'blue', message: '평일 14~17시 외부차량 +15% 허용 권장', impact: '월 +480만원 예상', link: '/revenue-simulator' },
    { id: 'ACT-002', icon: 'dollar', color: 'green', message: '야간 요금 +1,000원 시 월 +320만원 가능', impact: '가동률 영향 -2%', link: '/revenue-simulator' },
    { id: 'ACT-003', icon: 'ev', color: 'amber', message: 'EV 존 2면 축소 시 회전율 +8% 예상', impact: '충전 대기 +15분', link: '/ev-analysis' },
];
