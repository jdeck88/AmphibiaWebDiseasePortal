
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

// TODO: Fix the toggle so it only toggles relevant data.

  // Toggle data
  var coll = document.getElementsByClassName("collapsible");

  function toggle() {
    for (let i = 0; i < coll.length; i++) {
        if (coll[i].style.display === "block") {
          coll[i].style.display = "none";
        } else {
          coll[i].style.display = "block";
        }
      }
  }


function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}

let dl = document.getElementById('projects-display')

// Fetching all projects from GEOME
let baseURL = 'https://api.geome-db.org/projects/stats?'

function fetchProjects() {
  fetch(baseURL)
  .then((resp) => resp.json())
  .then(function(data) {
    
    return data.forEach(function(project) {
      // 45 is the Amphibian Disease Portal TEAM configuration ID.
      if(project.projectConfiguration.id == 45 && project.public == true) {
        //console.log(project)

        var table = document.getElementById('projects-display')
        var tr = document.createElement('tr');

                tr.innerHTML = `
                <td> <i class="fa fa-globe"></i> </td>
                <td> ${project.projectTitle} </td>
                <td> ${project.principalInvestigator} </td>
                <td> ${project.principalInvestigatorAffiliation} </td>
                `
                table.appendChild(tr);
      
      }
    })
  })
  .catch(function(err) {
    console.log(err)
  })
}
