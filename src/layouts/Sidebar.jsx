import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Car,
    Settings,
    FileText,
    CreditCard,
    Users,
    Activity,
    LogOut
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: '대시보드', to: '/' },
        { icon: Car, label: '주차장 관리', to: '/parking-lots' },
        { icon: FileText, label: '요금 정책', to: '/policies' },
        { icon: CreditCard, label: '매출 관리', to: '/revenue' },
        { icon: FileText, label: '입출차 로그', to: '/logs' },
        { icon: Users, label: '사용자 관리', to: '/users' },
        { icon: Activity, label: '시스템 상태', to: '/system-health' },
        { icon: Settings, label: '시스템 설정', to: '/settings' },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-50">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Park & Play
                </h1>
                <p className="text-xs text-slate-400 mt-1">관리자 대시보드</p>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                "hover:bg-slate-800 hover:text-white",
                                isActive
                                    ? "bg-blue-600/20 text-blue-400 border border-blue-600/20"
                                    : "text-slate-400"
                            )
                        }
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">로그아웃</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
