# docker-compose up -d influxdb grafana
echo "--------------------------------------------------------------------------------------"
echo "Load testing with Grafana dashboard http://localhost:3000/d/k6/k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"
docker-compose run --rm k6 run /scripts/ewoks.js
docker-compose run --rm k6 run /scripts/test2.js
docker-compose run --rm k6 run /scripts/test3.js

