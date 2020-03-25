// Recovers link from the fetch using the project id, creates an anchor for it and clicks it.
function downloadDataFile(id) {
  fetch (`https://api.geome-db.org/records/Sample/excel?networkId=1&q=_projects_:${id}`)
  .then(res => res.json())
  .then(function(data) {
    let a = document.createElement('a')
    let downloadLink = data.url
    a.href = downloadLink
    console.log(downloadLink)
    console.log(a)
    a.click()
  })
  .catch(err => {
    alert('something went wrong '+ err)
  })
}

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

// Displays Search Results in a table
function displayMatches() {
  let allProjTable = document.getElementById('projects-display')
  let tr = document.createElement('tr') // Table row

  bigdatafile = JSON.parse(localStorage.getItem("bigdatafile"))

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

    // Loops through the objects in localstorage
    for (let i = 0; i < bigdatafile.length; i++) {
      let local = bigdatafile[i]
      // Makes sure the project is public, is the right team (45), and that the project id matches.
      if (local.projectConfiguration.id == 45 && local.public == true && local.projectId == projectId) {
        
        let div = document.getElementById('project')
        let p = document.createElement('p')

        let sampleData = local.entityStats

        p.innerHTML = `
        <h2>${local.projectTitle}</h2>
        <h6 style="font-size:12px;">Recommended Citation: </h6>
        <h6>${local.recommendedCitation}</h6>
        
        <h3>Abstract or Project Description</h3>
        <hr>
        ${local.description}

        <h3>Information</h3>
        <hr>
        Project PI: ${local.principalInvestigator} <br>
        Project Contact: ${local.projectContact} <a href="mailto:${local.projectContactEmail}"><i class="fa fa-envelope"></i> </a><br>
        Dataset DOI: <a href="${local.projectDataGuid}">${local.projectDataGuid}</a> <br>
        DOI: <a href="${local.publicationGuid}">${local.publicationGuid}</a> <br>

        <h3 style="margin-top: 15px;">Project Data - Public <i class="fa fa-globe"></i></h3> 
        <hr>

        Events: ${sampleData.EventCount} || 
        Samples Collected: ${sampleData.SampleCount}
        <br>

        <button id="view-btn" onclick="location.href='https://geome-db.org/workbench/overview?projectId=${local.projectId}'">View Project in GEOME <i class="fa fa-external-link"></i></button>
        <button id="data-btn" onclick="location.href='https://geome-db.org/query?q=_projects_:${local.projectId}'">Query Dataset in GEOME <i class="fa fa-external-link"></i></button>
        <button id="download-btn" onclick="downloadDataFile(${local.projectId})"><i class="fa fa-download"></i>Download Newest Datafile</button><br>
        
        `
        div.appendChild(p)

        console.log(local)
        console.log(local.entityStats)
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
