// Change title.
function changeTitle(value) {
    if (value != "") {
        document.title = `${value} - LightP`
    } else {
        document.title = `Untitled Document - LightP`
        document.getElementById("input-title").value = "Untitled Document";
    }
    // IMPLEMENT DOCUMENT SAVE CHANGE TITLE.
}

// Run command.
function format(command, value) {
    document.execCommand(command, false, value);
}

// Create urls.
function setUrl() {
    var url = prompt("URL");
    var sText = document.getSelection();
    document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + sText + '</a>');
    document.getElementById('txtFormatUrl').value = '';
}

// Insert an image.
function insertImage(url) {
    document.execCommand('insertHTML', false, '<img src="' + url + '" style="width: 100%;">');
    console.log("User inserted an image from " + url)
}

// Print feature.
function print() {
    var prtContent = document.getElementById("page");
    console.log(prtContent)
    var WinPrint = window.open('', '', 'letf=100,top=100,width=600,height=600');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close()   
}

// Color feature.
function changeForeColor() {
    color = document.getElementById("cp").value;
    format("foreColor", color);
    color = document.getElementById("cp-t").style.color = color;
}

function changeBGColor() {
    color = document.getElementById("bcp").value;
    format("backColor", color);
    color = document.getElementById("bcp-t").style.backgroundColor = color;
}

// Dropdowns
function changeDrop(id, yes=true) {
    if (yes == true) {
        document.getElementById(id).style.display = "block";
    } else {
        document.getElementById(id).style.display = "none";
    }
}
function isDropOn(id) {
    if (document.getElementById(id).style.display == "none") {
        return false;
    } else {
        return true;
    }
}

// Hide savedialogue.
function closeDialogue(id) {
    document.getElementById(id).style.display = "none";
}

// Show savedialogue.
function openDialogue(id) {
    document.getElementById(id).style.display = "block";
    document.getElementById(id).focus();
    hideTabs();
}

// Hide all tabs.
function hideTabs() {
    changeDrop('edit-drop', false);
    changeDrop('file-drop', false);
    changeDrop('view-drop', false);
    changeDrop('insert-drop', false);
    changeDrop('format-drop', false);
    changeDrop('tool-drop', false);
}

// Save as.
function saveAs(name="Untitled Document", extension="rtf") {
    changeTitle(name);
    download((name + "." + extension), document.getElementById("page").innerHTML);
}

// Make a new file
function newFile() {
    closeDialogue("savedialogue");
    console.log("Creating a new file...");
    changeTitle("Untitledg Document");
    document.getElementById("page").innerHTML = "";
}

// Save current file.
function saveFile() {
    console.log("Downloading user data.");
    download(`${document.getElementById("input-title").innerHTML}.lpd`, document.getElementById("input-title").innerHTML);
    console.log("Downloaded user data.");
}

// Hide divs when you click outside of them.
window.onload = function(){
    document.onclick = function(e){
        // Check if you clicked the page and it is editable.
        if(e.target.id == 'page') {
          document.getElementById('page').setAttribute('contenteditable', true);
        }
        if(e.target.id !== 'file-drop' && e.target.id !== 'file-button'){
            //element clicked wasn't the div; hide the div
            changeDrop('file-drop', false);
        }
        if(e.target.id !== 'tool-drop' && e.target.id !== 'tool-button'){
            //element clicked wasn't the div; hide the div
            changeDrop('tool-drop', false);
        }
    };
};

// Email the document.
function emailDoc() {
    console.log("Sending email.");
    let content = document.getElementById("page").innerHTML;
    let subject = document.getElementById("input-title").value;
    window.open(`mailto:test@example.com?subject=${subject}&body=${content}`);
}

// Focus title.
function focusTitle() {
    console.log("Focusing on the title so the user can edit it.");
    document.getElementById("input-title").focus();
    document.getElementById("input-title").select();
}

let file = "";
// Get the contents when a user opens a file.
const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
  file = event.target.file;
  console.log("User loaded a file.");
  openDialogue('opendialogue');
});

// Load the file.
function loadFile() {
  closeDialogue("opendialogue");
  document.getElementById("page").innerHTML = file;
  document.getElementById('file-selector').value = '';
}