/*
Skycons is a set of ten animated weather glyphs, procedurally generated by JavaScript using the HTML5 canvas tag.
http://darkskyapp.github.io/skycons/
*/
var skycons = new Skycons();
  // on Android, a nasty hack is needed: {"resizeClear": true}
  // you can add a canvas by it's ID...
  
  // start animation!
  skycons.play();
  
  // want to change the icon? no problem:
  
/*
Get value from Bootstrap dropdown menu
*/
$('#dropdown li').on('click', function(){
    alert($(this).text());
    getData($(this).text());
    changeCity($(this).text());  
 
});
 var countCelsius= function(f){
  
   return Math.floor((f-32)*5/9);
   
    };  
  
 var rightSkycon= function(c, d){
   if (c>0 && c<15 ){
   skycons.add(d,Skycons.RAIN);  
 }else if (c>14 && c<20){
   skycons.add(d,Skycons.SNOW);         
           }
  else if (c===18){
   skycons.add(d,Skycons.SLEET);         
           } 
  else if (c===20){
   skycons.add(d,Skycons.FOG);         
           }  
  else if (c>19 && c<26){
   skycons.add(d,Skycons.WIND);         
           } 
  else if (c>25 && c<31){
   skycons.add(d,Skycons.CLOUDY);         
           }
  else if (c>31 && c<35){
   skycons.add(d,Skycons.CLEAR-DAY);         
           }  
  else if (c>25 && c<31|| c===36){
   skycons.add(d,Skycons.CLOUDY);         
           }  
  else if (c>36 && c<48){
   skycons.add(d,Skycons.SNOW);         
           }  
   
 };   
var getData = function(city){
  var weather, feed ;
    $.ajax({
    
    method: "GET", 
    url:'https://query.yahooapis.com/v1/public/yql',
    data: {
    q: 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + '")',
    format: 'json'
   
    
         }, 
      
    success: function (data) {  
      var weather = data.query.results.channel;
      var cityLo =  weather.item.condition.text;
      
     
      console.log(weather);  
      console.log(cityLo);
      var celcius= countCelsius(weather.wind.chill);
      
      
$('.temperature').text(celcius);
   
      
$('.date').text(weather.lastBuildDate);
$('#status').text(cityLo);         
$('#1').text(weather.item.forecast[1].date);  
$('#2').text(weather.item.forecast[2].date);
$('#3').text(weather.item.forecast[3].date);  
    var lowCelcius1=countCelsius(weather.item.forecast[1].low);
    var
highCelcius1=countCelsius(weather.item.forecast[1].high);    

    var      lowCelcius2=countCelsius(weather.item.forecast[2].low);
    var
highCelcius2=countCelsius(weather.item.forecast[2].high);       

    var      lowCelcius3=countCelsius(weather.item.forecast[3].low);
    var
highCelcius3=countCelsius(weather.item.forecast[3].high);   
      
/*lowest to highest temparatures in future 3 days*/           
$('#rangeL1').text(lowCelcius1);  
$('#rangeH1').text(highCelcius1); 
$('#rangeL2').text(lowCelcius2); 
$('#rangeH2').text(highCelcius2);   
$('#rangeL3').text(lowCelcius3); 
$('#rangeH3').text(highCelcius3);       
   
/*skycon appear in future 3 days */
rightSkycon(weather.item.forecast[1].code, 'day1'); 
rightSkycon(weather.item.forecast[2].code, 'day2'); 
rightSkycon(weather.item.forecast[1].code, 'day3');
        
   }});
  };    
      
$(function(){
  getData('Taipei');  
});


