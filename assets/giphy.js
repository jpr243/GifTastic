var topics = [
  "Marc Marquez",
  "Valentino Rossi",
  "Jorge Lorenzo",
  "Sebastian Vettel",
  "Charles Leclerc",
  "Daniel Ricciardo"
];

// Function for displaying topics data
function renderButtons() {
  // emptying button panel
  $("#buttons-view").empty();
  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    var buttonNew = $("<button>");
    // Adding a class of topic-btn to our button
    buttonNew.addClass("topic-btn");
    // Adding a data-attribute
    buttonNew.attr("data-name", topics[i]);
    // Providing the initial button text
    buttonNew.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(buttonNew);
  }
}

// This function handles events where a topic button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var topic = $("#topic-input")
    .val()
    .trim();

  // Adding topic from the textbox to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our topic array
  renderButtons();
});

renderButtons();
//This resets the gifs each time the button is clicked
function reset() {
  $(".gif-container").html("");
}

$("button").on("click", function() {
  reset();
  var topic = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topic +
    "&api_key=wKU8X4pLe2bSbiPMWrz3eOFanUwCf3zW&limit=7&rating=PG";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      if (results[i].rating !== "r" && results[i].rating !== "pg") {
        var gifDiv = $(".gif-container");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating.toUpperCase());
        //image attributes
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height.url;
        var personImage = $("<img>");
        personImage.attr("src", still);
        personImage.attr("data-still", still);
        personImage.attr("data-animate", animated);
        personImage.attr("data-state", "still");
        personImage.addClass("gif-image");

        //this prepends the ratings information and the gif
        gifDiv.prepend(p);
        gifDiv.prepend(personImage);
      }
    }
  });

  //Set the state from still to animated when clicking individual images
  $(".gif-image").on("click", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});
