import React, { useState, useEffect } from 'react';
import { X, Save, HelpCircle, Calculator } from 'lucide-react';

const PolicyModal = ({ isOpen, onClose, onSave, policy }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Time-based',
        baseTime: 30,
        baseRate: 0,
        unitTime: 10,
        unitRate: 0,
        maxDaily: 0,
        gracePeriod: 0,
        isActive: true
    });

    useEffect(() => {
        if (policy) {
            setFormData(policy);
        } else {
            setFormData({
                name: '',
                type: 'Time-based',
                baseTime: 30,
                baseRate: 0,
                unitTime: 10,
                unitRate: 0,
                maxDaily: 0,
                gracePeriod: 0,
                isActive: true
            });
        }
    }, [policy, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, id: policy ? policy.id : undefined });
        onClose();
    };

    // Simple simulation
    const calculateSampleFee = (minutes) => {
        if (minutes <= formData.gracePeriod) return 0;

        let fee = formData.baseRate;
        const remainingTime = Math.max(0, minutes - formData.baseTime);

        if (remainingTime > 0 && formData.unitTime > 0) {
            const units = Math.ceil(remainingTime / formData.unitTime);
            fee += units * formData.unitRate;
        }

        if (formData.maxDaily > 0) {
            fee = Math.min(fee, formData.maxDaily);
        }
        return fee;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <h3 className="font-bold text-lg text-slate-800">
                        {policy ? '요금 정책 수정' : '새 요금 정책 만들기'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <form id="policyForm" onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">기본 설정</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-slate-500 mb-1">정책명</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="예: 일반 고객 요금 (강남점)"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">요금 유형</label>
                                    <select
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="Time-based">시간제 (Time-based)</option>
                                        <option value="Flat-rate">정액제 (Flat-rate)</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    />
                                    <label htmlFor="isActive" className="text-sm text-slate-700">사용 활성화</label>
                                </div>
                            </div>
                        </div>

                        {/* Rates */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">요금 상세 설정</h4>
                            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">기본 시간 (분)</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        value={formData.baseTime}
                                        onChange={(e) => setFormData({ ...formData, baseTime: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">기본 요금 (원)</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        value={formData.baseRate}
                                        onChange={(e) => setFormData({ ...formData, baseRate: parseInt(e.target.value) || 0 })}
                                    />
                                </div>

                                {formData.type === 'Time-based' && (
                                    <>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">추가 단위 시간 (분)</label>
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                                value={formData.unitTime}
                                                onChange={(e) => setFormData({ ...formData, unitTime: parseInt(e.target.value) || 0 })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">추가 단위 요금 (원)</label>
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                                value={formData.unitRate}
                                                onChange={(e) => setFormData({ ...formData, unitRate: parseInt(e.target.value) || 0 })}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Limits */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">제한 설정</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">일 최대 요금 (원)</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        value={formData.maxDaily}
                                        onChange={(e) => setFormData({ ...formData, maxDaily: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
                                        회차 시간 (분)
                                        <HelpCircle size={12} className="text-slate-400" />
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        value={formData.gracePeriod}
                                        onChange={(e) => setFormData({ ...formData, gracePeriod: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Simulation Preview */}
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                            <h5 className="text-xs font-bold text-blue-800 mb-2 flex items-center gap-1">
                                <Calculator size={12} /> 요금 시뮬레이션
                            </h5>
                            <div className="flex gap-4 text-sm">
                                <div className="flex-1">
                                    <span className="text-blue-600 block text-xs mb-0.5">1시간 주차 시</span>
                                    <span className="font-bold text-slate-800">{calculateSampleFee(60).toLocaleString()}원</span>
                                </div>
                                <div className="flex-1">
                                    <span className="text-blue-600 block text-xs mb-0.5">2시간 주차 시</span>
                                    <span className="font-bold text-slate-800">{calculateSampleFee(120).toLocaleString()}원</span>
                                </div>
                                <div className="flex-1">
                                    <span className="text-blue-600 block text-xs mb-0.5">4시간 주차 시</span>
                                    <span className="font-bold text-slate-800">{calculateSampleFee(240).toLocaleString()}원</span>
                                </div>
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

export default PolicyModal;
