import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 fixed top-0 right-0 left-0 lg:left-64 z-30 transition-all duration-300">
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                    <Menu size={24} />
                </button>

                <div className="relative w-full max-w-md hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="전체 검색 (차량번호, 주차장...)"
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
                <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-slate-900">관리자</p>
                        <p className="text-xs text-slate-500">슈퍼 어드민</p>
                    </div>
                    <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 overflow-hidden border border-slate-300">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
