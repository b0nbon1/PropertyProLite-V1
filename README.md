# PropertyProLite-V1

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/52ce4b21e3c7467bacfa213baec42adf)](https://app.codacy.com/app/b0nbon1/PropertyProLite-V1?utm_source=github.com&utm_medium=referral&utm_content=b0nbon1/PropertyProLite-V1&utm_campaign=Badge_Grade_Dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/403106bcf8900e25d7a7/maintainability)](https://codeclimate.com/github/b0nbon1/PropertyProLite-V1/maintainability) [![Build Status](https://travis-ci.org/b0nbon1/PropertyProLite-V1.svg?branch=develop)](https://travis-ci.org/b0nbon1/PropertyProLite-V1) [![Coverage Status](https://coveralls.io/repos/github/b0nbon1/PropertyProLite-V1/badge.svg?branch=develop)](https://coveralls.io/github/b0nbon1/PropertyProLite-V1?branch=develop)

Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

![Property](https://cdn.lennar.net/images/elevations/26366_eleC_lg.jpg?w=1200&h=650&as=1&d=20170814T093828)

## Table Contents

 1. [Getting Started](#Getting-Started)
 2. [Prerequisites](#Prerequisites)
 3. [Installing the Api](#Installing-api)
 4. [Running Tests](#Running-the-tests)
 5. [API Endpoints](#Api-Endpoints)
 6. [Pivotal Tracker Board](#PIVOTAL-TRACKER-BOARD)
 9. [Contributions](#Contributions)

## Getting Started

By running the following command Property-Pro-Lite-Api will be automatically downloaded to your local machine so lets get started.

```sh
git clone https://github.com/b0nbon1/PropertyProLite-V1
```

## Prerequisites

before you install the software make sure you have the following already installed on your machine

- nodejs get it [here](https://nodejs.org)

## Installing api

A step by step series of examples that tell you how to get a development env running

1. run

```sh
npm install
```

To install all the necessary dependencies packages on your local computer

1. set up environment variables by creating a dotenv file
   - add **PORT** with value of port number
   - add **JWT_KEY** with value of any secret word

2. To start your sever

```sh
npm start
```

## Running the tests

TO run the test for the api

```sh
npm test
```

## Api Endpoints

These are the endpoints for this api :

| Endpoint        | Endpoint                 | Functionality|
| ------------- | --------------------------|------------|
| POST /signup          | `/api/v1/auth/signup`   | User create an account |
| POST  /login       | `/api/v1/auth/login`   | User login to their account |
| POST   /property     | `/api/v1/property`    | Agent post property advert |
| PATCH    /property/<:property-id>     | `/api/v1/property/<:property_id>`| Agent update their property advert |
| PATCH    /property/<:property-id>/sold      | `/api/v1/property/<:property_id>/sold`       |Agent mark their advert as sold |
| DELETE  /property/<:property-id>     | `/api/v1/property/<:property_id>` | Agent delete their advert |
| GET /property |  `/api/v1/property` |get all property adverts|
| GET /properties?type=propertyType | `/api/v1/properties?type=propertyType` | get all property adverts of specific type |
| GET /property/<:property-id>         | `/api/v1/property/<:property_id>` | get a specific advert |
| POST  /property/<:property-id>/report        | `/api/v1/property/<:property_id>/report`      | User report property as Fraud |

## PIVOTAL TRACKER BOARD

Click here to view: [PIVOTAL TRACKER STORIES](https://www.pivotaltracker.com/n/projects/2353886)

## Contributions

[Bonvic Bundi](https://www.bonbo.io.ke)

[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://twitter.com/Bonvic7) [![GitHub followers](https://img.shields.io/github/followers/b0nbon1.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/b0nbon1?tab=followers)
