var fiveDay = [];
var theCity;
var theCountry;
var theRegion;
var currentTemp;
var currentText;

///the Model
function weather(current){
  this.day = current.day;
  this.date = current.date;
  this.high = current.high;
  this.low = current.low;
  this.text = current.text;
  this.code = current.code;
}
//The view. 
function view(){
    this.updateDate();
    this.updateFiveDay();
}

function runMe(event) {
    if (event.which == 13 || event.keyCode == 13) {
        //code to execute here
        getLocation();
    }
    return true;
};

function getLocation() {
   	var city = document.getElementById("search").value;
    console.log(city);
   	var location = city;
    var script = document.createElement('script');
    script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + location + "')&format=json&callback=placeCallback";
	document.body.appendChild(script);
    setTimeout(function() {
        document.body.removeChild(script);
    }, 2000); 
    }

var placeCallback = function(data) {
    console.log(data);
    for(var i = 0; i < 6; i++)
    {
      fiveDay[i] = new weather(data.query.results.channel.item.forecast[i]);
    }
    theCity = data.query.results.channel.location.city;
    theCountry = data.query.results.channel.location.country;
    theRegion = data.query.results.channel.location.region;
    currentTemp = data.query.results.channel.item.condition.temp;
    currentText = data.query.results.channel.item.condition.text;
    viewController();
}

function viewController(){
    var newView = new view;
}
view.prototype.updateDate = function() {
//function updateDate(){
    var day = new Date();
    var hr = day.getHours();
    var heh = day.getDate();

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[day.getMonth()];

    if(hr >= 4 && hr < 12)
        document.getElementById("date").innerHTML = "Good Morning.";
    if(12 <= hr  && hr < 18)
        document.getElementById("date").innerHTML = "Good afternoon.";
    else
        document.getElementById("date").innerHTML = "Good evening.";

    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    document.getElementById("num2").innerHTML= day.getHours() + ":" + day.getMinutes();
    document.getElementById("actual").innerHTML = days[day.getDay()] + ", " + n + " " + heh + ", " + day.getFullYear();

    document.getElementById("jcity").innerHTML = theCity + ", " + theRegion;
    document.getElementById("jcountry").innerHTML = theCountry;
}


function addIcon(location, code){
    console.log(code);
    var cloudy = [26,27, 28, 29, 30, 20, 21, 22];
    var sunny = [32,34,36];
    var rain = [9, 10, 11, 12, 35, 37, 38, 39, 45];
    var snow = [5, 6, 7, 8, 13, 14, 15, 16, 17, 41, 42, 43, 46];

    for(var i = 0; i < 13; i++)
    {
        if(sunny[i] == code)
         location.innerHTML = "<img src='icons/Sun.svg' />";
        if(cloudy[i] == code)
            location.innerHTML = "<img src='icons/Cloud-Sun.svg' />";
        if(rain[i] == code)
          location.innerHTML = "<img src='icons/Cloud-Drizzle-Alt.svg' />";
        if(snow[i] == code)
         location.innerHTML = "<img src='icons/Cloud-Snow-Sun.svg' />";
    }
}

view.prototype.updateFiveDay = function() {
    var dates = document.getElementsByClassName("datez");

    (document.getElementById("now")).innerHTML = currentTemp+"&#8457";
    (document.getElementById("highz")).innerHTML ="High: "+fiveDay[0].high+"&#8457";
    (document.getElementById("lowz")).innerHTML ="Low: "+fiveDay[0].low+"&#8457";
    (document.getElementById("textz")).innerHTML = currentText;

    for (var i = 1; i < 6; i++)
        dates[i].innerHTML=fiveDay[i].day;

    var icons = document.getElementsByClassName("icon");
    for (var i = 0; i < 6; i++)
        addIcon(icons[i], fiveDay[i].code); ///I know I could've looped this it was being so annoying though


    var highs = document.getElementsByClassName("high");
    for (var i = 0; i < 6; i++)
        highs[i].innerHTML=fiveDay[i].high+"&#8457";
}
