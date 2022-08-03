var numberoftimesclicked = 0;

function wasclicked() {
    numberoftimesclicked = numberoftimesclicked + 1;
    var text = document.getElementById("clicked-text");
    text.innerHTML = "Times youve clicked the button = " + numberoftimesclicked;
}