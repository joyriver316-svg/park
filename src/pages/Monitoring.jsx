import React, { useState, useEffect } from 'react';
import {
    Activity,
    Video,
    AlertTriangle,
    Power,
    RefreshCw,
    MessageSquare,
    Unlock,
    Lock,
    Maximize2
} from 'lucide-react';
import { devices as initialDevices, parkingLots } from '../data/mockData';

const Monitoring = () => {
    const [devices, setDevices] = useState(initialDevices);
    const [selectedLot, setSelectedLot] = useState(parkingLots[0].id);
    const [logs, setLogs] = useState([
        { id: 1, time: '14:30:22', message: '강남 정문 입구 LPR: 12가3456 입차 인식', type: 'info' },
        { id: 2, time: '14:28:10', message: '서초 정문 차단기: 연결 끊김 감지', type: 'error' },
        { id: 3, time: '14:25:05', message: '강남 정문 출구 차단기: 정상 개방', type: 'success' },
    ]);

    // Simulate real-time logs
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const newLog = {
                    id: Date.now(),
                    time: new Date().toLocaleTimeString('en-GB'),
                    message: `시스템 상태 체크: 모든 장비 정상 (${Math.floor(Math.random() * 100)}ms)`,
                    type: 'info'
                };
                setLogs(prev => [newLog, ...prev].slice(0, 10));
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const filteredDevices = devices.filter(d => d.parkingLotId === selectedLot);

    const handleControl = (id, action) => {
        // Optimistic update
        setDevices(devices.map(d => {
            if (d.id === id) {
                if (action === 'open') return { ...d, state: 'Open' };
                if (action === 'close') return { ...d, state: 'Closed' };
                if (action === 'reset') return { ...d, status: 'Online', state: d.type === 'Breaker' ? 'Closed' : 'Idle' };
            }
            return d;
        }));

        const deviceName = devices.find(d => d.id === id)?.name;
        const actionMap = { open: '개방', close: '폐쇄', reset: '리셋' };

        const newLog = {
            id: Date.now(),
            time: new Date().toLocaleTimeString('en-GB'),
            message: `[수동제어] ${deviceName} ${actionMap[action]} 명령 전송됨`,
            type: 'warning'
        };
        setLogs(prev => [newLog, ...prev]);
    };

    const StatusBadge = ({ status }) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${status === 'Online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {status}
        </span>
    );

    const DeviceCard = ({ device }) => (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${device.status === 'Online' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                        {device.type === 'LPR' && <Video size={20} />}
                        {device.type === 'Breaker' && <Unlock size={20} />}
                        {device.type === 'Display' && <MessageSquare size={20} />}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">{device.name}</h4>
                        <p className="text-xs text-slate-500">{device.location} • {device.type}</p>
                    </div>
                </div>
                <StatusBadge status={device.status} />
            </div>

            <div className="p-4">
                {device.type === 'LPR' && (
                    <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden group">
                        <span className="text-slate-500 text-xs">No Video Signal</span>
                        <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center">
                            <button className="text-white flex flex-col items-center gap-1">
                                <Maximize2 size={24} />
                                <span className="text-xs">확대 보기</span>
                            </button>
                        </div>
                        <div className="absolute top-2 left-2 flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-[10px] text-white">LIVE</span>
                        </div>
                    </div>
                )}

                {device.type === 'Breaker' && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">현재 상태</span>
                            <span className={`font-bold ${device.state === 'Open' ? 'text-blue-600' : 'text-slate-700'}`}>
                                {device.state === 'Open' ? '개방됨 (UP)' : '닫힘 (DOWN)'}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => handleControl(device.id, 'open')}
                                className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 flex items-center justify-center gap-1"
                            >
                                <Unlock size={14} /> 개방
                            </button>
                            <button
                                onClick={() => handleControl(device.id, 'close')}
                                className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center justify-center gap-1"
                            >
                                <Lock size={14} /> 차단
                            </button>
                        </div>
                    </div>
                )}

                {device.type === 'Display' && (
                    <div className="space-y-3">
                        <div className="bg-black rounded p-3 text-center">
                            <span className="text-orange-500 font-mono font-bold text-lg animate-pulse">
                                {device.state}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input type="text" placeholder="전송할 문구" className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg" />
                            <button className="px-3 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-700">전송</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-slate-50 p-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400">ID: {device.id}</span>
                <button
                    onClick={() => handleControl(device.id, 'reset')}
                    className="text-xs flex items-center gap-1 text-slate-500 hover:text-slate-700"
                >
                    <RefreshCw size={12} /> 재부팅/리셋
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Activity className="text-red-500" /> 통합 관제 모니터링
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">현장의 LPR, 차단기, 전광판 상태를 실시간으로 모니터링하고 제어합니다.</p>
                </div>
                <select
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 bg-white"
                    value={selectedLot}
                    onChange={(e) => setSelectedLot(e.target.value)}
                >
                    {parkingLots.map(lot => (
                        <option key={lot.id} value={lot.id}>{lot.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
                {/* Device Grid */}
                <div className="lg:col-span-2 overflow-y-auto pr-2">
                    <h3 className="font-bold text-slate-700 mb-4 sticky top-0 bg-slate-50 py-2 z-10 flex items-center gap-2">
                        <Video size={18} /> 현장 장비 목록
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredDevices.map(device => (
                            <DeviceCard key={device.id} device={device} />
                        ))}
                    </div>
                </div>

                {/* Event Logs - Right Sidebar */}
                <div className="bg-slate-900 rounded-xl p-4 flex flex-col overflow-hidden shadow-lg border border-slate-700">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2 flex-shrink-0">
                        <AlertTriangle size={18} className="text-yellow-500" /> 실시간 이벤트 로그
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-2 font-mono text-sm">
                        {logs.map(log => (
                            <div key={log.id} className="p-2 rounded bg-slate-800 border-l-2 border-slate-600 animate-in fade-in slide-in-from-right-4">
                                <span className="text-slate-400 text-xs block mb-1">[{log.time}]</span>
                                <span className={`${log.type === 'error' ? 'text-red-400' :
                                        log.type === 'warning' ? 'text-yellow-400' :
                                            log.type === 'success' ? 'text-green-400' : 'text-slate-200'
                                    }`}>
                                    {log.message}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700 text-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-900">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            System Operational
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Monitoring;
