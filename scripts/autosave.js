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
    if (fileName in localStorage) {
        document.getElementById("page").innerHTML = localStorage.getItem(fileName);
    }
}