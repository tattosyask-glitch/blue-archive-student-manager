import React from 'react';
import { Student } from '../types';

interface StatsSectionProps {
    students: Student[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ students }) => {
    const total = students.length;
    const owned = students.filter(s => s.owned).length;
    const rate = total > 0 ? Math.round((owned / total) * 100) : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <StatCard label="総生徒数" value={total} />
            <StatCard label="所持数" value={owned} />
            <StatCard label="所持率" value={`${rate}%`} />
        </div>
    );
};

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-[#16213e]/90 backdrop-blur-md rounded-xl p-6 text-center shadow-lg border border-[#2c3e50] transition-transform duration-300 hover:-translate-y-1">
        <div className="text-4xl font-bold text-[#4A90E2] mb-2">{value}</div>
        <div className="text-[#b0b0b0] text-sm uppercase tracking-widest">{label}</div>
    </div>
);

export default StatsSection;