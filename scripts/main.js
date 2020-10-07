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
}

function changeBGColor() {
    color = document.getElementById("bcp").value;
    format("backColor", color);
}