import React, { useState } from 'react';
import {
    Building,
    MapPin,
    Car,
    MoreVertical,
    Plus,
    Search,
    Filter
} from 'lucide-react';
import { parkingLots as initialParkingLots } from '../data/mockData';
import ParkingLotModal from '../components/ParkingLotModal';

const ParkingLotList = () => {
    const [parkingLots, setParkingLots] = useState(initialParkingLots);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLot, setSelectedLot] = useState(null);

    const filteredLots = parkingLots.filter(lot =>
        lot.name.includes(searchTerm) ||
        lot.address.includes(searchTerm) ||
        lot.owner.includes(searchTerm)
    );

    const getStatusColor = (status) => {
        return status === 'Operational'
            ? 'bg-green-100 text-green-700 border-green-200'
            : 'bg-yellow-100 text-yellow-700 border-yellow-200';
    };

    const handleAdd = () => {
        setSelectedLot(null);
        setIsModalOpen(true);
    };

    const handleEdit = (lot) => {
        setSelectedLot(lot);
        setIsModalOpen(true);
    };

    const handleSave = (lotData) => {
        if (lotData.id) {
            // Edit existing
            setParkingLots(parkingLots.map(lot => lot.id === lotData.id ? lotData : lot));
        } else {
            // Add new
            const newLot = {
                ...lotData,
                id: `PL-00${parkingLots.length + 1}`,
                currentOccupancy: 0
            };
            setParkingLots([...parkingLots, newLot]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">주차장 관리</h2>
                    <p className="text-sm text-slate-500 mt-1">등록된 주차장의 운영 상태를 모니터링하고 설정을 관리합니다.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} />
                    <span>신규 주차장 등록</span>
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="주차장명, 주소, 소유주 검색..."
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                    <Filter size={16} />
                    <span>필터</span>
                </button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLots.map((lot) => (
                    <div key={lot.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Building size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{lot.name}</h3>
                                    <p className="text-xs text-slate-500">{lot.id} • {lot.type}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleEdit(lot)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        <div className="space-y-3 mb-5">
                            <div className="flex items-start gap-2 text-sm text-slate-600">
                                <MapPin size={16} className="text-slate-400 mt-0.5" />
                                <span className="flex-1">{lot.address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Car size={16} className="text-slate-400" />
                                <div className="flex-1 flex items-center justify-between">
                                    <span>점유율</span>
                                    <span className="font-medium text-slate-900">
                                        {Math.round((lot.currentOccupancy / lot.totalSpaces) * 100)}%
                                        <span className="text-slate-400 font-normal ml-1">
                                            ({lot.currentOccupancy}/{lot.totalSpaces})
                                        </span>
                                    </span>
                                </div>
                            </div>
                            {/* Progress Bar */}
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${(lot.currentOccupancy / lot.totalSpaces) > 0.9 ? 'bg-red-500' : 'bg-blue-500'
                                        }`}
                                    style={{ width: `${(lot.currentOccupancy / lot.totalSpaces) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(lot.status)}`}>
                                {lot.status === 'Operational' ? '정상 운영' : '점검 중'}
                            </span>
                            <button
                                onClick={() => handleEdit(lot)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                상세 관리 &rarr;
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ParkingLotModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                parkingLot={selectedLot}
            />
        </div>
    );
};

export default ParkingLotList;
