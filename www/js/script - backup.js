var serverData=null;

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
			if (parseFloat(intDate)>=LastUpdate.lastUpdate)
			{
				console.log('data up to date');
				UpToDate=true;
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
		}
		else
		{
			serverData = JSON.parse(localStorage.getItem("data"));
		}		
	}).catch(function() {
		console.log("Booo1");
	});
}

function getShows()
{
	for (i=0;i<serverData.length;i++){
					document.getElementById(serverData[i].Categories).innerHTML += "</br>" + "<a href='show.html?showNum="+i+"'>" + serverData[i].Name +"</a>" + "</br>";
                }
}

function nameShows()
{

                for (i=0;i<serverData.length;i++){
					document.getElementById("shows").innerHTML += "</br><a href='show.html?showNum="+i+"'>" + serverData[i].Name +"</a></br>";
                }
}

function getToday(){
	
	var todayDate = new Date();
	document.getElementById("today").innerHTML = todayDate.toDateString();
                for (i=0;i<serverData.length;i++){
					for (j=0;j<serverData[i].Schedules.length;j++){
						if(serverData[i].Schedules[j].StartTime.toDateString() == todayDate){
							var div = document.createElement("div");
							div.setAttribute("class", "venueSchedule").innerHTML = "write this info down";
						};                
					}
                }
}

function nameVenues()
{
fetch('http://vryfees.botmasoftware.com/venues.ashx', {
  mode: 'cors'}).then(function(response) {
  return response.json();
}).then(function(data) {
  //console.log(data);
                for (i=0;i<data.length;i++){
					document.getElementById("venues").innerHTML += "<tr><td><a href='venue.html?venueNum=" + data[i].Name + "'>" + data[i].Name +"</a></td></tr>";
                }
                }).catch(function() {
                  console.log("Booo");
                });
}

function getVenueInfo(venueNum){
	fetch('http://vryfees.botmasoftware.com/venues.ashx', {
	mode: 'cors'}).then(function(response) {
	return response.json();
	}).then(function(data) {
			for(i=0;i<data.length;i++){
				if(data[i].Name == venueNum){
					document.getElementById("venueName").innerHTML = data[i].Name;
					document.getElementById("googleMapVenue").innerHTML = "<a href='" + data[i].GoogleMaps + "'>View in Google Maps</a>";
				}
			}		
		}).catch(function() {
			console.log("Booo");
		});
}

function populateVenueInfo(venueNum){
		document.getElementById("venueImg").innerHTML = "<img src='img/venues/" + venueNum + ".jpg' style='min-width:100%; height:100%;'></img>";
		for (i=0;i<serverData.length;i++){
			for (j=0;j<serverData[i].Schedules.length;j++){
				if (serverData[i].Schedules[j].Venue.Name == venueNum){
					var date = new Date(serverData[i].Schedules[j].StartTime);
					document.getElementById("schedule").innerHTML += "<tr><td><a href='show.html?showNum=" + i + "'>" + serverData[i].Name + "</a></td><td>" + date.toDateString() + "</td><td>" + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + "</td></tr>";
				}
			}
		}
}


function populateInfo(showNum){

		document.getElementById("showImg").innerHTML = "<img src='img/shows/" + serverData[showNum].Name + ".jpg' style='width:auto; height:100%;'></img>";
		document.getElementById("buyTicket").innerHTML = "<a href='"+serverData[showNum].Computicket + "'>book tickets now on CompuTicket.com</a>";
		document.getElementById("title").innerHTML = serverData[showNum].Name;
		document.getElementById("showDesc").innerHTML = "<span class='bold'>Genre:</span> " + serverData[showNum].Genres + "<p>" + serverData[showNum].Synopses + "</p><p><span class='bold'>Author:</span> " + serverData[showNum].Authors + "</p>" + "<span class='bold'>Actors:</span> ";
			for (j=0;j<serverData[showNum].Actors.length;j++){
					document.getElementById("showDesc").innerHTML += serverData[showNum].Actors[j].Name + ", ";
                }
			for (j=0;j<serverData[showNum].Schedules.length;j++){
				var date = new Date(serverData[showNum].Schedules[j].StartTime);
					document.getElementById("schedule").innerHTML += "<tr><td>" + date.toDateString() + "</td><td><a href='venue.html?venueNum=" + serverData[showNum].Schedules[j].Venue.Name + "'>" + serverData[showNum].Schedules[j].Venue.Name + "</a></td><td>" + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + "</td></tr>";
				}

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
