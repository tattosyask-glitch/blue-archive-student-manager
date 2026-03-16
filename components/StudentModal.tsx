import React, { useEffect, useState } from 'react';
import { Student } from '../types';
import { imageDB } from '../utils/db';
import { X, Save, Trash2, Zap, Heart, Star, Shield, Crosshair } from 'lucide-react';

interface StudentModalProps {
    student: Student | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedStudent: Student) => void;
    onDelete: (student: Student) => void;
}

const StudentModal: React.FC<StudentModalProps> = ({ student, isOpen, onClose, onSave, onDelete }) => {
    const [formData, setFormData] = useState<Student | null>(null);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (student) {
            setFormData({ ...student });
            const loadImg = async () => {
                if (student.imageId) {
                    const blob = await imageDB.getImage(student.imageId);
                    if (blob) setImageUrl(URL.createObjectURL(blob));
                } else if (student.image) {
                    setImageUrl(student.image);
                }
            };
            loadImg();
        }
    }, [student, isOpen]);

    if (!isOpen || !formData) return null;

    const handleChange = (field: keyof Student, value: any) => {
        setFormData(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handleSave = () => {
        if (formData) {
            onSave(formData);
            onClose();
        }
    };

    const handleDelete = () => {
        if (formData && confirm(`${formData.name}のデータを削除してもよろしいですか？`)) {
            onDelete(formData);
            onClose();
        }
    };

    const normalSkillOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const exSkillOptions = [1, 2, 3, 4, 5];
    const equipOptions = Array.from({ length: 10 }, (_, i) => i + 1); // T1-T10

    // Check if current star selection is "blue" (Unique Weapon type)
    const isBlueStar = formData.stars && formData.stars.startsWith('blue');

    return (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-sans">
             <div className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden relative animate-[fadeIn_0.3s_ease-out] border border-white/20">
                
                {/* Decorative Top Strip */}
                <div className="absolute top-0 left-0 w-full h-3 bg-[#2D3436] z-20"></div>
                <div className="absolute top-0 left-0 w-[140px] h-3 bg-[#00AEEF] z-30 shadow-[0_0_10px_#00AEEF]"></div>

                {/* LEFT: Info Section */}
                <div className="w-full md:w-[58%] p-6 md:p-8 pt-10 flex flex-col gap-6 relative bg-white z-10">
                    
                    {/* Header: Name & School */}
                    <div className="relative">
                        <div className="flex items-end gap-3 mb-1">
                             <div className="w-2 h-10 bg-[#00AEEF] rounded-sm shrink-0 shadow-lg shadow-blue-200"></div>
                             <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] tracking-tighter leading-none">
                                {formData.name}
                             </h2>
                             {formData.costume !== 'default' && (
                                 <span className="text-lg text-[#636e72] font-medium mb-1.5 ml-1">({formData.costume})</span>
                             )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 ml-6 mt-3">
                            <span className="text-[11px] font-bold text-white bg-[#2D3436] px-3 py-1 rounded-sm tracking-widest shadow-sm">
                                {formData.school || '所属不明'}
                            </span>
                            <span className="text-xs font-bold text-[#636e72] tracking-wider border-l-2 border-[#dfe6e9] pl-3 uppercase">
                                {formData.affiliation || '部活不明'}
                            </span>
                        </div>
                    </div>

                    <div className="w-full h-px bg-[#dfe6e9] opacity-70"></div>

                    {/* Owned Toggle */}
                    <div className="ml-2">
                         <label className="flex items-center gap-4 cursor-pointer group select-none">
                             <div className="relative">
                                 <input 
                                    type="checkbox" 
                                    checked={formData.owned} 
                                    onChange={(e) => handleChange('owned', e.target.checked)}
                                    className="sr-only"
                                 />
                                 <div className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${formData.owned ? 'bg-[#00AEEF] shadow-[0_0_8px_#00AEEF]' : 'bg-[#b2bec3]'}`}>
                                     <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${formData.owned ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                 </div>
                             </div>
                             <span className={`text-sm font-bold tracking-widest transition-colors ${formData.owned ? 'text-[#00AEEF]' : 'text-[#b2bec3]'}`}>
                                 {formData.owned ? '所持済み' : '未所持'}
                             </span>
                        </label>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 md:gap-5">
                        {/* Level */}
                        <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0] relative group hover:border-[#00AEEF] transition-colors">
                             <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest flex items-center gap-1 mb-1">
                                <Zap className="w-3 h-3 text-[#F1C40F]" /> レベル
                             </label>
                             <div className="relative">
                                 <select 
                                     disabled={!formData.owned}
                                     value={formData.level} 
                                     onChange={e => handleChange('level', parseInt(e.target.value))}
                                     className="w-full bg-transparent text-[#2D3436] font-extrabold text-xl p-0 outline-none appearance-none disabled:opacity-30 cursor-pointer"
                                 >
                                    {Array.from({length: 90}, (_, i) => i + 1).map(lv => (
                                        <option key={lv} value={lv}>Lv.{lv}</option>
                                    ))}
                                 </select>
                                 <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#CBD5E1] text-[10px]">▼</div>
                             </div>
                        </div>

                        {/* Bond */}
                        <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0] relative group hover:border-[#E84393] transition-colors">
                             <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest flex items-center gap-1 mb-1">
                                <Heart className="w-3 h-3 text-[#E84393]" /> 絆レベル
                             </label>
                             <div className="relative">
                                 <select 
                                     disabled={!formData.owned}
                                     value={formData.affection} 
                                     onChange={e => handleChange('affection', parseInt(e.target.value))}
                                     className="w-full bg-transparent text-[#E84393] font-extrabold text-xl p-0 outline-none appearance-none disabled:opacity-30 cursor-pointer"
                                 >
                                    {Array.from({length: 100}, (_, i) => i + 1).map(val => (
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                 </select>
                                 <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#CBD5E1] text-[10px]">▼</div>
                             </div>
                        </div>

                        {/* Stars */}
                        <div className={`bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0] relative group transition-colors ${isBlueStar ? 'hover:border-[#4A90E2]' : 'hover:border-[#FDCB6E]'}`}>
                             <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest flex items-center gap-1 mb-1">
                                <Star className={`w-3 h-3 ${isBlueStar ? 'text-[#4A90E2]' : 'text-[#FDCB6E]'}`} /> ★の数
                             </label>
                             <div className="relative">
                                 <select 
                                     disabled={!formData.owned}
                                     value={formData.stars} 
                                     onChange={e => handleChange('stars', e.target.value)}
                                     className={`w-full bg-transparent font-extrabold text-lg p-0 outline-none appearance-none disabled:opacity-30 cursor-pointer truncate ${isBlueStar ? 'text-[#4A90E2]' : 'text-[#FDCB6E]'}`}
                                 >
                                    <option value="blue5" className="text-[#4A90E2]">固有武器 ★★★★</option>
                                    <option value="blue4" className="text-[#4A90E2]">固有武器 ★★★</option>
                                    <option value="blue3" className="text-[#4A90E2]">固有武器 ★★</option>
                                    <option value="blue2" className="text-[#4A90E2]">固有武器 ★</option>
                                    <option value="yellow5" className="text-[#FDCB6E]">★ 5</option>
                                    <option value="yellow4" className="text-[#FDCB6E]">★ 4</option>
                                    <option value="yellow3" className="text-[#FDCB6E]">★ 3</option>
                                    <option value="yellow2" className="text-[#FDCB6E]">★ 2</option>
                                    <option value="yellow1" className="text-[#FDCB6E]">★ 1</option>
                                 </select>
                                 <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#CBD5E1] text-[10px]">▼</div>
                             </div>
                        </div>
                    </div>

                    {/* Detailed Stats Panel */}
                    <div className="bg-[#F0F4F8] rounded-2xl p-4 md:p-5 flex flex-col gap-5 border border-[#E2E8F0] shadow-inner">
                        {/* Skills */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                                <Crosshair className="w-3.5 h-3.5" /> スキル
                            </label>
                            <div className="flex gap-2 justify-between">
                                {[1, 2, 3, 4].map(idx => {
                                    const isEx = idx === 1;
                                    const options = isEx ? exSkillOptions : normalSkillOptions;
                                    const maxVal = isEx ? 5 : 10;
                                    
                                    return (
                                        <div key={idx} className="flex-1 flex flex-col items-center bg-white rounded-lg p-1.5 border border-[#E2E8F0] shadow-sm">
                                            <span className="text-[9px] text-[#94A3B8] font-bold mb-0.5">{idx === 1 ? 'EX' : idx === 2 ? 'NS' : idx === 3 ? 'PS' : 'SS'}</span>
                                            <select 
                                                disabled={!formData.owned}
                                                value={formData[`skill${idx}` as keyof Student] as number || 1}
                                                onChange={(e) => handleChange(`skill${idx}` as keyof Student, parseInt(e.target.value))}
                                                className="w-full text-center font-bold text-[#2D3436] bg-transparent outline-none appearance-none text-sm disabled:opacity-30 cursor-pointer"
                                            >
                                                {options.map(val => (
                                                    <option key={val} value={val}>{val === maxVal ? 'M' : val}</option>
                                                ))}
                                            </select>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Equip */}
                         <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                                <Shield className="w-3.5 h-3.5" /> 装備
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3].map(idx => (
                                    <div key={idx} className="flex-1 flex flex-col items-center bg-white rounded-lg p-1.5 border border-[#E2E8F0] shadow-sm">
                                        <span className="text-[9px] text-[#94A3B8] font-bold mb-0.5">Slot {idx}</span>
                                        <select 
                                            disabled={!formData.owned}
                                            value={formData[`equip${idx}` as keyof Student] as number || 0}
                                            onChange={(e) => handleChange(`equip${idx}` as keyof Student, parseInt(e.target.value))}
                                            className="w-full text-center font-bold text-[#2D3436] bg-transparent outline-none appearance-none text-sm disabled:opacity-30 cursor-pointer"
                                        >
                                            <option value={0}>-</option>
                                            {equipOptions.map(val => (
                                                <option key={val} value={val}>T{val}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                                <div className="flex-[1.5] flex flex-col items-center bg-white rounded-lg p-1.5 border border-[#E2E8F0] shadow-sm">
                                    <span className="text-[9px] text-[#94A3B8] font-bold mb-0.5">愛用品</span>
                                    <select 
                                        disabled={!formData.owned}
                                        value={formData.loveItem || 'なし'}
                                        onChange={(e) => handleChange('loveItem', e.target.value)}
                                        className="w-full text-center font-bold text-[#2D3436] bg-transparent outline-none appearance-none text-sm disabled:opacity-30 cursor-pointer"
                                    >
                                        <option value="なし">-</option>
                                        <option value="T1">T1</option>
                                        <option value="T2">T2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="mt-auto pt-4 flex gap-4">
                         <button 
                            onClick={handleSave} 
                            className="flex-1 bg-gradient-to-r from-[#00AEEF] to-[#0077C8] hover:from-[#0097d6] hover:to-[#006bb3] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                         >
                            <Save className="w-5 h-5" />
                            <span className="tracking-widest">保存</span>
                         </button>
                         <button 
                            onClick={handleDelete} 
                            className="px-6 bg-[#ffebee] hover:bg-[#ffcdd2] text-[#d63031] font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center border border-[#ffcdd2]"
                            title="データを削除"
                         >
                            <Trash2 className="w-5 h-5" />
                         </button>
                    </div>
                </div>

                {/* RIGHT: Image Section */}
                <div className="w-full md:w-[42%] bg-[#E1F5FE] relative flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-auto border-l border-white/50">
                    {/* Close Button */}
                    <button 
                        onClick={onClose} 
                        className="absolute top-5 right-5 z-40 bg-white/70 hover:bg-white text-[#2D3436] p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all hover:scale-110"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply" 
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(179, 229, 252, 0.5) 1px, transparent 1px), 
                                linear-gradient(90deg, rgba(179, 229, 252, 0.5) 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px'
                        }}
                    ></div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-white/60 to-transparent opacity-50 z-0 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#B3E5FC]/40 to-transparent z-0 pointer-events-none"></div>
                    
                    {/* Large Halo/Ring Decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square border-[20px] border-white/30 rounded-full z-0 pointer-events-none transform -rotate-12 animate-[spin_60s_linear_infinite]"></div>

                    {/* Character Image */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                        {imageUrl ? (
                            <img 
                                src={imageUrl} 
                                className="w-full h-full object-contain drop-shadow-2xl filter contrast-[1.05] brightness-[1.02]"
                                style={{ maxHeight: '550px' }}
                            />
                        ) : (
                            <div className="text-[#0288D1]/40 font-bold text-2xl tracking-widest border-2 border-[#0288D1]/20 p-10 rounded-xl">NO IMAGE</div>
                        )}
                    </div>
                    
                    {/* Bottom Right Decorative Text */}
                    <div className="absolute bottom-4 right-4 text-[#0288D1]/30 font-bold text-[10px] tracking-[0.3em] z-10 pointer-events-none font-mono">
                        S.C.H.A.L.E DATABASE
                    </div>
                </div>

             </div>
        </div>
    );
};

export default StudentModal;