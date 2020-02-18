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

// TODO: figure out a toggle or something to look at each project individually.



function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}

// Fetching all projects from GEOME
let baseURL = 'https://api.geome-db.org/projects/stats?'

let dl = document.getElementById('projects-display')

function fetchProjects() {
  fetch(baseURL)
  .then((resp) => resp.json())
  .then(function(data) {
    
    // Maps through all the objects with the config ID 45 and creates dt and dd tags for each
    // which get appended to the projects-display dl
    return data.map(function(project) {
      if(project.projectConfiguration.id == 45) {
        console.log(project)
      let dt = createNode('dt')
      let dd = createNode('dd')

      dt.innerHTML = `Project Title: ${project.projectTitle}`

      dd.innerHTML = `
      <i>Project Contact: </i>${project.projectContact} ||
      <i>Project Contact Email: </i>${project.projectContactEmail} <br>
      <i>Principal Investigator: </i>${project.principalInvestigator} <br>
      <i>Principal Investigator Affiliation: </i>${project.principalInvestigatorAffiliation} <br>
      <i>Description: </i>${project.description} <br>
      <i>Publication GUID: </i>${project.publicationGuid} <br>
      <i>Project Data GUID: </i>${project.projectDataGuid} <br>
      <br>
      `;

      append(dt, dd)
      append(dl, dt)
      
      }
    })
  })
  .catch(function(err) {
    console.log(err)
  })
}

