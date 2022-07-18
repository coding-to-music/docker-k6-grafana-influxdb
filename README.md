# docker-k6-grafana-influxdb

# 🚀 Demonstrates how to run load tests with containerised instances of K6, Grafana and InfluxDB 🚀

https://github.com/coding-to-music/docker-k6-grafana-influxdb

From / By Luke Thompson https://github.com/luketn

https://github.com/luketn/docker-k6-grafana-influxdb

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
