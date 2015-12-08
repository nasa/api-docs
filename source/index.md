---
title: API Reference

toc_footers:
  - <a href='https://api.data.gov/signup'>Sign Up for a Developer Key</a>

search: true
---

# Introduction

NASA has **the best** data.  Way better than NOAA.  Most visitors to [nasa.gov](https://www.nasa.gov) websites are looking for images and videos.  The objective of this API is to make NASA data, especially imagery, eminently accessible to application developers.  The [api.nasa.gov] index is growing.  These endpoints are just a sample of the endpoints that will soon be available.  Stay tuned.  In the meantime, if you have any suggestions (either about the APIs or documentation) please submit an issue at the [open repository for this documentation site](https://github.com/nasa/api-docs).

# Apply for an API Key

# Authentication

**You do not need to authenticate** in order to explore the NASA data.  However, if you will be intensively using the APIs to, say, support a mobile application, then you should sign up for an [api.data.gov developer key](https://api.data.gov/signup).  

## Web Service Rate Limits

Limits are placed on the number of API requests you may make using your API key. Rate limits may vary by service, but the defaults are:

- Hourly Limit: 1,000 requests per hour

For each API key, these limits are applied across all api.data.gov API requests. Exceeding these limits will lead to your API key being temporarily blocked from making further requests. The block will automatically be lifted by waiting an hour. If you need higher rate limits, contact us.

## DEMO_KEY Rate Limits
In documentation examples, the special DEMO_KEY api key is used. This API key can be used for initially exploring APIs prior to signing up, but it has much lower rate limits, so you're encouraged to signup for your own API key if you plan to use the API (signup is quick and easy). The rate limits for the DEMO_KEY are:

- Hourly Limit: 30 requests per IP address per hour
- Daily Limit: 50 requests per IP address per day

## How Do I See My Current Usage?

Your can check your current rate limit and usage details by inspecting the `X-RateLimit-Limit` and `X-RateLimit-Remaining` HTTP headers that are returned on every API response. For example, if an API has the default hourly limit of 1,000 request, after making 2 requests, you will receive this HTTP header in the response of the second request:

`X-RateLimit-Remaining: 998`

The hourly counters for your API key reset on a rolling basis.

**Example**: If you made 500 requests at 10:15AM and 500 requests at 10:25AM, your API key would become temporarily blocked. This temporary block of your API key would cease at 11:15AM, at which point you could make 500 requests. At 11:25AM, you could then make another 500 requests.


<aside class="success">
Anyone can register for an api.data.gov key, which can be used to access data across federal agencies.
</aside>

# Earth

A recent industry [report](https://www.fgdc.gov/ngac/meetings/december-2014/ngac-landsat-economic-value-paper-2014-update.pdf) estimates that total annual value of $2.19 billion, far exceeding the multi-year total cost of building, launching, and managing Landsat satellites and sensors.  The value is derived from consumer *use* of the data.  There is no inherent value in idle data.  The objective of this endpoint is to unlock the significant public investment in earth observation data.  This open and documented API should dramatically reduce the transaction costs to engage with the imagery.The API is powered by Google Earth Engine, and currently only supports pan-sharpened Landsat 8 imagery. 

**Example image:**

![](../images/earth.png)

Imagine the possibilities associated with this imagery, like [monitoring deforestation at 15-meter resolution](https://www.globalforestwatch.org) or assessing the damage from natural disasters.  If you discover any cool applications, [please let us know](mailto:daniel.s.hammer@nasa.gov) so that we can showcase them on [open.nasa.gov](https://open.nasa.gov).  

## Imagery

This endpoint retrieves the Landsat 8 image for the supplied location and
date.  The response will include the date and URL to the image that is closest to the supplied date. The requested resource may not be available for the *exact* date in the request. You can retrieve a list of available resources through the [assets endpoint](/#assets).

The cloud score is an optional calculation that returns the percentage of the queried image that is covered by clouds.  If `False` is supplied to the `cloud_score` parameter, then no keypair is returned.  If `True` is supplied, then a keypair will always be returned, even if the backend algorithm is not able to calculate a score. Note that this is a rough calculation, mainly used to filter out exceedingly cloudy images.  

### HTTP Request

`GET https://api.data.gov/nasa/planetary/earth/imagery`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
lat | float | n/a | Latitude
lon | float | n/a | Longitude
dim | float | 0.025 | width and height of image in degrees
date | YYYY-MM-DD | *today* | date of image; if not supplied, then the most recent image (i.e., closest to today) is returned
cloud_score | bool | False | calculate the percentage of the image covered by clouds
api_key | string | DEMO_KEY | api.data.gov key for expanded usage

### Example query
[`https://api.data.gov/nasa/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&cloud_score=True&api_key=DEMO_KEY`](https://api.data.gov/nasa/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&cloud_score=True&api_key=DEMO_KEY)

<aside class="notice">
Note that the returned object may not match the supplied date exactly.  Instead, the image closest to the supplied date is returned.
</aside>

## Assets

Hey, Charlie, when was the last time a NASA image was taken of my house?  This endpoint retrieves the date-times and asset names for available imagery for a supplied location. The satellite passes over each point on earth roughly once every sixteen days.  [This is an amazing visualization](http://earthobservatory.nasa.gov/Features/LandsatBigData/) of the acquisition pattern for Landsat 8 imagery. The objective of this endpoint is primarily to support the use of the [imagery endpoint](/#imagery).

### HTTP Request

`GET https://api.data.gov/nasa/planetary/earth/assets`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
lat | float | n/a | Latitude
lon | float | n/a | Longitude
begin | YYYY-MM-DD | n/a | beginning of date range
end | YYYY-MM-DD | *today* | end of date range
api_key | string | DEMO_KEY | api.data.gov key for expanded usage

### Example query
[`https://api.data.gov/nasa/planetary/earth/assets?lon=100.75&lat=1.5&begin=2014-02-01&api_key=DEMO_KEY`](https://api.data.gov/nasa/planetary/earth/assets?lon=100.75&lat=1.5&begin=2014-02-01&api_key=DEMO_KEY)


# APOD

One of the most popular websites at NASA is the [Astronomy Picture of the Day](http://apod.nasa.gov/apod/astropix.html). In fact, this website is one of the [most popular websites](https://analytics.usa.gov/demo/) across all federal agencies.  It has the popular appeal of a Justin Bieber video.  This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other applications.  In addition, if the `concept_tags` parameter is set to `True`, then keywords derived from the image explanation are returned.  These keywords could be used as auto-generated hashtags for twitter or instagram feeds; but generally help with discoverability of relevant imagery.

**Example image:**

![](../images/apod.jpg)

### HTTP Request

`GET https://api.data.gov/nasa/planetary/apod`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
date | YYYY-MM-DD | *today* | The date of the APOD image to retrieve
concept_tags | bool | False | Return an ordered dictionary of concepts from the APOD explanation
api_key | string | DEMO_KEY | api.data.gov key for expanded usage

### Example query
[`https://api.data.gov/nasa/planetary/apod?concept_tags=True&api_key=DEMO_KEY`](https://api.data.gov/nasa/planetary/apod?concept_tags=True&api_key=DEMO_KEY)

# Earth temperature anomalies

There is no doubt that, on average, the earth is warming.  However, the warming is spatially heterogenous.  How much warmer (or cooler) is your hometown?  This endpoint reports local temperature anomalies from the [Goddard Institute for Space Studies Surface Temperature Analysis](http://data.giss.nasa.gov/gistemp/) via the [New Scientist](http://www.newscientist.com/) web application to [explore global temperature anomalies](http://warmingworld.newscientistapps.com/).  This endpoint restructures the query and response to correspond to other APIs on api.nasa.gov.  The developer supplies a location and date range, and the returned object is a list of dictionaries that is ready for visualization in the [d3 framework](http://d3js.org/).

## Address

The location can be specified as an address string.

### HTTP Request

`GET https://api.data.gov/nasa/planetary/earth/temperature/address`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
text | string | n/a | Address string
begin | int | 1880 | beginning year for date range, inclusive
end | int | 2014 | end year for date range, inclusive
api_key | string | DEMO_KEY | api.data.gov key for expanded usage

### Example query
[`https://api.data.gov/nasa/planetary/earth/temperature/address?text=1800 F Street, NW, Washington DC&begin=1990`](https://api.data.gov/nasa/planetary/earth/temperature/address?text=1800 F Street, NW, Washington DC&begin=1990&api_key=DEMO_KEY)

## Coordinates

Alternatively, you can supply the precise latitude and longitude as the location.

### HTTP Request

`GET https://api.data.gov/planetary/earth/temperature/coords`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
lat | float | n/a | Latitude
lon | float | n/a | Longitude
begin | int | 1880 | beginning year for date range, inclusive
end | int | 2014 | end year for date range, inclusive
api_key | string | DEMO_KEY | api.data.gov key for expanded usage

### Example query
[`https://api.data.gov/nasa/planetary/earth/temperature/coords?lat=100.3&lon=1.6&begin=1990&end=2005&api_key=DEMO_KEY`](https://api.data.gov/nasa/planetary/earth/temperature/coords?lat=100.3&lon=1.6&begin=1990&end=2005&api_key=DEMO_KEY)

# Patents

The NASA patent portfolio is available to benefit US citizens. Through partnerships and licensing agreements with industry, these patents ensure that NASA's investments in pioneering research find secondary uses that benefit the economy, create jobs, and improve quality of life.  This endpoint provides structured, searchable developer access to NASA's patents that have been curated to support technology transfer.

### HTTP Request

`GET https://api.data.gov/patents`

### Query Parameters

Parameter | Type | Default | Description
--------- | --------- | ------- | -----------
query | string | None | Search text to filter results
concept_tags | bool | False | Return an ordered dictionary of concepts from the patent abstract
limit | int | *all* | number of patents to return
api_key | string | DEMO_KEY | api.data.gov key for expanded usage

### Example query
[`https://api.data.gov/nasa/patents/content?query=temperature&limit=5&api_key=DEMO_KEY`](https://api.data.gov/nasa/patents/content?query=temperature&limit=5&api_key=DEMO_KEY)

