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
import { feePolicies as initialPolicies } from '../data/mockData';
import PolicyModal from '../components/PolicyModal';

const PolicyList = () => {
    const [policies, setPolicies] = useState(initialPolicies);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);

    const filteredPolicies = policies.filter(policy =>
        policy.name.includes(searchTerm) ||
        policy.id.includes(searchTerm)
    );

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
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">요금 정책 관리</h2>
                    <p className="text-sm text-slate-500 mt-1">주차장별 요금표를 설정하고 관리합니다.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} />
                    <span>새 정책 만들기</span>
                </button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPolicies.map((policy) => (
                    <div key={policy.id} className={`bg-white rounded-xl border ${policy.isActive ? 'border-blue-200' : 'border-slate-200'} shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="p-5 border-b border-slate-100 flex items-start justify-between">
                            <div>
                                <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 mb-2">
                                    {policy.type === 'Time-based' ? '시간제' : '정액제'}
                                </span>
                                <h3 className="font-bold text-slate-800 text-lg">{policy.name}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">{policy.id}</p>
                            </div>
                            <button
                                onClick={() => toggleStatus(policy.id)}
                                className={`transition-colors ${policy.isActive ? 'text-blue-600' : 'text-slate-300'}`}
                            >
                                {policy.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 flex items-center gap-1.5">
                                    <Clock size={16} /> 기본 요금
                                </span>
                                <span className="font-medium text-slate-900">
                                    {policy.baseRate.toLocaleString()}원 <span className="text-slate-400 text-xs font-normal">({policy.baseTime}분)</span>
                                </span>
                            </div>

                            {policy.type === 'Time-based' && (
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 flex items-center gap-1.5">
                                        <Plus size={16} /> 추가 요금
                                    </span>
                                    <span className="font-medium text-slate-900">
                                        {policy.unitRate.toLocaleString()}원 <span className="text-slate-400 text-xs font-normal">({policy.unitTime}분)</span>
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 flex items-center gap-1.5">
                                    <Calendar size={16} /> 일 최대
                                </span>
                                <span className="font-medium text-slate-900">
                                    {policy.maxDaily.toLocaleString()}원
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 flex items-center gap-1.5">
                                    <DollarSign size={16} /> 회차 시간
                                </span>
                                <span className="font-medium text-slate-900">
                                    {policy.gracePeriod}분
                                </span>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-b-xl border-t border-slate-100 flex justify-end">
                            <button
                                onClick={() => handleDelete(policy.id)}
                                className="text-sm font-medium text-slate-500 hover:text-slate-800 px-3 py-1.5"
                            >
                                삭제
                            </button>
                            <button
                                onClick={() => handleEdit(policy)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 px-3 py-1.5"
                            >
                                수정
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add New Card Stub */}
                <button
                    onClick={handleAdd}
                    className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all p-8 min-h-[300px]"
                >
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Plus size={24} />
                    </div>
                    <span className="font-medium">새로운 정책 추가</span>
                </button>
            </div>

            <PolicyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                policy={selectedPolicy}
            />
        </div>
    );
};

export default PolicyList;
