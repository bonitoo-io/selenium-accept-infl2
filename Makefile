.PHONY: docker-build docker-prep docker-test docker-test-kill docker-report test clean

RUNCMD ?= cucumber-js --tags 'not @tested and not @error-collateral'

docker-build:
	docker build -t bonitoo-tests -f scripts/Dockerfile.bonitoo .

docker-prep:
	mkdir -p /tmp/report \
  && docker pull quay.io/influxdb/influx:nightly
	docker run -d --rm --name=test-influxdb quay.io/influxdb/influx:nightly influxd --e2e-testing=true \
	&& sleep 30s

docker-test: docker-build
	docker run --rm --name=test-bonitoo -v /tmp/report:/selenium-accept-infl2/report --network=container:test-influxdb bonitoo-tests ${RUNCMD}

docker-report:
	docker run --rm -t --name=test-bonitoo -v /tmp/report:/selenium-accept-infl2/report bonitoo-tests npm run report:html

docker-test-kill:
	docker rm -f test-bonitoo

test: docker-test docker-report

clean:
	docker rm -f test-influxdb
	rm -rf /tmp/report
