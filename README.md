# coronavirus-api 😷

It's a simple api that return the amount of: cases, recovered cases, and deaths.
It has a cache time of 15 seconds against https://www.worldometers.info/coronavirus/

https://us-central1-alex-redwood.cloudfunctions.net/coronavirus-api-master

## Deployment
*the branch name is just added as a suffix, eg `./deploy.sh master` results in `coronavirus-api-master`*

But it's really fine if you just gut the script, it isn't a bit deal.

`./deploy.sh <BRANCH_NAME>`

## Testing
`yarn run test`

## Linting
`yarn run lint`

## Further reading.
Just in case you wanted to see a blog post about this that adds no further value.

https://alexredwood.com/blog/Building-a-Coronavirus-COVID19-API_bb8df168-9ac6-44af-8b98-ff26618108bd