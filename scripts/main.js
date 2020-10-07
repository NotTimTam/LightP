// Get selected text.
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

// Save last selection.
function saveSelection() {
    localStorage.setItem("last-selection", getSelectionText());
    console.log("Saved " + getSelectionText());
}

// Change font.
function changeFont(size, text) {
    let spans = document.getElementsByTagName("span");
    let alreadyExists = false;
    for(var i = 0; i < spans.length; i++) {
        if(spans[i].innerHTML == text) {
            alreadyExists = true;
            console.log(`${spans[i]} already exists, changing the values.`);
            spans[i].style.fontSize = (size + "px");
        }
    }

    if (!alreadyExists) {
        document.getElementById("page").innerHTML = document.getElementById("page").innerHTML.replace(text, `<span style="font-size: ${size}px">${text}</span>`);
    }

    console.log(`Changed the font size of "${text}" to ${size}px.`);
    // let range = document.getElementById("page").createRange();
    // range.moveToElementText(localStorage.getItem("last-selection"));
    // range.select();
}

// Get font of area.
function getFontSize(selection) {
    if(getSelectionText() != "") {
        let spans = document.getElementsByTagName("span");
        let alreadyExists = false;
        for(var i = 0; i < spans.length; i++) {
            if(spans[i].innerHTML == selection) {
                alreadyExists = true;
                console.log(`${spans[i]} exists, getting the value.`);
                document.getElementById("font").value = (spans[i].style.fontSize).replace('px', '');
            }
        }

        if(!alreadyExists) {
            console.log(`That area isn't configured so it's size must be 16px.`);
            document.getElementById("font").value = 16;
        }
    }
}

// Make text bold.
function makeBold(text) {
    document.getElementById("page").innerHTML = document.getElementById("page").innerHTML.replace(text, `<strong>${text}</strong>`)
    console.log(`Made "${text}" bold.`);
}

// Make text italic.
function makeItalic(text) {
    document.getElementById("page").innerHTML = document.getElementById("page").innerHTML.replace(text, `<em>${text}</em>`)
    console.log(`Made "${text}" italic.`);
}

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