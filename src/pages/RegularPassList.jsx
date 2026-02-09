import React, { useState } from 'react';
import {
    Plus,
    Search,
    CreditCard,
    Calendar,
    ToggleLeft,
    ToggleRight,
    Car
} from 'lucide-react';
import { regularPasses as initialPasses, parkingLots } from '../data/mockData';
import RegularPassModal from '../components/RegularPassModal';

const RegularPassList = () => {
    const [passes, setPasses] = useState(initialPasses);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPass, setSelectedPass] = useState(null);

    const filteredPasses = passes.filter(pass =>
        pass.name.includes(searchTerm) ||
        pass.parkingLot.includes(searchTerm)
    );

    const toggleStatus = (id) => {
        setPasses(passes.map(pass =>
            pass.id === id ? { ...pass, isActive: !pass.isActive } : pass
        ));
    };

    const handleAdd = () => {
        setSelectedPass(null);
        setIsModalOpen(true);
    };

    const handleEdit = (pass) => {
        setSelectedPass(pass);
        setIsModalOpen(true);
    };

    const handleSave = (passData) => {
        if (passData.id) {
            // Edit existing
            setPasses(passes.map(p => p.id === passData.id ? passData : p));
        } else {
            // Add new
            const newPass = {
                ...passData,
                id: `PASS-00${passes.length + 1}`
            };
            setPasses([...passes, newPass]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setPasses(passes.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">정기권 관리</h2>
                    <p className="text-sm text-slate-500 mt-1">월 정기권, 일일권 등 기간제 상품을 관리합니다.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} />
                    <span>새 정기권 만들기</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredPasses.map((pass) => (
                    <div key={pass.id} className={`bg-white rounded-lg border ${pass.isActive ? 'border-blue-200' : 'border-slate-200'} shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="p-3 border-b border-slate-100 flex items-start justify-between">
                            <div>
                                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold mb-1 ${pass.type === 'Monthly' ? 'bg-purple-100 text-purple-600' :
                                    pass.type === 'Weekly' ? 'bg-green-100 text-green-600' :
                                        'bg-orange-100 text-orange-600'
                                    }`}>
                                    {pass.type === 'Monthly' ? '월 정기권' :
                                        pass.type === 'Weekly' ? '주간권' : '일일권'}
                                </span>
                                <h3 className="font-bold text-slate-800 text-sm">{pass.name}</h3>
                                <p className="text-[10px] text-slate-400 mt-0.5">{pass.id}</p>
                            </div>
                            <button
                                onClick={() => toggleStatus(pass.id)}
                                className={`transition-colors ${pass.isActive ? 'text-blue-600' : 'text-slate-300'}`}
                            >
                                {pass.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                            </button>
                        </div>

                        <div className="p-3 space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500 flex items-center gap-1.5">
                                    <CreditCard size={14} /> 가격
                                </span>
                                <span className="font-medium text-slate-900">
                                    {pass.price.toLocaleString()}원
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500 flex items-center gap-1.5">
                                    <Car size={14} /> 주차장
                                </span>
                                <span className="font-medium text-slate-900 truncate max-w-[120px] text-right" title={pass.parkingLot}>
                                    {pass.parkingLot}
                                </span>
                            </div>

                            <div className="text-xs bg-slate-50 p-2 rounded border border-slate-100">
                                <span className="text-slate-500 flex items-center gap-1.5 mb-1 text-[10px]">
                                    <Calendar size={12} /> 설명
                                </span>
                                <p className="text-slate-700 text-[10px] leading-snug line-clamp-2">
                                    {pass.description}
                                </p>
                            </div>
                        </div>

                        <div className="p-2 bg-slate-50 rounded-b-lg border-t border-slate-100 flex justify-end gap-2">
                            <button
                                onClick={() => handleDelete(pass.id)}
                                className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1"
                            >
                                삭제
                            </button>
                            <button
                                onClick={() => handleEdit(pass)}
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
                    <span className="font-medium text-sm">새 정기권 추가</span>
                </button>
            </div>

            <RegularPassModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                pass={selectedPass}
                parkingLots={parkingLots}
            />
        </div>
    );
};

export default RegularPassList;
