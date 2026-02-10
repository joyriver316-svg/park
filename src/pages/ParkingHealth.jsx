import React, { useState } from 'react';
import {
    Activity,
    RefreshCw,
    Clock,
    PieChart as PieChartIcon,
    AlertTriangle,
    ShieldCheck,
    Download,
    ChevronRight
} from 'lucide-react';
import { parkingLots, phiData } from '../data/mockData';
import { exportToCSV } from '../utils/exportUtils';

const gradeColors = {
    A: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', bar: 'bg-emerald-500' },
    B: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', bar: 'bg-blue-500' },
    C: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', bar: 'bg-amber-500' },
    D: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', bar: 'bg-rose-500' },
};

const stayTypeLabels = {
    regular: '정기권',
    hourly: '시간제',
    discount: '할인권',
    free: '무료',
    daily: '일주차',
};

const stayTypeColors = {
    regular: 'bg-indigo-500',
    hourly: 'bg-blue-500',
    discount: 'bg-emerald-500',
    free: 'bg-slate-400',
    daily: 'bg-amber-500',
};

const getHeatmapColor = (value) => {
    if (value <= 20) return 'bg-blue-100 text-blue-800';
    if (value <= 40) return 'bg-blue-200 text-blue-900';
    if (value <= 60) return 'bg-yellow-200 text-yellow-900';
    if (value <= 80) return 'bg-orange-300 text-orange-900';
    if (value <= 90) return 'bg-red-400 text-white';
    return 'bg-red-600 text-white';
};

const ParkingHealth = () => {
    const [selectedLotId, setSelectedLotId] = useState('PL-001');

    const phi = phiData[selectedLotId] || phiData.ALL;
    const gc = gradeColors[phi.grade] || gradeColors.C;

    const maxStay = Math.max(...Object.values(phi.avgStayByType));

    const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];
    const hourLabels = Array.from({ length: 24 }, (_, i) => `${i}`);

    // 히트맵 데이터를 7×24 매트릭스로 변환
    const heatmapMatrix = [];
    dayLabels.forEach((_, dayIdx) => {
        const row = phi.heatmapData.filter(d => d.dayIdx === dayIdx).sort((a, b) => a.hourIdx - b.hourIdx);
        heatmapMatrix.push(row);
    });

    const handleExport = () => {
        const rows = [
            { 항목: '등급', 값: `${phi.grade} (${phi.gradeLabel})` },
            { 항목: '가동률', 값: `${phi.occupancyRate}%` },
            { 항목: '회전율', 값: `${phi.turnoverRate}대/면/일` },
            { 항목: '정기권 잠식도', 값: `${phi.regularEncroachment}%` },
            { 항목: '피크 병목 지수', 값: `${phi.peakBottleneck}` },
            { 항목: '진단', 값: phi.diagnosis },
        ];
        exportToCSV(rows, `phi_${selectedLotId}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-slate-800">PHI 주차장 건강지수</h2>
                        <select
                            value={selectedLotId}
                            onChange={(e) => setSelectedLotId(e.target.value)}
                            className="px-3 py-1.5 bg-slate-100 border-none rounded-lg text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500"
                        >
                            {parkingLots.map(lot => (
                                <option key={lot.id} value={lot.id}>{lot.name}</option>
                            ))}
                        </select>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">주차장의 운영 효율을 5가지 지표로 진단합니다</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <Download size={16} />
                    PHI 리포트
                </button>
            </div>

            {/* 한 문장 진단 */}
            <div className={`p-4 rounded-xl border ${gc.border} ${gc.bg}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${gc.text} bg-white border-2 ${gc.border}`}>
                        {phi.grade}
                    </div>
                    <div>
                        <span className={`text-xs font-bold ${gc.text}`}>{phi.gradeLabel}</span>
                        <p className={`text-sm font-medium ${gc.text}`}>{phi.diagnosis}</p>
                    </div>
                </div>
            </div>

            {/* 2-Column: 지표 카드 + 히트맵 */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Left: 5개 지표 */}
                <div className="lg:col-span-2 space-y-4">
                    {/* 가동률 */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity size={16} className="text-indigo-500" />
                            <span className="text-xs font-semibold text-slate-500">가동률</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-slate-900">{phi.occupancyRate}%</span>
                        </div>
                        <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${phi.occupancyRate > 90 ? 'bg-rose-500' : phi.occupancyRate > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                style={{ width: `${phi.occupancyRate}%` }}
                            />
                        </div>
                    </div>

                    {/* 회전율 */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <RefreshCw size={16} className="text-blue-500" />
                            <span className="text-xs font-semibold text-slate-500">회전율</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-slate-900">{phi.turnoverRate}</span>
                            <span className="text-sm text-slate-400">대/면/일</span>
                        </div>
                    </div>

                    {/* 평균 체류시간 (수평 바 차트) */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Clock size={16} className="text-emerald-500" />
                            <span className="text-xs font-semibold text-slate-500">평균 체류시간 (유형별)</span>
                        </div>
                        <div className="space-y-2">
                            {Object.entries(phi.avgStayByType).map(([type, mins]) => (
                                <div key={type} className="flex items-center gap-2">
                                    <span className="text-[10px] font-medium text-slate-500 w-10 text-right">{stayTypeLabels[type]}</span>
                                    <div className="flex-1 bg-slate-100 rounded-full h-3 relative">
                                        <div
                                            className={`h-3 rounded-full ${stayTypeColors[type]}`}
                                            style={{ width: `${(mins / maxStay) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-600 w-12">{Math.round(mins / 60 * 10) / 10}시간</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 정기권 잠식도 */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <PieChartIcon size={16} className="text-purple-500" />
                            <span className="text-xs font-semibold text-slate-500">정기권 잠식도</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-slate-900">{phi.regularEncroachment}%</span>
                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${phi.regularEncroachment > 50 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                {phi.regularEncroachment > 50 ? '과잠식' : '양호'}
                            </span>
                        </div>
                        <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${phi.regularEncroachment > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                style={{ width: `${phi.regularEncroachment}%` }}
                            />
                        </div>
                    </div>

                    {/* 피크 병목 지수 */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle size={16} className="text-amber-500" />
                            <span className="text-xs font-semibold text-slate-500">피크 병목 지수</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-slate-900">{phi.peakBottleneck}</span>
                            <span className="text-xs text-slate-400">/ 100</span>
                            <span className="text-xs font-medium text-slate-500 ml-1">주원인: {phi.peakBottleneckType}</span>
                        </div>
                        <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${phi.peakBottleneck > 70 ? 'bg-rose-500' : phi.peakBottleneck > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                style={{ width: `${phi.peakBottleneck}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right: 히트맵 */}
                <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm">요일 × 시간대 점유율 히트맵</h3>
                    <div className="overflow-x-auto">
                        <div className="min-w-[600px]">
                            {/* 시간 라벨 */}
                            <div className="flex mb-1">
                                <div className="w-8 flex-shrink-0" />
                                {hourLabels.map((h, i) => (
                                    <div key={i} className="flex-1 text-center text-[9px] text-slate-400 font-medium">
                                        {i % 3 === 0 ? h : ''}
                                    </div>
                                ))}
                            </div>
                            {/* 히트맵 그리드 */}
                            {heatmapMatrix.map((row, dayIdx) => (
                                <div key={dayIdx} className="flex mb-0.5">
                                    <div className="w-8 flex-shrink-0 text-[10px] font-bold text-slate-500 flex items-center justify-end pr-2">
                                        {dayLabels[dayIdx]}
                                    </div>
                                    {row.map((cell, hourIdx) => (
                                        <div
                                            key={hourIdx}
                                            className={`flex-1 h-7 flex items-center justify-center text-[8px] font-bold rounded-sm mx-px ${getHeatmapColor(cell.value)}`}
                                            title={`${cell.day} ${cell.hour}: ${cell.value}%`}
                                        >
                                            {cell.value}
                                        </div>
                                    ))}
                                </div>
                            ))}
                            {/* 범례 */}
                            <div className="flex items-center gap-2 mt-4 justify-end">
                                <span className="text-[10px] text-slate-400">낮음</span>
                                <div className="flex gap-0.5">
                                    <div className="w-6 h-3 rounded-sm bg-blue-100" />
                                    <div className="w-6 h-3 rounded-sm bg-blue-200" />
                                    <div className="w-6 h-3 rounded-sm bg-yellow-200" />
                                    <div className="w-6 h-3 rounded-sm bg-orange-300" />
                                    <div className="w-6 h-3 rounded-sm bg-red-400" />
                                    <div className="w-6 h-3 rounded-sm bg-red-600" />
                                </div>
                                <span className="text-[10px] text-slate-400">높음</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 전체 주차장 비교 */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 text-sm">주차장별 PHI 비교</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {parkingLots.map(lot => {
                        const lotPhi = phiData[lot.id];
                        if (!lotPhi) return null;
                        const lotGc = gradeColors[lotPhi.grade] || gradeColors.C;
                        return (
                            <div
                                key={lot.id}
                                onClick={() => setSelectedLotId(lot.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${lot.id === selectedLotId ? `${lotGc.border} ${lotGc.bg}` : 'border-slate-200 hover:border-slate-300'}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-slate-800">{lot.name}</span>
                                    <span className={`text-lg font-black ${lotGc.text}`}>{lotPhi.grade}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-1 text-[10px]">
                                    <span className="text-slate-400">가동률</span>
                                    <span className="text-right font-bold text-slate-600">{lotPhi.occupancyRate}%</span>
                                    <span className="text-slate-400">회전율</span>
                                    <span className="text-right font-bold text-slate-600">{lotPhi.turnoverRate}</span>
                                    <span className="text-slate-400">잠식도</span>
                                    <span className="text-right font-bold text-slate-600">{lotPhi.regularEncroachment}%</span>
                                    <span className="text-slate-400">병목</span>
                                    <span className="text-right font-bold text-slate-600">{lotPhi.peakBottleneck}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ParkingHealth;
