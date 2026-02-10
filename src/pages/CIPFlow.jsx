import React, { useState } from 'react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    ArrowRightLeft,
    Clock,
    ParkingCircle,
    TrendingUp,
    Download
} from 'lucide-react';
import { cipFlowData, parkingLots } from '../data/mockData';
import { exportToCSV } from '../utils/exportUtils';

const CIPFlow = () => {
    const [selectedLotId, setSelectedLotId] = useState('ALL');

    const flow = cipFlowData;

    const handleExport = () => {
        const rows = flow.hourlyFlow.map(h => ({
            시간대: h.hour,
            입차: h.entry,
            출차: h.exit,
        }));
        exportToCSV(rows, `cip_flow_${selectedLotId}`);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg text-sm">
                    <p className="font-bold text-slate-800 mb-1">{label}</p>
                    {payload.map((p, i) => (
                        <p key={i} style={{ color: p.color }}>
                            {p.name}: {p.value}대
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-slate-800">CIP 흐름 분석</h2>
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
                    <p className="text-sm text-slate-500 mt-1">입차 → 체류 → 출차의 흐름에서 숨은 가치를 찾습니다</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <Download size={16} />
                    흐름 데이터
                </button>
            </div>

            {/* 요약 카드 4개 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <ArrowRightLeft size={14} className="text-blue-500" />
                        <span className="text-xs font-semibold text-slate-500">총 입차</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{flow.flowSummary.totalEntry.toLocaleString()}대</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <Clock size={14} className="text-emerald-500" />
                        <span className="text-xs font-semibold text-slate-500">평균 체류</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{Math.round(flow.flowSummary.avgStay / 60 * 10) / 10}시간</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <ArrowRightLeft size={14} className="text-purple-500" />
                        <span className="text-xs font-semibold text-slate-500">총 출차</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{flow.flowSummary.totalExit.toLocaleString()}대</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <ParkingCircle size={14} className="text-amber-500" />
                        <span className="text-xs font-semibold text-slate-500">현재 주차 중</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{flow.flowSummary.currentParked}대</span>
                </div>
            </div>

            {/* 시간대별 입출차 + 유형별 점유 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* 시간대별 입출차 AreaChart */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm">시간대별 입출차 흐름</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={flow.hourlyFlow}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: 12 }} />
                                <Area type="monotone" dataKey="entry" name="입차" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.15} strokeWidth={2} />
                                <Area type="monotone" dataKey="exit" name="출차" stroke="#F97316" fill="#F97316" fillOpacity={0.15} strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 유형별 점유 비율 PieChart */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm">유형별 점유 비율</h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={flow.occupancyByType}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={75}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {flow.occupancyByType.map((entry, idx) => (
                                        <Cell key={idx} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value}%`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-1.5 mt-2">
                        {flow.occupancyByType.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-slate-600">{item.name}</span>
                                </div>
                                <span className="font-bold text-slate-800">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 체류시간 분포 히스토그램 + 장기 체류 분석 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* 체류시간 분포 */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm">체류시간 분포</h3>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={flow.stayDistribution}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                                <Tooltip
                                    formatter={(value) => [`${value}건`, '건수']}
                                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                                />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
                                    {flow.stayDistribution.map((entry, idx) => {
                                        const colors = { short: '#3B82F6', medium: '#10B981', long: '#F59E0B', overnight: '#EF4444' };
                                        return <Cell key={idx} fill={colors[entry.type] || '#3B82F6'} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex gap-4 mt-2 text-[10px] text-slate-500 justify-end">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />단기</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />중기</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />장기</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />야간/장박</span>
                    </div>
                </div>

                {/* 장기 체류 분석 */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm">장기 체류 분석</h3>
                    <div className="text-center py-4">
                        <div className="text-4xl font-black text-slate-900">{flow.longStayRate}%</div>
                        <div className="text-sm text-slate-500 mt-1">5시간 이상 체류 비율</div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <div className="flex items-start gap-2">
                            <TrendingUp size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-medium text-amber-700">숨은 가치 발견</p>
                                <p className="text-[11px] text-amber-600 mt-1">
                                    장기 체류 차량의 {flow.longStayRate}%가 비수익 점유입니다.
                                    시간제 전환 시 추가 수익이 기대됩니다.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">5~8시간</span>
                            <span className="font-bold text-slate-700">
                                {flow.stayDistribution.find(d => d.range === '5~8시간')?.count || 0}건
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">8~12시간</span>
                            <span className="font-bold text-slate-700">
                                {flow.stayDistribution.find(d => d.range === '8~12시간')?.count || 0}건
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">12시간 이상</span>
                            <span className="font-bold text-slate-700">
                                {flow.stayDistribution.find(d => d.range === '12시간~')?.count || 0}건
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CIPFlow;
