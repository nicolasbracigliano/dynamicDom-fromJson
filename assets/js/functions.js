//-----------------
// VARIABLES
//-----------------
// Program Behavior

// · Variable: jsonURL
//      ·Description: URL with the location of the JSON file. Used in the function dynamicDOMFromJSONFile().
var jsonURL = 'https://carsales-endpoint.herokuapp.com/';
// · Variable: data
//      ·Description: Array with the content of the JSON file. Used in the function dynamicDOMFromJSONArray().
var data = {
  "results": [{
      "id": "1",
      "title": "2010 Nissan Dualis +2 Ti J10 Series II Auto AWD MY10",
      "price": "$24,490",
      "thumbnail": "https://carsales.li.csnstatic.com/carsales/car/dealer/cd5354384909418908085.jpg?aspect=centered&height=252&width=380"
    },
    {
      "id": "2",
      "title": "2012 Land Rover Defender Manual 4x4 MY12",
      "price": "$45,000",
      "thumbnail": "https://carsales.li.csnstatic.com/carsales/car/private/cp4982841542846685968.jpg?aspect=centered&height=252&width=380"
    },
    {
      "id": "3",
      "title": "2015 Nissan 370Z Z34 Auto MY15",
      "price": "$48,987",
      "thumbnail": "https://carsales.li.csnstatic.com/carsales/car/dealer/a3851a2eacb3a27dcf7e6fab14d5a697.jpg?aspect=centered&height=252&width=380"
    }
  ],
  "savedCars": [{
    "id": "4",
    "title": "2012 Mercedes-Benz C250 Blue EFFICIENCY Auto",
    "price": "$49,500",
    "thumbnail": "https://carsales.li.csnstatic.com/carsales/car/private/cp4624920815810249927.jpg?aspect=centered&height=252&width=380"
  }]
};
// · Variable: mainButtonText
//      ·Description: Object with the content of the main-button. The user can customize
//        the information changing this values. Note: We recomend one character symbol.
var mainButtonText = {
  results: "&#43",
  savedCars: "&#45",
  checked: "✓"
};
// · Variable: membersOfTheElements
//      ·Description: Object with the different kind of member presented in the JSON file.
//        The user can customize behavior of the web page changing this values.
var membersOfTheElements = {
  member1: "results",
  member2: "savedCars",
  member3: "removedCars"
};
// · Variables: Global Dynamic Card Variables
//      ·Description: This variables set the tags for the HTML elements.
var mainCard = document.createElement("main");
var h2Title = document.createElement("h2");
var divImage = document.createElement("div");
var imgMainImage = document.createElement("img");
var pPrice = document.createElement("p");

//-----------------
// FUNCTIONS
//-----------------

$(document).ready(function() {
  $(document).on("click", ".main-button", function() {
    var currentCard = $(this).parentsUntil('.wrap')[1];
    var currentMember = $(this).parentsUntil('.wrap')[2];
    // Add card from the member 1 to the member 2, kepping the original card in the origin member.
    if (currentMember.attributes.class.value == membersOfTheElements['member1'] && $(currentCard).find('.main-button').html() != mainButtonText['checked']) {
      $(currentCard).clone().appendTo('.savedCars');
      $(currentCard).find('.main-button').html(mainButtonText['checked']);
      $('.savedCars .card:last').hide().delay(500).fadeIn(500);
      $('.savedCars .button-wrapper .main-button').html(mainButtonText['savedCars']);

    } else if (currentMember.attributes.class.value == membersOfTheElements['member2']) {
      // Remove card from the member 2 and add the removed card to the member 1.
      // This process will generate a new id for the elements borned in the member 2 and now removed.
      if ($(this).attr('id').search(membersOfTheElements['member2']) != -1) {
        $(this).attr('id', (membersOfTheElements['member3'] + $(this).attr('id').slice(-1)));
        $(currentCard).find('.main-button').html(mainButtonText['results']);
        $(currentCard).appendTo('.results');
        // Remove card from the member 2 and update the button of the card in member 1.
      } else {
        $(currentCard).hide();
        $(document).find('.main-button[id=' + ($(currentCard).find('button').attr('id')) + ']:first').html(mainButtonText['results']);

      }
    }
  });
});

// · Function: dynamicDOMFromJSON
//      ·Description: Function that creates and populates the objects with the data from
//          the array filled with the JSON file content and calls the function "drawCards".
//      ·Parameters: -
function dynamicDOMFromJSONArray() {

  var jsonIndexes = []; // THE ARRAY TO STORE JSON FILE KEYS.
  var jsonValues = []; // THE ARRAY TO STORE JSON FILE VALUES.

  $(document).ready(function() {

    $.each(data, function(index) {
      jsonIndexes.push(index); // PUSH THE VALUES INSIDE THE ARRAY.
    });

    for (var i = 0; i < jsonIndexes.length; i++) {
      $.each(data[jsonIndexes[i]], function(index, value) {
        jsonValues.push(value); // PUSH THE VALUES INSIDE THE ARRAY.

        drawCards(jsonValues, jsonIndexes[i]);
        jsonValues = [];
      });
    }
  });
}

// · Function: dynamicDOMFromJSON
//      ·Description: Function that creates and populates the objects with the data
//          from the JSON file content and calls the function "drawCards".
//      ·Parameters: -
function dynamicDOMFromJSONFile() {

  var jsonIndexes = []; // THE ARRAY TO STORE JSON FILE KEYS.
  var jsonValues = []; // THE ARRAY TO STORE JSON FILE VALUES.

  $(document).ready(function() {
    $.getJSON(jsonURL, function(data) {

      $.each(data, function(index) {
        jsonIndexes.push(index); // PUSH THE VALUES INSIDE THE ARRAY.
      });

      for (var i = 0; i < jsonIndexes.length; i++) {
        $.each(data[jsonIndexes[i]], function(index, value) {
          jsonValues.push(value); // PUSH THE VALUES INSIDE THE ARRAY.

          drawCards(jsonValues, jsonIndexes[i]);
          jsonValues = [];
        });
      }
    });
  });
}

// · Function: drawCards
//      ·Description: Function that creates the cards and all his childs.
//      ·Parameters:
//        elements - Main elements with the information to fill the card.
//        memberOf - Are the main members obteined from the JSON file.
function drawCards(elements, memberOf) {

  for (var i = 0; i < elements.length; i++) {
    // · Variables: Dynamic Card Variables
    //      ·Description: This variables set the tags for the HTML elements.
    var h2Title = document.createElement("h2");
    var divImage = document.createElement("div");
    var imgMainImage = document.createElement("img");
    var pPrice = document.createElement("p");
    var divButton = document.createElement("div");
    var buttonMainButton = document.createElement("button");

    // CLASSE NAME WILL APPLY CSS STYLE TO THE OBJECT
    // ·Description: This variables set the classes for the HTML elements.
    mainCard.className = "card";
    divImage.className = "img-wrapper";
    imgMainImage.className = "card-image";
    pPrice.className = "price";
    divButton.className = "button-wrapper";
    buttonMainButton.className = "main-button";

    HTMLSkeleton(memberOf, i);

    // POPULATING OBJECTS
    mainCard.innerHTML = "";
    h2Title.innerHTML = elements[i].title;
    divImage.innerHTML = "";
    imgMainImage.src = elements[i].thumbnail;
    pPrice.innerHTML = elements[i].price;
    divButton.innerHTML = "";
    buttonMainButton.innerHTML = mainButtonText[memberOf];
    buttonMainButton.id = (memberOf) + (elements[i].id);

    // CREATE DYNAMIC CARD.
    var divContainer = document.getElementsByClassName(memberOf)[0];
    var mainContainer = document.getElementsByClassName(mainCard.className)[i];
    $('.card:last').append(h2Title);
    $('.card:last').append(divImage);
    $('.img-wrapper:last').append(imgMainImage);
    $('.card:last').append(pPrice);
    $('.card:last').append(divButton);
    $('.button-wrapper:last').append(buttonMainButton);
  }
}

// · Function: HTMLSkeleton
//    ·Description: Function that creates the HTML structural elements.
//    ·Parameters:
//      memberOf - Are the main members obteined from the JSON file.
//      i - ID of the element in the JSON file.
function HTMLSkeleton(memberOf, i) {
  $('.' + memberOf).append('<main class=\"card\"></main>');
  $('.' + memberOf + '.card').append('<h2></h2>');
  $('.' + memberOf + '.card').append('<div class=\"img-wrapper\"></div>');
  $('.' + memberOf + '.img-wrapper').append('<img class=\"card-image\"></img>');
  $('.' + memberOf + '.card').append('<p class=\"price\"></p>');
  $('.' + memberOf + '.card').append('<div class=\"button-wrapper\"></div>');
  $('.' + memberOf + '.button-wrapper').append('<button id=\"' + (memberOf) + (i) + '\" class=\"main-button\"></p>');
}
