export const users = [
    { id: 1, name: '김철수', email: 'chulsoo.kim@parkplay.com', role: 'SUPER_ADMIN', tenant: '본사', status: 'Active' },
    { id: 2, name: '이영희', email: 'younghee.lee@parkingcorp.co.kr', role: 'OPERATOR', tenant: '서울주차관리(주)', status: 'Active' },
    { id: 3, name: '박민수', email: 'minsoo.park@site-a.com', role: 'FIELD_MANAGER', tenant: '강남점', status: 'Active' },
    { id: 4, name: '최지혜', email: 'jihye.choi@finance.com', role: 'ACCOUNTANT', tenant: '서울주차관리(주)', status: 'Inactive' },
];

export const roles = [
    { code: 'SUPER_ADMIN', name: '슈퍼 어드민', description: '전체 시스템 관리 및 설정' },
    { code: 'OPERATOR', name: '운영사 관리자', description: '다수 주차장 통합 운영 및 정산 관리' },
    { code: 'FIELD_MANAGER', name: '현장 관리자', description: '개별 주차장 입출차 관제 및 장비 제어' },
    { code: 'ACCOUNTANT', name: '회계 담당자', description: '매출 조회 및 세무 증빙 관리' },
];

export const systemHealth = {
    lpr: { status: 'operational', message: '정상 작동 중', lastCheck: '방금 전', latency: '45ms' },
    pg: { status: 'operational', message: '결제 모듈 정상', lastCheck: '1분 전', latency: '120ms' },
    erp: { status: 'degraded', message: '지연 발생 (배치 대기 중)', lastCheck: '10분 전', latency: '2500ms' },
};

export const parkingLots = [
    {
        id: 'PL-001',
        name: '강남 파이낸스 센터',
        address: '서울시 강남구 테헤란로 152',
        owner: 'GFC 자산관리',
        totalSpaces: 500,
        currentOccupancy: 420,
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
        status: 'Maintenance',
        type: 'Public'
    },
];

export const entryExitLogs = [
    { id: 'LOG-001', vehicleNo: '12가 3456', parkingLot: '강남 파이낸스 센터', entryTime: '2026-02-07 08:30:00', exitTime: '-', status: 'Parked', fee: 0, image: 'https://placehold.co/150' },
    { id: 'LOG-002', vehicleNo: '34나 5678', parkingLot: '서초 마제스타 시티', entryTime: '2026-02-07 07:15:00', exitTime: '2026-02-07 08:45:00', status: 'Exited', fee: 5000, image: 'https://placehold.co/150' },
    { id: 'LOG-003', vehicleNo: '56다 7890', parkingLot: '판교 테크노벨리 공영', entryTime: '2026-02-06 18:00:00', exitTime: '-', status: 'Parked', fee: 0, image: 'https://placehold.co/150' },
    { id: 'LOG-004', vehicleNo: '78라 1234', parkingLot: '강남 파이낸스 센터', entryTime: '2026-02-06 14:00:00', exitTime: '2026-02-06 16:30:00', status: 'Paid', fee: 12000, image: 'https://placehold.co/150' },
    { id: 'LOG-005', vehicleNo: '90마 5678', parkingLot: '서초 마제스타 시티', entryTime: '2026-02-06 09:00:00', exitTime: '2026-02-06 18:00:00', status: 'Exited', fee: 25000, image: 'https://placehold.co/150' },
];

export const feePolicies = [
    { id: 'POL-001', name: '일반 요금 (강남점)', type: 'Time-based', baseTime: 30, baseRate: 3000, unitTime: 10, unitRate: 1000, maxDaily: 50000, gracePeriod: 10, isActive: true },
    { id: 'POL-002', name: '야간 할인 (강남점)', type: 'Flat-rate', baseTime: 0, baseRate: 10000, unitTime: 0, unitRate: 0, maxDaily: 10000, gracePeriod: 0, isActive: true },
    { id: 'POL-003', name: '표준 요금 (판교)', type: 'Time-based', baseTime: 60, baseRate: 0, unitTime: 10, unitRate: 500, maxDaily: 20000, gracePeriod: 20, isActive: false },
];

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
