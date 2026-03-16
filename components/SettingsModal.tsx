import React, { useRef } from 'react';
import { X, Image as ImageIcon, Folder, Trash2, Download, Upload } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoadFiles: (files: FileList) => void;
    onClearData: () => void;
    onExportData: () => void;
    onImportData: (file: File) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
    isOpen, 
    onClose, 
    onLoadFiles, 
    onClearData,
    onExportData,
    onImportData
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);
    const importInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onLoadFiles(e.target.files);
            e.target.value = ''; // Reset
        }
    };

    const handleImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onImportData(e.target.files[0]);
            e.target.value = ''; // Reset
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1a1a2e] rounded-2xl w-full max-w-lg shadow-2xl animate-[fadeIn_0.3s_ease] overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center p-5 border-b border-[#2c3e50]">
                    <h2 className="text-xl font-bold text-white m-0">設定</h2>
                    <button 
                        onClick={onClose}
                        className="bg-[#F44336] text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#d32f2f] hover:scale-110"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="mb-8">
                        <h3 className="text-lg text-white mb-4 border-l-4 border-[#4A90E2] pl-3">画像読み込み</h3>
                        <div className="flex flex-col gap-4">
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-3 px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all text-white bg-gradient-to-r from-[#4A90E2] to-[#7B68EE] shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:-translate-y-0.5 justify-start w-full"
                            >
                                <ImageIcon className="w-5 h-5" />
                                画像を選択して読み込む
                            </button>
                            <button 
                                onClick={() => folderInputRef.current?.click()}
                                className="flex items-center gap-3 px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all text-white bg-gradient-to-r from-[#4A90E2] to-[#7B68EE] shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:-translate-y-0.5 justify-start w-full"
                            >
                                <Folder className="w-5 h-5" />
                                フォルダごと読み込む
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                         <h3 className="text-lg text-white mb-4 border-l-4 border-[#00B894] pl-3">バックアップと復元</h3>
                         <div className="flex flex-col gap-4">
                            <button 
                                onClick={onExportData}
                                className="flex items-center gap-3 px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all text-white bg-[#00B894] hover:bg-[#00a884] shadow-[0_4px_15px_rgba(0,184,148,0.3)] hover:-translate-y-0.5 justify-start w-full"
                            >
                                <Download className="w-5 h-5" />
                                データを保存 (JSONダウンロード)
                            </button>
                            <button 
                                onClick={() => importInputRef.current?.click()}
                                className="flex items-center gap-3 px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all text-white bg-[#2D3436] border border-[#636e72] hover:bg-[#353b48] justify-start w-full"
                            >
                                <Upload className="w-5 h-5" />
                                データを復元 (JSON読み込み)
                            </button>
                         </div>
                         <p className="text-xs text-[#b2bec3] mt-2 ml-1">
                             ※ ダウンロードしたJSONファイルをGoogle Drive等に保存してください。<br/>
                             ※ 画像データは含まれません。復元後に再度画像を読み込んでください。
                         </p>
                    </div>

                    <div>
                        <h3 className="text-lg text-white mb-4 border-l-4 border-[#F44336] pl-3">初期化</h3>
                        <button 
                            onClick={onClearData}
                            className="flex items-center gap-3 px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all text-white bg-[#F44336]/20 border border-[#F44336] text-[#FF7675] hover:bg-[#F44336] hover:text-white justify-start w-full"
                        >
                            <Trash2 className="w-5 h-5" />
                            すべてのデータを削除
                        </button>
                    </div>
                </div>
            </div>
            
            <input 
                type="file" 
                ref={fileInputRef}
                accept="image/png" 
                multiple 
                className="hidden" 
                onChange={handleFileChange}
            />
            <input 
                type="file" 
                ref={folderInputRef}
                // @ts-ignore: webkitdirectory is standard in most browsers but not in React types
                webkitdirectory="" 
                directory="" 
                multiple 
                className="hidden" 
                onChange={handleFileChange}
            />
            <input 
                type="file" 
                ref={importInputRef}
                accept=".json" 
                className="hidden" 
                onChange={handleImportChange}
            />
        </div>
    );
};

export default SettingsModal;