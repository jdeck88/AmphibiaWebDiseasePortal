
Master Branch Status: [![Netlify Status](https://api.netlify.com/api/v1/badges/4d6e2dc9-e154-4aeb-bb74-192ef59f53ba/deploy-status)](https://app.netlify.com/sites/determined-lalande-d0e5a6/deploys)

Develop Branch Status: [![Netlify Status](https://api.netlify.com/api/v1/badges/b570d82d-0aa0-4805-9ad9-5b0d83185922/deploy-status)](https://app.netlify.com/sites/cranky-mcclintock-ba9f91/deploys)

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
