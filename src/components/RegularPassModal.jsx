import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const RegularPassModal = ({ isOpen, onClose, onSave, pass, parkingLots }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Monthly',
        price: 0,
        parkingLot: parkingLots && parkingLots.length > 0 ? parkingLots[0].name : '',
        description: '',
        isActive: true
    });

    useEffect(() => {
        if (pass) {
            setFormData(pass);
        } else {
            setFormData({
                name: '',
                type: 'Monthly',
                price: 0,
                parkingLot: parkingLots && parkingLots.length > 0 ? parkingLots[0].name : '',
                description: '',
                isActive: true
            });
        }
    }, [pass, isOpen, parkingLots]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, id: pass ? pass.id : undefined });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <h3 className="font-bold text-lg text-slate-800">
                        {pass ? '정기권 수정' : '새 정기권 만들기'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <form id="passForm" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">정기권 명칭</label>
                            <input
                                type="text"
                                required
                                placeholder="예: 월 정기권 A타입"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">유형</label>
                                <select
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="Monthly">월 정기권</option>
                                    <option value="Weekly">주간권</option>
                                    <option value="Daily">일일권</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">가격 (원)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">적용 주차장</label>
                            <select
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                value={formData.parkingLot}
                                onChange={(e) => setFormData({ ...formData, parkingLot: e.target.value })}
                            >
                                <option value="">선택해주세요</option>
                                {parkingLots && parkingLots.map(lot => (
                                    <option key={lot.id} value={lot.name}>{lot.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">설명</label>
                            <textarea
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-h-[80px]"
                                placeholder="정기권에 대한 상세 설명을 입력하세요."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="isActivePass"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            />
                            <label htmlFor="isActivePass" className="text-sm text-slate-700">사용 활성화</label>
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

export default RegularPassModal;
