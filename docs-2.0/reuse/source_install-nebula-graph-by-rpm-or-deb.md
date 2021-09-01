RPM and DEB are common package formats on Linux systems. This topic shows how to quickly install Nebula Graph with the RPM or DEB package.

## Prerequisites

Prepare the right [resources](../1.resource-preparations.md).

!!! note

    The console is not complied or packaged with Nebula Graph server binaries. You can install [nebula-console](https://github.com/vesoft-inc/nebula-console) by yourself.

## Download the package from cloud service

* Download the released version.

    URL: 

    ```bash
    //Centos 6 
    https://oss-cdn.nebula-graph.io/package/<release_version>/nebula-graph-<release_version>.el6.x86_64.rpm

    //Centos 7
    https://oss-cdn.nebula-graph.io/package/<release_version>/nebula-graph-<release_version>.el7.x86_64.rpm

    //Centos 8
    https://oss-cdn.nebula-graph.io/package/<release_version>/nebula-graph-<release_version>.el8.x86_64.rpm

    //Ubuntu 1604
    https://oss-cdn.nebula-graph.io/package/<release_version>/nebula-graph-<release_version>.ubuntu1604.amd64.deb

    //Ubuntu 1804
    https://oss-cdn.nebula-graph.io/package/<release_version>/nebula-graph-<release_version>.ubuntu1804.amd64.deb

    //Ubuntu 2004
    https://oss-cdn.nebula-graph.io/package/<release_version>/nebula-graph-<release_version>.ubuntu2004.amd64.deb
    ```

    For example, download release package `2.0.0` for `Centos 7.5`: 

    ```bash
    wget https://oss-cdn.nebula-graph.io/package/2.0.0/nebula-graph-2.0.0.el7.x86_64.rpm
    wget https://oss-cdn.nebula-graph.io/package/2.0.0/nebula-graph-2.0.0.el7.x86_64.rpm.sha256sum.txt
    ```

    download release package `2.0.0` for `Ubuntu 1804`: 

    ```bash
    wget https://oss-cdn.nebula-graph.io/package/2.0.0/nebula-graph-2.0.0.ubuntu1804.amd64.deb
    wget https://oss-cdn.nebula-graph.io/package/2.0.0/nebula-graph-2.0.0.ubuntu1804.amd64.deb.sha256sum.txt
    ```

* Download the nightly version.

  !!! danger

        Nightly versions are usually used to test new features. Don't use it for production.

    URL: 

    ```bash
    //Centos 6 
    https://oss-cdn.nebula-graph.io/package/v2-nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.el6.x86_64.rpm

    //Centos 7
    https://oss-cdn.nebula-graph.io/package/v2-nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.el7.x86_64.rpm

    //Centos 8
    https://oss-cdn.nebula-graph.io/package/v2-nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.el8.x86_64.rpm

    //Ubuntu 1604
    https://oss-cdn.nebula-graph.io/package/v2-nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.ubuntu1604.amd64.deb

    //Ubuntu 1804
    https://oss-cdn.nebula-graph.io/package/v2-nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.ubuntu1804.amd64.deb

    //Ubuntu 2004
    https://oss-cdn.nebula-graph.io/package/v2-nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.ubuntu2004.amd64.deb
    ```

    For example, download the `Centos 7.5` package developed and built in `2021.03.28`: 

    ```bash
    wget https://oss-cdn.nebula-graph.io/package/v2-nightly/2021.03.28/nebula-graph-2021.03.28-nightly.el7.x86_64.rpm
    wget https://oss-cdn.nebula-graph.io/package/v2-nightly/2021.03.28/nebula-graph-2021.03.28-nightly.el7.x86_64.rpm.sha256sum.txt
    ```

    For example, download the `Ubuntu 1804` package developed and built in `2021.03.28`: 

    ```bash
    wget https://oss-cdn.nebula-graph.io/package/v2-nightly/2021.03.28/nebula-graph-2021.03.28-nightly.ubuntu1804.amd64.deb
    wget https://oss-cdn.nebula-graph.io/package/v2-nightly/2021.03.28/nebula-graph-2021.03.28-nightly.ubuntu1804.amd64.deb.sha256sum.txt
    ```

## Download the package from GitHub

* Download the release version.
  
    + On the [Nebula Graph Releases](https://github.com/vesoft-inc/nebula-graph/releases) page, find the required version and click **Assets**.
    ![Select a Nebula Graph release version](https://github.com/vesoft-inc/nebula-docs/blob/master/docs-2.0/figs/4.deployment-and-installation/2.complie-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb/releases-page.png?raw=true)

    + In the **Assets** area, click the package to download it.

* Download the nightly version.

  !!! danger

        Nightly versions are usually used to test new features. Don't use it for production.

    + On the [Nebula Graph package](https://github.com/vesoft-inc/nebula/actions/workflows/package.yaml) page, click the latest package on the top of the package list.
    ![Select a Nebula Graph nightly version](https://github.com/vesoft-inc/nebula-docs/blob/master/docs-2.0/figs/4.deployment-and-installation/2.complie-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb/nightly-page.png?raw=true)

    + In the **Artifacts** area, click the package to download it.

## Install Nebula Graph

* Use the following syntax to install with an RPM package.

    ```bash
    sudo rpm -ivh --prefix=<installation_path> <package_name>
    ```

* Use the following syntax to install with a DEB package.

    ```bash
    sudo dpkg -i --instdir==<installation_path> <package_name>
    ```

  !!! note

        The default installation path is `/usr/local/nebula/`.
