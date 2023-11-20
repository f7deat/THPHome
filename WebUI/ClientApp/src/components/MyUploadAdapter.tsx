export class MyUploadAdapter {
    constructor(loader: any) {
        // CKEditor 5's FileLoader instance.
        (this as any).loader = loader;

        // URL where to send files.
        (this as any).url = '/api/file/image/upload';
    }

    // Starts the upload process.
    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        });
    }

    // Aborts the upload process.
    abort() {
        if ((this as any).xhr) {
            (this as any).xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = (this as any).xhr = new XMLHttpRequest();

        xhr.open('POST', (this as any).url, true);
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve: { (value: unknown): void; (arg0: { default: any; }): void; }, reject: { (reason?: any): void; (arg0: string | undefined): any; }) {
        const xhr = (this as any).xhr;
        const loader = (this as any).loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response.url
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', (evt: { lengthComputable: any; total: any; loaded: any; }) => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {
        const data = new FormData();
        (this as any).loader.file.then((uploadedFile: any) => {
            data.append('file', uploadedFile);
            (this as any).xhr.send(data);
        })
    }
}

export function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new MyUploadAdapter(loader);
    };
}