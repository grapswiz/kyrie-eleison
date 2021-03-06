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
        function bindString(string:string, textInputElement:HTMLInputElement):Binding;
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
    function load(field:string, onLoaded:Function, opt_initializerFn?:Function, opt_errorFn?:Function):void;

    /**
     * Loads a Realtime document that is appropriate for storing data that is application and user specific, such as preferences. For a given authenticated user and application, this document is guaranteed to be a singleton. If no such a document exists, it will be created in the authenticated application's hidden "Application Data" folder (if the "Application Data" folder does not exist it will be created as well). To use this function, the OAuth token must have the drive.appdata scope. See https://developers.google.com/drive/appdata for more details on the Application Data folder.
     * @param onLoaded
     * @param opt_initializerFn
     * @param opt_errorFn
     */
    function loadAppDataDocument(onLoaded:Function, opt_initializerFn?:Function, opt_errorFn?:Function):void;
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
        constructor(model:Model);
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
        addEventListener(type:string, handler:Function, opt_capture?:boolean);
        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Object, opt_capture?:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture  In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Function, opt_capture?:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture  In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Object, opt_capture?:boolean);
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
        constructor(bridge:any, document:Document); //TODO gapi.drive.realtime.GwtDocumentBridge
        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Function, opt_capture?:boolean);
        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Object, opt_capture?:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Function, opt_capture?:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler  The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Object, opt_capture?:boolean);

        /**
         * Starts a compound operation. If a name is given, that name will be recorded in the mutation for use in revision history, undo menus, etc. When beginCompoundOperation() is called, all subsequent edits to the data model will be batched together in the undo stack and revision history until endCompoundOperation() is called. Compound operations may be nested inside other compound operations. Note that the compound operation MUST start and end in the same synchronous execution block. If this invariant is violated, the data model will become invalid and all future changes will fail.
         * @param opt_name An optional name for this compound operation.
         */
        beginCompoundOperation(opt_name?:string);

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
        createList(opt_initialValue?:any[]):Object;

        /**
         * Creates a collaborative map.
         * @param opt_initialValue Initial value for the map.
         * @return A collaborative map.
         */
        createMap(opt_initialValue?:Object):Object;

        /**
         * Creates a collaborative string.
         * @param opt_initialValue Sets the initial value for this string.
         * @return A collaborative string.
         */
        createString(opt_initialValue?:string):Object;
        /**
         * Ends a compound operation. This method will throw an exception if no compound operation is in progress.
         */
        endCompoundOperation():void;
        /**
         * Returns the root of the object model.
         * @return The root of the object model.
         */
        getRoot():CollaborativeMap<any>;
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
        constructor(bridge:any, commService:Object, errorHandlerFn:Function) //TODO gapi.drive.realtime.GwtDocumentBridge
        /**
         * Closes the document and disconnects from the server. After this function is called, event listeners will no longer fire and attempts to access the document, model, or model objects will throw a {@link gapi.drive.realtime.DocumentClosedError}. Calling this function after the document has been closed will have no effect.
         */
        close();

        /**
         * Gets an array of collaborators active in this session. Each collaborator is a jsMap with these fields: sessionId, userId, displayName, color, isMe, isAnonymous.
         */
        getCollaborators():Collaborator[];
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
        addEventListener(type:string, handler:Function, opt_capture?:boolean);
        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Object, opt_capture?:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Function, opt_capture?:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler  The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Object, opt_capture?:boolean);
    }

    /**
     * An error that is thrown when attempting to access a closed document (or any model or collaborative object associated with a closed document).
     */
    export class DocumentClosedError {

        /**
         * An error that is thrown when attempting to access a closed document (or any model or collaborative object associated with a closed document).
         */
        constructor();
    }

    /**
     * An event that indicates that the save state of a document has changed. If both isSaving and isPending are false, the document is completely saved and up to date.
     */
    export class DocumentSaveStateChangedEvent {

        /**
         * An event that indicates that the save state of a document has changed. If both isSaving and isPending are false, the document is completely saved and up to date.
         * @param document The document being saved.
         * @param isSaving The saving state.
         * @param isPending The state of pending mutations.
         */
        constructor(document:Document, isSaving:boolean, isPending:boolean);

        /**
         * If true, the client has mutations that have not yet been sent to the server. If false, all mutations have been sent to the server, but some may not yet have been acked.
         */
        isPending:boolean;

        /**
         * If true, the document is in the process of saving. Mutations have been sent to the server, but we have not yet received an ack. If false, nothing is in the process of being sent.
         */
        isSaving:boolean;
    }

    /**
     * A collaborator on the document.
     */
    export class Collaborator {
        /**
         * A collaborator on the document.
         * @param userId The userId of the collaborator.
         * @param sessionId The sessionId of the collaborator.
         * @param displayName The display name of the collaborator.
         * @param color The color associated with the collaborator.
         * @param isMe True if the collaborator is the local user, false otherwise.
         * @param isAnonymous True if the collaborator is anonymous, false otherwise.
         * @param photoUrl A url that points to the profile photo of the user.
         */
        constructor(userId:string, sessionId:string, displayName:string, color:string, isMe:boolean, isAnonymous:boolean, photoUrl:string);

        /**
         * The color associated with the collaborator.
         */
        color:string;
        /**
         * The display name of the collaborator.
         */
        displayName:string;
        /**
         * True if the collaborator is anonymous, false otherwise.
         */
        isAnonymous:boolean;
        /**
         * True if the collaborator is the local user, false otherwise.
         */
        isMe:boolean;
        /**
         * A url that points to the profile photo of the user.
         */
        photoUrl:string;
        /**
         * The sessionId of the collaborator.
         */
        sessionId:string;
        /**
         * The userId of the collaborator.
         */
        userId:string;
    }

    /**
     * An event indicating that a new collaborator has joined the document.
     */
    export class CollaboratorJoinedEvent {
        /**
         * An event indicating that a new collaborator has joined the document.
         * @param document The document the collaborator joined.
         * @param collaborator The collaborator that joined.
         */
        constructor(document:Document, collaborator:Collaborator);

        /**
         * Creates an event from serialized JSON.
         * @param source The source object.
         * @param serialized A serialized content object.
         * @return A change event.
         */
        deserialize(source:Document, serialized:Object):CollaboratorJoinedEvent;

        /**
         * The collaborator that joined.
         */
        collaborator:Collaborator;
    }

    /**
     * An event indicating that a collaborator left the document.
     */
    export class CollaboratorLeftEvent {
        /**
         * An event indicating that a collaborator left the document.
         * @param document The document the collaborator left.
         * @param collaborator The collaborator that left.
         */
        constructor(document:Document, collaborator:Collaborator);

        /**
         * Creates an event from serialized JSON.
         * @param source The source object.
         * @param serialized A serialized content object.
         * @return A collaborator left event.
         */
        deserialize(source:Document, serialized:Object):CollaboratorLeftEvent;

        /**
         * The collaborator that left.
         */
        collaborator:Collaborator;
    }

    /**
     * A collaborative list. A list can contain other Realtime collaborative objects, custom collaborative objects, JavaScript primitive values, or JavaScript objects that can be serialized to JSON.
     * Changes to the list will automatically be synced with the server and other collaborators. To listen for changes, add EventListeners for the following event types:
     * gapi.drive.realtime.EventType.VALUES_ADDED
     * gapi.drive.realtime.EventType.VALUES_REMOVED
     * gapi.drive.realtime.EventType.VALUES_SET
     * This class should not be instantiated directly. To create a new list, use gapi.drive.realtime.Model.prototype.createList().
     */
    export class CollaborativeList<T> extends CollaborativeObject {
        /**
         * A collaborative list. A list can contain other Realtime collaborative objects, custom collaborative objects, JavaScript primitive values, or JavaScript objects that can be serialized to JSON.
         * Changes to the list will automatically be synced with the server and other collaborators. To listen for changes, add EventListeners for the following event types:
         * gapi.drive.realtime.EventType.VALUES_ADDED
         * gapi.drive.realtime.EventType.VALUES_REMOVED
         * gapi.drive.realtime.EventType.VALUES_SET
         * This class should not be instantiated directly. To create a new list, use gapi.drive.realtime.Model.prototype.createList().
         * @param model
         */
        constructor(model:Model);

        /**
         * Returns a copy of the contents of this collaborative list as a Javascript array. Changes to the returned object will not affect the original collaborative list.
         * @return Array.<*> A copy of the contents of this collaborative list.
         */
        asArray():T[];
        /**
         * Removes all values from the list.
         */
        clear():void;

        /**
         * Gets the value at the given index.
         * @param index The index.
         * @return * The value at the given index.
         */
        get(index:number):T;

        /**
         * Returns the first index of the given value, or -1 if it cannot be found.
         * @param value The value to find.
         * @param opt_comparatorFn Optional comparator function used to determine the equality of two items.
         * @return The index of the given value, or -1 if it cannot be found.
         */
        indexOf(value:T, opt_comparatorFn?:(a:T, b:T)=>boolean):number;

        /**
         * Inserts an item into the list at a given index.
         * @param index The index to insert at.
         * @param value The value to add.
         */
        insert(index:number, value:T):void;

        /**
         * Inserts a list of items into the list at a given index.
         * @param index The index at which to insert.
         * @param values The values to insert.
         */
        insertAll(index:number, values:T[]):void;

        /**
         * Returns the last index of the given value, or -1 if it cannot be found.
         * @param value The value to find.
         * @param opt_comparatorFn Optional comparator function used to determine the equality of two items.
         * @return The index of the given value, or -1 if it cannot be found.
         */
        lastIndexOf(value:T, opt_comparatorFn?:(a:T, b:T)=>boolean):number;

        /**
         * Adds an item to the end of the list.
         * @param value The value to add.
         * @return The new array length.
         */
        push(value:T):number;

        /**
         * Adds an array of values to the end of the list.
         * @param values The values to add.
         */
        pushAll(values:T[]):void;

        /**
         * Creates an IndexReference at the given index. If canBeDeleted is true, then a delete over the index will delete the reference. Otherwise the reference will shift to the beginning of the deleted range.
         * @param index The index of the reference.
         * @param canBeDeleted Whether this index is deleted when there is a delete of a range covering this index.
         */
        registerReference(index:number, canBeDeleted:boolean):IndexReference;

        /**
         * Removes the item at the given index from the list.
         * @param index The index of the item to remove.
         */
        remove(index):void;

        /**
         * Removes the items between startIndex (inclusive) and endIndex (exclusive).
         * @param startIndex The start index of the range to remove (inclusive).
         * @param endIndex The end index of the range to remove (exclusive).
         */
        removeRange(startIndex:number, endIndex:number):void;

        /**
         * Removes the first instance of the given value from the list.
         * @param value The value to remove.
         * @return Whether the item was removed.
         */
        removeValue(value:T):boolean;

        /**
         * Replaces items in the list with the given items, starting at the given index.
         * @param index The index to set at.
         * @param values The values to insert.
         */
        replaceRange(index:number, values:T[]):void;

        /**
         * Sets the item at the given index
         * @param index The index to insert at.
         * @param value The value to set.
         */
        set(index:number, value:T):void;

        /**
         * The number of entries in the list. Assign to this field to reduce the size of the list. Note that the length given must be < or equal to the current size. The length of a list cannot be extended in this way.
         */
        length:number;
    }

    /**
     * A collaborative map. A map's key must be a string. The values can contain other Realtime collaborative objects, custom collaborative objects, JavaScript primitive values or JavaScript objects that can be serialized to JSON.
     * Changes to the map will automatically be synced with the server and other collaborators. To listen for changes, add EventListeners for the gapi.drive.realtime.EventType.VALUE_CHANGED event type.
     * This class should not be instantiated directly. To create a new map, use gapi.drive.realtime.Model.prototype.createMap().
     */
    export class CollaborativeMap<T> extends CollaborativeObject {
        /**
         * * A collaborative map. A map's key must be a string. The values can contain other Realtime collaborative objects, custom collaborative objects, JavaScript primitive values or JavaScript objects that can be serialized to JSON.
         * Changes to the map will automatically be synced with the server and other collaborators. To listen for changes, add EventListeners for the gapi.drive.realtime.EventType.VALUE_CHANGED event type.
         * This class should not be instantiated directly. To create a new map, use gapi.drive.realtime.Model.prototype.createMap().
         * @param model The document model.
         */
        constructor(model:Model);

        /**
         * Removes all entries.
         */
        clear();

        /**
         * Removes the entry for the given key (if such an entry exists).
         * @param key The key to unmap.
         * @return The value that was mapped to this key, or null if there was no existing value.
         */
        delete(key:string):T;

        /**
         * Returns the value mapped to the given key.
         * @param key The key to look up.
         * @return The value mapped to the given key.
         */
        get(key):T;

        /**
         * Checks if this map contains an entry for the given key.
         * @param key The key to check.
         * @return Returns true if this map contains a mapping for the given key.
         */
        has(key):boolean;

        /**
         * Returns whether this map is empty.
         * @return Returns true if this map is empty.
         */
        isEmpty():boolean;

        /**
         * Returns an array containing a copy of the items in this map. Modifications to the returned array do not modify this collaborative map.
         * @return The items in this map. Each item is a [key, value] pair.
         */
        items():any; //FIXME

        /**
         * Returns an array containing a copy of the keys in this map. Modifications to the returned array do not modify this collaborative map.
         * @return The keys in this map.
         */
        keys():string[];

        /**
         * Put the value into the map with the given key, overwriting an existing value for that key.
         * @param key The map key.
         * @param value The map value.
         * @return The old map value, if any, that used to be mapped to the given key.
         */
        set(key:string, value:T):T;

        /**
         * Returns an array containing a copy of the values in this map. Modifications to the returned array do not modify this collaborative map.
         * @return The values in this map.
         */
        values():T[];

        /**
         * The number of keys in the map.
         */
        size:number;
    }

    /**
     * Creates a new collaborative string. Unlike regular JavaScript strings, collaborative strings are mutable.
     * Changes to the string will automatically be synced with the server and other collaborators. To listen for changes, add EventListeners for the following event types:
     * gapi.drive.realtime.EventType.TEXT_INSERTED
     * gapi.drive.realtime.EventType.TEXT_DELETED
     * This class should not be instantiated directly. To create a new collaborative string, use gapi.drive.realtime.Model.prototype.createString
     */
    export class CollaborativeString extends CollaborativeObject {
        /**
         * * Creates a new collaborative string. Unlike regular JavaScript strings, collaborative strings are mutable.
         * Changes to the string will automatically be synced with the server and other collaborators. To listen for changes, add EventListeners for the following event types:
         * gapi.drive.realtime.EventType.TEXT_INSERTED
         * gapi.drive.realtime.EventType.TEXT_DELETED
         * This class should not be instantiated directly. To create a new collaborative string, use gapi.drive.realtime.Model.prototype.createString
         * @param model The document model.
         */
        constructor(model:Model);

        /**
         * Appends a string to the end of this one.
         * @param text The new text to append.
         */
        append(text:string);

        /**
         * Gets a string representation of the collaborative string.
         * @return A string representation of the collaborative string.
         */
        getText():string;

        /**
         * Inserts a string into the collaborative string at a specific index.
         * @param index The index to insert at.
         * @param text The new text to insert.
         */
        insertString(index:number, text:string):void;

        /**
         * Creates an IndexReference at the given {@code index}. If {@code canBeDeleted} is set, then a delete over the index will delete the reference. Otherwise the reference will shift to the beginning of the deleted range.
         * @param index The index of the reference.
         * @param canBeDeleted Whether this index is deleted when there is a delete of a range covering this index.
         * @return The newly registered reference.
         */
        registerReference(index:number, canBeDeleted:boolean):IndexReference;

        /**
         * Deletes the text between startIndex (inclusive) and endIndex (exclusive).
         * @param startIndex The start index of the range to delete (inclusive).
         * @param endIndex The end index of the range to delete (exclusive).
         */
        removeRange(startIndex:number, endIndex:number):void;

        /**
         * Sets the contents of this collaborative string. Note that this method performs a text diff between the current string contents and the new contents so that the string will be modified using the minimum number of text inserts and deletes possible to change the current contents to the newly-specified contents.
         * @param text The new value of the string.
         */
        setText(text:string):void;

        /**
         * The length of the string. Read only.
         */
        length:number;
    }

    /**
     * An IndexReference is a pointer to a specific location in a collaborative list or string. This pointer automatically shifts as new elements are added to and removed from the object.
     * To listen for changes to the referenced index, add an EventListener for gapi.drive.realtime.EventType.REFERENCE_SHIFTED.
     * This class should not be instantiated directly. To create an index reference, call registerReference on the appropriate string or list.
     */
    export class IndexReference extends CollaborativeObject {
        /**
         * An IndexReference is a pointer to a specific location in a collaborative list or string. This pointer automatically shifts as new elements are added to and removed from the object.
         * To listen for changes to the referenced index, add an EventListener for gapi.drive.realtime.EventType.REFERENCE_SHIFTED.
         * This class should not be instantiated directly. To create an index reference, call registerReference on the appropriate string or list.
         * @param model The document model.
         */
        constructor(model:Model);

        /**
         * Whether this reference can be deleted. Read-only. This property affects the behavior of the index reference when the index the reference points to is deleted. If this is true, the index reference will be deleted. If it is false, the index reference will move to point at the beginning of the deleted range.
         */
        canBeDeleted:number;

        /**
         * The index of the current location the reference points to. Write to this property to change the referenced index.
         */
        index:number;

        /**
         * The object this reference points to. Read-only.
         */
        referencedObject:CollaborativeObject;
    }

    /**
     * An event target which can dispatch events to interested listeners. Listeners subscribe via addEventListener.
     */
    export class EventTarget {
        /**
         * An event target which can dispatch events to interested listeners. Listeners subscribe via addEventListener.
         */
        constructor();

        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Function, opt_capture?:boolean);
        /**
         * Adds an event listener to the event target. The same handler can only be added once per the type. Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
         * @param type The type of the event to listen for.
         * @param handler The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        addEventListener(type:string, handler:Object, opt_capture?:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler The function to handle the event.
         * @param opt_capture  In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Function, opt_capture?:boolean);
        /**
         * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
         * @param type The type of the event to listen for.
         * @param handler The handler can also be an object that implements the handleEvent method which takes the event object as argument.
         * @param opt_capture  In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
         */
        removeEventListener(type:string, handler:Object, opt_capture?:boolean);
    }

    /**
     * A base class for model events.
     */
    export class BaseModelEvent {
        /**
         * A base class for model events.
         * @param type The event type.
         * @param target The target object that generated the event.
         * @param sessionId The ID of the session that initiated the event.
         * @param userId The user ID of the user that initiated the event.
         * @param isLocal Whether this event originated in the local session.
         * @param bubbles Whether or not this event should bubble to ancestors.
         */
        constructor(type:string, target:EventTarget, sessionId:string, userId:string, isLocal:boolean, bubbles:boolean);

        /**
         * Whether this event should bubble to ancestors.
         */
        bubbles:boolean;

        /**
         * Whether this event originated in the local session.
         */
        isLocal:boolean;

        /**
         * The ID of the session that initiated the event.
         */
        sessionId:string;

        /**
         * Event type.
         */
        type:string;

        /**
         * The user ID of the user that initiated the event.
         */
        userId:string;
    }

    /**
     * Event fired when a collaborative object changes. This event will bubble to all of the ancestors of the changed object. It includes an array of events describing the specific changes.
     */
    export class ObjectChangedEvent extends BaseModelEvent {
        /**
         * Event fired when a collaborative object changes. This event will bubble to all of the ancestors of the changed object. It includes an array of events describing the specific changes.
         * @param target The target object that generated the event.
         * @param sessionId The source object that generated the event.
         * @param userId The user ID of the user that initiated the event.
         * @param local Whether this event originated in the local session.
         * @param events The events that caused the object to change.
         */
        constructor(target:EventTarget, sessionId:string, userId:string, local:boolean, events:BaseModelEvent[]);

        /**
         * The specific events that document the changes that occurred on the object.
         */
        events:BaseModelEvent[];
    }

    /**
     * Event fired when an index reference shifts
     */
    export class ReferenceShiftedEvent extends BaseModelEvent {

        /**
         * Event fired when an index reference shifts
         * @param target The reference that shifted.
         * @param oldIndex The previous index.
         * @param newIndex The new index.
         * @param sessionId The ID of the session.
         * @param userId The ID of the user.
         * @param isLocal If the session is the local session.
         */
        constructor(target:EventTarget, oldIndex:number, newIndex:number, sessionId:string, userId:string, isLocal:boolean);

        /**
         * The new index.
         */
        newIndex:number;

        /**
         * The previous index.
         */
        oldIndex:number;
    }

    /**
     * Event fired when text is removed from a string.
     */
    export class TextDeletedEvent extends BaseModelEvent {

        /**
         * Event fired when text is removed from a string.
         * @param target The target object that generated the event.
         * @param sessionId The ID of the session that initiated the event.
         * @param userId The user ID of the user that initiated the event.
         * @param local Whether this event originated in the local session.
         * @param index The index of the change.
         * @param text The deleted text.
         */
        constructor(target:CollaborativeString, sessionId:string, userId:string, local:boolean, index:number, text:string);

        /**
         * The index of the first character that was deleted.
         */
        index:number;

        /**
         * The deleted text.
         */
        text:string;
    }

    /**
     * Event fired when text is inserted into a string.
     */
    export class TextInsertedEvent extends BaseModelEvent {
        /**
         * Event fired when text is inserted into a string.
         * @param target The target object that generated the event.
         * @param sessionId The ID of the session that initated the event.
         * @param userId The user ID of the user that initiated the event.
         * @param local Whether this event originated in the local session.
         * @param index The index of the change.
         * @param text The inserted text.
         */
        constructor(target:CollaborativeString, sessionId:string, userId:string, local:boolean, index:number, text:string);

        /**
         * The index of the change.
         */
        index:number;

        /**
         * The inserted text
         */
        text:string;
    }

    /**
     * An event indicating that canUndo or canRedo changed.
     */
    export class UndoRedoStateChangedEvent {

        /**
         * An event indicating that canUndo or canRedo changed.
         * @param model The model whose state changed.
         * @param canUndo True if you can currently undo.
         * @param canRedo True if you can currently redo.
         */
        constructor(model:Model, canUndo:boolean, canRedo:boolean);

        /**
         * True if you can currently redo, false otherwise.
         */
        canRedo:boolean;

        /**
         * True if you can currently undo, false otherwise.
         */
        canUndo:boolean;
    }

    /**
     * Event fired when a map or custom object property changes.
     */
    export class ValueChangedEvent extends BaseModelEvent {

        /**
         * Event fired when a map or custom object property changes.
         * @param target The target object that generated the event.
         * @param sessionId The ID of the session that initiated the event.
         * @param userId The user ID of the user that initiated the event.
         * @param isLocal Whether this event originated in the local session.
         * @param property The property whose value changed.
         * @param newValue The new property value.
         * @param oldValue The old property value.
         */
        constructor(target:EventTarget, sessionId:string, userId:string, isLocal:boolean, property:string, newValue:any, oldValue:any);

        /**
         * The new property value.
         */
        newValue:any;

        /**
         * The old property value.
         */
        oldValue:any;

        /**
         * The property whose value changed.
         */
        property:string;
    }

    /**
     * Event fired when items are added to a collaborative list.
     */
    export class ValuesAddedEvent<T> extends BaseModelEvent {

        /**
         * Event fired when items are added to a collaborative list.
         * @param target The target object that generated the event.
         * @param sessionId The ID of the session that initiated the event.
         * @param userId The user ID of the user that initiated the event.
         * @param isLocal Whether this event originated in the local session.
         * @param index The index where values were added.
         * @param values The values added.
         */
        constructor(target:CollaborativeList<T>, sessionId:string, userId:string, isLocal:boolean, index:number, values:any[]);

        /**
         * The index of the first added value.
         */
        index:number;

        /**
         * The values that were added.
         */
        values:any[];
    }

    /**
     * Event fired when items are removed from a collaborative list.
     */
    export class ValuesRemovedEvent<T> extends BaseModelEvent {

        /**
         * Event fired when items are removed from a collaborative list.
         * @param target The target object that generated the event.
         * @param sessionId The ID of the session that initiated the event.
         * @param userId The user ID of the user that initiated the event.
         * @param isLocal Whether this event originated in the local session.
         * @param index The index where values were removed.
         * @param values The values removed.
         */
        constructor(target:CollaborativeList<T>, sessionId:string, userId:string, isLocal:boolean, index:number, values:any[]);

        /**
         * The index of the first removed value.
         */
        index:number;

        /**
         * The values that were removed.
         */
        values:any[];
    }

    /**
     * Event fired when items in a collaborative list are changed in place.
     */
    export class ValuesSetEvent<T> extends BaseModelEvent {

        /**
         *
         * @param target The target object that generated the event.
         * @param sessionId The is of the session that initiated the event.
         * @param userId The user ID of the user that initiated the event.
         * @param isLocal Whether this event originated in the local session.
         * @param index The index of the change.
         * @param oldValues The old values.
         * @param newValues The new values.
         */
        constructor(target:CollaborativeList<T>, sessionId:string, userId:string, isLocal:boolean, index:number, oldValues:any[], newValues:any[]);

        /**
         * The index of the first value that was replaced.
         */
        index:number;

        /**
         * The new values.
         */
        newValues:any[];

        /**
         * The old values.
         */
        oldValues:any[];
    }
}
