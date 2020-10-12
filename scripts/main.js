// Exit out of title editing when you hit enter.
let input = document.getElementById("input-title");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.getElementById("input-title").blur();
    }
});

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
    document.execCommand('insertHTML', false, '<img src="' + url + '" style="width: 100%; resize=both">');
    console.log("User inserted an image from " + url);
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
    WinPrint.close();
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
    download((name + "." + extension), toRTF(document.getElementById("page").innerHTML));
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
    dt = convertHtmlToRtf(file);
    document.getElementById("page").innerHTML = dt;
    document.getElementById('file-selector').value = '';
}

// KEYBOARD SHORTCUTS.
document.addEventListener("keydown", function(e) {
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        saveAs(document.getElementById('input-title').value);
    }
});

// Change the font.
function changeFont(name) {
    document.getElementById('font-button').value = name;
    document.getElementById('font-button').style.fontFamily = name;
    format('fontName', name);
}

// Change font size.
function changeFontSize(amount) {
    document.execCommand("fontSize", false, "7");
    var fontElements = document.getElementsByTagName("font");
    for (var i = 0, len = fontElements.length; i < len; ++i) {
        if (fontElements[i].size == "7") {
            fontElements[i].removeAttribute("size");
            let oldvalue = Number(document.getElementById("font-size-disp").value);
            let newvalue = oldvalue + amount;
            if (newvalue < 8) {
                newvalue = 8;
            }
            if (newvalue > 400) {
                newvalue = 400;
            }
            fontElements[i].style.fontSize = String(newvalue) + "px";
            document.getElementById("font-size-disp").value = String(newvalue);
        }
    }
}

// Change font spacing.
function setFontSpacing(value) {
    document.execCommand("fontSize", false, "1");
    var fontElements = document.getElementsByTagName("font");
    for (var i = 0, len = fontElements.length; i < len; ++i) {
        if (fontElements[i].size == "1") {
            fontElements[i].removeAttribute("size");
            fontElements[i].style.lineHeight = value;
        }
    }
}

// Load page types.
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
        if(e.target.id !== 'edit-drop' && e.target.id !== 'edit-button'){
            //element clicked wasn't the div; hide the div
            changeDrop('edit-drop', false);
        }
        if(e.target.id !== 'font-drop' && e.target.id !== 'font-button'){
            //element clicked wasn't the div; hide the div
            changeDrop('font-drop', false);
        }
        if(e.target.id !== 'line-height-drop' && e.target.id !== 'line-height-button'){
            //element clicked wasn't the div; hide the div
            changeDrop('line-height-drop', false);
        }
        if(e.target.id !== 'open-drop' && e.target.id !== 'open-button'){
            //element clicked wasn't the div; hide the div
            changeDrop('open-drop', false);
        }
    };

    var hash = (window.location.hash).replace('#', '');
    console.log(hash);
    if (hash.length == 0) {
        createSaveFile();
    }
    else {
        if (hash == "blank") {
            createSaveFile();
        } else if (hash == "essay") {
            document.getElementById("page").innerHTML = essaycontent;
            createSaveFile();
        } else {
            console.log("Not an empty window. Loading files...")
            convertedHash = hash.replaceAll("%20", " ");
            openSaveFile(convertedHash);
        }
    }
}

window.setInterval(checkToSave, 5000);