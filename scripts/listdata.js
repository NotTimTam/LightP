// Delete items.
function deleteItem(key) {
    localStorage.removeItem(key);
    document.getElementById("existingdocs-list").innerHTML = '<h3>Documents in Local Browser</h3><p>Clearing browsing data will delete these documents. Storing them here permanently is <strong>NOT</strong> a good idea. Double click the "trash" icons to delete files from the browser.</p>';
}

// Startup fileload page.
function listFiles() {
    list = document.getElementById("existingdocs-list");
    locallength = localStorage.length;
    for (let i=0; i<locallength; i++) {
        // Add open button.
        let child = document.createElement("li");
        child.innerHTML = "📄 " + localStorage.key(i);
        child.setAttribute("class", "existingdocs-listitem");
        child.setAttribute("onclick", `location.href = 'editor.html#${localStorage.key(i)}'`);
        child.setAttribute("style", "min-width: 90%; max-width: 93%; float: left;");
        list.appendChild(child);
        // Add delete button.
        let child2 = document.createElement("input");
        child2.setAttribute("type", "image");
        child2.setAttribute("class", "tool-button image-button");
        child2.setAttribute("ondblclick", `deleteItem("${localStorage.key(i)}"); listFiles();`);
        child2.setAttribute("src", "images/trash.png");
        child2.setAttribute("title", "Delete this document");
        child2.setAttribute("style", "border-radius: 2em; float: right;");
        list.appendChild(child2);
        // Add line break.
        let brk = document.createElement("hr");
        brk.setAttribute("style", "opacity: 50%; width: 95%;")
        list.appendChild(brk);
    }

    if(document.getElementById("existingdocs-list").children.length < 3) {
        let child = document.createElement("p");
        child.innerHTML = "<br><br>NO LOCAL FILES";
        child.setAttribute("style", "font-weight: bolder; text-align: center; color: red;")
        list.appendChild(child);
    }
}

listFiles();