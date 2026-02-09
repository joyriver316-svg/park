import React, { useState } from 'react';
import {
    Plus,
    Search,
    Ticket,
    Calendar,
    ToggleLeft,
    ToggleRight,
    Tag,
    Clock,
    Percent,
    DollarSign
} from 'lucide-react';
import { discountTickets as initialTickets } from '../data/mockData';
import DiscountTicketModal from '../components/DiscountTicketModal';

const DiscountTicketList = () => {
    const [tickets, setTickets] = useState(initialTickets);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const filteredTickets = tickets.filter(ticket =>
        ticket.name.includes(searchTerm) ||
        ticket.code.includes(searchTerm)
    );

    const toggleStatus = (id) => {
        setTickets(tickets.map(ticket =>
            ticket.id === id ? { ...ticket, isActive: !ticket.isActive } : ticket
        ));
    };

    const handleAdd = () => {
        setSelectedTicket(null);
        setIsModalOpen(true);
    };

    const handleEdit = (ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    const handleSave = (ticketData) => {
        if (ticketData.id) {
            // Edit existing
            setTickets(tickets.map(t => t.id === ticketData.id ? ticketData : t));
        } else {
            // Add new
            const newTicket = {
                ...ticketData,
                id: `DISC-00${tickets.length + 1}`
            };
            setTickets([...tickets, newTicket]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setTickets(tickets.filter(t => t.id !== id));
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Time': return <Clock size={16} />;
            case 'Percentage': return <Percent size={16} />;
            case 'Fixed': return <DollarSign size={16} />;
            default: return <Tag size={16} />;
        }
    };

    const formatValue = (type, value) => {
        switch (type) {
            case 'Time': return `${value}분`;
            case 'Percentage': return `${value}%`;
            case 'Fixed': return `${value.toLocaleString()}원`;
            default: return value;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">할인권/프로모션 관리</h2>
                    <p className="text-sm text-slate-500 mt-1">할인 쿠폰, 제휴사 할인 및 프로모션 코드를 관리합니다.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} />
                    <span>새 할인권 만들기</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTickets.map((ticket) => (
                    <div key={ticket.id} className={`bg-white rounded-xl border ${ticket.isActive ? 'border-blue-200' : 'border-slate-200'} shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="p-5 border-b border-slate-100 flex items-start justify-between">
                            <div>
                                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold mb-2 ${ticket.type === 'Time' ? 'bg-blue-100 text-blue-600' :
                                        ticket.type === 'Percentage' ? 'bg-indigo-100 text-indigo-600' :
                                            'bg-green-100 text-green-600'
                                    }`}>
                                    {ticket.type === 'Time' ? '시간 할인' :
                                        ticket.type === 'Percentage' ? '비율 할인' : '금액 할인'}
                                </span>
                                <h3 className="font-bold text-slate-800 text-lg">{ticket.name}</h3>
                                <p className="text-xs text-slate-400 mt-0.5 font-mono">{ticket.code}</p>
                            </div>
                            <button
                                onClick={() => toggleStatus(ticket.id)}
                                className={`transition-colors ${ticket.isActive ? 'text-blue-600' : 'text-slate-300'}`}
                            >
                                {ticket.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 flex items-center gap-1.5">
                                    <Tag size={16} /> 할인 값
                                </span>
                                <span className="font-bold text-slate-900 flex items-center gap-1">
                                    {getTypeIcon(ticket.type)}
                                    {formatValue(ticket.type, ticket.value)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 flex items-center gap-1.5">
                                    <Calendar size={16} /> 유효 기간
                                </span>
                                <span className="font-medium text-slate-900">
                                    ~ {ticket.validityPeriod}
                                </span>
                            </div>

                            <div className="text-sm bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                                <span className="text-slate-500 text-xs">관리 코드</span>
                                <code className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                                    {ticket.code}
                                </code>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-b-xl border-t border-slate-100 flex justify-end">
                            <button
                                onClick={() => handleDelete(ticket.id)}
                                className="text-sm font-medium text-slate-500 hover:text-slate-800 px-3 py-1.5"
                            >
                                삭제
                            </button>
                            <button
                                onClick={() => handleEdit(ticket)}
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
                    <span className="font-medium">새 할인권 추가</span>
                </button>
            </div>

            <DiscountTicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                ticket={selectedTicket}
            />
        </div>
    );
};

export default DiscountTicketList;
