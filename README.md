# api-docs: gh-pages

### nasa/api-docs repository contains the front-end for http://api.nasa.gov/. This site is currently CNAME mapped to NASA domain, but in the event the page is down, you can access it through Github Pages here: http://nasa.github.io/api-docs/ .

This is the current iteration of api.nasa.gov.

This project contains API listings of available NASA public APIs and well as a GSA API key form to allow NASA branded API pages to be integrated with the GSA api.data.gov system. Our listing is currently **incomplete** as we are currently displaying the more simple API's in our .json storage system.

For other US government agency API pages, see https://api.data.gov/

## Features

* Obtain an API key by filling out the form in the **Generate API Key** Section
* Information about the usage capabilities of your API in the **Authentication** Section
* A list of a few NASA publics API's and how to use them in the **Browse APIs** Section


## Libraries and Software

api.nasa.gov utilizes the following libraries and resources:

* NASA Web Design Service(CSS and JS): A style system created in order to help NASA websites have a more unified look. You can find their info here https://nasa.github.io/nasawds-site/
* JQuery (JS): A library that simplifies the javascript coding process

The API information that our site hosts is currently archived in our *apis.json* folder which is then read and generated into the page dynamically.

## NOTICE: NASA does not host/develop these APIs
We only map the orginal developer's endpoint to one of our api.nasa.gov endpoints. Basically, api.nasa.gov acts as a passthrough service. Please do not contact us with technical questions about a particular API as <b> we do not have access to most API production environments</b>. You can follow links on our site to get more information about each API and use the contact information on those pages to reach the people who control each API.

### If you are a NASA civil servant or contractor and wish to add an API to api.nasa.gov, please contact <a href="mailto.nasa-data@lists.arc.nasa.gov">nasa-data@lists.arc.nasa.gov</a>. 
#### If you are behind the NASA firewall, you can find additional details on https://developer.nasa.gov/pages/OpenInnovation/Table_of_Contents_Public/2021/05/14/API-NASA-GOV.html

**Site Developer**: Jenna Horn, Justin Gosses

**NASA Official**: <a href="mailto:&#116;&#114;&#097;&#118;&#105;&#115;&#046;&#107;&#097;&#110;&#116;&#122;&#064;&#110;&#097;&#115;&#097;&#046;&#103;&#111;&#118;">R Travis Kantz</a>

Last updated: 08/24/2022
