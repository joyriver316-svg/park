import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Car,
    Settings,
    FileText,
    CreditCard,
    Users,
    Activity,
    LogOut,
    Ticket,
    Briefcase,
    Cctv,
    Building2,
    Bot
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ isOpen, onClose }) => {
    const navItems = [
        { icon: Bot, label: 'AI 에이전트', to: '/ai-agent' },
        { icon: LayoutDashboard, label: '대시보드', to: '/' },
        { icon: Car, label: '주차장 관리', to: '/parking-lots' },
        { icon: FileText, label: '요금 정책', to: '/policies' },
        { icon: CreditCard, label: '정기권 관리', to: '/regular-passes' },
        { icon: Ticket, label: '할인/프로모션', to: '/discounts' },
        { icon: Briefcase, label: '정산 및 계약', to: '/settlements' },
        { icon: Activity, label: '매출 관리', to: '/revenue' },
        { icon: FileText, label: '입출차 로그', to: '/logs' },
        { icon: Users, label: '사용자 관리', to: '/users' },
        { icon: Settings, label: '시스템 설정', to: '/settings' },
        { icon: Cctv, label: '통합 관제', to: '/monitoring' },
        { icon: Building2, label: '테넌트 관리', to: '/tenants' },
    ];

    return (
        <aside className={clsx(
            "w-64 bg-white border-r border-slate-200 text-slate-600 flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    P
                </div>
                <div>
                    <Link to="/" className="block" onClick={onClose}>
                        <h1 className="text-lg font-bold text-slate-900 tracking-tight hover:text-blue-600 transition-colors">
                            Park & Play
                        </h1>
                    </Link>
                    <p className="text-[11px] text-slate-400 font-medium">관리자 대시보드</p>
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={onClose}
                        className={({ isActive }) =>
                            clsx(
                                "flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
                                isActive
                                    ? "bg-blue-50 text-blue-600 shadow-sm"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon size={18} className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"} />
                                <span>{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group">
                    <LogOut size={20} className="group-hover:text-red-600 transition-colors" />
                    <span className="font-medium">로그아웃</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
