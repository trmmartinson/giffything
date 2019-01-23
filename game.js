var topics = ["ufo", "big foot", "domino"];
makeButtons();
function getGifs(subject) {
    let key = 'VeJdZVGeAvG7paHQ77sdFdyKWd3NmiBR';
    let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${subject}&limit=10`;
    let response = "";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".pictures").empty();
        for (var x = 0; x < response.data.length; x++) {
            $(".picArea").append(`
                              <div class="pictures">
                                    <h5>Rating: ${response.data[x].rating}</h5>
                                    <img class="pictures" src="${response.data[x].images.original_still.url}" data-still="${response.data[x].images.original_still.url}" data-animate="${response.data[x].images.original.url}" data-state="still">
                               </div>`);
        }



    });
}
function makeButtons() {
    for (var x = 0; x < topics.length; x++) {
        $(".buttons").append(`<button type="button" id="add" class="btn btn-primary pics">${topics[x]}</button>&nbsp`);
    }
}


$("#addPic").click(function () {
    $(".buttons").empty();
    topics.push($("#addimg").val());
    makeButtons();
    $("#addimg").val("");
});

$(".buttons").click(function (event) {
    getGifs(event.target.innerHTML);
});

$(document).on('click', ".pictures", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
