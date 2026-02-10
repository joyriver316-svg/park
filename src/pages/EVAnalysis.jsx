import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    Zap,
    Battery,
    Clock,
    TrendingUp,
    AlertTriangle,
    Download,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { evData, parkingLots } from '../data/mockData';
import { exportToCSV } from '../utils/exportUtils';

const EVAnalysis = () => {
    const [selectedLotId, setSelectedLotId] = useState('ALL');

    const summary = evData.summary;
    const zone = evData.zoneSimulation;

    const handleExport = () => {
        const rows = evData.byLot.map(lot => ({
            주차장: lot.lotName,
            'EV 면수': lot.evSpaces,
            점유: lot.evOccupied,
            평균체류: `${lot.avgStay}분`,
            매출기여: `${lot.revenueShare}%`,
            충전기: lot.chargers,
            충전중: lot.chargingNow,
        }));
        exportToCSV(rows, 'ev_analysis');
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg text-sm">
                    <p className="font-bold text-slate-800 mb-1">{label}</p>
                    {payload.map((p, i) => (
                        <p key={i} style={{ color: p.color }}>
                            {p.name}: {p.value}분
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
                        <h2 className="text-2xl font-bold text-slate-800">EV & 특수차량 분석</h2>
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
                    <p className="text-sm text-slate-500 mt-1">EV 전용 구역이 수익에 미치는 영향을 분석하고 최적 배분을 제안합니다</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <Download size={16} />
                    EV 리포트
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={14} className="text-amber-500" />
                        <span className="text-xs font-semibold text-slate-500">EV 전용 면수</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{summary.totalEvSpaces}면</span>
                    <p className="text-[10px] text-slate-400 mt-1">점유: {summary.occupiedEvSpaces}면 ({Math.round(summary.occupiedEvSpaces / summary.totalEvSpaces * 100)}%)</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <Clock size={14} className="text-blue-500" />
                        <span className="text-xs font-semibold text-slate-500">EV 평균 체류</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{Math.round(summary.avgEvStayDuration / 60 * 10) / 10}시간</span>
                    <p className="text-[10px] text-slate-400 mt-1">일반: {Math.round(summary.avgGeneralStayDuration / 60 * 10) / 10}시간</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={14} className="text-emerald-500" />
                        <span className="text-xs font-semibold text-slate-500">매출 기여도</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{summary.evRevenueShare}%</span>
                    <p className="text-[10px] text-slate-400 mt-1">점유 비중: {summary.evOccupancyShare}%</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <Battery size={14} className="text-purple-500" />
                        <span className="text-xs font-semibold text-slate-500">충전기 이용률</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{summary.chargingUtilization}%</span>
                    <p className="text-[10px] text-slate-400 mt-1">효율 점수: {summary.evEfficiencyScore}/100</p>
                </div>
            </div>

            {/* EV 효율 진단 */}
            <div className={`p-4 rounded-xl border ${summary.evEfficiencyScore < 50 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
                <div className="flex items-center gap-3">
                    {summary.evEfficiencyScore < 50 ? (
                        <AlertTriangle size={18} className="text-amber-600" />
                    ) : (
                        <Zap size={18} className="text-emerald-600" />
                    )}
                    <p className={`text-sm font-medium ${summary.evEfficiencyScore < 50 ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {summary.evEfficiencyScore < 50
                            ? `EV 구역이 점유 비중(${summary.evOccupancyShare}%) 대비 매출 기여(${summary.evRevenueShare}%)가 낮아 비효율 구간입니다.`
                            : `EV 구역 효율이 양호합니다. 점유 대비 매출 기여가 적절한 수준입니다.`}
                    </p>
                </div>
            </div>

            {/* 체류시간 비교 차트 + 주차장별 현황 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* EV vs 일반 체류시간 비교 */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm">EV vs 일반 차량 체류시간 비교</h3>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={evData.stayComparison}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} unit="분" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: 12 }} />
                                <Line type="monotone" dataKey="ev" name="EV 차량" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3 }} />
                                <Line type="monotone" dataKey="general" name="일반 차량" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 주차장별 EV 현황 */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-3 text-sm">주차장별 EV 현황</h3>
                    <div className="space-y-3">
                        {evData.byLot.map(lot => (
                            <div key={lot.lotId} className="p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                                <p className="text-xs font-bold text-slate-800 mb-2">{lot.lotName}</p>
                                <div className="grid grid-cols-2 gap-1 text-[10px]">
                                    <span className="text-slate-400">EV 면수</span>
                                    <span className="text-right font-bold text-slate-600">{lot.evOccupied}/{lot.evSpaces}</span>
                                    <span className="text-slate-400">평균 체류</span>
                                    <span className="text-right font-bold text-slate-600">{Math.round(lot.avgStay / 60 * 10) / 10}시간</span>
                                    <span className="text-slate-400">매출 기여</span>
                                    <span className="text-right font-bold text-slate-600">{lot.revenueShare}%</span>
                                    <span className="text-slate-400">충전기</span>
                                    <span className="text-right font-bold text-slate-600">{lot.chargingNow}/{lot.chargers} 가동</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* EV존 시뮬레이션 + 충전 후 미출차 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* EV존 시뮬레이션 */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm">EV 존 면수 조정 시뮬레이션</h3>
                    <div className="space-y-4">
                        <div className="text-center py-2">
                            <span className="text-xs text-slate-500">현재 EV 전용</span>
                            <p className="text-3xl font-black text-slate-900">{zone.currentEvSpaces}면</p>
                            <span className="text-xs text-slate-400">/ 전체 {zone.totalSpaces}면</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <ArrowDownRight size={14} className="text-emerald-600" />
                                    <span className="text-xs font-bold text-emerald-700">5면 축소 시</span>
                                </div>
                                <p className="text-lg font-bold text-emerald-700">{zone.projectedTurnoverOnReduce5}회전</p>
                                <p className="text-[10px] text-emerald-600 mt-0.5">회전율 +{((zone.projectedTurnoverOnReduce5 - zone.currentTurnover) / zone.currentTurnover * 100).toFixed(0)}%</p>
                            </div>
                            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <ArrowUpRight size={14} className="text-rose-600" />
                                    <span className="text-xs font-bold text-rose-700">5면 확대 시</span>
                                </div>
                                <p className="text-lg font-bold text-rose-700">{zone.projectedTurnoverOnExpand5}회전</p>
                                <p className="text-[10px] text-rose-600 mt-0.5">회전율 {((zone.projectedTurnoverOnExpand5 - zone.currentTurnover) / zone.currentTurnover * 100).toFixed(0)}%</p>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                            <p className="text-xs font-medium text-amber-700">
                                EV 점유로 인한 추정 매출 손실: <span className="font-bold">₩{(zone.currentRevenueLoss / 10000).toFixed(0)}만/월</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* 충전 완료 후 미출차 */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm">충전 완료 후 미출차 현황</h3>
                    {evData.overstayAfterCharge.length > 0 ? (
                        <div className="space-y-3">
                            {evData.overstayAfterCharge.map((item, idx) => (
                                <div key={idx} className="p-3 rounded-lg border border-rose-200 bg-rose-50">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold text-rose-800">{item.vehicleNo}</span>
                                        <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                                            +{Math.round(item.overstayMin / 60 * 10) / 10}시간 초과
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-rose-600">{item.lot}</p>
                                    <p className="text-[10px] text-rose-500">충전 완료: {item.chargeEnd}</p>
                                </div>
                            ))}
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                                <p className="text-xs text-slate-600">
                                    충전 완료 후 장기 점유 차량에 대한 추가 과금 또는 알림 정책을 검토하세요.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-400 text-sm">
                            현재 미출차 차량이 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EVAnalysis;
