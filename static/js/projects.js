//TODO: function for downloading data file.

// function downloadDataFile(id) {
//   fetch (`https://api.geome-db.org/records/Sample/excel?networkId=1&q=_projects_:${id}`)
//   .then(res => res.json())
//   .then(function(data) {
//     console.log(data.url)
//   })
//   .catch(err => {
//     alert('something went wrong '+ err)
//   })
// }

// // Download datafile button logic
// function downloadButton(id, a) {
//     fetch (`https://api.geome-db.org/records/Sample/excel?networkId=1&q=_projects_:${id}+and+_expeditions_:%5B${a}%5D+_select_:%5BEvent,Sample%5D+`)
//         .then(response => {
// 	    return console.log(response.json());
// 	})
//         .then(json => {
// 		var a = document.createElement("a");
//   		a.href = json.url;
//   		a.setAttribute("download", a);
//   		a.click();
// 	})
// 	.catch(err => {
// 		alert('error fetching download link from GEOME '+ err)
// 	})
// }

// Base URL for fetching all projects from GEOME
const baseURL = 'https://api.geome-db.org/projects/stats?'

// Uses Regex to find partial matches 
function findMatches(wordToMatch, projectData) {
  return projectData.filter(project => {
    // Global insensitive
    const regex = new RegExp(wordToMatch, 'gi')
    // Amphibian Disease Team ID is 45, only searches public projects.
    if(project.projectConfiguration.id == 45 && project.public == true) {
      // Checks to see which radio button is selected to do the search
      const radioPI = document.getElementById('rad-proj-pi').checked
      const radioName = document.getElementById('rad-proj-name').checked
      if (radioPI == true && radioName == false) {
        return project.principalInvestigator.match(regex)
      } if (radioName == true && radioPI == false) {
        return project.projectTitle.match(regex)
      }
    }
  })
}

//TODO: get this function to display matches in table form instead of a paragraph.
function displayMatches() {
  let allProjTable = document.getElementById('projects-display')
  let tr = document.createElement('tr') // Table row

  bigdatafile = JSON.parse(localStorage.getItem("bigdatafile"))

  //const matchArray = findMatches(this.value, projects)
  const matchArray = findMatches(this.value, bigdatafile)
  //console.log(matchArray)

  const html = matchArray.map(project => {
      const regex = new RegExp(this.value, 'gi')
      const projName = project.projectTitle.replace(regex, `<span class="hl">${this.value}</span>`);
      const projPI = project.principalInvestigator.replace(regex, `<span class="hl">${this.value}</span>`)

      return tr.innerHTML = `
      <tr>
      <td> <i id="pubglobe" class="fa fa-globe"></i> </td>
      <td> ${projName} </td>
      <td> ${projPI} </td>
      <td> ${project.principalInvestigatorAffiliation} </td>
      <td><button onclick="window.location.href = '/projects/?id=${project.projectId}'" class="detailsBtn" 
          id='project${project.projectId}'
          >Details</button></td>
          </tr>
      `
    
  }).join('')
  allProjTable.appendChild(tr)
  allProjTable.innerHTML = html
  } 


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
                <td> <i id="pubglobe" class="fa fa-globe"></i> </td>
                <td> ${project.projectTitle} </td>
                <td> ${project.principalInvestigator} </td>
                <td> ${project.principalInvestigatorAffiliation} </td>
                <td><button class="detailsBtn" data-id='${project.projectId}' 
                    id='project${project.projectId}'
                    >Details</button></td>
                `
              allProjTable.appendChild(tr)
              document.getElementById(`project${project.projectId}`).addEventListener('click', function(e) {
                console.log(e)
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

      // Map for individual project samples
  var projectMap = L.map('proj-map').setView([0, 0], 2);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(projectMap);

    // Loops through the objects in localstorage
    for (let i = 0; i < bigdatafile.length; i++) {
      // Makes sure the project is public, is the right team (45), and that the project id matches.
      if (bigdatafile[i].projectConfiguration.id == 45 && bigdatafile[i].public == true && bigdatafile[i].projectId == projectId) {
        
        let div = document.getElementById('project')
        let p = document.createElement('p')

        p.innerHTML = `
        <h2>${bigdatafile[i].projectTitle}</h2>
        <h6 style="font-size:12px;">Recommended Citation: </h6>
        <h6>${bigdatafile[i].recommendedCitation}</h6>
        
        <h3>Abstract or Project Description</h3>
        <hr>
        ${bigdatafile[i].description}

        <h3>Information</h3>
        <hr>
        Project PI: ${bigdatafile[i].principalInvestigator} <br>
        Project Contact: ${bigdatafile[i].projectContact} <a href="mailto:${bigdatafile[i].projectContactEmail}"><i class="fa fa-envelope"></i> </a><br>
        Dataset DOI: <a href="${bigdatafile[i].projectDataGuid}">${bigdatafile[i].projectDataGuid}</a> <br>
        DOI: <a href="${bigdatafile[i].publicationGuid}">${bigdatafile[i].publicationGuid}</a> <br>

        <h3>Mapping Data - Public</h3> 
        <hr>

        <button id="edit-btn" href="#">Edit Project in GEOME</button>
        <button id="download-btn" onclick="downloadDataFile(${bigdatafile[i].projectId})"><i class="fa fa-download"></i>Download Newest Datafile</button>
        <button id="data-btn" href="https://geome-db.org/query?q=_projects_:${bigdatafile[i].projectId}%20and%20_expeditions_:%5BCosta-rica%5D">Query Dataset</button><br>
        
        `
        div.appendChild(p)

        console.log(bigdatafile[i])
      }
    }
    //console.log("fetching project at id " + projectId)
  }
  const searchInput = document.querySelector('.search')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)
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
  let searchbar = document.getElementById('search-container')
  searchbar.style.display = "none"
}

function hideDetailTable() {
  let container = document.getElementById('detail-container')
  container.style.display = "none"
}
