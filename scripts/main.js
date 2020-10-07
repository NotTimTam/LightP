// Change title.
function changeTitle(value) {
    if (value != "") {
        document.title = `${value} - Process`
    } else {
        document.title = `Untitled Document - Process`
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