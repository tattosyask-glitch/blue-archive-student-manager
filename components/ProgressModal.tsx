import React from 'react';

interface ProgressModalProps {
    isOpen: boolean;
    current: number;
    total: number;
}

const ProgressModal: React.FC<ProgressModalProps> = ({ isOpen, current, total }) => {
    if (!isOpen) return null;

    const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

    return (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1a1a2e] p-8 rounded-2xl w-full max-w-sm text-center shadow-2xl">
                <h3 className="text-lg text-white mb-5">画像読み込み中...</h3>
                <div className="w-full h-2 bg-[#2c3e50] rounded-full overflow-hidden mb-4">
                    <div 
                        className="h-full bg-gradient-to-r from-[#4A90E2] to-[#7B68EE] transition-all duration-300 rounded-full"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <div className="text-[#b0b0b0] text-sm mb-2">{current} / {total}</div>
                <div className="text-[#4A90E2] text-lg font-semibold">{percentage}%</div>
            </div>
        </div>
    );
};

export default ProgressModal;