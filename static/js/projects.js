
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
                // When the button routes to project ID
                // Display the data for individual project.

                /*
pseudo-code!!
if (qs.key != some value)
set innerHTML to be project specific shit
else
set innerHTML to be a a list of all fetchProjects
*/


// Base URL for fetching all projects from GEOME
let baseURL = 'https://api.geome-db.org/projects/stats?'

function fetchById(id) {
  fetch(baseURL)
  .then((res) => {
    return (res.json())
  })
  .then((body) => {
    for (let i = 0; i < body.length; i++) {
        let obj = body[i]
        
        if(obj.projectConfiguration.id == 45 && obj.public == true) {
          //console.log(obj.projectId)
          if(id = obj.projectId) {
            return console.log(`${obj.projectTitle}`)
          }
          // return console.log(id)
        }
    }
})
}

console.log("wtf is this: " + fetchById(223))



// Fetches all public projects and displays them in a table.
function fetchProjects() {
  fetch(baseURL)
  .then((resp) => resp.json())
  .then(function(data) {
    
    return data.forEach(function(project) {
      // 45 is the Amphibian Disease Portal TEAM configuration ID.
      if(project.projectConfiguration.id == 45 && project.public == true) {
        //console.log(project)

        const table = document.getElementById('projects-display')
        let tr = document.createElement('tr') // Table row

              tr.innerHTML = `
                <td> <i class="fa fa-globe"></i> </td>
                <td> ${project.projectTitle} </td>
                <td> ${project.principalInvestigator} </td>
                <td> ${project.principalInvestigatorAffiliation} </td>
                <td><button class="detailsBtn" data-id='${project.projectId}'>Details</button></td>
                `
              table.appendChild(tr)
              detailsButton()
      }
    })
  })
  .catch(function(err) {
    console.log(err)
  })
}

  // BUTTONS
function detailsButton() {
  // Get all buttons by class
  let btns = document.querySelectorAll(".detailsBtn");

    // Makes all buttons clickable and redirects page to /projectId
    for (const btn of btns) {
      btn.addEventListener('click', function(event) {
        let targetId = btn.dataset.id
        // document.location.href=`${targetId}`
        console.log(`Project id for the button you clicked: ${targetId}`)
        // fetchById(targetId)
      })
    }
  }

  function getSlug() {
    // let query = window.location.search;
  // let qs = parse_query_string(query);
  // console.log(`Console log for the query variable: ${query}`)

  // const queryStr = document.location.search.substring(1)
  // const usp = new URLSearchParams(queryStr)
  // let targetSlug = usp.toString()

  //console.log(`This is the variable targetSlug: ${targetSlug}`)
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}