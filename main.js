"use strict";

var Authorizer = function Authorizer(loader, options) {
  this.scope = {
    install: 'https://www.googleapis.com/auth/drive.install',
    file: 'https://www.googleapis.com/auth/drive.file',
    openid: 'openid'
  };

  this.clientId = options.clientId;
  this.userId = loader.params.userId;
  this.authButton = document.getElementById(options.authButtonElementId);
};

Authorizer.prototype.start = function (onAuthComplete) {
  var _this = this;
  gapi.load('auth:client,drive-realtime,drive-share', function () {
    _this.authorize(onAuthComplete);
  });
};

Authorizer.prototype.authorize = function (onAuthComplete) {
  var clientId = this.clientId;
  var userId = this.userId;
  var _this = this;

  var handleAuthResult = function (authResult) {
    if (authResult && !authResult.error) {
      _this.authButton.disabled = true;
      _this.fetchUserId(onAuthComplete);
    } else {
      _this.authButton.disabled = false;
      _this.authButton.onclick = authorizeWithPopup;
    }
  };

  var authorizeWithPopup = function () {
    gapi.auth.authorize({
      client_id: clientId,
      scope: [
        _this.scope.install,
        _this.scope.file,
        _this.scope.openid
      ],
      user_id: userId,
      immediate: false
    }, handleAuthResult);
  };

  // Try with no popups first.
  gapi.auth.authorize({
    client_id: clientId,
    scope: [
      this.scope.install,
      this.scope.file,
      this.scope.openid
    ],
    user_id: userId,
    immediate: true
  }, handleAuthResult);
};

Authorizer.prototype.fetchUserId = function (callback) {
  var _this = this;
  gapi.client.load('oauth2', 'v2', function () {
    gapi.client.oauth2.userinfo.get().execute(function (resp) {
      if (resp.id) {
        _this.userId = resp.id;
      }
      if (callback) {
        callback();
      }
    });
  });
};


var Loader = function Loader(options) {
  options = options || {};

  this.params = {};
  var queryString = window.location.search;
  if (queryString) {
    // split up the query string and store in an object
    var paramStrs = queryString.slice(1).split("&");
    for (var i = 0; i < paramStrs.length; i++) {
      var paramStr = paramStrs[i].split("=");
      this.params[paramStr[0]] = decodeURI(paramStr[1]);
    }
  }

  this.onFileLoaded = options.onFileLoaded || function () {
    console.log("onFileLoaded");
  };
  this.initializeModel = options.initializeModel || function () {
    console.log("initializeModel");
  };
  this.handleErrors = options.handleErrors || function (e) {
    if (e.type == gapi.drive.realtime.ErrorType.TOKEN_REFRESH_REQUIRED) {
      authorizer.authorize();
    } else if (e.type == gapi.drive.realtime.ErrorType.CLIENT_ERROR) {
      alert("An Error happened: " + e.message);
      window.location.href = "/";
    } else if (e.type == gapi.drive.realtime.ErrorType.NOT_FOUND) {
      alert("The file was not found. It does not exist or you do not have read access to the file.");
      window.location.href = "/";
    }
  };
  this.autoCreate = options.autoCreate || false;
  this.defaultTitle = options.defaultTitle || "新しいリアルタイムドキュメント";

  this.authorizer = new Authorizer(this, options);
};

Loader.prototype.start = function (afterAuth) {
  var _this = this;
  this.authorizer.start(function () {
    if (afterAuth) {
      afterAuth();
    }
    _this.load();
  });
};

Loader.prototype.load = function () {
  var fileId = this.params.fileId;
  var userId = this.authorizer.userId;
  var state = this.params.state;

  // Creating the error callback.
  var authorizer = this.authorizer;

  if (fileId) {
    gapi.drive.realtime.load(fileId, this.onFileLoaded, this.initializeModel, this.handleErrors);
    return;
  } else if (state) {
    var stateObj = (function (stateParam) {
      try {
        return JSON.parse(stateParam);
      } catch (e) {
        return {};
      }
    })(state);
    if (stateObj.action == "open") {
      fileId = stateObj.ids[0];
      userId = stateObj.userId;
      history.pushState({fileId: fileId, userId: userId}, null, "?fileId=" + fileId + "&userId=" + userId);
      gapi.drive.realtime.load(fileId, this.onFileLoaded, this.initializeModel, this.handleErrors);
      return;
    }
  }

  if (this.autoCreate) {
    this.createNewFileAndRedirect();
  }
};

Loader.prototype.createRealtimeFile = function (title, callback) {
  gapi.client.load('drive', 'v2', function () {
    gapi.client.drive.files.insert({
      'resource': {
        mimeType: 'application/vnd.google-apps.drive-sdk',
        title: title
      }
    }).execute(callback);
  });
}

Loader.prototype.createNewFileAndRedirect = function () {
  var _this = this;
  this.createRealtimeFile(this.defaultTitle, function (file) {
    if (file.id) {
      var userId = _this.authorizer.userId;
      var fileId = file.id;
      history.pushState({fileId: fileId, userId: userId}, null, "?fileId=" + fileId + "&userId=" + userId);
      gapi.drive.realtime.load(fileId, _this.onFileLoaded, _this.initializeModel, _this.handleErrors);
    } else {
      console.error('Error creating file.');
      console.error(file);
    }
  });
};

$(function () {
  var loader = new Loader({
    appId: "",
    clientId: '',

    authButtonElementId: 'authorize',

    initializeModel: function (model) {
      var string = model.createString('Hello Realtime World!');
      model.getRoot().set('text', string);
    },

    autoCreate: true,
    defaultTitle: "ぐらぷす",

    onFileLoaded: function (doc) {
      var string = doc.getModel().getRoot().get('text');

      var textArea1 = document.getElementById('edit');
      gapi.drive.realtime.databinding.bindString(string, textArea1);

      textArea1.disabled = false;
    }
  });
  loader.start();

  document.getElementById("share").addEventListener("click", function () {
    var shareClient = new gapi.drive.share.ShareClient("1038254939191");
    shareClient.setItemIds([loader.params.fileId]);
    shareClient.showSettingsDialog();
  });
});