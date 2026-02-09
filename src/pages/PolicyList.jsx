import React, { useState } from 'react';
import {
    Plus,
    Search,
    MoreHorizontal,
    Clock,
    Calendar,
    DollarSign,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';
import { feePolicies as initialPolicies, parkingLots } from '../data/mockData';
import PolicyModal from '../components/PolicyModal';

const PolicyList = () => {
    const [policies, setPolicies] = useState(initialPolicies);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedParkingLot, setSelectedParkingLot] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);

    const filteredPolicies = policies.filter(policy => {
        const matchesSearch = policy.name.includes(searchTerm) || policy.id.includes(searchTerm);
        const matchesLot = selectedParkingLot === 'All' || policy.parkingLotId === 'All' || policy.parkingLotId === selectedParkingLot;
        return matchesSearch && matchesLot;
    });

    const getParkingLotName = (id) => {
        if (id === 'All') return '전체 공통';
        const lot = parkingLots.find(p => p.id === id);
        return lot ? lot.name : 'Unknown';
    };

    const toggleStatus = (id) => {
        setPolicies(policies.map(policy =>
            policy.id === id ? { ...policy, isActive: !policy.isActive } : policy
        ));
    };

    const handleAdd = () => {
        setSelectedPolicy(null);
        setIsModalOpen(true);
    };

    const handleEdit = (policy) => {
        setSelectedPolicy(policy);
        setIsModalOpen(true);
    };

    const handleSave = (policyData) => {
        if (policyData.id) {
            // Edit existing
            setPolicies(policies.map(p => p.id === policyData.id ? policyData : p));
        } else {
            // Add new
            const newPolicy = {
                ...policyData,
                id: `POL-00${policies.length + 1}`
            };
            setPolicies([...policies, newPolicy]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setPolicies(policies.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">요금 정책 관리</h2>
                    <p className="text-sm text-slate-500 mt-1">주차장별 요금표를 설정하고 관리합니다.</p>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={selectedParkingLot}
                        onChange={(e) => setSelectedParkingLot(e.target.value)}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                        <option value="All">전체 주차장</option>
                        {parkingLots.map(lot => (
                            <option key={lot.id} value={lot.id}>{lot.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={16} />
                        <span className="hidden sm:inline">새 정책 만들기</span>
                        <span className="sm:hidden">추가</span>
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredPolicies.map((policy) => (
                    <div key={policy.id} className={`bg-white rounded-lg border ${policy.isActive ? 'border-blue-200' : 'border-slate-200'} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}>
                        {/* Parking Lot Badge */}
                        <div className={`absolute top-0 right-0 px-2 py-1 rounded-bl-lg text-[10px] font-bold ${policy.parkingLotId === 'All' ? 'bg-slate-100 text-slate-500' : 'bg-blue-50 text-blue-600'
                            }`}>
                            {getParkingLotName(policy.parkingLotId)}
                        </div>

                        <div className="p-3 border-b border-slate-100 flex items-start justify-between">
                            <div>
                                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 mb-1">
                                    {policy.type === 'Time-based' ? '시간제' : '정액제'}
                                </span>
                                <h3 className="font-bold text-slate-800 text-sm mt-1">{policy.name}</h3>
                                <p className="text-[10px] text-slate-400 mt-0.5">{policy.id}</p>
                            </div>
                            <button
                                onClick={() => toggleStatus(policy.id)}
                                className={`transition-colors mt-6 ${policy.isActive ? 'text-blue-600' : 'text-slate-300'}`}
                            >
                                {policy.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                            </button>
                        </div>

                        <div className="p-3 space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500 flex items-center gap-1.5">
                                    <Clock size={14} /> 기본 요금
                                </span>
                                <span className="font-medium text-slate-900">
                                    {policy.baseRate.toLocaleString()}원 <span className="text-slate-400 text-[10px] font-normal">({policy.baseTime}분)</span>
                                </span>
                            </div>

                            {policy.type === 'Time-based' && (
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500 flex items-center gap-1.5">
                                        <Plus size={14} /> 추가 요금
                                    </span>
                                    <span className="font-medium text-slate-900">
                                        {policy.unitRate.toLocaleString()}원 <span className="text-slate-400 text-[10px] font-normal">({policy.unitTime}분)</span>
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500 flex items-center gap-1.5">
                                    <Calendar size={14} /> 일 최대
                                </span>
                                <span className="font-medium text-slate-900">
                                    {policy.maxDaily.toLocaleString()}원
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500 flex items-center gap-1.5">
                                    <DollarSign size={14} /> 회차 시간
                                </span>
                                <span className="font-medium text-slate-900">
                                    {policy.gracePeriod}분
                                </span>
                            </div>
                        </div>

                        <div className="p-2 bg-slate-50 rounded-b-lg border-t border-slate-100 flex justify-end gap-2">
                            <button
                                onClick={() => handleDelete(policy.id)}
                                className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1"
                            >
                                삭제
                            </button>
                            <button
                                onClick={() => handleEdit(policy)}
                                className="text-xs font-medium text-blue-600 hover:text-blue-700 px-2 py-1"
                            >
                                수정
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add New Card Stub */}
                <button
                    onClick={handleAdd}
                    className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all p-4 min-h-[180px]"
                >
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                        <Plus size={20} />
                    </div>
                    <span className="font-medium text-sm">새로운 정책 추가</span>
                </button>
            </div>

            <PolicyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                policy={selectedPolicy}
                parkingLots={parkingLots}
            />
        </div>
    );
};

export default PolicyList;
