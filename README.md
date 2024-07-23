## Instructions for Building Docker Image & Starting Container

1. Build Docker Image
```
docker build -t react-sandbox-ddrum .
```

2. Run Docker Container
```
docker run -d \
-e REACT_APP_APP_ID_RUM=<application_id> \
-e REACT_APP_CLIENT_TOKEN_RUM=<client_token> \
-e REACT_APP_DD_SITE=datadoghq.com \
-e REACT_APP_VERSION=<rum_version_value> \
-p 3000:3000 \
react-sandbox-ddrum
```
3. Run `docker ps` command to find the name and ID of the container

4. Exec into the container with the following `docker exec -it <container-name-or-id> bash`

5. Run the following command to upload the source maps
```
export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>

datadog-ci sourcemaps upload ./build/static/js \
  --service=react-sandbox-ddrum \
  --release-version=<VERSION_VALUE_FOR_CURRENT_BUILD> \
  --minified-path-prefix=http://localhost:3000/static/js
```

6. To stop the application's container, run the following command: `docker stop <container-name-or-id>`

7. To remove the application's container, run the following command: `docker rm <container-name-or-id>`

8. To delete the Docker image you created, first run `docker images` to find the `IMAGE ID`. Then, run `docker rmi <IMAGE_ID>` to delete the specified image.