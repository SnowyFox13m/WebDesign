/*
    For this project, we'll make a "choose your own adventure" game.
    The user will start on the home page, and make decisions to progress the story as they like.
    Whenever they make a decision, we will take them to a different "page"
        - These different pages are actually all the same .hbs file, just filled with different content
    
    We will use a query parameter in our url headers to tell the server where the user is in the story
    Unlike in the books, we don't have to use a number (for example, "go to page 53")!
        - Instead, we can have the paramater be some text that describes the action.
        - Example:
            - "to punch the monster, go to ~~~~?id=punch_monster"
            - "to run away, go to ~~~~?id=run_away"
            
        - This helps you as the writer keep better track of your story...
        - ...and also makes it harder for the user to cheat, since they'd have to guess the param correctly.
    We'll also use hyperlinks so that the user doesn't have to type in the id manually.
*/

var express = require("express");
var app = express();
var path = require("path");
var hbs = require("hbs");
const req = require("express/lib/request");

/* swap from rendering html pages to using handlebars pages */
app.set("view engine", "hbs");
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));


/* when the user comes to our home page, send them something */
app.get("/", function(req, res){
    console.log(req.query.decision);  // print out what the user tried to do to the console

    /*
        We'll use an object called "data" to store whatever text we'd like to put on screen.
        For now, let's just set some random values, we'll change them below. 
        
                               text_to_show --  this is whatever story related text we want to describe to the user
            option_1_text and option_2_text --  these are the options they're given ("run" or "hide", for example)
        option_1_result and option_2_result --  these are the ids we will send them to when they click an option
    */
    data = {
        text_to_show: "sample sample sample",
        option_1_text: "Option 1",
        option_1_result: "option_1_result",
        option_2_text: "Option 2",
        option_2_result: "option_2_result"
    }

    // the id is undefined when they first come to our page. Let's introduce the story to them
    if (req.query.decision == undefined) {
        data.text_to_show = "You wake up and it's a school day"
        data.option_1_text = "Go to school"
        data.option_2_text = "Go back to sleep"

        // for the results, we can choose whatever we want. Let's be descriptive, but brief.
        data.option_1_result = "?decision=Go to school"
        data.option_2_result = "?decision=Go back to sleep"

        // render the page with this data. Go look at "home.hbs" to see where it all goes!
        res.render("home", data);
    } else if (req.query.decision == "Go to school") {
        data.text_to_show = "You got to school. Your bully walks up to you. What do you do?"
        data.option_1_text = "Fight him"
        data.option_2_text = "Run away"

        // for the results, we can choose whatever we want. Let's be descriptive, but brief.
        data.option_1_result = "?decision=Fight_him"
        data.option_2_result = "?decision=Run_away"
        res.render("home", data);

        // then below this, you'd add more 
    } else if (req.query.decision == "Go back to sleep") {
        data.text_to_show = "You got kicked out of the school"
        data.option_1_text = "Restart?"
        data.option_2_text = "" // if we dont show any text, there's no second link
        data.option_1_result = "" // a blank result will send no "decision" parameter (sending them back to the main page)
        res.render("home", data);
    } else if (req.query.decision == "Fight_him") {
        data.text_to_show = "He beats you up and you go home to sulk"
        data.option_1_text = "Restart?"
        data.option_2_text = ""
        data.option_1_result = ""
        res.render("home", data);
    } else if (req.query.decision == "Run_away") {
        data.text_to_show = "You escape your bully"
        data.option_1_text = "Go_to_your_first_class"
        data.option_2_text = "Skip class and go to the vending machine"

        data.option_1_result = "?decision=Go_to_your_first_class"
        data.option_2_result = "?decision=Skip_class_and_go_to_the_vending_machine"
        res.render("home", data);

    } else if (req.query.decision == "Go_to_your_first_class") {
        data.text_to_show = "Your day goes like any normal school day"
        data.option_1_text = "Restart?"
        data.option_2_text = ""
        data.option_1_result = ""
        res.render("home", data);
    } else if (req.query.decision == "Skip_class_and_go_to_the_vending_machine") {
        data.text_to_show = "Do you want to buy a snack or go to class?"
        data.option_1_text = "Buy a snack"
        data.option_2_text = "Go_to_class"
        data.option_1_result = ""
        res.render("home", data);
    } else if (req.query.decision == "Go_to_class") {
        data.text_to_show = "You went to your first class and your day carried on as a normal day"
        data.option_1_text = "Restart?"
        data.option_2_text = ""
        data.option_1_result = ""
        res.render("home", data);
    } else if (req.query.decision == "Buy a snack") {
        data.text_to_show = "Uh oh the vending machine stopped working as soon as your snack was about to fall"
        data.option_1_text = "Leave for class"
        data.option_2_text = "Try to get your snack"
        data.option_1_result = ""
        res.render("home", data);
}
    else {
        // the user should never really come here. if they did, you probably typoed one of the decisions
        // let's just send them back to the main page, and log a message for ourselves
        console.log("something broke. the user tried to make decision: " + req.query.decision);

        data.text_to_show = 
        data.option_1_text = 
        data.option_2_text = 
        data.option_1_result = ""
        data.option_2_result = ""
        res.render("home", data)  // <-------------------
    }
});

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("listening on port 8080");
}); 