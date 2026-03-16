import React from 'react';
import { Settings, LogIn, LogOut, User } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
    onOpenSettings: () => void;
    user: FirebaseUser | null;
    onLogin: () => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings, user, onLogin, onLogout }) => {
    return (
        <header className="bg-[#1a1a2e]/90 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-5 border border-[#2c3e50]">
            <div className="flex flex-col items-start gap-1">
                <img 
                    src="./title_logo.png" 
                    alt="Blue Archive" 
                    className="h-16 md:h-20 w-auto object-contain"
                    onError={(e) => {
                        // フォールバック: 画像が見つからない場合はテキストを表示
                        e.currentTarget.style.display = 'none';
                        const span = e.currentTarget.nextElementSibling;
                        if (span) {
                            span.innerHTML = '<span class="text-2xl font-bold text-white">Blue Archive</span><br/>生徒名簿';
                            span.className = 'text-left';
                        }
                    }}
                />
                <span className="text-lg text-[#b0b0b0] font-light pl-1">生徒名簿</span>
            </div>
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-3 bg-[#16213e] p-2 pr-4 rounded-xl border border-[#2c3e50]">
                        {user.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-[#4A90E2]" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-[#4A90E2] flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                        )}
                        <div className="hidden sm:block">
                            <p className="text-xs text-[#b0b0b0]">ログイン中</p>
                            <p className="text-sm font-medium text-white truncate max-w-[120px]">{user.displayName}</p>
                        </div>
                        <button 
                            onClick={onLogout}
                            className="ml-2 p-2 text-[#b0b0b0] hover:text-red-400 transition-colors"
                            title="ログアウト"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={onLogin}
                        className="flex items-center gap-2 px-6 py-3 border border-[#4A90E2] rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 text-white hover:bg-[#4A90E2]/10"
                    >
                        <LogIn className="w-5 h-5" />
                        ログインして同期
                    </button>
                )}
                <button 
                    onClick={onOpenSettings}
                    className="flex items-center gap-2 px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 text-white bg-gradient-to-r from-[#4A90E2] to-[#7B68EE] shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,144,226,0.4)]"
                >
                    <Settings className="w-5 h-5" />
                    設定
                </button>
            </div>
        </header>
    );
};

export default Header;