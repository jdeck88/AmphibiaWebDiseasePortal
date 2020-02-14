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

// Fetching all projects with Configuration ID of 45.

let baseURL = 'https://api.geome-db.org/projects/stats?'

async function fetchProjects() {
  const response = await fetch(baseURL)
  const data = await response.json()

  for (let i = 0; i < data.length; i++) {
    if(data[i].projectConfiguration.id == 45) {
      // console.log(data[i])
      let projectTitle = data[i].projectTitle
      console.log(projectTitle)
      let el = document.getElementById('title')
      el.append(projectTitle + ', ')
    }
  }
}

