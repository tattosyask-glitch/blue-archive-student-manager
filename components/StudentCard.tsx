import React, { useEffect, useState } from 'react';
import { Student } from '../types';
import { imageDB } from '../utils/db';
import { Edit2, Star } from 'lucide-react';

interface StudentCardProps {
    student: Student;
    onToggleOwned: (student: Student) => void;
    onClick: (student: Student) => void;
    onEditName: (student: Student) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onToggleOwned, onClick, onEditName }) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        let active = true;
        const loadImg = async () => {
            if (student.imageId) {
                const blob = await imageDB.getImage(student.imageId);
                if (blob && active) {
                    setImageUrl(URL.createObjectURL(blob));
                }
            } else if (student.image) {
                 // Fallback for legacy data
                 setImageUrl(student.image);
            }
        };
        loadImg();
        return () => {
            active = false;
        };
    }, [student.imageId, student.image]);

    const displayName = student.costume === 'default' ? student.name : `${student.name}（${student.costume}）`;

    const getStarDisplay = (stars: string) => {
        if (!stars) return null;
        const [color, countStr] = stars.split(/(\d+)/);
        const count = parseInt(countStr) || 0;
        const isBlue = color === 'blue';
        const colorClass = isBlue ? 'text-[#4A90E2]' : 'text-[#FFD700]';
        
        return (
            <div className="flex gap-[1px] text-xs my-0.5">
                {Array.from({ length: count }).map((_, i) => (
                    <span key={i} className={`${colorClass} drop-shadow-[0_0_2px_rgba(var(--tw-text-opacity),0.5)]`}>★</span>
                ))}
            </div>
        );
    };

    return (
        <div 
            className={`relative bg-[#16213e]/90 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                student.owned 
                    ? 'border-transparent hover:-translate-y-1 hover:shadow-lg hover:border-[#4A90E2]' 
                    : 'border-dashed border-white/30 brightness-75 contrast-75 bg-[#3c3c3c]/95 hover:opacity-70'
            }`}
            onClick={() => onClick(student)}
        >
            {/* School Badge */}
            {student.school && (
                <div className="absolute top-2 left-2 z-10 px-2 py-1 rounded-full bg-[#1a1a2e]/85 border border-white/10 text-white text-[10px] backdrop-blur-md max-w-[calc(100%-16px)] whitespace-nowrap overflow-hidden text-ellipsis pointer-events-none">
                    {student.school}
                </div>
            )}

            <div className="relative aspect-square bg-gradient-to-br from-[#2c3e50] to-[#34495e]">
                {imageUrl && (
                    <img 
                        src={imageUrl} 
                        alt={displayName} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleOwned(student);
                        }}
                    />
                )}
            </div>
            
            <div className="p-3">
                <div className="flex justify-between items-start mb-1 gap-1">
                    <div className="font-medium text-sm text-white whitespace-nowrap overflow-hidden text-ellipsis" title={displayName}>
                        {displayName}
                    </div>
                    <button 
                        className="text-[#b0b0b0] hover:text-[#4A90E2] hover:bg-[#4A90E2]/10 p-0.5 rounded transition-colors shrink-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditName(student);
                        }}
                        title="名前を編集"
                    >
                        <Edit2 className="w-3.5 h-3.5" />
                    </button>
                </div>

                {student.owned && (
                    <>
                        {getStarDisplay(student.stars)}
                        <div className="text-[11px] text-[#b0b0b0] my-0.5">絆レベル: {student.affection || 1}</div>
                    </>
                )}

                <div className="flex items-center gap-1.5 text-xs text-[#b0b0b0] mt-1">
                    {student.owned ? (
                        <>
                            <span className="bg-[#4CAF50] text-white px-1.5 py-0.5 rounded text-[10px]">所持済み</span>
                            <span>Lv.{student.level || 1}</span>
                        </>
                    ) : (
                        <span>未所持</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentCard;