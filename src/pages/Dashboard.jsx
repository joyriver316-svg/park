import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
    Activity,
    DollarSign,
    ShieldCheck,
    PieChart as PieChartIcon,
    TrendingUp,
    ArrowRight,
    Zap,
    BarChart3,
    Download
} from 'lucide-react';
import { parkingLots, entryExitLogs, revenueData, phiData, dashboardActions } from '../data/mockData';
import { exportToCSV } from '../utils/exportUtils';

const gradeColors = {
    A: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    B: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    C: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    D: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
};

const actionIconMap = {
    chart: BarChart3,
    dollar: DollarSign,
    ev: Zap,
};

const actionColorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedLotId, setSelectedLotId] = useState('ALL');

    const phi = phiData[selectedLotId] || phiData.ALL;

    const dashboardData = useMemo(() => {
        let relevantLogs = entryExitLogs;
        if (selectedLotId !== 'ALL') {
            relevantLogs = entryExitLogs.filter(log => log.parkingLotId === selectedLotId);
        }
        const recentLogs = relevantLogs.slice(0, 5);

        // 이번 달 예상 매출: 일평균 × 28일
        const dailyAvg = revenueData.daily.reduce((a, d) => a + d.amount, 0) / revenueData.daily.length;
        const projectedMonthly = Math.round(dailyAvg * 28);
        const lastMonth = revenueData.monthly[revenueData.monthly.length - 1].amount;
        const revenueChange = ((projectedMonthly - lastMonth) / lastMonth * 100).toFixed(1);

        return { projectedMonthly, revenueChange, recentLogs };
    }, [selectedLotId]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg text-sm">
                    <p className="font-bold text-slate-800 mb-1">{label}</p>
                    <p className="text-blue-600">매출: {new Intl.NumberFormat('ko-KR').format(payload[0].value)}원</p>
                </div>
            );
        }
        return null;
    };

    const handleExport = () => {
        const summaryData = [
            { 카테고리: '이번주 평균 가동률', 값: `${phi.occupancyRate}%` },
            { 카테고리: '이번 달 예상 매출', 값: `₩${dashboardData.projectedMonthly.toLocaleString()}` },
            { 카테고리: 'PHI 건강지수', 값: `${phi.grade} (${phi.gradeLabel})` },
            { 카테고리: 'CIP 비효율 점유율', 값: `${phi.regularEncroachment}%` },
            { 카테고리: '작성일시', 값: new Date().toLocaleString() }
        ];
        exportToCSV(summaryData, 'dashboard_summary');
    };

    const gc = gradeColors[phi.grade] || gradeColors.C;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-slate-800">대시보드</h2>
                        <select
                            value={selectedLotId}
                            onChange={(e) => setSelectedLotId(e.target.value)}
                            className="px-3 py-1.5 bg-slate-100 border-none rounded-lg text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="ALL">전체 주차장</option>
                            {parkingLots.map(lot => (
                                <option key={lot.id} value={lot.id}>{lot.name}</option>
                            ))}
                        </select>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">이 주차장은 지금 돈을 잘 벌고 있는가?</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <Download size={16} />
                    리포트 내보내기
                </button>
            </div>

            {/* KPI Cards - 기획 4개 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 이번주 평균 가동률 */}
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 tracking-wide">이번주 평균 가동률</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1.5">{phi.occupancyRate}%</h3>
                            <div className="mt-2">
                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                    <div className={`h-1.5 rounded-full ${phi.occupancyRate > 90 ? 'bg-rose-500' : phi.occupancyRate > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${phi.occupancyRate}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
                            <Activity size={20} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* 이번 달 예상 매출 */}
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 tracking-wide">이번 달 예상 매출</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1.5">₩{(dashboardData.projectedMonthly / 10000).toFixed(0)}만</h3>
                            <div className={`flex items-center mt-2 text-xs font-medium ${Number(dashboardData.revenueChange) >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'} px-1.5 py-0.5 rounded-full inline-flex`}>
                                <span>{Number(dashboardData.revenueChange) >= 0 ? '+' : ''}{dashboardData.revenueChange}%</span>
                                <span className="ml-1 text-slate-400 font-normal">vs 지난달</span>
                            </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
                            <DollarSign size={20} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* PHI 건강지수 */}
                <div className={`bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow ${gc.border}`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 tracking-wide">PHI 건강지수</p>
                            <div className="flex items-baseline gap-2 mt-1.5">
                                <h3 className={`text-3xl font-black ${gc.text}`}>{phi.grade}</h3>
                                <span className={`text-sm font-bold ${gc.text}`}>{phi.gradeLabel}</span>
                            </div>
                            <button onClick={() => navigate('/parking-health')} className="mt-2 text-xs text-blue-600 font-medium hover:underline">
                                상세 보기 →
                            </button>
                        </div>
                        <div className={`p-2.5 rounded-lg ${gc.bg} ${gc.text}`}>
                            <ShieldCheck size={20} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* CIP 비효율 점유율 */}
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 tracking-wide">정기권 잠식도</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1.5">{phi.regularEncroachment}%</h3>
                            <div className="mt-2">
                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                    <div className={`h-1.5 rounded-full ${phi.regularEncroachment > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${phi.regularEncroachment}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 text-slate-600">
                            <PieChartIcon size={20} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 한 문장 진단 */}
            <div className={`p-4 rounded-xl border ${gc.border} ${gc.bg}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${gc.text} bg-white border ${gc.border}`}>
                        {phi.grade}
                    </div>
                    <p className={`text-sm font-medium ${gc.text}`}>{phi.diagnosis}</p>
                </div>
            </div>

            {/* 매출 차트 + 최근 입출차 + Action Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* 매출 차트 (실구현) */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm">주간 매출 추이</h3>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData.daily}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(v) => `${v / 10000}만`} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
                                <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={36} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 최근 입출차 이력 */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-3 text-sm">최근 입출차 이력</h3>
                    <div className="space-y-3">
                        {dashboardData.recentLogs.length > 0 ? (
                            dashboardData.recentLogs.map((log) => (
                                <div key={log.id} className="flex items-center gap-3 py-1.5 border-b border-slate-100 last:border-0">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[10px]">
                                        {log.vehicleNo.slice(-4)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-slate-800">{log.vehicleNo} {log.status === 'Exited' || log.status === 'Paid' ? '출차' : '입차'}</p>
                                        <p className="text-[10px] text-slate-500">{log.entryTime.split(' ')[1]} • {log.parkingLot}</p>
                                    </div>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${log.ticketType === 'regular' ? 'bg-purple-100 text-purple-700' : log.ticketType === 'ev' || log.vehicleType === 'ev' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {log.ticketType === 'regular' ? '정기' : log.ticketType === 'hourly' ? '시간' : log.ticketType === 'discount' ? '할인' : log.ticketType === 'free' ? '무료' : log.ticketType === 'daily' ? '일주차' : log.ticketType}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4 text-slate-400 text-xs">데이터가 없습니다.</div>
                        )}
                    </div>
                    <button onClick={() => navigate('/logs')} className="w-full mt-3 py-1.5 text-xs text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                        전체 보기
                    </button>
                </div>
            </div>

            {/* 오늘의 액션 제안 (Action Cards) */}
            <div>
                <h3 className="font-bold text-slate-800 mb-3 text-sm">오늘의 액션 제안</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dashboardActions.map((action) => {
                        const IconComp = actionIconMap[action.icon] || TrendingUp;
                        const colorClass = actionColorMap[action.color] || actionColorMap.blue;
                        return (
                            <div
                                key={action.id}
                                onClick={() => navigate(action.link)}
                                className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ${colorClass}`}
                            >
                                <div className="flex items-start gap-3">
                                    <IconComp size={20} className="mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium leading-snug">{action.message}</p>
                                        <p className="text-xs mt-1.5 opacity-75">{action.impact}</p>
                                    </div>
                                    <ArrowRight size={16} className="mt-0.5 flex-shrink-0 opacity-50" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
