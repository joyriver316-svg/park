import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
    return (
        <div className="flex bg-slate-50 min-h-screen font-sans text-slate-900">
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
                <Header />
                <main className="flex-1 p-8 mt-16 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
