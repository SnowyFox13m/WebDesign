// calls the radio station
function call() {
    $.get("/call", function(responseText){
        console.log("success");
        if (responseText == "yes") {
            console.log("we win");
        } else {
            console.log("we lose")
        }

    });
}
// has the station reset the count
function reset() {

}