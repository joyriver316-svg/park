import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';
import {
    Download,
    Calendar,
    TrendingUp,
    CreditCard,
    DollarSign,
    ArrowUpRight
} from 'lucide-react';
import { revenueData } from '../data/mockData';
import { exportToCSV } from '../utils/exportUtils';

const RevenueReport = () => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('ko-KR').format(value) + '원';
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg text-sm">
                    <p className="font-bold text-slate-800 mb-1">{label}</p>
                    <p className="text-blue-600">
                        매출: {formatCurrency(payload[0].value)}
                    </p>
                    {payload[1] && (
                        <p className="text-slate-500">
                            건수: {payload[1].value}건
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    const handleExport = () => {
        const dataToExport = revenueData.daily.map(day => ({
            '날짜': day.date,
            '매출액': day.amount,
            '건수': day.count
        }));
        exportToCSV(dataToExport, 'daily_revenue_report');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">매출 관리</h2>
                    <p className="text-sm text-slate-500 mt-1">실시간 매출 현황과 결제 수단별 통계를 분석합니다.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600">
                        <Calendar size={16} />
                        <span>2026.02.01 ~ 2026.02.07</span>
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Download size={16} />
                        <span>리포트 다운로드</span>
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                            <DollarSign size={20} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <ArrowUpRight size={12} /> +12.5%
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">
                        {formatCurrency(revenueData.monthly[5].amount)}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">이번 달 총 매출</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                            <TrendingUp size={20} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <ArrowUpRight size={12} /> +5.2%
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">
                        {formatCurrency(8500)}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">평균 객단가 (ATV)</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
                            <CreditCard size={20} />
                        </div>
                        <span className="text-xs font-medium text-slate-400">지난달 대비</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">92.5%</h3>
                    <p className="text-sm text-slate-500 mt-1">카드/앱 결제 비율</p>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6">일별 매출 추이</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData.daily}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748B' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748B' }}
                                    tickFormatter={(value) => `${value / 10000}만`}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
                                <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6">결제 수단 비중</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueData.paymentMethods}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {revenueData.paymentMethods.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center mt-4">
                        {revenueData.paymentMethods.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                <span>{entry.name} ({entry.value}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Monthly Trend */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6">월별 매출 추이 (최근 6개월)</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData.monthly}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#64748B' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#64748B' }}
                                tickFormatter={(value) => `${value / 1000000}백만`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#10B981"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default RevenueReport;
