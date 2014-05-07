/**
 * The Google Realtime API.
 */
declare module gapi.drive.realtime {
    /**
     * A namespace that includes classes and methods for binding collaborative objects to UI elements.
     */
    module databinding {
        /**
         * Binds a text input element to an collaborative string. Once bound, any change to the collaborative string (including changes from other remote collaborators) is immediately displayed in the text editing control. Conversely, any change in the text editing control is reflected in the data model.
         * @param string The collaborative string to bind.
         * @param textInputElement The text input element to bind. This must be a textarea element or an input type=text element.
         */
        function bindString(string:string, textInputElement:HTMLInputElement):any; //TODO this function returns gapi.drive.realtime.databinding.Binding
        /**
         * An error that is thrown when attempting to bind a DOM element which has already been bound to a collaborative value.
         */
        export class AlreadyBoundError {
            /**
             * An error that is thrown when attempting to bind a DOM element which has already been bound to a collaborative value.
             * @param domElement The DOM element that was already bound.The DOM element that was already bound.
             */
            constructor(domElement:Element);

            /**
             * The DOM element that was already bound.
             */
            domElement: Element;
            /**
             * The name of this error.
             */
            name: string;
        }
        /**
         * A binding between a collaborative object in the data model and a DOM element.
         */
        export class Binding {
            /**
             * A binding between a collaborative object in the data model and a DOM element.
             * @param collaborativeObject The collaborative object to bind.
             * @param domElement The DOM element to bind.
             */
            constructor(collaborativeObject, domElement:Element); //TODO argument 1 has gapi.drive.realtime.CollaborativeObject.
            /**
             * Unbinds the DOM element from the collaborative object.
             */
            unbind():void;
            /**
             * The collaborative object that this registration binds to the DOM element.
             */
            collaborativeObject: any; //TODO
            /**
             * The DOM element that this registration binds to the collaborative object.
             */
            domElement: Element;
        }
    }
    /**
     * Returns an OAuth access token.
     */
    function getToken():string;
    /**
     * Loads the Realtime document associated with fileId. If no Realtime document is associated with fileId, a new Realtime document associated with fileId will be created.
     * @param field The ID of the file to load.
     * @param onLoaded A callback that will be called when the Realtime document is ready. The created or opened Realtime document object will be passed to this function.
     * @param opt_initializerFn An optional initialization function that will be called before onLoaded only the first time that the document is loaded. The document's {@link gapi.drive.realtime.Model} object will be passed to this function.
     * @param opt_errorFn An optional error handling function that will be called if an error occurs while the document is being loaded or edited. A gapi.drive.realtime.Error object describing the error will be passed to this function.
     */
    function load(field:string, onLoaded:Function, opt_initializerFn:Function, opt_errorFn:Function):void;

    /**
     * Loads a Realtime document that is appropriate for storing data that is application and user specific, such as preferences. For a given authenticated user and application, this document is guaranteed to be a singleton. If no such a document exists, it will be created in the authenticated application's hidden "Application Data" folder (if the "Application Data" folder does not exist it will be created as well). To use this function, the OAuth token must have the drive.appdata scope. See https://developers.google.com/drive/appdata for more details on the Application Data folder.
     * @param onLoaded
     * @param opt_initializerFn
     * @param opt_errorFn
     */
    function loadAppDataDocument(onLoaded:Function, opt_initializerFn:Function, opt_errorFn:Function):void;
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
