export class ImageDB {
    private dbName = 'blueArchiveImages';
    private storeName = 'images';
    private version = 1;
    private dbPromise: Promise<IDBDatabase> | null = null;

    private getDb(): Promise<IDBDatabase> {
        if (this.dbPromise) return this.dbPromise;

        this.dbPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        return this.dbPromise;
    }

    async putImage(imageId: string, blob: Blob): Promise<void> {
        const db = await this.getDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            store.put(blob, imageId);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    async getImage(imageId: string): Promise<Blob | null> {
        const db = await this.getDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(this.storeName, 'readonly');
            const req = tx.objectStore(this.storeName).get(imageId);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(req.error);
        });
    }

    async clear(): Promise<void> {
        const db = await this.getDb();
        return new Promise((resolve, reject) => {
             const tx = db.transaction(this.storeName, 'readwrite');
             tx.objectStore(this.storeName).clear();
             tx.oncomplete = () => resolve();
             tx.onerror = () => reject(tx.error);
        });
    }
}

export const imageDB = new ImageDB();

export const dataUrlToBlob = (dataUrl: string): Blob => {
    const arr = dataUrl.split(',');
    const match = arr[0].match(/:(.*?);/);
    const mime = match ? match[1] : 'application/octet-stream';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};