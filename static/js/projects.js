
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
                //TODO: 
                // DONE: Get all buttons to be clickable.
                // DONE: Get each button to correspond to each project.
                // DONE: When the button routes to project ID ONLY ONCE LOL
                // DONE: When a button is clicked, the url changes to /?id=PROJECTID
                // Display the data for individual project.

// Base URL for fetching all projects from GEOME
let baseURL = 'https://api.geome-db.org/projects/stats?'

//var bigdatafile = []

// Fetches all public projects and displays them in a table.
function fetchProjects() {
  let projectId = getUrlVars().id
  
  // If no project id is defined, fetch all projects
  if (projectId === undefined) { 
  hideDetailTable()

  fetch(baseURL)
  .then((resp) => resp.json())
  .then(function(data) {


    // TODO: think about how best to manage this
    // right now it will get written everytime this particular
    // piece of code is called which is maybe OK

    // Write this to storage so we can use it later
    bigdatafile = data
    localStorage.setItem("bigdatafile", JSON.stringify(bigdatafile));
    // console.log('initializing bigdatafile')
    // console.log(bigdatafile)


    return data.forEach(function(project) {
      // 45 is the Amphibian Disease Portal TEAM configuration ID.
      if(project.projectConfiguration.id == 45 && project.public == true) {

        let allProjTable = document.getElementById('projects-display')
        let tr = document.createElement('tr') // Table row

              tr.innerHTML = `
                <td> <i class="fa fa-globe"></i> </td>
                <td> ${project.projectTitle} </td>
                <td> ${project.principalInvestigator} </td>
                <td> ${project.principalInvestigatorAffiliation} </td>
                <td><button class="detailsBtn" data-id='${project.projectId}' 
                    id='project${project.projectId}'
                    >Details</button></td>
                `
              allProjTable.appendChild(tr)
              document.getElementById(`project${project.projectId}`).addEventListener('click', function() {
                window.location.href = `/projects/?id=${project.projectId}`
                // console.log(`This button's ID: ${project.projectId}`)
              })
      }
    })
  })
  .catch(function(err) {
    console.log(err)
  })
  } else {
    bigdatafile = JSON.parse(localStorage.getItem("bigdatafile"))
    hideMainTable()

    // Loops through the objects in localstorage
    for (let i = 0; i < bigdatafile.length; i++) {
      // Makes sure the project is public, is the right team (45), and that the project id matches.
      if (bigdatafile[i].projectConfiguration.id == 45 && bigdatafile[i].public == true && bigdatafile[i].projectId == projectId) {
        
        let detailTable = document.getElementById('project-detail')
        let tr = document.createElement('tr') // Table row

        tr.innerHTML = `<td>${bigdatafile[i].projectTitle}</td>
        `
        detailTable.appendChild(tr)
        console.log(bigdatafile[i].projectTitle)
      }
    }
    console.log("go fetch my own project at " + projectId)
  }
}

function getUrlVars() {
  var vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

function hideMainTable() {
  let container = document.getElementById('table-container')
  container.style.display = "none"
}

function hideDetailTable() {
  let container = document.getElementById('detail-container')
  container.style.display = "none"
}
