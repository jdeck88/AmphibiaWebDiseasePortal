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

// TODO: Separate projects, display details and figure out a toggle or something to look at each project individually.



function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}

// Fetching all projects from GEOME
let baseURL = 'https://api.geome-db.org/projects/stats?'

let div = document.getElementById('projects-display')

function fetchProjects() {
  fetch(baseURL)
  .then((resp) => resp.json())
  .then(function(data) {
    //console.log(data)
    
    // Maps through all the objects with the config ID 45 and creates a p tag for each
    // which gets appended to the projects-display div
    return data.map(function(project) {
      if(project.projectConfiguration.id == 45) {
      let p = createNode('p')

      p.innerHTML = `
      <span>${project.projectTitle} </span><br>
      `
      append(div, p)
      }
    })
  })
  .catch(function(err) {
    console.log(err)
  })
}

