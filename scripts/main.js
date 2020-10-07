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
function print()
{
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

// Hide savedialogue.
function closeSave() {
    document.getElementById("savedialogue").style.display = "none";
}

// Show savedialogue.
function openSave() {
    document.getElementById("savedialogue").style.display = "block";
    document.getElementById("savedialogue").focus();
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

// Make a new file
function newFile() {
    closeSave();
    console.log("Creating a new file...");
    changeTitle("Unnamed Document");
    document.getElementById("page").innerHTML = "";
}