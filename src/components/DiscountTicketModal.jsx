import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const DiscountTicketModal = ({ isOpen, onClose, onSave, ticket }) => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        type: 'Time',
        value: 0,
        validityPeriod: '',
        isActive: true
    });

    useEffect(() => {
        if (ticket) {
            setFormData(ticket);
        } else {
            setFormData({
                name: '',
                code: '',
                type: 'Time',
                value: 0,
                validityPeriod: '',
                isActive: true
            });
        }
    }, [ticket, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, id: ticket ? ticket.id : undefined });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <h3 className="font-bold text-lg text-slate-800">
                        {ticket ? '할인권/프로모션 수정' : '새 할인권 만들기'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <form id="discountForm" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">할인권 명칭</label>
                            <input
                                type="text"
                                required
                                placeholder="예: 방문객 1시간 할인"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">관리 코드 (프로모션 코드)</label>
                            <input
                                type="text"
                                required
                                placeholder="예: SUMMER2026"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono uppercase"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">할인 유형</label>
                                <select
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="Time">시간 할인 (분)</option>
                                    <option value="Percentage">비율 할인 (%)</option>
                                    <option value="Fixed">금액 할인 (원)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">
                                    할인 값
                                    {formData.type === 'Time' && ' (분)'}
                                    {formData.type === 'Percentage' && ' (%)'}
                                    {formData.type === 'Fixed' && ' (원)'}
                                </label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">유효 기간</label>
                            <input
                                type="date"
                                required
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                value={formData.validityPeriod}
                                onChange={(e) => setFormData({ ...formData, validityPeriod: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="isActiveDiscount"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            />
                            <label htmlFor="isActiveDiscount" className="text-sm text-slate-700">사용 활성화</label>
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

export default DiscountTicketModal;
