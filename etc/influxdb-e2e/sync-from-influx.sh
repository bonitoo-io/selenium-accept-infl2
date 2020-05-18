#!/usr/bin/env bash

INFLUXDB_TEMP=/tmp/influxdb
SOURCE="${BASH_SOURCE[0]}"
SOURCE_DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
HOME_DIR="${SOURCE_DIR}/../.."
LAST_SYNC_HASH=$(tail -1 ${SOURCE_DIR}/sync.last)
CURRENT_HASH=$(git rev-parse HEAD)

echo "SOURCE is " ${SOURCE}
echo "LAST_SYNC_HASH #"${LAST_SYNC_HASH}"#"

if [ -d "$INFLUXDB_TEMP" ]; then rm -Rf $INFLUXDB_TEMP; fi

mkdir $INFLUXDB_TEMP || { echo 'failed to create ' ${INFLUXDB_TEMP} ; exit 1; }

cd $INFLUXDB_TEMP || { echo 'failed to change to ' ${INFLUXDB_TEMP} ; exit 1; }

git init
git remote add -f origin git@github.com:influxdata/influxdb.git
git config core.sparseCheckout true
echo "e2e/" >> .git/info/sparse-checkout
git pull origin master
#git diff 9ed4770700bbc75269967c1d8e6de308028d9eb7  e2e
CHECK=$(git --no-pager diff ${LAST_SYNC_HASH} e2e)
#echo "#"${CHECK}"#"
if [[ -z $CHECK ]];
then
   echo "No Change detected from " ${LAST_SYNC_HASH}
   echo "Exiting without patching"
   exit 0
fi

echo "Patching from " ${LAST_SYNC_HASH} " To " ${CURRENT_HASH}

git diff ${LAST_SYNC_HASH} e2e > ${SOURCE_DIR}/${CURRENT_HASH}.patch

# Remove directory e2e from patch

sed -i 's/a\/e2e\//a\//g' ${SOURCE_DIR}/${CURRENT_HASH}.patch
sed -i 's/b\/e2e\//b\//g' ${SOURCE_DIR}/${CURRENT_HASH}.patch

cd ${HOME_DIR}

echo "THIS SCRIPT IS NOT FINISHED"
echo "TODO - Patch not applied. APPLY PATCH: "
echo ${SOURCE_DIR}/${CURRENT_HASH}.patch
echo "MANUALLY"
echo ""
echo "HINT git apply etc/influxdb-e2e/59af36331b38637bbc89b2cea800b8866284bf95.patch"
echo ""
echo "Then updated last line of sync.last to " ${CURRENT_HASH}
echo ""
echo "[NOTE] To apply to only 1 file:  git apply --include=path/to/file <PATCH> "
echo ""
echo "[NOTE] To revert patch:  git apply -R <patch>"
echo ""

