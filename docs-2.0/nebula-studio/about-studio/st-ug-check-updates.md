# Check updates

Studio is in development. To get updated with its development, visit GitHub and read its [Changelog](https://github.com/vesoft-inc/nebula-web-docker/blob/master/docs/CHANGELOG-en.md "Click to go to GitHub").

For Docker-based Studio, when you get access to Studio, on the upper-right corner of the page, click the version number and then `New version`, and you will be directed to the Changelog.

![On the upper right corner of the page, click version and then New Version](../figs/st-ug-053.png)

When new version is released, change to the `nebula-web-docker/v2` directory and run this command to update the Docker image and start the service:

```bash
docker-compose pull && docker-compose up -d
```
