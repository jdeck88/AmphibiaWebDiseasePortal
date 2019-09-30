var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function downloadButton(a) {
    fetch ('https://api.geome-db.org/records/Sample/excel?networkId=1&q=_projects_:174+and+_expeditions_:%5B'+a+'%5D+_select_:%5BEvent,Sample%5D+')
        .then(response => {
	    return response.json();
	})
        .then(json => {
		var a = document.createElement("a");
  		a.href = json.url;
  		a.setAttribute("download", a);
  		a.click();
	})
	.catch(err => {
		alert('error fetching download link from GEOME'+err)
	})
}
