import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
    Sliders,
    DollarSign,
    TrendingUp,
    TrendingDown,
    RotateCcw,
    Download
} from 'lucide-react';
import { simulatorBaseline } from '../data/mockData';
import { exportToCSV } from '../utils/exportUtils';

const RevenueSimulator = () => {
    const [params, setParams] = useState({
        hourlyRate: simulatorBaseline.hourlyRate,
        externalAllowRate: simulatorBaseline.externalAllowRate,
        regularPassCount: simulatorBaseline.regularPassCount,
        discountRate: simulatorBaseline.discountRate,
    });

    const handleChange = (key, value) => {
        setParams(prev => ({ ...prev, [key]: Number(value) }));
    };

    const handleReset = () => {
        setParams({
            hourlyRate: simulatorBaseline.hourlyRate,
            externalAllowRate: simulatorBaseline.externalAllowRate,
            regularPassCount: simulatorBaseline.regularPassCount,
            discountRate: simulatorBaseline.discountRate,
        });
    };

    // 시뮬레이션 계산
    const simulation = useMemo(() => {
        const base = simulatorBaseline;

        // 시간제 매출: (외부 허용률 변화 × 일평균 외부차량) × 시간당 요금 × 평균 체류 × 30일
        const externalRateChange = params.externalAllowRate / base.externalAllowRate;
        const rateChange = params.hourlyRate / base.hourlyRate;
        const avgStayHours = 2.5;
        const hourlyRevenue = base.avgDailyExternal * externalRateChange * params.hourlyRate * avgStayHours * 30;

        // 정기권 매출: 정기권 수 × 단가
        const regularRevenue = params.regularPassCount * base.regularPassPrice;

        // 할인 영향
        const discountFactor = 1 - (params.discountRate - base.discountRate) / 100;

        // 총 예상 매출
        const projectedRevenue = Math.round((hourlyRevenue + regularRevenue) * discountFactor);
        const currentRevenue = base.monthlyRevenue;
        const diff = projectedRevenue - currentRevenue;
        const diffPercent = ((diff / currentRevenue) * 100).toFixed(1);

        // 예상 가동률
        const occupancyChange = (params.externalAllowRate - base.externalAllowRate) * 0.3
            + (params.regularPassCount - base.regularPassCount) * 0.02;
        const projectedOccupancy = Math.min(100, Math.max(0, Math.round(base.occupancyRate + occupancyChange)));

        // 예상 회전율
        const turnoverChange = (params.externalAllowRate - base.externalAllowRate) * 0.02
            - (params.regularPassCount - base.regularPassCount) * 0.001;
        const projectedTurnover = Math.max(0.5, Math.round((base.turnoverRate + turnoverChange) * 10) / 10);

        return {
            projectedRevenue,
            currentRevenue,
            diff,
            diffPercent,
            projectedOccupancy,
            projectedTurnover,
        };
    }, [params]);

    const chartData = [
        { name: '현재 매출', value: simulation.currentRevenue, color: '#94A3B8' },
        { name: '예상 매출', value: simulation.projectedRevenue, color: simulation.diff >= 0 ? '#3B82F6' : '#EF4444' },
    ];

    const sliders = [
        {
            key: 'hourlyRate',
            label: '시간당 기본 요금',
            unit: '원',
            min: 1000,
            max: 10000,
            step: 500,
            format: (v) => `₩${v.toLocaleString()}`,
        },
        {
            key: 'externalAllowRate',
            label: '외부차량 허용률',
            unit: '%',
            min: 0,
            max: 100,
            step: 5,
            format: (v) => `${v}%`,
        },
        {
            key: 'regularPassCount',
            label: '정기권 수량',
            unit: '대',
            min: 0,
            max: 500,
            step: 10,
            format: (v) => `${v}대`,
        },
        {
            key: 'discountRate',
            label: '평균 할인율',
            unit: '%',
            min: 0,
            max: 50,
            step: 1,
            format: (v) => `${v}%`,
        },
    ];

    const handleExport = () => {
        const rows = [
            { 항목: '현재 월 매출', 값: `₩${simulation.currentRevenue.toLocaleString()}` },
            { 항목: '예상 월 매출', 값: `₩${simulation.projectedRevenue.toLocaleString()}` },
            { 항목: '차이', 값: `₩${simulation.diff.toLocaleString()} (${simulation.diffPercent}%)` },
            { 항목: '시간당 요금', 값: `₩${params.hourlyRate.toLocaleString()}` },
            { 항목: '외부 허용률', 값: `${params.externalAllowRate}%` },
            { 항목: '정기권 수량', 값: `${params.regularPassCount}대` },
            { 항목: '할인율', 값: `${params.discountRate}%` },
        ];
        exportToCSV(rows, 'revenue_simulation');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">수익 정책 시뮬레이터</h2>
                    <p className="text-sm text-slate-500 mt-1">요금·정기권·외부차량 정책 변경 시 수익 변화를 실시간으로 예측합니다</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        <RotateCcw size={16} />
                        초기화
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        <Download size={16} />
                        내보내기
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: 슬라이더 */}
                <div className="space-y-5">
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Sliders size={16} className="text-blue-500" />
                            <h3 className="font-bold text-slate-800 text-sm">정책 파라미터</h3>
                        </div>
                        <div className="space-y-6">
                            {sliders.map(slider => {
                                const isChanged = params[slider.key] !== simulatorBaseline[slider.key];
                                return (
                                    <div key={slider.key}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label className="text-xs font-semibold text-slate-600">{slider.label}</label>
                                            <span className={`text-sm font-bold ${isChanged ? 'text-blue-600' : 'text-slate-800'}`}>
                                                {slider.format(params[slider.key])}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min={slider.min}
                                            max={slider.max}
                                            step={slider.step}
                                            value={params[slider.key]}
                                            onChange={(e) => handleChange(slider.key, e.target.value)}
                                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                                            <span>{slider.format(slider.min)}</span>
                                            <span className="text-slate-300">기준: {slider.format(simulatorBaseline[slider.key])}</span>
                                            <span>{slider.format(slider.max)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: 결과 */}
                <div className="lg:col-span-2 space-y-4">
                    {/* 결과 카드 3개 */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-semibold text-slate-500">예상 월 매출</p>
                            <p className="text-xl font-bold text-slate-900 mt-1">
                                ₩{(simulation.projectedRevenue / 10000).toFixed(0)}만
                            </p>
                            <div className={`flex items-center mt-1.5 text-xs font-medium ${simulation.diff >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {simulation.diff >= 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                                <span>{simulation.diff >= 0 ? '+' : ''}{simulation.diffPercent}%</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-semibold text-slate-500">예상 가동률</p>
                            <p className="text-xl font-bold text-slate-900 mt-1">{simulation.projectedOccupancy}%</p>
                            <p className="text-[10px] text-slate-400 mt-1.5">현재: {simulatorBaseline.occupancyRate}%</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-semibold text-slate-500">예상 회전율</p>
                            <p className="text-xl font-bold text-slate-900 mt-1">{simulation.projectedTurnover}</p>
                            <p className="text-[10px] text-slate-400 mt-1.5">현재: {simulatorBaseline.turnoverRate}</p>
                        </div>
                    </div>

                    {/* 비교 차트 */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 text-sm">현재 vs 예상 매출 비교</h3>
                        <div className="h-56">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                                    <XAxis
                                        type="number"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#64748B' }}
                                        tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`}
                                    />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#64748B' }}
                                        width={80}
                                    />
                                    <Tooltip
                                        formatter={(v) => [`₩${v.toLocaleString()}`, '매출']}
                                        contentStyle={{ fontSize: 12, borderRadius: 8 }}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={36}>
                                        {chartData.map((entry, idx) => (
                                            <Cell key={idx} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 변화 요약 */}
                    <div className={`p-4 rounded-xl border ${simulation.diff >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                        <div className="flex items-start gap-3">
                            <DollarSign size={18} className={simulation.diff >= 0 ? 'text-emerald-600' : 'text-rose-600'} />
                            <div>
                                <p className={`text-sm font-bold ${simulation.diff >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                                    {simulation.diff >= 0 ? '수익 증가 예상' : '수익 감소 예상'}
                                </p>
                                <p className={`text-xs mt-1 ${simulation.diff >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    현재 대비 월 {simulation.diff >= 0 ? '+' : ''}{(simulation.diff / 10000).toFixed(0)}만원
                                    ({simulation.diffPercent}%) 변화가 예상됩니다.
                                    {simulation.diff >= 0
                                        ? ' 해당 정책을 검토해보세요.'
                                        : ' 파라미터를 다시 조정해보세요.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueSimulator;
