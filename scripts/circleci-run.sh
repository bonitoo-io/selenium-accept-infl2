!#/usr/bin/env bash

sleep 30

sudo netstat -tlnp
curl -v --connect-timeout 60 --max-time 60 http://localhost:9999/debug/flush

git clone https://github.com/bonitoo-io/selenium-accept-infl2.git

cd ~/project/selenium-accept-infl2/

npm install 

npm test 

TEST_RESULT=$?

echo TEST_RESULT = $TEST_RESULT

npm run report:junit
npm run report:html

echo "Saving Test Results"

mkdir -p ~/test-results/cucumber
mkdir -p ~/test-results/html
pwd
cp ~/project/selenium-accept-infl2/report/cucumber_junit.xml ~/test-results/cucumber/junit.xml
cp ~/project/selenium-accept-infl2/report/cucumber_report.html ~/test-results/html/cucumber_report.html
cp ~/project/selenium-accept-infl2/report/cucumber_report.json ~/test-results/cucumber/report.cucumber
cp -r ~/project/selenium-accept-infl2/screenshots ~/test-results


exit $TEST_RESULT 

