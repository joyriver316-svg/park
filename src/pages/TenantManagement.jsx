import React, { useState } from 'react';
import {
    Building2,
    Users,
    MoreHorizontal,
    Plus,
    Search,
    ShieldCheck,
    Ban,
    CheckCircle
} from 'lucide-react';
import { tenants as initialTenants } from '../data/mockData';

const TenantManagement = () => {
    const [tenants, setTenants] = useState(initialTenants);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newTenant, setNewTenant] = useState({
        name: '',
        type: 'Corporation',
        contact: '',
        email: '',
        plan: 'Basic'
    });

    const handleAddTenant = (e) => {
        e.preventDefault();
        const id = `TNT-00${tenants.length + 1}`;
        const tenant = {
            id,
            ...newTenant,
            status: 'Active',
            joinedDate: new Date().toISOString().split('T')[0]
        };
        setTenants([...tenants, tenant]);
        setShowModal(false);
        setNewTenant({ name: '', type: 'Corporation', contact: '', email: '', plan: 'Basic' });
    };

    const toggleStatus = (id) => {
        setTenants(tenants.map(t => {
            if (t.id === id) {
                return { ...t, status: t.status === 'Active' ? 'Suspended' : 'Active' };
            }
            return t;
        }));
    };

    const filteredTenants = tenants.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const MetricsCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
            </div>
            <div className={`p-4 rounded-full ${color}`}>
                <Icon size={24} />
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Building2 className="text-indigo-600" /> 테넌트(운영사) 관리
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">플랫폼에 등록된 주차 운영사 및 고객사를 관리합니다.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <Plus size={18} /> 테넌트 등록
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricsCard
                    title="총 등록 테넌트"
                    value={tenants.length}
                    icon={Building2}
                    color="bg-indigo-50 text-indigo-600"
                />
                <MetricsCard
                    title="활성 테넌트"
                    value={tenants.filter(t => t.status === 'Active').length}
                    icon={CheckCircle}
                    color="bg-green-50 text-green-600"
                />
                <MetricsCard
                    title="정지된 테넌트"
                    value={tenants.filter(t => t.status !== 'Active').length}
                    icon={Ban}
                    color="bg-red-50 text-red-600"
                />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="운영사명 또는 이메일 검색..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">테넌트 정보</th>
                                <th className="px-6 py-4 font-medium">유형/플랜</th>
                                <th className="px-6 py-4 font-medium">연락처</th>
                                <th className="px-6 py-4 font-medium">상태</th>
                                <th className="px-6 py-4 font-medium">가입일</th>
                                <th className="px-6 py-4 font-medium text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTenants.map((tenant) => (
                                <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{tenant.name}</div>
                                        <div className="text-xs text-slate-500 font-mono mt-1">{tenant.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-600">{tenant.type}</span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${tenant.plan === 'Enterprise' ? 'border-purple-200 bg-purple-50 text-purple-700' :
                                                    tenant.plan === 'Premium' ? 'border-blue-200 bg-blue-50 text-blue-700' :
                                                        'border-slate-200 bg-slate-50 text-slate-700'
                                                }`}>
                                                {tenant.plan}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-900">{tenant.contact}</div>
                                        <div className="text-xs text-slate-500">{tenant.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${tenant.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${tenant.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                                                }`}></span>
                                            {tenant.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{tenant.joinedDate}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => toggleStatus(tenant.id)}
                                            className={`text-xs px-3 py-1.5 rounded font-medium border transition-colors ${tenant.status === 'Active'
                                                    ? 'border-red-200 text-red-600 hover:bg-red-50'
                                                    : 'border-green-200 text-green-600 hover:bg-green-50'
                                                }`}
                                        >
                                            {tenant.status === 'Active' ? '정지 처리' : '정지 해제'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Tenant Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg text-slate-800">새 테넌트 등록</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddTenant} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">운영사명</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={newTenant.name}
                                    onChange={e => setNewTenant({ ...newTenant, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">유형</label>
                                <select
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
                                    value={newTenant.type}
                                    onChange={e => setNewTenant({ ...newTenant, type: e.target.value })}
                                >
                                    <option value="Corporation">법인 (Corporation)</option>
                                    <option value="Individual">개인 (Individual)</option>
                                    <option value="HQ">본사 (HQ)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">이메일</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={newTenant.email}
                                    onChange={e => setNewTenant({ ...newTenant, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">연락처</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="02-0000-0000"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={newTenant.contact}
                                    onChange={e => setNewTenant({ ...newTenant, contact: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">구독 플랜</label>
                                <select
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
                                    value={newTenant.plan}
                                    onChange={e => setNewTenant({ ...newTenant, plan: e.target.value })}
                                >
                                    <option value="Basic">Basic</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Enterprise">Enterprise</option>
                                </select>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50"
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
                                >
                                    등록하기
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TenantManagement;
