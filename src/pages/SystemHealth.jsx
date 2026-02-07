import React, { useState, useEffect } from 'react';
import {
    Server,
    Database,
    CreditCard,
    Activity,
    Clock,
    CheckCircle,
    AlertTriangle,
    XCircle,
    RefreshCw
} from 'lucide-react';
import { systemHealth as initialHealth } from '../data/mockData';

const StatusBadge = ({ status }) => {
    if (status === 'operational') {
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200"><CheckCircle size={12} />정상</span>;
    } else if (status === 'degraded') {
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200"><AlertTriangle size={12} />지연</span>;
    } else {
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200"><XCircle size={12} />오류</span>;
    }
};

const SystemHealth = () => {
    const [health, setHealth] = useState(initialHealth);
    const [isChecking, setIsChecking] = useState(false);

    const runHealthCheck = () => {
        setIsChecking(true);
        // Simulate API call
        setTimeout(() => {
            const newHealth = { ...health };
            // Simulate random latency changes
            newHealth.lpr.latency = Math.floor(Math.random() * 50 + 30) + 'ms';
            newHealth.pg.latency = Math.floor(Math.random() * 100 + 80) + 'ms';

            setHealth(newHealth);
            setIsChecking(false);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">시스템 상태</h2>
                    <p className="text-sm text-slate-500 mt-1">외부 연동 시스템(LPR, PG, ERP)의 연결 상태를 실시간으로 모니터링합니다.</p>
                </div>
                <button
                    onClick={runHealthCheck}
                    disabled={isChecking}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={16} className={isChecking ? "animate-spin" : ""} />
                    <span>상태 점검</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* LPR System */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CameraIcon size={100} className="text-blue-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Activity size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800">관제 시스템 (LPR)</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">연결 상태</span>
                            <StatusBadge status={health.lpr.status} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">응답 속도 (Latency)</span>
                            <span className="text-sm font-medium text-slate-900">{health.lpr.latency}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">마지막 점검</span>
                            <span className="text-sm text-slate-400 flex items-center gap-1">
                                <Clock size={12} /> {health.lpr.lastCheck}
                            </span>
                        </div>
                    </div>
                </div>

                {/* PG System */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CreditCard size={100} className="text-indigo-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <CreditCard size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800">결제 시스템 (PG)</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">연결 상태</span>
                            <StatusBadge status={health.pg.status} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">응답 속도</span>
                            <span className="text-sm font-medium text-slate-900">{health.pg.latency}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">마지막 점검</span>
                            <span className="text-sm text-slate-400 flex items-center gap-1">
                                <Clock size={12} /> {health.pg.lastCheck}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ERP System */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Database size={100} className="text-orange-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <Server size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800">ERP / 회계 연동</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">연결 상태</span>
                            <StatusBadge status={health.erp.status} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">응답 속도</span>
                            <span className="text-sm font-medium text-red-600">{health.erp.latency}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">마지막 점검</span>
                            <span className="text-sm text-slate-400 flex items-center gap-1">
                                <Clock size={12} /> {health.erp.lastCheck}
                            </span>
                        </div>
                        <div className="mt-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                            * 배치 작업 대기 중으로 인한 응답 지연 감지됨
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 text-slate-300">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Activity size={20} />
                    실시간 로그 스트림
                </h3>
                <div className="font-mono text-xs space-y-1">
                    <p><span className="text-blue-400">[INFO]</span> 2026-02-07 08:42:01 - LPR Connection Establised (Client ID: LPR-001)</p>
                    <p><span className="text-blue-400">[INFO]</span> 2026-02-07 08:42:05 - PG Health Check: 200 OK</p>
                    <p><span className="text-yellow-400">[WARN]</span> 2026-02-07 08:42:15 - ERP Sync Job Delayed (Queue Depth: 5)</p>
                    <p><span className="text-blue-400">[INFO]</span> 2026-02-07 08:42:22 - User 'super_admin' logged in from 192.168.1.10</p>
                </div>
            </div>
        </div>
    );
};

// Start: Fix missing Icon import
const CameraIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
    </svg>
)

export default SystemHealth;
