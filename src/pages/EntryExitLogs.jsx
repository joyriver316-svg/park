import React, { useState } from 'react';
import {
    Search,
    Calendar,
    Filter,
    Download,
    Car,
    Clock,
    MapPin,
    MoreHorizontal
} from 'lucide-react';
import { entryExitLogs as initialLogs, parkingLots } from '../data/mockData';

const EntryExitLogs = () => {
    const [logs, setLogs] = useState(initialLogs);
    const [filters, setFilters] = useState({
        searchTerm: '',
        parkingLot: ''
    });

    const filteredLogs = logs.filter(log => {
        const matchesSearch =
            log.vehicleNo.includes(filters.searchTerm) ||
            log.id.includes(filters.searchTerm);
        const matchesLot = filters.parkingLot === '' || log.parkingLot === filters.parkingLot;
        return matchesSearch && matchesLot;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Parked':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">입차 중</span>;
            case 'Exited':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">출차 완료</span>;
            case 'Paid':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">정산 완료</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">{status}</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">입출차 로그</h2>
                    <p className="text-sm text-slate-500 mt-1">차량의 입차 및 출차 이력을 조회하고 상세 정보를 확인합니다.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                    <Download size={16} />
                    <span>엑셀 다운로드</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="차량번호, 로그 ID 검색..."
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        value={filters.searchTerm}
                        onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                    />
                </div>

                <div className="w-px h-8 bg-slate-200 hidden md:block"></div>

                <div className="flex items-center gap-2 min-w-[200px]">
                    <MapPin size={16} className="text-slate-400" />
                    <select
                        className="w-full pl-2 pr-8 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                        value={filters.parkingLot}
                        onChange={(e) => setFilters({ ...filters, parkingLot: e.target.value })}
                    >
                        <option value="">전체 주차장</option>
                        {parkingLots.map(lot => (
                            <option key={lot.id} value={lot.name}>{lot.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2 min-w-[200px]">
                    <Calendar size={16} className="text-slate-400" />
                    <input
                        type="date"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>

                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors ml-auto">
                    <Filter size={16} />
                    <span>필터 초기화</span>
                </button>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3">로그 ID / 차량번호</th>
                                <th className="px-6 py-3">주차장</th>
                                <th className="px-6 py-3">입차 시각</th>
                                <th className="px-6 py-3">출차 시각</th>
                                <th className="px-6 py-3">상태</th>
                                <th className="px-6 py-3">요금</th>
                                <th className="px-6 py-3">LPR 이미지</th>
                                <th className="px-6 py-3">소요 시간</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-mono text-xs text-slate-400 mb-1">{log.id}</div>
                                        <div className="font-bold text-slate-900 flex items-center gap-2">
                                            <Car size={16} className="text-slate-400" />
                                            {log.vehicleNo}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {log.parkingLot}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {log.entryTime}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {log.exitTime}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(log.status)}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {log.fee.toLocaleString()}원
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-10 bg-slate-200 rounded overflow-hidden relative group cursor-pointer">
                                            <img src={log.image} alt="LPR" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-[10px]">
                                                보기
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-xs">
                                        {log.exitTime !== '-' ? '2시간 30분' : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredLogs.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        검색 결과가 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
};

export default EntryExitLogs;
