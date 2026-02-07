import React, { useState } from 'react';
import {
    Users,
    Shield,
    Plus,
    MoreHorizontal,
    Check,
    X,
    Search,
    Edit,
    Trash2
} from 'lucide-react';
import { users as initialUsers, roles } from '../data/mockData';
import UserModal from '../components/UserModal';

const UserManagement = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'SUPER_ADMIN': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'OPERATOR': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'FIELD_MANAGER': return 'bg-green-100 text-green-700 border-green-200';
            case 'ACCOUNTANT': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.includes(searchTerm) ||
        user.email.includes(searchTerm) ||
        user.role.includes(searchTerm)
    );

    const handleAdd = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleSave = (userData) => {
        if (userData.id) {
            // Edit
            setUsers(users.map(u => u.id === userData.id ? userData : u));
        } else {
            // Add
            const newUser = {
                ...userData,
                id: users.length + 1
            };
            setUsers([...users, newUser]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">사용자 관리</h2>
                    <p className="text-sm text-slate-500 mt-1">사용자 계정 생성 및 역할(Role)별 권한을 관리합니다.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} />
                    <span>사용자 추가</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User List */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Users size={18} />
                            사용자 목록
                        </h3>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input
                                type="text"
                                placeholder="이름, 이메일, 역할 검색..."
                                className="w-full pl-9 pr-3 py-1.5 text-sm rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3">사용자 정보</th>
                                    <th className="px-6 py-3">역할 (Role)</th>
                                    <th className="px-6 py-3">소속 (Tenant)</th>
                                    <th className="px-6 py-3">상태</th>
                                    <th className="px-6 py-3">관리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                                                {roles.find(r => r.code === user.role)?.name || user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {user.tenant}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${user.status === 'Active' ? 'text-green-600' : 'text-slate-400'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                                                {user.status === 'Active' ? '활성' : '비활성'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="p-1 hover:bg-blue-50 rounded text-slate-400 hover:text-blue-600 transition-colors"
                                                    title="수정"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition-colors"
                                                    title="삭제"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Permission Matrix Preview */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
                    <div className="p-4 border-b border-slate-200 bg-slate-50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Shield size={18} />
                            권한 매트릭스 (요약)
                        </h3>
                    </div>
                    <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                        <div className="space-y-3">
                            <div className="pb-3 border-b border-slate-100">
                                <h4 className="text-sm font-semibold text-slate-700 mb-2">시스템 관리</h4>
                                <ul className="text-xs space-y-1.5 text-slate-600">
                                    <li className="flex items-center justify-between">
                                        <span>테넌트 생성</span>
                                        <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-bold">SUPER</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>감사 로그 조회</span>
                                        <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-bold">SUPER</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pb-3 border-b border-slate-100">
                                <h4 className="text-sm font-semibold text-slate-700 mb-2">운영 관리</h4>
                                <ul className="text-xs space-y-1.5 text-slate-600">
                                    <li className="flex items-center justify-between">
                                        <span>요금 정책 설정</span>
                                        <div className="flex gap-1">
                                            <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-bold">S</span>
                                            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">OP</span>
                                        </div>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>차단기 제어</span>
                                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold">FIELD</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-slate-700 mb-2">재무/회계</h4>
                                <ul className="text-xs space-y-1.5 text-slate-600">
                                    <li className="flex items-center justify-between">
                                        <span>매출 리포트</span>
                                        <span className="text-slate-400">All Roles (Scope Limited)</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>세무 증빙 발행</span>
                                        <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-bold">ACC</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 text-center">
                        * 상세 권한 설정은 시스템 설정 메뉴 참조
                    </div>
                </div>
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                user={selectedUser}
            />
        </div>
    );
};

export default UserManagement;
