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
echo "1) In " ${HOME_DIR}
echo "   Checkout a local patch branch: $ git checkout influxdata/patch"
echo ""
echo "2) Apply the patch"
echo "   HINT $ git apply --reject etc/influxdb-e2e/"${CURRENT_HASH}".patch"
echo ""
echo "3) [!!! IMPORTANT !!!] Then updated last line of sync.last to "
echo     ${CURRENT_HASH}
echo ""
echo "4) If the patch applied successfully merge the patch branch, including"
echo "        change sync.last, into your working branch"
echo ""
echo "[NOTE] To apply to only 1 file:  git apply --include=path/to/file <PATCH> "
echo ""
echo "[NOTE] To revert patch:  git apply -R <patch>"

