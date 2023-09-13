# Package management

NebulaGraph Dashboard Enterprise Edition supports managing NebulaGraph installation packages, such as downloading the community edition installation packages or manually uploading the installation packages.

## Precautions

- Only the admin user can manage the installation package.

- Do not support downloading enterprise edition installation packages. For downloading Enterprise Edition packages, please [contact us](https://www.nebula-graph.io/contact).

## Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **System Settings**.
2. On the left-side navigation bar of the page, click **Package Management**.

## Steps

### View packages

<img src="https://docs-cdn.nebula-graph.com.cn/figures/eo_dash_package_230913_en.png" width="1000" alt="A screenshot that shows the installation packages of core">

The list of existing installation packages are displayed on the right-side, showing the package name, version, size, and created time.

Users can filter packages through the search box in the upper right corner.

### Download packages

1. Click **Download Package**, select the installation package you want to download. The description are as follows:

  !!! note

        If you download an existing installation package, the system will prompt you to overwrite the existing installation package.

  - Version: Supports stable versions later than v2.5. It is recommended to use the latest version.
  - Platform: Supports CentOS 7/8 and Ubuntu 1604/1804/2004.
  - Package Type: Supports RPM, DEB and tar.gz.

4. Click **Download**.

Users can view the download task information in [task center](../10.tasks.md), the task type is `package download`. If the task status is `success`, users can return to the **Package Management** page to view the newly downloaded installation package.

### Upload packages

If the required installation package is not listed in the downloaded list, users can manually upload installation packages, such as upload an enterprise edition installation package.

Click **Upload Package**, select the local installation package you want to upload. The package type can be RPM, DEB, or tar.gz. View the upload progress on the upper of the page and wait until the upload is complete.

Users can view the upload task information in [task center](../10.tasks.md), the task type is `package upload`. If the task status is `success`, users can return to the **Package Management** page to view the newly uploaded installation package.

### Delete packages

In the operation column of the target installation package, click **Delete** and confirm.

## FAQ

### How to resolve the error `Request Entity Too Large`?

If users use Nginx as the reverse proxy, the default limit for uploaded files is 1 MB. Add `client_max_body_size 200m;` to the `http{}` section of `nginx.conf`, that means the file of up to 200 MB is allowed to be uploaded.
