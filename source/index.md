---
title: API Reference

language_tabs:
  - Example response

toc_footers:
  - <a href='https://api.data.gov/signup'>Sign Up for a Developer Key</a>

search: true
---

# Introduction

NASA has **the best** data.  Way better than NOAA.  Most visitors to nasa.gov websites are looking for images and videos.  The objective of this API is to make NASA data, especially imagery, emminently available.  

# Apply for an API Key

{% raw %}
<div id="apidatagov_signup">Loading signup form...</div>
<script type="text/javascript">
 /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
 var apiUmbrellaSignupOptions = {
   // Pick a short, unique name to identify your site, like 'gsa-auctions'
   // in this example.
   registrationSource: 'nasa-apis',

   // Enter the API key you signed up for and specially configured for this
   // API key signup embed form.
   apiKey: 'EMZRfUZmi9ZMWFd5JqL6fHXHcCe0mXXXk9K5aRd3',

   // Provide an example URL you want to show to users after they signup.
   // This can be any API endpoint on your server, and you can use the
   // special {{api_key}} variable to automatically substitute in the API
   // key the user just signed up for.
   exampleApiUrl: 'https://api.data.gov/nasa/nasa-apis?api_key={{api_key}}&format=JSON'
 };

 /* * * DON'T EDIT BELOW THIS LINE * * */
 (function() {
   var apiUmbrella = document.createElement('script'); apiUmbrella.type = 'text/javascript'; apiUmbrella.async = true;
   apiUmbrella.src = 'https://api.data.gov/static/javascripts/signup_embed.js';
   (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(apiUmbrella);
 })();
</script>
<noscript>Please enable JavaScript to signup for an <a href="http://api.data.gov/">api.data.gov</a> API key.</noscript>
{% endraw %}

# Authentication

You do not need to authenticate in order to explore the NASA data.  However, if you will be intensively using the APIs to, say, support a mobile application, then you should sign up for an [api.data.gov developer key](https://api.data.gov/signup).  

## Web Service Rate Limits

Limits are placed on the number of API requests you may make using your API key. Rate limits may vary by service, but the defaults are:

- Hourly Limit: 1,000 requests per hour

For each API key, these limits are applied across all api.data.gov API requests. Exceeding these limits will lead to your API key being temporarily blocked from making further requests. The block will automatically be lifted by waiting an hour. If you need higher rate limits, contact us.

## DEMO_KEY Rate Limits
In documentation examples, the special DEMO_KEY api key is used. This API key can be used for initially exploring APIs prior to signing up, but it has much lower rate limits, so you're encouraged to signup for your own API key if you plan to use the API (signup is quick and easy). The rate limits for the DEMO_KEY are:

- Hourly Limit: 30 requests per IP address per hour
- Daily Limit: 50 requests per IP address per day

## How Do I See My Current Usage?

Your can check your current rate limit and usage details by inspecting the `X-RateLimit-Limit` and `X-RateLimit-Remaining` HTTP headers that are returned on every API response. For example, if an API has the default hourly limit of 1,000 request, after making 2 requests, you will receive these HTTP headers in the response of the second request.

> HTTP headers on API response

```shell
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 998
```

The hourly counters for your API key reset on a rolling basis.

**Example**: If you made 500 requests at 10:15AM and 500 requests at 10:25AM, your API key would become temporarily blocked. This temporary block of your API key would cease at 11:15AM, at which point you could make 500 requests. At 11:25AM, you could then make another 500 requests.


<aside class="notice">
Anyone can register for an api.data.gov key, which can be used to access data across federal agencies.
</aside>

# Earth

A recent industry [report](https://www.fgdc.gov/ngac/meetings/december-2014/ngac-landsat-economic-value-paper-2014-update.pdf) estimates that total annual value of $2.19 billion, far exceeding the multi-year total cost of building, launching, and managing Landsat satellites and sensors.  The value is derived from consumer *use* of the data.  There is no inherent value in idle data.  The objective of this endpoint is to unlock the significant public investment in earth observation data.  An open, well-documented, and simple API dramatically reduces the transaction costs, which are a significant barrier to engaging with information.  

Currently, we only support the Landsat 8 sensor.  To be explicit, the resource string identifier for supported resources are as follows.  Resources in parentheses indicate planned resources.

- `L8_TOA`
- `(L7_TOA)`

## Imagery

> Example JSON response

```json
{
  "resource": {
    "planet": "earth",
    "dataset": "LC8_L1T_TOA"
  },
  "date": "2015-02-07T03:28:54",
  "cloud_score": 0.056768,
  "url": "http://goo.gl/6sdgCt",
  "id": "LC8_L1T_TOA/LC81270592015038LGN00"
}
```
> Example image at returned URL

> ![](../images/earth.png)


This endpoint retrieves the Landsat 8 image for the supplied location and
date.  The response will include the date and URL to the image that is closest
to the supplied date. The requested resource may not be available for the
*exact* date in the request. The parameters in bold are required, all others
are optional.

### HTTP Request

`GET https://api.data.gov/nasa/planetary/earth/imagery`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
**lat** | **float** | n/a | **Latitude**
**lon** | **float** | n/a | **Longitude**
dim | float | 0.025 | width and height of image in degrees
date | YYYY-MM-DD | ((today)) | date of image; if `None` supplied, then the most recent image is returned
cloud_score | bool | False | calculate the percentage of the image covered by clouds
**api_key** | **string** | DEMO_KEY | **api.data.gov key for expanded usage**

<aside class="notice">
Note that the returned object may not match the supplied date exactly.
</aside>

## Available resources

> Example JSON response

```json

{
  "resource": {
    "dataset": "LC8_L1T_TOA",
    "planet": "earth"
  }, 
  "results": [
    {
      "date": "2015-02-07T03:28:54",
      "id": "LC8_L1T_TOA/LC81270592015038LGN00"
    }, 
    {
      "date": "2015-02-23T03:28:48",
      "id": "LC8_L1T_TOA/LC81270592015054LGN00"
    }
  ], 
  "count": 2
}
```

This endpoint retrieves all dates of NASA earth imagery for the given location
and date range.  The endpoint is helpful to determine available imagery, which
can be queried in a spearate request to the [`imagery`](/#imagery) endpoint.

### HTTP Request

`GET https://api.data.gov/nasa/planetary/earth/assets`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
**lat** | **float** | n/a | **Latitude**
**lon** | **float** | n/a | **Longitude**
**begin** | **YYYY-MM-DD** | n/a | **beginning of date range**
end | YYYY-MM-DD | ((today)) | end of date range
**api_key** | **string** | DEMO_KEY | **api.data.gov key for expanded usage**



# APOD

One of the most popular websites at NASA is the [Astronomy Picture of the Day](http://apod.nasa.gov/apod/astropix.html). In fact, this website is one of the [most popular websites](https://analytics.usa.gov/demo/) across all federal agencies.  This endpoint structures the APOD images so that they can be repurposed for other applications.  In addition, it adds the ability to process the APOD explanation into core concepts using natural language processing and cross-referencing the text with large, online databases.  

> Example JSON response

```json
{
  "concept_tags": true,
  "title": "Interior View",
  "url": "http://apod.nasa.gov/apod/image/1501/15618296264_21bc1e368e_o1024.jpg",
  "explanation": "Some prefer windows, and these are the best available on board the International Space Station. Taken on January 4, this snapshot from inside the station's large, seven-window Cupola module also shows off a workstation for controlling Canadarm2. Used to grapple visiting cargo vehicles and assist astronauts during spacewalks, the robotic arm is just outside the window at the right. The Cupola itself is attached to the Earth-facing or nadir port of the station's Tranquility module, offering dynamic panoramas of our fair planet. Seen from the station's 90 minute long, 400 kilometer high orbit, Earth's bright limb is in view above center.",
  "concepts": [
    "International Space Station",
    "Mir",
    "Extra-vehicular activity",
    "STS-130",
    "Unity",
    "Planet",
    "Window",
    "Earth"
  ],
  "date": 2015-01-23
}
```
> Example image at returned URL

> ![](../images/apod.jpg)


### HTTP Request

`GET http://api.nasa.gov/apod`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
**date** | **YYYY-MM-DD** | today | **The date of the APOD image to retrieve**
concept_tags | bool | False | Return an ordered dictionary of concepts from the APOD explanation
**api_key** | **string** | DEMO_KEY | **api.data.gov key for expanded usage**



# Earth temperature anomalies

[New Scientist](http://www.newscientist.com/) built a highly useful app to [explore global temperature anomalies](http://warmingworld.newscientistapps.com/).  Their app restructures and rides on data from the [NASA Goddard Institute for Space Studies Surface Temperature Analysis](http://data.giss.nasa.gov/gistemp/).  This endpoint resurfaces the data to interact with local information on global warming anomalies through the browser.  Provide an address or a coordinate pair, along with a date range, and watch the local temperature change.  

> Example JSON response

```json
{
  "count": 6, 
  "results": [
    {"anomaly": 0.0575, "year": 2009}, 
    {"anomaly": 0.1285, "year": 2010}, 
    {"anomaly": -0.256, "year": 2011}, 
    {"anomaly": 0.3971, "year": 2012}, 
    {"anomaly": 0.1606, "year": 2013}, 
    {"anomaly": 1.4499, "year": 2014}
  ]
}
```

## Address

### HTTP Request

`GET http://api.nasa.gov/planetary/earth/temperature/address`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
**address** | **string** | n/a | **Address string**
begin | int | 1880 | beginning year for date range, inclusive
end | int | 2014 | end year for date range, inclusive
**api_key** | **string** | DEMO_KEY | **api.data.gov key for expanded usage**

## Coordinates

### HTTP Request

`GET http://api.nasa.gov/planetary/earth/temperature/coords`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
**lat** | **float** | n/a | **Latitude in degrees**
**lon** | **float** | n/a | **Longitude in degrees**
begin | int | 1880 | beginning year for date range, inclusive
end | int | 2014 | end year for date range, inclusive
**api_key** | **string** | DEMO_KEY | **api.data.gov key for expanded usage**


# Patents

The NASA patent portfolio is available to benefit US citizens. Through partnerships and licensing agreements with industry, these patents ensure that NASA's investments in pioneering research find secondary uses that benefit the economy, create jobs, and improve quality of life.  This endpoint provides structured, searchable developer access to NASA's patents.

**Acceptable patent categories**

- materials_and_coatings
- sensors
- aeronautics
- health_medicine_biotechnology
- information_technology_software
- robotics_automation_control
- mechanical_fluid_systems
- electrical_electronics
- instrumentation
- optics
- power_generation_storage
- propulsion
- communications
- manufacturing
- environment

> Example JSON response

```json
{
  "count": 106,
  "results": [
    {
      "patent_number": "7767270", 
      "id": "patent_ARC-14661-3", 
      "abstract": "Method and system for functionalizing ...", 
      "serial_number": "11/387,503", 
      "contact": {
        "facility": "NASA Ames Research Center", 
        "email": "Trupti.D.Sanghani@nasa.gov", 
        "address": "Mail Stop 202A-3, Moffett Field, CA 94035", 
        "name": "Trupti D. Sanghani", 
        "office": "Technology Partnerships Division"
      }, 
      "expiration_date": "", 
      "concepts": [
        "Ionizing radiation", 
        "Topology", 
        "Gas", 
        "Carbon nanotube", 
        "Temperature", 
        "Carbon", 
        "Metric space", 
        "Fundamental physics concepts"
      ], 
      "publication": null, 
      "eRelations": [], 
      "category": "materials and coatings", 
      "innovator": [
        {
          "company": "SETI Institute", 
          "mname": "N.", 
          "lname": "Khare", 
          "fname": "Bishun", 
          "order": "1"
        }
      ], 
      "reference_number": "ARC-14661-3", 
      "_id": "53f65b3d5904da2c9fc3008f", 
      "client_record_id": "patent_ARC-14661-3", 
      "title": "Selective functionalization ...", 
      "trl": "3 - Proof-of-concept", 
      "center": "ARC"},
    ...
  ]
}
```


### HTTP Request

`GET http://api.nasa.gov/patents`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
**category** | **string** | n/a | **Patent category**
query | string | None | Search text to filter results
concept_tags | bool | False | Return an ordered dictionary of concepts from the patent abstract
**api_key** | **string** | DEMO_KEY | **api.data.gov key for expanded usage**

<aside class="notice">
The patent category must be from the acceptable category list or no results will be returned.
</aside>

