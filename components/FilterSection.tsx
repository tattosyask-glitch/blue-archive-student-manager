import React from 'react';
import { FilterType, SortType, Student } from '../types';

interface FilterSectionProps {
    currentFilter: FilterType;
    setFilter: (filter: FilterType) => void;
    schoolFilter: string;
    setSchoolFilter: (school: string) => void;
    weaponFilter: string;
    setWeaponFilter: (weapon: string) => void;
    sortFilter: SortType;
    setSortFilter: (sort: SortType) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    availableSchools: string[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
    currentFilter,
    setFilter,
    schoolFilter,
    setSchoolFilter,
    weaponFilter,
    setWeaponFilter,
    sortFilter,
    setSortFilter,
    searchTerm,
    setSearchTerm,
    availableSchools
}) => {
    return (
        <div className="bg-[#16213e] p-4 md:p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row items-start md:items-center gap-6 flex-wrap border border-[#2c3e50]">
            <div className="flex items-center gap-2">
                <label className="font-medium text-white text-sm whitespace-nowrap">絞り込み:</label>
                {(['all', 'owned', 'unowned'] as FilterType[]).map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setFilter(filter)}
                        className={`px-3 py-1.5 border rounded-md text-sm cursor-pointer transition-all duration-300 ${
                            currentFilter === filter
                                ? 'bg-[#4A90E2] text-white border-[#4A90E2]'
                                : 'bg-[#16213e] text-[#b0b0b0] border-[#2c3e50] hover:bg-[#4A90E2] hover:text-white hover:border-[#4A90E2]'
                        }`}
                    >
                        {filter === 'all' ? 'すべて' : filter === 'owned' ? '所持済み' : '未所持'}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <label className="font-medium text-white text-sm whitespace-nowrap">学園:</label>
                <select
                    value={schoolFilter}
                    onChange={(e) => setSchoolFilter(e.target.value)}
                    className="px-2.5 py-1.5 border border-[#2c3e50] rounded-md bg-[#16213e] text-white text-sm min-w-[120px] focus:outline-none focus:border-[#4A90E2]"
                >
                    <option value="all">すべて</option>
                    {availableSchools.map(school => (
                        <option key={school} value={school}>{school}</option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-2">
                <label className="font-medium text-white text-sm whitespace-nowrap">固有武器:</label>
                <select
                    value={weaponFilter}
                    onChange={(e) => setWeaponFilter(e.target.value)}
                    className="px-2.5 py-1.5 border border-[#2c3e50] rounded-md bg-[#16213e] text-white text-sm min-w-[120px] focus:outline-none focus:border-[#4A90E2]"
                >
                    <option value="all">すべて</option>
                    <option value="has">あり</option>
                    <option value="none">なし</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <label className="font-medium text-white text-sm whitespace-nowrap">ソート:</label>
                <select
                    value={sortFilter}
                    onChange={(e) => setSortFilter(e.target.value as SortType)}
                    className="px-2.5 py-1.5 border border-[#2c3e50] rounded-md bg-[#16213e] text-white text-sm min-w-[120px] focus:outline-none focus:border-[#4A90E2]"
                >
                    <option value="default">デフォルト</option>
                    <option value="name">名前</option>
                    <option value="level">レベル</option>
                    <option value="yellowStars">★の数</option>
                    <option value="bondLevel">絆レベル</option>
                </select>
            </div>

            <div className="flex items-center gap-2 ml-auto w-full md:w-auto">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="生徒名で検索..."
                    className="px-3 py-2 border border-[#2c3e50] rounded-lg bg-[#16213e] text-white text-sm min-w-[180px] w-full focus:outline-none focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/10 placeholder-[#b0b0b0]"
                />
            </div>
        </div>
    );
};

export default FilterSection;