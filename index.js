const {dialog} = require('electron').remote;
const fs = require('fs');
const marked = require('marked');

var content;
let body = document.getElementById('main');
let code = document.getElementById('editor');

document.getElementById('fileopener').addEventListener('click', function() {
  dialog.showOpenDialog(function (fileNames) {
    if(fileNames === undefined) {
      console.log("No file selected");
    }else{
      fs.readFile(fileNames[0], 'utf-8', function(err, data) {
        if(err) {
          console.log("Error: " + err);
        }
        document.getElementById('file-open').style.visibility = "hidden";
        document.getElementById('file-opened').style.visibility = "visible";
        content = data;
        body.innerHTML = marked(content);
      })
    }
  });
})

document.getElementById('tbtn').addEventListener('click', function() {
  if(document.getElementById('theme').getAttribute('data-theme')==="dark") {
    document.getElementById('theme').setAttribute('href', 'index.css');
    document.getElementById('toggle').setAttribute('class', 'fa fa-toggle-off');
    document.getElementById('theme').setAttribute('data-theme', 'light');
  } else {
    document.getElementById('theme').setAttribute('href', 'dark.css');
    document.getElementById('toggle').setAttribute('class', 'fa fa-toggle-on');
    document.getElementById('theme').setAttribute('data-theme', 'dark');
  }
});

document.getElementById('edit').addEventListener('click', function() {
  if(document.getElementById('editID').getAttribute('data-state')==="edit") {
    body.style.display = "block";
    code.style.display = "none";
    document.getElementById('editor').setAttribute('contenteditable', "false");
    code.innerHTML = content;
    document.getElementById('editID').setAttribute('data-state', "view");
  } else {
    body.style.display = "none";
    code.style.display = "block";
    document.getElementById('editor').setAttribute('contenteditable', "true");
    body.innerHTML = marked(content);    
    document.getElementById('editID').setAttribute('data-state', "edit");
  }
})