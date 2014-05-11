/// <reference path="gapi.drive.realtime.d.ts" />

gapi.drive.realtime.load("", ()=>{}, ()=>{}, ()=>{});
var error = new gapi.drive.realtime.Error("", "", false);
if (error.isFatal) {
    console.log("FATAL ERROR!!");
}
console.log(gapi.drive.realtime.ErrorType.CLIENT_ERROR);
gapi.drive.realtime.databinding.bindString("string", <HTMLInputElement>document.getElementById("edit"));