# typscript-quickstart

It's a typescript project, with a bunch of configuration - intended to minimize the setup time.

## Sending builds on GCP
Adhoc builds are allowed, and are sometimes quite useful - builds sent manually won't count towards anything.
`gcloud builds submit --config cloudbuild.yaml .`