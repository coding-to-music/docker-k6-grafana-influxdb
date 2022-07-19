# docker-k6-grafana-influxdb

# 🚀 Demonstrates how to run load tests with containerised instances of K6, Grafana and InfluxDB 🚀

https://github.com/coding-to-music/docker-k6-grafana-influxdb

From / By Luke Thompson https://github.com/luketn

https://github.com/luketn/docker-k6-grafana-influxdb

https://medium.com/swlh/beautiful-load-testing-with-k6-and-docker-compose-4454edb3a2e3

https://grafana.com/grafana/dashboards/2587

https://swapi.dev/

## Environment variables:

```java

```

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/docker-k6-grafana-influxdb.git
git push -u origin main
```

# docker-k6-grafana-influxdb

Demonstrates how to run load tests with containerised instances of K6, Grafana and InfluxDB.

#### Article

This is the accompanying source code for the following article. Please read for a detailed breakdown of the code and how K6, Grafana and InfluxDB work together using Docker Compose:

https://medium.com/swlh/beautiful-load-testing-with-k6-and-docker-compose-4454edb3a2e3

#### Dashboards

The dashboard in /dashboards is adapted from the excellent K6 / Grafana dashboard here:
https://grafana.com/grafana/dashboards/2587

There are only two small modifications:

- the data source is configured to use the docker created InfluxDB data source
- the time period is set to now-15m, which I feel is a better view for most tests

#### Scripts

The script here is an example of a low Virtual User (VU) load test of the excellent Star Wars API:
https://swapi.dev/

If you're tinkering with the script, it is just a friendly open source API, be gentle!

# Beautiful Load Testing With K6 and Docker Compose

https://medium.com/swlh/beautiful-load-testing-with-k6-and-docker-compose-4454edb3a2e3

By Luke Thompson
Oct 18, 2020

6 min read

How to run load tests using the awesome combination of Docker Compose, K6, InfluxDB and Grafana.

Something that always makes me smile is the phrase “it worked on my machine”. My machine is, for the most part, a warm and cozy place for code to execute. The real world often turns out to be harsher than anticipated.

Load testing is a means of bringing the harsh reality a little closer. Load test often, and early, iterating to improve on the outcome. It will give your code a better chance at success in the real world.

Good visualization of a load test is not just a nice-to-have. It is often the only way to truly understand the underlying issues.

The pairing of K6 for load testing and Grafana for visualization is awesome. It is the best platform I’ve found for running and visualizing load tests. Docker Compose is an awesome technology to bring them together.

You can get started load testing with K6 and Grafana using this starter project:

```java
git clone https://github.com/luketn/docker-k6-grafana-influxdb.git
cd docker-k6-grafana-influxdb
docker-compose up -d influxdb grafana
docker-compose run k6 run /scripts/ewoks.js
```

You can get Docker Compose here if you don’t have it yet.

Open a browser to http://localhost:3000/d/k6/k6-load-testing-results and you’ll have an incredibly clear view of your load test streaming across the page in real-time:

image here

[](https://github.com/coding-to-music/docker-k6-grafana-influxdb/blob/main/images/Z_kHlGlqD_bihPbAyp665Q.png?raw=true)

A Grafana user interface in a browser showing the results of a load test being performed by K6.
Modify the script to suit your own back end and you can be load testing your own services in moments!

## Breaking it Down

image here

K6 is an awesome open-source load testing framework written in Go. It is highly efficient and capable of generating high loads with hundreds of concurrent connections.

K6 can be used independently as a command-line tool to run load tests, or combined with other tools for different visualisations and analysis. Adding InfluxDB and Grafana, K6 gives a very powerful visualisation of the load test as it runs.

Running a load test requires that the InfluxDB and Grafana services are already running in the background. You can use docker-compose ‘up’ command to start them:

```java
docker-compose up -d influxdb grafana
```

The docker images will be downloaded, configured and executed as detached (-d) background processes.

Then you can run docker-compose to perform a K6 run on a load test script:

```java
docker-compose run k6 run /scripts/ewoks.js
```

image here

A command prompt shows the output from running K6 using docker compose.
InfluxDB is a fast time-series database, also written in Go, which is supported by K6 as an output target for realtime monitoring of a test. Whilst K6 is running the load test, it will stream statistics about the run to InfluxDB.

Grafana is a beautiful browser UI for data visualisation, which supports InfluxDB as a data source. Using a live updating set of graphs it will display the details of the run.

Docker is a platform for containers, commonly used by open source projects to publish their software in an easily consumable self-contained system. Docker Compose adds the ability to bundle multiple containers together into complex integrated applications.

I’ve based this example heavily on the K6 documentation and examples here:
https://k6.io/docs/results-visualization/influxdb-+-grafana#using-our-docker-compose-setup

I’ve made a few small adjustments to make it easier to get started.

## Diving Deeper

Here is a deeper dive into all of the configuration files used in this example and what they do:

### docker-compose.yml

```java
version: '3.4'
networks:
  k6:
  grafana:
services:
  influxdb:
    image: influxdb:latest
    networks:
      - k6
      - grafana
    ports:
      - "8086:8086"
    environment:
      - INFLUXDB_DB=k6
grafana:
    image: grafana/grafana:latest
    networks:
      - grafana
    ports:
      - "3000:3000"
    environment:
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_BASIC_ENABLED=false
    volumes:
      - ./dashboards:/var/lib/grafana/dashboards
      - ./grafana-dashboard.yaml:/etc/grafana/provisioning/dashboards/dashboard.yaml
      - ./grafana-datasource.yaml:/etc/grafana/provisioning/datasources/datasource.yaml
k6:
    image: loadimpact/k6:latest
    networks:
      - k6
    ports:
      - "6565:6565"
    environment:
      - K6_OUT=influxdb=http://influxdb:8086/k6
    volumes:
      - ./scripts:/scripts
```

The docker-compose configuration file defines three servers and two networks, combining them together into a solution comprising a visualisation web server, database and load test client:

- Runs Grafana web server for visualisation in the background on port 3000
- Runs InfluxDB database in the background on port 8086
- Runs K6 on an ad-hoc basis to execute a load test script

The external files referenced in the docker-compose file are:

### grafana-datasource.yaml

Configures Grafana to use InfluxDB as a data source, using the hostname configured in docker-compose ‘influxdb’ to connect to the database over the local docker network on port 8086.

### grafana-dashboard.yaml

Configures Grafana to load a K6 dashboard from the /var/lib/grafana/dashboards directory:

```java
apiVersion: 1
providers:
  - name: 'default'
    org_id: 1
    folder: ''
    type: 'file'
    options:
      path: /var/lib/grafana/dashboards
```

Note that the K6 dashboard file dashboards/k6-load-testing-results_rev3.json, the grafana-datasource.yaml and grafana-dashboard.yaml are all mounted into the Grafana docker container using the ‘volumes’ property in docker-compose.yml.

### dashboards/k6-load-testing-results_rev3.json

This is a JSON configuration of a K6/InfluxDB dashboard based on this dashboard from the Grafana community dashboard library:
https://grafana.com/grafana/dashboards/2587

There are only two small modifications:

- The data source is configured to use the docker created InfluxDB data source.
- The time period is set to ‘now-5m’, which I feel is a better view for most tests.
  scripts/ewoks.js

An example K6 script to invoke a remote service. For fun this uses the query for the Ewok Wicket Systri Warrick from the Star Wars API:

The configuration tells K6 to ramp-up to 5 concurrent users over a period of 5 seconds, holds there for 10 seconds and then gradually ramps back down to 0 concurrent users over 5 seconds.

A detailed reference to configuring K6 can be found in their excellent docs:
https://k6.io/docs/

It’s worth noting that although the config and load function are JavaScript based, it is not NodeJS. K6 uses an embedded EcmaScript 5.1 JavaScript engine (a pure Go implementation ‘goja’) to define the test script. Each ‘virtual user’ has a separate instance of the goja engine loaded as its context and runs the exported ‘default’ function continuously for the defined timeframe.

## TIP — Debugging Docker Compose Configuration with a Shell

If you want to play around with the docker-compose configuration settings, it is often helpful to run a shell inside one of the containers. Using the shell you can explore the files and local network to see what effect your changes had.

For example, to check that the InfluxDB network connection is working from inside the K6 container, you can add the following entrypoint and user in the docker-compose.yml:

```java
k6:
    image: loadimpact/k6:latest
    entrypoint: /bin/sh
    user: root
    ...
```

Then enter a shell inside the K6 container like this:

```
docker-compose run k6
```

Once you have a shell you can use utilities like nslookup and curl to check out the local network:

```
/ $ nslookup influxdb
Server:         127.0.0.11
Address:        127.0.0.11:53
Non-authoritative answer:
Non-authoritative answer:
Name:   influxdb
Address: 172.19.0.2
```

Note that the entrypoint used /bin/sh in all three images, but this is a symbolic link to the slightly different shells used in each image. For InfluxDB the shell is dash. For K6 and Grafana the shell is busybox.

## Local Load Testing — What is it good for?

Running load tests locally is great for a finger-in-the-air test. Good for small ad-hoc tests and an approximate measurement of performance at low scale.

It’s not good as a benchmark however, due to the inconsistency of the environment. Limited CPU, disk I/O and memory means contention on resources between the service under test and the load test client.

With that said I think it’s incredibly important to get a sense of how your code performs when executed by many users concurrently. You can start with a load test built locally and then scale it up to a larger load test later on using the same scripts and tools.

Thanks for diving into load testing with Docker Compose, K6, InfluxDB and Grafana with me. I hope you have an awesome experience using these tools and gain as much valuable insight into your code under load as I have. If you give it a try, let me know how you get on!

## References:

K6 documentation: https://k6.io/docs/

K6 documentation —Docker Compose example: https://k6.io/docs/results-visualization/influxdb-+-grafana#using-our-docker-compose-setup

Article source code: https://github.com/luketn/docker-k6-grafana-influxdb

Images are all by the author.
