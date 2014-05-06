/**
 * The Google Realtime API.
 */
declare module gapi.drive.realtime {
    /**
     * Loads the Realtime document associated with fileId. If no Realtime document is associated with fileId, a new Realtime document associated with fileId will be created.
     * @param field The ID of the file to load.
     * @param onLoaded A callback that will be called when the Realtime document is ready. The created or opened Realtime document object will be passed to this function.
     * @param opt_initializerFn An optional initialization function that will be called before onLoaded only the first time that the document is loaded. The document's {@link gapi.drive.realtime.Model} object will be passed to this function.
     * @param opt_errorFn An optional error handling function that will be called if an error occurs while the document is being loaded or edited. A gapi.drive.realtime.Error object describing the error will be passed to this function.
     */
    function load(field:string, onLoaded:Function, opt_initializerFn:Function, opt_errorFn:Function):void;
    /**
     * An error affecting the realtime document.
     */
    export class Error {
        /**
         * An error affecting the realtime document.
         * @param type
         * @param message
         * @param isFatal
         */
        constructor(type: string, message:string, isFatal:boolean);
        /**
         * Whether the error is fatal. Fatal errors cannot be recovered from and require the document to be reloaded.
         */
        isFatal: boolean;
        /**
         * A message describing the error.
         */
        message: string;
        /**
         * The type of the error that occurred.
         */
        type: string;
    }

    /**
     * Errors that can occur while loading or collaborating on a document.
     */
    export var ErrorType: {
        /**
         * An internal error occurred in the Drive Realtime API client.
         */
        CLIENT_ERROR: string;
        /**
         * Another user created the document's initial state after gapi.drive.realtime.load was called but before the local creation was saved.
         */
        CONCURRENT_CREATION: string;
        /**
         * The user associated with the provided OAuth token is not authorized to access the provided document ID.
         */
        FORBIDDEN: string;
        /**
         * A compound operation was still open at the end of a synchronous block. Compound operations must always be ended in the same synchronous block that they are started
         */
        INVALID_COMPOUND_OPERATION: string;
        /**
         * The provided document ID could not be found.
         */
        NOT_FOUND: string;
        /**
         * An internal error occurred in the Drive Realtime API server.
         */
        SERVER_ERROR: string;
        /**
         * The provided OAuth token is no longer valid and must be refreshed.
         */
        TOKEN_REFRESH_REQUIRED: string;
    }
}
