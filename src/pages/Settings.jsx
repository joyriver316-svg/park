import React, { useState } from 'react';
import {
    Save,
    Bell,
    Shield,
    Database,
    Globe,
    Mail,
    Smartphone,
    Lock,
    Clock,
    RotateCcw
} from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [generalSettings, setGeneralSettings] = useState({
        companyName: 'Park & Play Korea',
        language: 'ko',
        timezone: 'Asia/Seoul',
        theme: 'light'
    });

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        smsAlerts: false,
        dailyReport: true,
        systemError: true
    });

    const [security, setSecurity] = useState({
        passwordExpiry: 90,
        sessionTimeout: 30,
        mfaEnabled: true
    });

    const renderTabButton = (id, icon, label) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
        >
            {icon}
            {label}
        </button>
    );

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">시스템 설정</h2>
                <p className="text-sm text-slate-500 mt-1">플랫폼 전역 설정 및 보안 정책을 관리합니다.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Tabs Header */}
                <div className="flex border-b border-slate-200 px-4">
                    {renderTabButton('general', <Globe size={18} />, '일반 설정')}
                    {renderTabButton('notifications', <Bell size={18} />, '알림 설정')}
                    {renderTabButton('security', <Shield size={18} />, '보안 정책')}
                    {renderTabButton('backup', <Database size={18} />, '데이터 백업')}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'general' && (
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4">회사 기본 정보</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">회사명 / 서비스명</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                            value={generalSettings.companyName}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">기본 언어</label>
                                            <select
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                                value={generalSettings.language}
                                                onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                                            >
                                                <option value="ko">한국어 (Korean)</option>
                                                <option value="en">English</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">타임존</label>
                                            <select
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                                value={generalSettings.timezone}
                                                onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                                            >
                                                <option value="Asia/Seoul">Asia/Seoul (GMT+9)</option>
                                                <option value="UTC">UTC (GMT+0)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 max-w-2xl">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">알림 수신 설정</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-800">이메일 알림</div>
                                            <div className="text-xs text-slate-500">주요 리포트 및 장애 알림을 이메일로 수신합니다.</div>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notifications.emailAlerts}
                                            onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm">
                                            <Smartphone size={20} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-800">SMS 알림</div>
                                            <div className="text-xs text-slate-500">긴급 장애 발생 시 SMS 문자를 발송합니다. (비용 발생)</div>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notifications.smsAlerts}
                                            onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 max-w-2xl">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">보안 정책</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                        <Lock size={16} /> 비밀번호 만료 기간 (일)
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="30"
                                            max="180"
                                            step="30"
                                            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                            value={security.passwordExpiry}
                                            onChange={(e) => setSecurity({ ...security, passwordExpiry: e.target.value })}
                                        />
                                        <span className="w-16 text-center font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                            {security.passwordExpiry}일
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                        <Clock size={16} /> 세션 자동 로그아웃 (분)
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="10"
                                            max="120"
                                            step="10"
                                            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                            value={security.sessionTimeout}
                                            onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                                        />
                                        <span className="w-16 text-center font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                            {security.sessionTimeout}분
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'backup' && (
                        <div className="space-y-6 max-w-2xl">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">데이터 백업 및 복구</h3>

                            <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg mb-6">
                                <div className="flex items-start gap-3">
                                    <Database className="text-orange-600 mt-0.5" size={20} />
                                    <div>
                                        <h4 className="font-bold text-orange-800 text-sm">최근 백업: 2026-02-07 04:00:00</h4>
                                        <p className="text-xs text-orange-700 mt-1">시스템은 매일 새벽 4시에 자동으로 전체 데이터를 백업합니다.</p>
                                    </div>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-900 transition-colors">
                                <RotateCcw size={16} />
                                <span>지금 즉시 백업 실행</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
                    <button className="px-4 py-2 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
                        초기화
                    </button>
                    <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                        <Save size={16} />
                        변경사항 저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
