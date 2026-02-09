import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';

const ContractModal = ({ isOpen, onClose, onSave, contract, parkingLots }) => {
    const [formData, setFormData] = useState({
        landlordName: '',
        parkingLotId: '',
        startDate: '',
        endDate: '',
        settlementDay: 10,
        operatorShare: 30,
        landlordShare: 70,
        accountInfo: '',
        deductions: [],
        status: 'Active'
    });

    useEffect(() => {
        if (contract) {
            setFormData(contract);
        } else {
            setFormData({
                landlordName: '',
                parkingLotId: '',
                startDate: '',
                endDate: '',
                settlementDay: 10,
                operatorShare: 30,
                landlordShare: 70,
                accountInfo: '',
                deductions: [],
                status: 'Active'
            });
        }
    }, [contract, isOpen]);

    if (!isOpen) return null;

    const handleShareChange = (e, type) => {
        let val = parseInt(e.target.value) || 0;
        if (val > 100) val = 100;

        if (type === 'operator') {
            setFormData({
                ...formData,
                operatorShare: val,
                landlordShare: 100 - val
            });
        } else {
            setFormData({
                ...formData,
                landlordShare: val,
                operatorShare: 100 - val
            });
        }
    };

    const addDeduction = () => {
        setFormData({
            ...formData,
            deductions: [...formData.deductions, { name: '', type: 'Percentage', value: 0 }]
        });
    };

    const removeDeduction = (index) => {
        const newDeductions = [...formData.deductions];
        newDeductions.splice(index, 1);
        setFormData({ ...formData, deductions: newDeductions });
    };

    const updateDeduction = (index, field, value) => {
        const newDeductions = [...formData.deductions];
        newDeductions[index][field] = value;
        setFormData({ ...formData, deductions: newDeductions });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedLot = parkingLots.find(lot => lot.id === formData.parkingLotId);
        onSave({
            ...formData,
            id: contract ? contract.id : undefined,
            parkingLotName: selectedLot ? selectedLot.name : ''
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <h3 className="font-bold text-lg text-slate-800">
                        {contract ? '정산 계약 수정' : '새 계약 등록'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <form id="contractForm" onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">건물주(사) 명</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                    value={formData.landlordName}
                                    onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">대상 주차장</label>
                                <select
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                    value={formData.parkingLotId}
                                    onChange={(e) => setFormData({ ...formData, parkingLotId: e.target.value })}
                                >
                                    <option value="">선택해주세요</option>
                                    {parkingLots && parkingLots.map(lot => (
                                        <option key={lot.id} value={lot.id}>{lot.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">계약 시작일</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">계약 종료일</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Settlement Terms */}
                        <div className="pt-4 border-t border-slate-100">
                            <h4 className="font-semibold text-slate-800 text-sm mb-3">정산 조건</h4>
                            <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">정산 지급일</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-slate-600">매월</span>
                                        <input
                                            type="number"
                                            min="1"
                                            max="31"
                                            className="w-16 px-2 py-1 border border-slate-200 rounded text-sm text-center"
                                            value={formData.settlementDay}
                                            onChange={(e) => setFormData({ ...formData, settlementDay: parseInt(e.target.value) || 1 })}
                                        />
                                        <span className="text-sm text-slate-600">일</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">운영사 수익 배분율 (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        value={formData.operatorShare}
                                        onChange={(e) => handleShareChange(e, 'operator')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">건물주 수익 배분율 (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-100"
                                        readOnly
                                        value={formData.landlordShare}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">지급 계좌 정보</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                    placeholder="은행명 계좌번호 (예금주)"
                                    value={formData.accountInfo}
                                    onChange={(e) => setFormData({ ...formData, accountInfo: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Deductions */}
                        <div className="pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-slate-800 text-sm">공제 항목 (비용)</h4>
                                <button
                                    type="button"
                                    onClick={addDeduction}
                                    className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    <Plus size={14} /> 항목 추가
                                </button>
                            </div>

                            {formData.deductions.length === 0 && (
                                <p className="text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                                    등록된 공제 항목이 없습니다. (예: 카드수수료, 전기세 등)
                                </p>
                            )}

                            <div className="space-y-2">
                                {formData.deductions.map((deduction, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            placeholder="항목명 (예: 카드수수료)"
                                            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                            value={deduction.name}
                                            onChange={(e) => updateDeduction(index, 'name', e.target.value)}
                                        />
                                        <select
                                            className="w-24 px-2 py-2 border border-slate-200 rounded-lg text-sm"
                                            value={deduction.type}
                                            onChange={(e) => updateDeduction(index, 'type', e.target.value)}
                                        >
                                            <option value="Percentage">비율(%)</option>
                                            <option value="Fixed">금액(원)</option>
                                        </select>
                                        <input
                                            type="number"
                                            placeholder="값"
                                            className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                            value={deduction.value}
                                            onChange={(e) => updateDeduction(index, 'value', parseFloat(e.target.value) || 0)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeDeduction(index)}
                                            className="p-2 text-slate-400 hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                        <Save size={16} />
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContractModal;
