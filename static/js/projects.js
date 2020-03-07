
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
                // When the button routes to project ID ONLY ONCE LOL
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
  //Is there a way to dynamically build the query string here to get projects by projectid??
  fetch(baseURL)
  .then((res) => {
    return (res.json())
  })
  .then((body) => {
    for (let i = 0; i < body.length; i++) {
        let obj = body[i]
        
        if(obj.projectConfiguration.id == 45 && obj.public == true) {
          //console.log(obj.projectId)
          id = obj.projectId
        }
    }
})

let detail = document.getElementById('project-detail')
let tr = document.createElement('tr')

console.log(`fetchById function: ${id}`)
tr.innerHTML = `<td>${id}</td>`
return detail.appendChild(tr)
}



// Fetches all public projects and displays them in a table.
function fetchProjects() {
  let projectId = getUrlVars().id

  
  if (projectId === undefined) { 
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
                <td><button class="detailsBtn" data-id='${project.projectId}' 
                    id='project${project.projectId}'
                    >Details</button></td>
                `
              table.appendChild(tr)
              document.getElementById(`project${project.projectId}`).addEventListener('click', function() {
                //let targetId = this.dataset.id
                console.log(`This dataset: ${project.projectId}`)
                //fetchById(targetId)
              })
      }
    })
  })
  .catch(function(err) {
    console.log(err)
  })
  }else {

    // INSERT YOUR PROJECT FETCHING CODE HERE
    console.log("go fetch my own project at " + projectId)
  }
}


function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}
/*function detailsButton() {
const btns = document.getElementsByTagName('button')

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {
    let targetId = this.dataset.id
    console.log(`This dataset: ${targetId}`)
    fetchById(targetId)
  })
}
}*/

//   function getSlug() {
//     // let query = window.location.search;
//   // let qs = parse_query_string(query);
//   // console.log(`Console log for the query variable: ${query}`)

//   // const queryStr = document.location.search.substring(1)
//   // const usp = new URLSearchParams(queryStr)
//   // let targetSlug = usp.toString()

//   //console.log(`This is the variable targetSlug: ${targetSlug}`)
// }

// function parse_query_string(query) {
//   var vars = query.split("&");
//   var query_string = {};
//   for (var i = 0; i < vars.length; i++) {
//     var pair = vars[i].split("=");
//     var key = decodeURIComponent(pair[0]);
//     var value = decodeURIComponent(pair[1]);
//     // If first entry with this name
//     if (typeof query_string[key] === "undefined") {
//       query_string[key] = decodeURIComponent(value);
//       // If second entry with this name
//     } else if (typeof query_string[key] === "string") {
//       var arr = [query_string[key], decodeURIComponent(value)];
//       query_string[key] = arr;
//       // If third or later entry with this name
//     } else {
//       query_string[key].push(decodeURIComponent(value));
//     }
//   }
//   return query_string;
// }