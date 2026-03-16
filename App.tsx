import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsSection from './components/StatsSection';
import FilterSection from './components/FilterSection';
import StudentGrid from './components/StudentGrid';
import SettingsModal from './components/SettingsModal';
import StudentModal from './components/StudentModal';
import ProgressModal from './components/ProgressModal';
import { Student, FilterType, SortType } from './types';
import { SAMPLE_STUDENTS, STATIC_SCHOOL_MAP } from './constants';
import { parseFileName } from './utils/parsers';
import { imageDB, dataUrlToBlob } from './utils/db';
import { auth, db, signInWithGoogle, logout } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs, writeBatch, 

const App: React.FC = () => {
    // Data State
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // UI State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    
    // Progress Modal State
    const [isProgressOpen, setIsProgressOpen] = useState(false);
    const [progressCurrent, setProgressCurrent] = useState(0);
    const [progressTotal, setProgressTotal] = useState(0);

    // Filter State
    const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
    const [schoolFilter, setSchoolFilter] = useState('all');
    const [weaponFilter, setWeaponFilter] = useState('all');
    const [sortFilter, setSortFilter] = useState<SortType>('default');
    const [searchTerm, setSearchTerm] = useState('');

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    // Load Initial Data
    useEffect(() => {
        if (!isAuthReady) return;

        const loadData = async () => {
            if (user) {
                // Load from Firestore
                try {
                    const studentsRef = collection(db, `users/${user.uid}/students`);
                    const snapshot = await getDocs(studentsRef);
                    
                    if (!snapshot.empty) {
                        const firestoreStudents = snapshot.docs.map(doc => doc.data() as Student);
                        setStudents(firestoreStudents);
                        setIsLoaded(true);
                        return;
                    }
                    
                    // If Firestore is empty, check LocalStorage for migration
                    const stored = localStorage.getItem('blueArchiveStudents');
                    if (stored) {
                        try {
                            const localStudents: Student[] = JSON.parse(stored);
                            if (localStudents.length > 0 && confirm('ローカルに保存されているデータをクラウドに同期しますか？')) {
                                // Sync to Firestore
                                const batch = writeBatch(db);
                                localStudents.forEach(s => {
                                    const studentRef = doc(db, `users/${user.uid}/students`, s.key);
                                    batch.set(studentRef, { ...s, updatedAt: new Date().toISOString() });
                                });
                                await batch.commit();
                                setStudents(localStudents);
                                setIsLoaded(true);
                                return;
                            }
                        } catch (e) {
                            console.error("Migration failed", e);
                        }
                    }
                    
                    // Default if nothing found
                    setStudents(SAMPLE_STUDENTS);
                } catch (e) {
                    console.error("Firestore load failed", e);
                    setStudents(SAMPLE_STUDENTS);
                }
            } else {
                // Load from LocalStorage (Guest Mode)
                const stored = localStorage.getItem('blueArchiveStudents');
                if (stored) {
                    try {
                        let parsedStudents: Student[] = JSON.parse(stored);
                        // Migration Logic
                        parsedStudents = parsedStudents.map(s => ({
                            ...s,
                            costume: s.costume || 'default',
                            key: s.key || `${(s.name || '').toLowerCase()}__${(s.costume || 'default').toLowerCase()}`,
                            school: s.school || '',
                            affiliation: s.affiliation || '',
                            stars: s.stars || (s['blueStars' as keyof Student] ? `blue${s['blueStars' as keyof Student]}` : `yellow${s['yellowStars' as keyof Student] || 3}`)
                        }));
                        
                        // Re-apply school map (incase static map updated)
                        parsedStudents.forEach(s => {
                            const entry = STATIC_SCHOOL_MAP[s.name];
                            if (entry) {
                                s.school = entry.school;
                                s.affiliation = entry.affiliation;
                            }
                        });
                        
                        setStudents(parsedStudents);
                    } catch (e) {
                        console.error("Failed to load students", e);
                        setStudents([]);
                    }
                } else {
                    setStudents(SAMPLE_STUDENTS);
                }
            }
            setIsLoaded(true);
        };

        loadData();
    }, [user, isAuthReady]);

    // Save Data
    useEffect(() => {
        if (isLoaded) {
            // Save to LocalStorage (Always as backup/guest mode)
            try {
                const dataToSave = students.map(({ image, ...rest }) => rest);
                localStorage.setItem('blueArchiveStudents', JSON.stringify(dataToSave));
            } catch (e) {
                console.error("Storage full?", e);
            }

            // Save to Firestore if logged in
            if (user) {
                // Note: In a real app, we might want to debounced or only save changed students
                // For simplicity here, we'll save individual students when they change in their respective handlers
                // But we can also do a bulk save here if needed, though it's expensive.
                // Instead, I'll modify the handlers to update Firestore.
            }
        }
    }, [students, isLoaded, user]);

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (e) {
            console.error("Login failed", e);
            alert("ログインに失敗しました。");
        }
    };

    const handleLogout = async () => {
        if (confirm('ログアウトしますか？')) {
            await logout();
            // Data will reload via useEffect
        }
    };

    const updateStudentInFirestore = async (student: Student) => {
        if (!user) return;
        try {
            const studentRef = doc(db, `users/${user.uid}/students`, student.key);
            await setDoc(studentRef, { ...student, updatedAt: new Date().toISOString() });
        } catch (e) {
            console.error("Firestore update failed", e);
        }
    };

    const handleLoadFiles = async (files: FileList) => {
        const fileList = Array.from(files).filter(f => f.name.toLowerCase().endsWith('.png'));
        if (fileList.length === 0) {
            alert('PNG画像が見つかりませんでした');
            return;
        }

        setIsSettingsOpen(false);
        setIsProgressOpen(true);
        setProgressTotal(fileList.length);
        setProgressCurrent(0);

        const newStudents = [...students];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const fileName = file.name.replace('.png', '');
            const { key, name, costume } = parseFileName(fileName);
            
            // Read file
            try {
                const buffer = await file.arrayBuffer();
                const blob = new Blob([buffer], { type: 'image/png' });
                
                // Store image in IndexedDB
                await imageDB.putImage(key, blob);

                const existingIndex = newStudents.findIndex(s => s.key === key);
                const schoolInfo = STATIC_SCHOOL_MAP[name] || { school: '', affiliation: '' };

                if (existingIndex > -1) {
                    newStudents[existingIndex] = {
                        ...newStudents[existingIndex],
                        imageId: key,
                        school: schoolInfo.school,
                        affiliation: schoolInfo.affiliation
                        // Keep other stats
                    };
                } else {
                    newStudents.push({
                        id: Date.now() + Math.random(),
                        key,
                        name,
                        costume,
                        school: schoolInfo.school,
                        affiliation: schoolInfo.affiliation,
                        imageId: key,
                        owned: false,
                        level: 1,
                        affection: 1,
                        stars: 'yellow3'
                    });
                }
            } catch (e) {
                console.error("Error processing file", file.name, e);
            }
            
            setProgressCurrent(i + 1);
            // Allow UI update
            await new Promise(r => setTimeout(r, 0)); 
        }

        setStudents(newStudents);
        setIsProgressOpen(false);

        // Sync new students to Firestore
        if (user) {
            const batch = writeBatch(db);
            newStudents.forEach(s => {
                const studentRef = doc(db, `users/${user.uid}/students`, s.key);
                batch.set(studentRef, { ...s, updatedAt: new Date().toISOString() });
            });
            await batch.commit();
        }
    };

    const handleClearData = async () => {
        if (confirm('すべてのデータを初期化してもよろしいですか？')) {
            setStudents([]);
            localStorage.removeItem('blueArchiveStudents');
            await imageDB.clear();
            setIsSettingsOpen(false);
        }
    };

    // Export Data (Backup)
    const handleExportData = () => {
        const dataStr = JSON.stringify(students, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `blue_archive_students_backup_${new Date().toISOString().slice(0, 10)}.json`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Import Data (Restore)
    const handleImportData = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = e.target?.result as string;
                const parsedData = JSON.parse(json);
                if (Array.isArray(parsedData)) {
                    if (confirm('現在のデータを上書きしてバックアップを復元しますか？')) {
                        setStudents(parsedData);
                        alert('復元が完了しました。画像が表示されない場合は、再度画像を読み込んでください。');
                        setIsSettingsOpen(false);
                    }
                } else {
                    alert('無効なバックアップファイルです。');
                }
            } catch (error) {
                console.error('Import error:', error);
                alert('ファイルの読み込みに失敗しました。');
            }
        };
        reader.readAsText(file);
    };

    const handleToggleOwned = (student: Student) => {
        const updated = { ...student, owned: !student.owned };
        setStudents(prev => prev.map(s => s.id === student.id ? updated : s));
        updateStudentInFirestore(updated);
    };

    const handleStudentClick = (student: Student) => {
        setSelectedStudent(student);
        setIsStudentModalOpen(true);
    };

    const handleEditName = (student: Student) => {
        const newName = prompt('生徒名を入力してください:', student.name);
        if (newName && newName.trim() && newName !== student.name) {
            const trimmedName = newName.trim();
            const schoolEntry = STATIC_SCHOOL_MAP[trimmedName];
            
            const updatedStudent = {
                ...student,
                name: trimmedName,
                school: schoolEntry ? schoolEntry.school : student.school,
                affiliation: schoolEntry ? schoolEntry.affiliation : student.affiliation
            };

            setStudents(prev => prev.map(s => s.id === student.id ? updatedStudent : s));
            updateStudentInFirestore(updatedStudent);
        }
    };

    const handleSaveStudent = (updatedStudent: Student) => {
        setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
        updateStudentInFirestore(updatedStudent);
    };

    const handleDeleteStudent = async (student: Student) => {
        if (confirm(`${student.name}を削除しますか？`)) {
            setStudents(prev => prev.filter(s => s.id !== student.id));
            if (user) {
                try {
                    const studentRef = doc(db, `users/${user.uid}/students`, student.key);
                    await deleteDoc(studentRef);
                } catch (e) {
                    console.error("Firestore delete failed", e);
                }
            }
        }
    };

    // Filtering logic
    const getFilteredStudents = () => {
        return students.filter(s => {
            // Owned Filter
            if (currentFilter === 'owned' && !s.owned) return false;
            if (currentFilter === 'unowned' && s.owned) return false;
            
            // School Filter
            if (schoolFilter !== 'all' && s.school !== schoolFilter) return false;
            
            // Weapon Filter
            const hasWeapon = s.stars && s.stars.startsWith('blue');
            if (weaponFilter === 'has' && !hasWeapon) return false;
            if (weaponFilter === 'none' && hasWeapon) return false;
            
            // Search
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                const matchesName = s.name.toLowerCase().includes(term);
                const matchesCostume = s.costume && s.costume.toLowerCase().includes(term);
                if (!matchesName && !matchesCostume) return false;
            }

            return true;
        });
    };

    const availableSchools = Array.from(new Set(students.map(s => s.school).filter(Boolean))).sort();

    return (
        <div className="max-w-[1400px] mx-auto p-5 pb-20">
            <Header 
                onOpenSettings={() => setIsSettingsOpen(true)} 
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}
            />
            
            <main>
                <StatsSection students={students} />
                
                <FilterSection 
                    currentFilter={currentFilter}
                    setFilter={setCurrentFilter}
                    schoolFilter={schoolFilter}
                    setSchoolFilter={setSchoolFilter}
                    weaponFilter={weaponFilter}
                    setWeaponFilter={setWeaponFilter}
                    sortFilter={sortFilter}
                    setSortFilter={setSortFilter}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    availableSchools={availableSchools}
                />

                <StudentGrid 
                    students={getFilteredStudents()} 
                    sortType={sortFilter}
                    onToggleOwned={handleToggleOwned}
                    onClick={handleStudentClick}
                    onEditName={handleEditName}
                />
            </main>

            <SettingsModal 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)} 
                onLoadFiles={handleLoadFiles}
                onClearData={handleClearData}
                onExportData={handleExportData}
                onImportData={handleImportData}
            />

            <StudentModal 
                isOpen={isStudentModalOpen}
                student={selectedStudent}
                onClose={() => setIsStudentModalOpen(false)}
                onSave={handleSaveStudent}
                onDelete={handleDeleteStudent}
            />

            <ProgressModal 
                isOpen={isProgressOpen}
                current={progressCurrent}
                total={progressTotal}
            />
        </div>
    );
};

export default App;