# coronavirus-api

It's a simple api that return the amount of: cases, recovered cases, and deaths.
It has a cache time of 15 seconds against https://www.worldometers.info/coronavirus/

https://us-central1-alex-redwood.cloudfunctions.net/coronavirus-api-master

## Deployment
*the branch name is just added as a suffix, eg `./deploy.sh master` results in `coronavirus-api-master`*
./deploy.sh <BRANCH_NAME>

But it's really fine if you just gut the script, it isn't a bit deal.

## Testing
`yarn run test`

## Linting
`yarn run lint`

