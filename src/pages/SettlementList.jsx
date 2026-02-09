import React, { useState } from 'react';
import {
    Plus,
    Search,
    FileText,
    Settings,
    Briefcase,
    Calendar,
    ChevronRight,
    DollarSign,
    CheckCircle,
    Clock
} from 'lucide-react';
import { settlements as initialSettlements, contracts as initialContracts, parkingLots } from '../data/mockData';
import ContractModal from '../components/ContractModal';

const SettlementList = () => {
    const [settlements, setSettlements] = useState(initialSettlements);
    const [contracts, setContracts] = useState(initialContracts);
    const [activeTab, setActiveTab] = useState('settlements'); // settlements, contracts
    const [searchTerm, setSearchTerm] = useState('');

    // Contract Modal State
    const [isContractModalOpen, setIsContractModalOpen] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);

    const handleContractSave = (data) => {
        if (data.id) {
            setContracts(contracts.map(c => c.id === data.id ? data : c));
        } else {
            const newContract = { ...data, id: `CON-00${contracts.length + 1}` };
            setContracts([...contracts, newContract]);
        }
        setIsContractModalOpen(false);
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            Completed: 'bg-green-100 text-green-700',
            Pending: 'bg-orange-100 text-orange-700',
            Draft: 'bg-slate-100 text-slate-700'
        };
        const labels = {
            Completed: '지급 완료',
            Pending: '지급 대기',
            Draft: '작성 중'
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-bold ${styles[status] || styles.Draft}`}>
                {labels[status] || status}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">정산 및 계약 관리</h2>
                    <p className="text-sm text-slate-500 mt-1">건물주 운영 수익 배분 및 정산서를 관리합니다.</p>
                </div>
                {activeTab === 'contracts' && (
                    <button
                        onClick={() => { setSelectedContract(null); setIsContractModalOpen(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={16} />
                        <span>새 계약 등록</span>
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200">
                <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'settlements' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    onClick={() => setActiveTab('settlements')}
                >
                    정산 현황
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'contracts' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    onClick={() => setActiveTab('contracts')}
                >
                    계약 관리
                </button>
            </div>

            {/* Settlement List View */}
            {activeTab === 'settlements' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">정산 월</th>
                                <th className="px-6 py-4 font-medium">건물주 (주차장)</th>
                                <th className="px-6 py-4 font-medium text-right">총 매출</th>
                                <th className="px-6 py-4 font-medium text-right">공제 금액</th>
                                <th className="px-6 py-4 font-medium text-right">실 지급액 (건물주)</th>
                                <th className="px-6 py-4 font-medium text-center">상태</th>
                                <th className="px-6 py-4 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {settlements.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                                    <td className="px-6 py-4 font-medium text-slate-800">{item.period}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-800">{item.landlordName}</div>
                                        <div className="text-xs text-slate-500">{item.parkingLotName}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-600">{item.totalRevenue.toLocaleString()}원</td>
                                    <td className="px-6 py-4 text-right text-red-500">-{item.deductionAmount.toLocaleString()}원</td>
                                    <td className="px-6 py-4 text-right font-bold text-blue-600">{item.landlordAmount.toLocaleString()}원</td>
                                    <td className="px-6 py-4 text-center">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-400">
                                        <ChevronRight size={16} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Contract List View */}
            {activeTab === 'contracts' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contracts.map((contract) => (
                        <div key={contract.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                        {contract.landlordName}
                                    </h3>
                                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                        <Briefcase size={14} /> {contract.parkingLotName}
                                    </p>
                                </div>
                                <button className="text-sm text-blue-600 font-medium hover:underline" onClick={() => { setSelectedContract(contract); setIsContractModalOpen(true); }}>
                                    수정
                                </button>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-slate-500">계약 기간</span>
                                    <span className="font-medium">{contract.startDate} ~ {contract.endDate}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-slate-500">배분율 (운:건)</span>
                                    <span className="font-bold text-slate-800">{contract.operatorShare}% : {contract.landlordShare}%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">정산일</span>
                                    <span className="font-medium">매월 {contract.settlementDay}일</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-bold text-slate-600">공제 항목</p>
                                {contract.deductions.map((d, idx) => (
                                    <div key={idx} className="flex justify-between text-xs text-slate-500 border-b border-dashed border-slate-200 pb-1 last:border-0">
                                        <span>{d.name}</span>
                                        <span>{d.type === 'Percentage' ? `${d.value}%` : `${d.value.toLocaleString()}원`}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ContractModal
                isOpen={isContractModalOpen}
                onClose={() => setIsContractModalOpen(false)}
                onSave={handleContractSave}
                contract={selectedContract}
                parkingLots={parkingLots}
            />
        </div>
    );
};

export default SettlementList;
