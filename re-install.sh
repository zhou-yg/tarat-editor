st=`date`

rm pnpm-lock.yaml
rm -rf node_modules/

pnpm i

npm run bootstrap

echo $st
date
