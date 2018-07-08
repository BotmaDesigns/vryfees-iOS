var serverData = JSON.parse(localStorage.getItem("data"));
var venueData = JSON.parse(localStorage.getItem("venueUpdate"));
var stallsData = JSON.parse(localStorage.getItem("stallsUpdate"));
var adsData = JSON.parse(localStorage.getItem("adsUpdate"));

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
			if (parseFloat(intDate)>=LastUpdate.lastUpdate && serverData!=null && venueData!=null && stallsData!=null)
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
			
			fetch('http://vryfees.botmasoftware.com/stalls.ashx', {
				mode: 'cors'
			}).then(function(response) {
				return response.json();
			}).then(function(data) {
				//console.log(data);
				localStorage.setItem("stallsUpdate",JSON.stringify(data))
				stallsData = JSON.parse(localStorage.getItem("stallsUpdate"));
			}).catch(function() {
				console.log("Booo4");
			});
			
			fetch('http://vryfees.botmasoftware.com/tafel.ashx', {
				mode: 'cors'
			}).then(function(response) {
				return response.json();
			}).then(function(data) {
				//console.log(data);
				localStorage.setItem("adsUpdate",JSON.stringify(data))
				adsData = JSON.parse(localStorage.getItem("adsUpdate"));
			}).catch(function() {
				console.log("no ads");
			});
			
			setTimeout(saveLocalData, 3000);
		}
		else
		{
			serverData = JSON.parse(localStorage.getItem("data"));
			venueData = JSON.parse(localStorage.getItem("dataVenue"));
			stallsData = JSON.parse(localStorage.getItem("dataStalls"));
			adsData = JSON.parse(localStorage.getItem("dataAds"));
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
	if(serverData[showNum].Computicket==""){ticketSale = 'Tickets sold at the venue';}else{ticketSale = "<a href='"+serverData[showNum].Computicket + "'>Buy tickets here </a>"}
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

function myFunctionApple() {
    var x = document.getElementById("menu");
    if (x.className === "menu") {
        x.className += " showMenu";
		document.getElementById("backBtn").style.display = "none"
    } else {
        x.className = "menu";
		document.getElementById("backBtn").style.display = "block"
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
	document.getElementById("showImg").innerHTML = "<img class='insideIMG' src='img/stalls/" + stallsData[stallNum].ImageName + ".jpg' onerror=\"this.src='img/error.jpg';\"alt=''></img>";
	document.getElementById("title").innerHTML = stallsData[stallNum].Name;
	document.getElementById("showDesc").innerHTML = "<p><span class='bold'>Stall Location: </span>" + stallsData[stallNum].StallNumber + "</p>" 
													+ "<p><span class='bold'>Owner: </span>" + stallsData[stallNum].OwnerName + "</p>"
													+ "<p><span class='bold'>Contact num: </span><a href='tel:" + stallsData[stallNum].Contacts[0].Number + "'>" +stallsData[stallNum].Contacts[0].Number +"</a></p>"
													+ "<p><span class='bold'>e-mail: </span><a href='mailto:" + stallsData[stallNum].Contacts[0].Email + "'>"+ stallsData[stallNum].Contacts[0].Email +"</a></p>"
													+(stallsData[stallNum].Website!=""?"<p><span class='bold'>Website: </span><a href='" + stallsData[stallNum].Website + "'>" + stallsData[stallNum].Website + "</a></p>":'')
													+ (stallsData[stallNum].Facebook!=""?"<p><span class='bold'>Facebook: </span>" + stallsData[stallNum].Facebook + "</p>":'')
													+ "<p><span class='bold'>Products: </span>" + stallsData[stallNum].Product;
}

function getStalls(){
	for (i=0;i<stallsData.length;i++){
			document.getElementById(stallsData[i].Genre).innerHTML += "</br>" + "<a href='stall.html?stallNum="+i+"'>" + stallsData[i].Name +"</a>" + "</br>";
		}
}

function goBack() {
    window.history.back();
}

function startSwiper(){
	var x = 1;
	var today = new Date();
	//console.log(today.toDateString());
	for(i=0;i<adsData.length;i++){
		
			/*var homeAddImg = document.getElementById("homeAdd"+x).innerHTML = "<a href='show.html?showNum="+showNum+"'><div id='addImg'+x></div><div id='addTitle'+x></div><div id='addSynop'+x></div></a>";
			var homeAddImgInside = document.getElementById("addImg"+x).innerHTML = "<img class='insideIMG' src='img/shows/" + serverData[showNum].Authors + ".jpg'></img>";
			var homeAddTitle = document.getElementById("addTitle"+x).innerHTML = serverData[showNum].Name;
			var homeAddSyn = document.getElementById("addSynop"+x).innerHTML = serverData[showNum].Synopses;
			
			var showAdd = homeAddImg + homeAddImgInside + homeAddTitle + homeAddSyn;*/
			
			var addDate = new Date(0);
			addDate.setUTCMilliseconds((adsData[i].Date));
				//console.log(addDate);	
		if(addDate.toDateString()== today.toDateString()){
			if(adsData[i].Show!=null){
				var tmpshowNum = 0;
				for (j=0;j<serverData.length ;j++){
					
					if (adsData[i].Show.Oid==serverData[j].Oid && tmpshowNum==0)
					{
						
						tmpshowNum = j;
					}
				}
				
				var showImg = "<img class='addIMG' title='stallImg"+x+"' src='img/shows/" + serverData[tmpshowNum].Authors + ".jpg' onerror=\"this.src='img/error.jpg';\"alt=''></img>";
				var showTitle =  serverData[tmpshowNum].Name;
				var showSyn = serverData[tmpshowNum].AfrSynopses;
				
				var baseHTML = "<a href='show.html?showNum="+tmpshowNum+"'><div class=\"showTitle\">"+showImg+"<div id=\"title"+x+"\">"+showTitle+"</div></div><div class=\"showDesc\" id=\"showDesc"+x+"\">"+showSyn+"</div></a>";
				var showAdd = showImg + showTitle + showSyn;
				
				document.getElementById("swiper-wrapper").innerHTML += "<div id='homeAdd" + x + "' class='swiper-slide'>"+baseHTML+"</div>";
					
				
			}
			if(adsData[i].Stall!=null){
				var tmpstallNum = 0;
				for (j=0;j<stallsData.length ;j++){
					
					if (adsData[i].Stall.Oid==stallsData[j].Oid && tmpstallNum==0)
					{
						
						tmpstallNum = j;
					}
				}
				
				var stallImg = "<img class='addIMG' title='stallImg"+x+"' src='img/stalls/" + stallsData[tmpstallNum].ImageName + ".jpg' onerror=\"this.src='img/error.jpg';\"alt=''></img>";
				var stallTitle =  stallsData[tmpstallNum].Name;
				var stallSyn = "<p><span class='bold'>Stall Location: </span>" + stallsData[tmpstallNum].StallNumber + "</p>" 
																+ "<p><span class='bold'>Owner: </span>" + stallsData[tmpstallNum].OwnerName + "</p>"
																+ "<p><span class='bold'>Contact num: </span><a href='tel:" + stallsData[tmpstallNum].Contacts[0].Number + "'>" +stallsData[tmpstallNum].Contacts[0].Number +"</a></p>"
																+ (adsData[i].AdText!=null?"<p>" + adsData[i].AdText +"</p>":'')
																+ "<p><span class='bold'>Products: </span>" + stallsData[tmpstallNum].Product;
				
				var baseHTML = "<a href='stall.html?stallNum="+tmpstallNum+"'><div class=\"showTitle\">"+stallImg+"<div id=\"title"+x+"\">"+stallTitle+"</div></div><div class=\"showDesc\" id=\"showDesc"+x+"\">"+stallSyn+"</div></a>";
				var stallAdd = stallImg + stallTitle + stallSyn;
				
				document.getElementById("swiper-wrapper").innerHTML += "<div id='homeAdd" + x + "' class='swiper-slide'>"+baseHTML+"</div>";
					
				
			}
			x++;
			console.log(x);
		}
	}
	
	var swiper = new Swiper('.swiper-container', {
      spaceBetween: 10,
      centeredSlides: true,
      autoplay: {
        delay: 2000,
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

function Draw(){
  var img = document.getElementById("stallMap");
  var cnvs = document.getElementById("myCanvas");
  
  cnvs.style.position = "absolute";
  cnvs.style.left = img.offsetLeft + "px";
  cnvs.style.top = img.offsetTop+ + "px";
  
  var leftP = stallsData[stallNum].X;
  var topP = stallsData[stallNum].Y;
  
  var ctx = cnvs.getContext("2d");
  ctx.beginPath();
  ctx.arc(leftP, topP, 5, 0, 2 * Math.PI, false);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#ff0000';
  ctx.stroke();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        document.getElementById("userPosition").innerHTML = "Your location is not available at this stage.";
    }
}

function showPosition(position) {
  
	var youLeft = (Math.abs(26.191074-position.coords.longitude)*100000/1.5165714);
	var youTop = (Math.abs(Math.abs(-29.113522)-Math.abs(position.coords.latitude)))*100000/1.8;

	
	/*
	document.getElementById("userPosition").innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
	document.getElementById("userPosition").innerHTML += "</br>pixels left/right: " + youLeft + "</br>pixels up/down: " + youTop;
	
	
	var youLeft = (Math.abs(26.191074-26.186307)*100000/1.5165714);
	var youTop = (Math.abs(Math.abs(-29.113522)-Math.abs(-29.113525)))*100000/1.8;
	*/
	
	if(youLeft < 350 && youLeft >= 0 && youTop < 300 && youTop >= 0){
		document.getElementById("meMap").style.display = "block";
		document.getElementById("meMap").style.left = youLeft + "px";		
		document.getElementById("meMap").style.top = (document.getElementById("stallMap").offsetTop + youTop) + "px";
	}	
}

