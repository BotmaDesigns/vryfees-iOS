var serverData = JSON.parse(localStorage.getItem("data"));
var venueData = JSON.parse(localStorage.getItem("venueUpdate"));

function saveLocalData()
{
	
	fetch('http://vryfees.botmasoftware.com/lastupdate.ashx', {
	  mode: 'cors'
	}).then(function(response) {
	  return response.json();
	}).then(function(LastUpdate) {
		console.log(LastUpdate)
		var intDate = localStorage.getItem("lastupdate");
		var UpToDate=false;
		if (intDate != null)
		{
			console.log('intDate found');
			console.log(parseFloat(intDate));
			if (parseFloat(intDate)>=LastUpdate.lastUpdate && serverData!=null && venueData!=null)
			{
				console.log('data up to date');
				UpToDate=true;
				window.location.replace('home.html');
			}
		}
		if (!UpToDate)
		{
			console.log('data not up to date');
			
			fetch('http://vryfees.botmasoftware.com/api.ashx', {
				mode: 'cors'
			}).then(function(response) {
				return response.json();
			}).then(function(data) {
				//console.log(data);
				localStorage.setItem("data",JSON.stringify(data))
				localStorage.setItem("lastupdate",LastUpdate.lastUpdate.valueOf() )
				serverData = JSON.parse(localStorage.getItem("data"));
			}).catch(function() {
				console.log("Booo2");
			});
			
			fetch('http://vryfees.botmasoftware.com/venues.ashx', {
				mode: 'cors'
			}).then(function(response) {
				return response.json();
			}).then(function(data) {
				//console.log(data);
				localStorage.setItem("venueUpdate",JSON.stringify(data))
				venueData = JSON.parse(localStorage.getItem("venueUpdate"));
			}).catch(function() {
				console.log("Booo3");
			});
			setTimeout(saveLocalData, 1000);
		}
		else
		{
			serverData = JSON.parse(localStorage.getItem("data"));
			venueData = JSON.parse(localStorage.getItem("dataVenue"));
			window.location.replace('home.html');
		}		
	}).catch(function() {
		console.log("Booo1");
	});
}

function restartMsg(msg){
	document.getElementById("errorMSG").innerHTML = msg;
}

function showAdd(){
	var showNum = Math.floor((Math.random() * serverData.length) + 1);
	var showNum2 = Math.floor((Math.random() * serverData.length) + 1);
	
	document.getElementById("homeAdd1").innerHTML = "<a href='show.html?showNum="+showNum+"'><div id='addImg1'></div><div id='addTitle1'></div><div id='addSynop1'></div></a>";
	document.getElementById("addImg1").innerHTML = "<img class='insideIMG' src='img/shows/" + serverData[showNum].Authors + ".jpg'></img>";
	document.getElementById("addTitle1").innerHTML = serverData[showNum].Name;
	document.getElementById("addSynop1").innerHTML = serverData[showNum].Synopses;
				
	document.getElementById("homeAdd2").innerHTML = "<a href='show.html?showNum="+showNum2+"'><div id='addImg2'></div><div id='addTitle2'></div><div id='addSynop2'></div></a>";
	document.getElementById("addImg2").innerHTML = "<img class='insideIMG' src='img/shows/" + serverData[showNum2].Authors + ".jpg'></img>";
	document.getElementById("addTitle2").innerHTML = serverData[showNum2].Name;
	document.getElementById("addSynop2").innerHTML = serverData[showNum2].Synopses;
			
	document.getElementById("article").setAttribute("class", "home");	
}

function getShows(festType)
{
	document.getElementById("article").setAttribute("class", festType);
	for (i=0;i<serverData.length;i++){
			if(serverData[i].Division == festType){
					document.getElementById(serverData[i].Categories).innerHTML += "</br>" + "<a href='show.html?showNum="+i+"'>" + serverData[i].Name +"</a>" + "</br>";
			}
                }
}

function nameShows(showType)
{

                for (i=0;i<serverData.length;i++){
					if(serverData[i].Division == showType){
						/*document.getElementById("shows").setAttribute("class", showType);*/
						document.getElementById("article").setAttribute("class", showType);
						document.getElementById("shows").innerHTML += "</br><a href='show.html?showNum="+i+"'>" + serverData[i].Name +"</a></br></br>";
					}
                }
}

function getToday(){
	
	var todayDate = new Date();
	var startDate = new Date(2018, 06, 08, 0, 0, 0, 0);

	
	if (todayDate<startDate){document.getElementById("todayShed").innerHTML = "<tr><td>The Free State Arts Festival starts on " + (startDate.toDateString()) + "</td></tr>";}
	
	document.getElementById("today").innerHTML = "<span class='bold'>" + todayDate.toDateString() + "</span>";
                for (i=0;i<serverData.length;i++){
					for (j=0;j<serverData[i].Schedules.length;j++){
						var date = new Date(serverData[i].Schedules[j].StartTime);
						if(date.toDateString() == todayDate.toDateString()){
							document.getElementById("todayShed").innerHTML += "<tr><td><a href='show.html?showNum=" + i + "'>" + serverData[i].Name + "</a></td><td><a href='venue.html?venueNum=" + serverData[i].Schedules[j].Venue.Name + "'>" + serverData[i].Schedules[j].Venue.Name + "</a></td><td>" + date.getUTCHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + "</td></tr>";
						}               
					}
                }
}

function nameVenues()
{
                for (i=0;i<venueData.length;i++){
					document.getElementById("venues").innerHTML += "<tr><td><a href='venue.html?venueNum=" + venueData[i].Name + "'>" + venueData[i].Name +"</a></td></tr>";
                }
}

function getVenueInfo(venueNum){
			for(i=0;i<venueData.length;i++){
				if(venueData[i].Name == venueNum){
					document.getElementById("venueName").innerHTML = venueData[i].Name;
					document.getElementById("googleMapVenue").innerHTML = "<a href='" + venueData[i].GoogleMaps + "'>View in Google Maps</a>";
				}
			}		
}

function populateVenueInfo(venueNum){
		document.getElementById("venueImg").innerHTML = "<img class='insideIMG' src='img/venues/" + venueNum + ".jpg'></img>";
		var printName = null;
		for (i=0;i<serverData.length;i++){
			for (j=0;j<serverData[i].Schedules.length;j++){
				if (serverData[i].Schedules[j].Venue.Name == venueNum){
					if (printName != serverData[i].Name){
						document.getElementById("schedule").innerHTML += "<tr><td><a href='show.html?showNum=" + i + "'>" + serverData[i].Name + "</a></td></tr>";
						printName = serverData[i].Name;
					}					
				}
			}
		}
}


function populateInfo(showNum){
	var compT = true;
	if(serverData[showNum].Price=="0"){pricePrint = 'Gratis / Free'; compT = false}else{pricePrint = 'Price: R ' + serverData[showNum].Price;}
	if(serverData[showNum].Computicket==""){ticketSale = 'Tickets sold at the venue';}else{ticketSale = "<a href='"+serverData[showNum].Computicket + "'>Buy tickets now on CompuTicket.com</a>"}
		document.getElementById("showImg").innerHTML = "<img class='insideIMG' src='img/shows/" + serverData[showNum].Authors + ".jpg'></img>";
		document.getElementById("buyTicket").innerHTML = ticketSale;
		document.getElementById("title").innerHTML = serverData[showNum].Name;
		document.getElementById("showDesc").innerHTML = "<span class='bold'><p>" + pricePrint + "</p>" + "Category :</span> " + serverData[showNum].Categories + "<p>" + serverData[showNum].AfrSynopses + "</p>" + "<p>" + serverData[showNum].Synopses + /*"</p><p><span class='bold'>Author:</span> " + serverData[showNum].Authors +*/ "</p>" + "<span class='bold'>Featuring:</span> ";
		if(compT==false){document.getElementById("buyTicket").innerHTML = "Tickets not needed";}
			
			for (j=0;j<serverData[showNum].Actors.length;j++){
					document.getElementById("showDesc").innerHTML += serverData[showNum].Actors[j].Name + ", ";
                }
			for (j=0;j<serverData[showNum].Schedules.length;j++){
				var date = new Date(serverData[showNum].Schedules[j].StartTime);
					document.getElementById("schedule").innerHTML += "<tr><td>" + date.toDateString() + "</td><td><a href='venue.html?venueNum=" + serverData[showNum].Schedules[j].Venue.Name + "'>" + serverData[showNum].Schedules[j].Venue.Name + "</a></td><td>" + date.getUTCHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + "</td></tr>";
				}

}


var slideIndex = 0;
function carousel() {
	var i;
    var x = document.getElementsByClassName("slideshow");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1} 
    x[slideIndex-1].style.display = "block"; 
    setTimeout(carousel, 5000); // Change image every 5 seconds
}

function myFunction() {
    var x = document.getElementById("menu");
    if (x.className === "menu") {
        x.className += " showMenu";
    } else {
        x.className = "menu";
    }
}

function showSchedule(y) {
	var x = document.getElementById(y);
	if (x.className === "catSchedule") {
		x.className += " show";
	} else {
		x.className = "catSchedule";
	}
}

function populateStallInfo(stallNum){
	document.getElementById("showImg").innerHTML = stallNum;
	document.getElementById("title").innerHTML = serverData[showNum].Name;
	document.getElementById("showDesc").innerHTML = "<p>" + serverData[showNum].AfrSynopses + "</p>" + "<p>" + serverData[showNum].Synopses;
}

function nameStalls(showType)
{
	for (i=0;i<serverData.length;i++){
		if(serverData[i].Division == showType){
			document.getElementById("article").setAttribute("class", showType);
			document.getElementById("shows").innerHTML += "</br><a href='stall.html?stallNum="+i+"'>" + serverData[i].Name +"</a></br></br>";
		}
	}
}

function startSwiper(){
	var swiper = new Swiper('.swiper-container', {
      spaceBetween: 10,
      centeredSlides: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
}

/*function createTableCat(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  table.setAttribute("id", "comedy");
  table.className="catSchedule";

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

createTable([["row 1, cell 1", "row 1, cell 2"], ["row 2, cell 1", "row 2, cell 2"]]);*/
