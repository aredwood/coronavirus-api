#!/bin/bash

RAW_BRANCH=$1

BRANCH=$(echo $RAW_BRANCH | tr "/" "-")

NAME="coronavirus-api-$BRANCH"
REGION="us-central1"
ENTRY_POINT="default"
RUNTIME="nodejs10"

gcloud functions deploy $NAME \
    --region $REGION \
    --allow-unauthenticated \
    --entry-point $ENTRY_POINT \
    --runtime $RUNTIME \
    --memory 128MB \
    --trigger-http