import React from 'react';
import {
    Users,
    DollarSign,
    Activity,
    AlertTriangle
} from 'lucide-react';
import { exportToCSV } from '../utils/exportUtils';

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start justify-between">
        <div>
            <p className="text-sm font-semibold text-slate-500 tracking-wide">{title}</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-3 tracking-tight font-display">{value}</h3>
            <div className={`flex items-center mt-3 text-sm font-medium ${trend === 'up' ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex' : 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full inline-flex'}`}>
                <span>{change}</span>
                <span className="ml-1.5 text-slate-400 font-normal">vs 지난달</span>
            </div>
        </div>
        <div className={`p-3.5 rounded-xl ${trend === 'up' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-600'}`}>
            <Icon size={26} strokeWidth={1.5} />
        </div>
    </div>
);



import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { parkingLots, entryExitLogs } from '../data/mockData';

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedLotId, setSelectedLotId] = useState('ALL');

    // MOCK DATA GENERATION BASED ON FILTER
    const dashboardData = useMemo(() => {
        let relevantLogs = entryExitLogs;
        let totalSpaces = parkingLots.reduce((acc, lot) => acc + lot.totalSpaces, 0);
        let currentOccupancy = parkingLots.reduce((acc, lot) => acc + lot.currentOccupancy, 0);

        if (selectedLotId !== 'ALL') {
            relevantLogs = entryExitLogs.filter(log => {
                const lotName = parkingLots.find(p => p.id === selectedLotId)?.name;
                return log.parkingLot === lotName;
            });
            const selectedLot = parkingLots.find(p => p.id === selectedLotId);
            totalSpaces = selectedLot?.totalSpaces || 0;
            currentOccupancy = selectedLot?.currentOccupancy || 0;
        }

        const totalRevenue = relevantLogs.reduce((acc, log) => acc + log.fee, 0);
        const occupancyRate = Math.round((currentOccupancy / totalSpaces) * 100) || 0;
        const recentLogs = relevantLogs.slice(0, 5);

        return {
            totalRevenue: selectedLotId === 'ALL' ? 45231890 : totalRevenue * 1500, // Make numbers look realistic
            currentOccupancy,
            occupancyRate,
            recentLogs
        };
    }, [selectedLotId]);

    const handleExport = () => {
        const summaryData = [
            { 카테고리: '총 매출', 값: `₩${dashboardData.totalRevenue.toLocaleString()}`, 변동: '+20.1%' },
            { 카테고리: '현재 입차 차량', 값: `${dashboardData.currentOccupancy}대`, 변동: '+15%' },
            { 카테고리: '주차면 가동률', 값: `${dashboardData.occupancyRate}%`, 변동: '-2%' },
            { 카테고리: '장애/알림', 값: '3', 변동: '+1' },
            { 카테고리: '작성일시', 값: new Date().toLocaleString(), 변동: '-' }
        ];
        exportToCSV(summaryData, 'dashboard_summary');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
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
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        리포트 내보내기
                    </button>
                    <button
                        onClick={() => navigate('/monitoring')}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all"
                    >
                        실시간 관제
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="총 매출" value={`₩${dashboardData.totalRevenue.toLocaleString()}`} change="+20.1%" icon={DollarSign} trend="up" />
                <StatCard title="현재 입차 차량" value={`${dashboardData.currentOccupancy}대`} change="+15%" icon={Users} trend="up" />
                <StatCard title="주차면 가동률" value={`${dashboardData.occupancyRate}%`} change="-2%" icon={Activity} trend="down" />
                <StatCard title="장애/알림" value="3건" change="+1" icon={AlertTriangle} trend="down" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">매출 현황 ({selectedLotId === 'ALL' ? '전체' : parkingLots.find(p => p.id === selectedLotId)?.name})</h3>
                    <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                        차트 영역 (매출 추이) - {selectedLotId === 'ALL' ? '통합' : '개별'} 데이터
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">최근 입출차 이력</h3>
                    <div className="space-y-4">
                        {dashboardData.recentLogs.length > 0 ? (
                            dashboardData.recentLogs.map((log) => (
                                <div key={log.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                                        {log.vehicleNo.slice(-4)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">{log.vehicleNo} {log.status === 'Exited' ? '출차' : '입차'}</p>
                                        <p className="text-xs text-slate-500">{log.entryTime.split(' ')[1]} • {log.parkingLot}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4 text-slate-400 text-sm">데이터가 없습니다.</div>
                        )}
                    </div>
                    <button className="w-full mt-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                        전체 보기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
