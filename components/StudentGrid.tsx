import React from 'react';
import { Student, StudentGroup, SortType } from '../types';
import StudentCard from './StudentCard';

interface StudentGridProps {
    students: Student[];
    sortType: SortType;
    onToggleOwned: (student: Student) => void;
    onClick: (student: Student) => void;
    onEditName: (student: Student) => void;
}

const StudentGrid: React.FC<StudentGridProps> = ({ students, sortType, onToggleOwned, onClick, onEditName }) => {
    
    // Sort logic
    const getSortedData = () => {
        if (sortType === 'default') {
            const groupedBySchool: { [key: string]: Student[] } = {};
            students.forEach(student => {
                const school = student.school || '不明';
                if (!groupedBySchool[school]) groupedBySchool[school] = [];
                groupedBySchool[school].push(student);
            });

            const sortedGroups: StudentGroup[] = Object.keys(groupedBySchool)
                .sort((a, b) => a.localeCompare(b, 'ja'))
                .map(school => {
                    const schoolStudents = groupedBySchool[school];
                    const groupedByAffiliation: { [key: string]: Student[] } = {};
                    
                    schoolStudents.forEach(student => {
                        const affiliation = student.affiliation || '';
                        if (!groupedByAffiliation[affiliation]) groupedByAffiliation[affiliation] = [];
                        groupedByAffiliation[affiliation].push(student);
                    });

                    const sortedAffiliations = Object.keys(groupedByAffiliation)
                        .sort((a, b) => a.localeCompare(b, 'ja'))
                        .map(affiliation => {
                            const affStudents = groupedByAffiliation[affiliation];
                            affStudents.sort((a, b) => {
                                const nameCmp = (a.name || '').localeCompare((b.name || ''), 'ja');
                                if (nameCmp !== 0) return nameCmp;
                                const aCostume = a.costume === 'default' ? '' : a.costume;
                                const bCostume = b.costume === 'default' ? '' : b.costume;
                                return aCostume.localeCompare(bCostume, 'ja');
                            });
                            return { affiliation, students: affStudents };
                        });

                    return { school, affiliations: sortedAffiliations };
                });
            return sortedGroups;
        } else {
            const sorted = [...students];
            if (sortType === 'name') {
                sorted.sort((a, b) => {
                    if (a.owned !== b.owned) return (b.owned ? 1 : 0) - (a.owned ? 1 : 0);
                    return (a.name || '').localeCompare((b.name || ''), 'ja');
                });
            } else if (sortType === 'level') {
                const owned = sorted.filter(s => s.owned).sort((a, b) => (b.level || 1) - (a.level || 1));
                const unowned = sorted.filter(s => !s.owned).sort((a, b) => (a.name || '').localeCompare((b.name || ''), 'ja'));
                return [...owned, ...unowned];
            } else if (sortType === 'yellowStars') {
                const getStarPriority = (stars: string) => {
                    if (!stars) return { priority: 0, count: 0 };
                    if (stars.startsWith('blue')) return { priority: 2, count: parseInt(stars.replace('blue', '')) || 0 };
                    if (stars.startsWith('yellow')) return { priority: 1, count: parseInt(stars.replace('yellow', '')) || 0 };
                    return { priority: 0, count: 0 };
                };
                const owned = sorted.filter(s => s.owned).sort((a, b) => {
                    const aP = getStarPriority(a.stars);
                    const bP = getStarPriority(b.stars);
                    if (aP.priority !== bP.priority) return bP.priority - aP.priority;
                    return bP.count - aP.count;
                });
                const unowned = sorted.filter(s => !s.owned).sort((a, b) => (a.name || '').localeCompare((b.name || ''), 'ja'));
                return [...owned, ...unowned];
            } else if (sortType === 'bondLevel') {
                const owned = sorted.filter(s => s.owned).sort((a, b) => (b.affection || 1) - (a.affection || 1));
                const unowned = sorted.filter(s => !s.owned).sort((a, b) => (a.name || '').localeCompare((b.name || ''), 'ja'));
                return [...owned, ...unowned];
            }
            return sorted;
        }
    };

    const data = getSortedData();

    if (sortType === 'default') {
        const groups = data as StudentGroup[];
        return (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 mb-8">
                {groups.map((group) => (
                    <React.Fragment key={group.school}>
                        <div className="col-span-full py-2 px-3 mt-2.5 rounded-lg bg-[#16213e]/85 border border-[#2c3e50] shadow-md font-semibold text-white">
                            {group.school}
                        </div>
                        {group.affiliations.map(aff => (
                            aff.students.map(student => (
                                <StudentCard
                                    key={student.id}
                                    student={student}
                                    onToggleOwned={onToggleOwned}
                                    onClick={onClick}
                                    onEditName={onEditName}
                                />
                            ))
                        ))}
                    </React.Fragment>
                ))}
            </div>
        );
    } else {
        const flatStudents = data as Student[];
        return (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 mb-8">
                {flatStudents.map(student => (
                    <StudentCard
                        key={student.id}
                        student={student}
                        onToggleOwned={onToggleOwned}
                        onClick={onClick}
                        onEditName={onEditName}
                    />
                ))}
            </div>
        );
    }
};

export default StudentGrid;