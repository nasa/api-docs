---
title: API Reference

language_tabs:
  - Example response

toc_footers:
  - <a href='https://api.data.gov/signup'>Sign Up for a Developer Key</a>

includes:
  - errors

search: true
---

# Introduction

NASA has **the best** data.  Way better than NOAA.  Most visitors to nasa.gov websites are looking for images and videos.  The objective of this API is to make NASA data, especially imagery, emminently available.  

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

> The JSON response is structured.

```json
{
  "date": "2014-07-01T09:01:36.000",
  "url": "goog.le/img.html"
}
```

This endpoint retrieves the link to the the image at the supplied location, date, and resource.

### HTTP Request

`GET http://api.nasa.gov/earth/imagery`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
date | current | date of imagery to extract
resource | L8_TOA | resource indicators
lat | None | Latitude
lon | None | Longitude

## Available resources

> The JSON response is structured.

```json
[
  {
    "date": "2014-07-01T09:01:36.000",
    "resource": "Landsat8"
  },
  {
    "date": "2014-07-15T15:46:12.000",
    "resource": "Landsat8"
  },
  {
    "date": "2014-08-01T08:23:32.000",
    "resource": "Landsat8"
  }
]
```

This endpoint retrieves all dates of NASA earth imagery for the given resource and location.  Currently, the only 

### HTTP Request

`GET http://api.nasa.gov/earth/dates`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
resource | L8_TOA | The resource string
lat | None | Latitude
lon | None | Longitude

<!-- <aside class="success">
  The first r
</aside>
 -->
## Get a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get(2)
```

```shell
curl "http://example.com/api/kittens/3"
  -H "Authorization: meowmeowmeow"
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Isis",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">If you're not using an administrator API key, note that some kittens will return 403 Forbidden if they are hidden for admins only.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the cat to retrieve

