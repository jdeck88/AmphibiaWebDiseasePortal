
Master Branch Status: [![Netlify Status](https://api.netlify.com/api/v1/badges/23d9985e-54ca-4f1e-9acb-72998d516f11/deploy-status)](https://app.netlify.com/sites/amphibiandiseaseportal/deploys)


Develop Branch Status: 

# Amphibian Disease Portal

New portal design built in Hugo and Javascript with GEOME backend.  To view that status of development, goto:

Master Branch URL: https://amphibiandiseaseportal.netlify.com/

Develop Branch URL: 



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
