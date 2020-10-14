// Autosaving files.

// Get filename.
function mostRecentFile() {
    let fileCount = localStorage.length;
    let thisFile = "Untitled Doc"
    if (fileCount < 1) {
        thisFile = "Untitled Document";
    } else {
        thisFile = `Untitled Document (${fileCount+1})`;
    }

    return thisFile;
}

// Create savefile.
function createSaveFile() {
    fileName = mostRecentFile();
    localStorage.setItem(fileName, document.getElementById("page").innerHTML);
    document.getElementById("input-title").value = fileName;
    window.location.hash = "#" + fileName;
    console.log("Created a save file.");
}

// Update savefile.
function updateSaveFile() {
    fileName = document.getElementById("input-title").value;
    if (fileName in localStorage) {
        localStorage.setItem(fileName, document.getElementById("page").innerHTML);
        console.log("Saved to existing file.");
    } else {
        createSaveFile();
        console.log("Created new save file.");
    }
}

// Open savefile.
function openSaveFile(fileName) {
    console.log("Opening file: " + fileName);
    if (fileName in localStorage) {
        document.getElementById("page").innerHTML = localStorage.getItem(fileName);
        document.getElementById("input-title").value = fileName;
    }
}

// Check if we should save.
function checkToSave() {
    fileName = document.getElementById("input-title").value;
    document.getElementById("savestatus").innerHTML = "Saving...";
    if (localStorage.getItem(fileName) == document.getElementById("page").innerHTML) {
        console.log("File hasn't changed. Not saving...");
    } else {
        if (document.activeElement != document.getElementById("input-title")) {
            updateSaveFile();
        } else {
            console.log("Didn't save file. (name change in progress)");
        }
    }
    document.getElementById("savestatus").innerHTML = "Saved";
}

// Change title.
function changeTitle(value) {
    let formattedName = "";
    if (value != "") {
        formattedName = `${value}`
    } else {
        formattedName = `Untitled Document`
    }
    
    if (formattedName in localStorage) {
        console.log("A file of that name already exists");
        formattedName = mostRecentFile();
        document.getElementById("input-title").value = formattedName;
    }
    oldKey = document.getElementById("input-title").oldvalue;
    newData = localStorage.getItem(oldKey);
    localStorage.removeItem(oldKey);
    localStorage.setItem(formattedName, newData);

    document.title = formattedName + " - LightP";
    window.location.hash = "#" + formattedName;
}

// Check for file discrepencies.
function discrepencies() {
    fileName = document.getElementById("input-title").value;
    if (document.getElementById("page").innerHTML != localStorage.getItem(fileName)) {
        document.getElementById("savestatus").innerHTML = "Not Saved";
    }
}

document.getElementById("page").addEventListener("input", discrepencies, false);

window.onbeforeunload = function(e) {
    checkToSave();
}