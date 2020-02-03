
# This repo has been forked and current version lives at https://github.com/BNHM/AmphibiaWebDiseasePortal

# Amphibian Disease Portal

New portal design built in Hugo and Javascript with GEOME backend.  To view that status of development, goto:

Master Branch URL: https://determined-lalande-d0e5a6.netlify.com/

Develop Branch URL: https://cranky-mcclintock-ba9f91.netlify.com/



Note... all commits to the master branch on this github page will updated netlify at the above mentioned URL.

# Developers

You can update content in 3 general areas:

 * To customize text content on pages goto the ```content``` folder and update the relevant markdown files. This section contains markdown
 * To customize and create javascript functions goto static/js/{file}.js   This section contains javascript.
 * To customize the behaviour of pages, update content in themes/kube/layouts/{section title}/single.html . This section contains mainly go syntax

# Running locally
if you have hugo installed you should be able to just type the following at the root directory:

```
hugo server
```
