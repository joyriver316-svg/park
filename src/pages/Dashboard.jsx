import React from 'react';
import {
    Users,
    DollarSign,
    Activity,
    AlertTriangle
} from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
        <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
            <div className={`flex items-center mt-2 text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <span>{change}</span>
                <span className="ml-1 text-slate-400">전월 대비</span>
            </div>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <Icon size={24} />
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">대시보드</h2>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50">
                        리포트 내보내기
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                        실시간 관제
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="총 매출" value="₩45,231,890" change="+20.1%" icon={DollarSign} trend="up" />
                <StatCard title="현재 입차 차량" value="2,345대" change="+15%" icon={Users} trend="up" />
                <StatCard title="주차면 가동률" value="84%" change="-2%" icon={Activity} trend="down" />
                <StatCard title="장애/알림" value="3건" change="+1" icon={AlertTriangle} trend="down" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">매출 현황</h3>
                    <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                        차트 영역 (매출 추이)
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">최근 입출차 이력</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                                    A{i}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">12가 345{i} 입차</p>
                                    <p className="text-xs text-slate-500">2분 전 • A게이트</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                        전체 보기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
