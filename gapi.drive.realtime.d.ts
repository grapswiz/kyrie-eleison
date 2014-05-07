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
            constructor(collaborativeObject:CollaborativeObject, domElement:Element);
            /**
             * Unbinds the DOM element from the collaborative object.
             */
            unbind():void;
            /**
             * The collaborative object that this registration binds to the DOM element.
             */
            collaborativeObject: CollaborativeObject;
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
    };

    /**
     * CollaborativeObject contains behavior common to all built in collaborative types. This class should not be instantiated directly. Use the create* methods on gapi.drive.realtime.Model to create specific types of collaborative objects.
     */
    export class CollaborativeObject {
        /**
         * CollaborativeObject contains behavior common to all built in collaborative types. This class should not be instantiated directly. Use the create* methods on gapi.drive.realtime.Model to create specific types of collaborative objects.
         * @param model The document model.
         */
        constructor(model:any); //TODO gapi.drive.realtime.Model
        /**
         * The ID of the collaborative object. Readonly.
         */
        id:string;
        /**
         * Returns the object ID.
         */
        getId():string;
        /**
         * Returns a string representation of this collaborative object.
         */
        toString():string;
        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Function, opt_capture:boolean);
        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Object, opt_capture:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture  In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Function, opt_capture:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture  In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Object, opt_capture:boolean);
    }

    /**
     * The collaborative model is the data model for a Realtime document. The document's object graph should be added to the model under the root object. All objects that are part of the model must be accessible from this root.
     * The model class is also used to create instances of built in and custom collaborative objects via the appropriate create method.
     * Listen on the model for the following events: gapi.drive.realtime.EventType.UNDO_REDO_STATE_CHANGED
     * This class should not be instantiated directly. The collaborative model is generated during the document load process. The model can be initialized by passing an initializer function to gapi.drive.realtime.load.
     */
    export class Model {
        /**
         * * The collaborative model is the data model for a Realtime document. The document's object graph should be added to the model under the root object. All objects that are part of the model must be accessible from this root.
         * The model class is also used to create instances of built in and custom collaborative objects via the appropriate create method.
         * Listen on the model for the following events: gapi.drive.realtime.EventType.UNDO_REDO_STATE_CHANGED
         * This class should not be instantiated directly. The collaborative model is generated during the document load process. The model can be initialized by passing an initializer function to gapi.drive.realtime.load.
         * @param bridge The driver for the GWT collaborative libraries.
         * @param document The document that this model belongs to.
         */
        constructor(bridge:any, document:any); //TODO gapi.drive.realtime.GwtDocumentBridge gapi.drive.realtime.Document
        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Function, opt_capture:boolean);
        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Object, opt_capture:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Function, opt_capture:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler  The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Object, opt_capture:boolean);

        /**
         * Starts a compound operation. If a name is given, that name will be recorded in the mutation for use in revision history, undo menus, etc. When beginCompoundOperation() is called, all subsequent edits to the data model will be batched together in the undo stack and revision history until endCompoundOperation() is called. Compound operations may be nested inside other compound operations. Note that the compound operation MUST start and end in the same synchronous execution block. If this invariant is violated, the data model will become invalid and all future changes will fail.
         * @param opt_name An optional name for this compound operation.
         */
        beginCompoundOperation(opt_name:string);

        /**
         * Creates and returns a new collaborative object. This can be used to create custom collaborative objects. For built in types, use the specific create* functions.
         * @param ref An object constructor.
         * @param var_args Arguments to the newly-created object's initialize() method.
         * @return A new collaborative object.
         */
        create(ref:Function, var_args:any):Object;

        /**
         * Creates a collaborative list.
         * @param opt_initialValue Initial value for the list.
         * @return A collaborative list.
         */
        createList(opt_initialValue:any[]):Object;

        /**
         * Creates a collaborative map.
         * @param opt_initialValue Initial value for the map.
         * @return A collaborative map.
         */
        createMap(opt_initialValue:Object):Object;

        /**
         * Creates a collaborative string.
         * @param opt_initialValue Sets the initial value for this string.
         * @return A collaborative string.
         */
        createString(opt_initialValue:string):Object;
        /**
         * Ends a compound operation. This method will throw an exception if no compound operation is in progress.
         */
        endCompoundOperation():void;
        /**
         * Returns the root of the object model.
         * @return The root of the object model.
         */
        getRoot():any; //TODO gapi.drive.realtime.CollaborativeMap
        /**
         * Returns whether the model is initialized.
         * @return Whether the model is initialized.
         */
        isInitialized():boolean;
        /**
         * Redo the last thing the active collaborator undid.
         */
        redo():void;
        /**
         * Undo the last thing the active collaborator did.
         */
        undo():void;
        /**
         * An estimate of the number of bytes used by data stored in the model.
         */
        bytesUsed:number;
        /**
         * True if the model can currently redo.
         */
        canRedo: boolean;
        /**
         * True if the model can currently undo.
         */
        canUndo: boolean;
        /**
         * The mode of the document. If true, the document is readonly. If false it is editable.
         */
        isReadOnly: boolean;
    }

    /**
     * A Realtime document. A document consists of a Realtime model and a set of collaborators. Listen on the document for the following events:
     * gapi.drive.realtime.EventType.COLLABORATOR_LEFT
     * gapi.drive.realtime.EventType.COLLABORATOR_JOINED
     * gapi.drive.realtime.EventType.DOCUMENT_SAVE_STATE_CHANGED
     * This class should not be instantiated directly. The document object is generated during the document load process.
     */
    export class Document {
        /**
         * A Realtime document. A document consists of a Realtime model and a set of collaborators. Listen on the document for the following events:
         * gapi.drive.realtime.EventType.COLLABORATOR_LEFT
         * gapi.drive.realtime.EventType.COLLABORATOR_JOINED
         * gapi.drive.realtime.EventType.DOCUMENT_SAVE_STATE_CHANGED
         * This class should not be instantiated directly. The document object is generated during the document load process.
         * @param bridge The driver for the GWT collaborative libraries.
         * @param commService The communication service to dispose when this document is disposed.
         * @param errorHandlerFn The third-party error handling function.
         */
        constructor(bridge:any, commService:Object, errorHandlerFn:Function) //TODO gapi.drive.realtime.GwtDocumentBridge gapi.drive.realtime.Document
        /**
         * Closes the document and disconnects from the server. After this function is called, event listeners will no longer fire and attempts to access the document, model, or model objects will throw a {@link gapi.drive.realtime.DocumentClosedError}. Calling this function after the document has been closed will have no effect.
         */
        close();

        /**
         * Gets an array of collaborators active in this session. Each collaborator is a jsMap with these fields: sessionId, userId, displayName, color, isMe, isAnonymous.
         */
        getCollaborators():any[]; //TODO Class gapi.drive.realtime.Collaborator
        /**
         * Gets the collaborative model associated with this document.
         */
        getModel():Model;
        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Function, opt_capture:boolean);
        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Object, opt_capture:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Function, opt_capture:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler  The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Object, opt_capture:boolean);
    }
}
