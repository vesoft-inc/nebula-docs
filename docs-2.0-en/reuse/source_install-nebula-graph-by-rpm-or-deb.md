RPM and DEB are common package formats on Linux systems. This topic shows how to quickly install NebulaGraph with the RPM or DEB package.

!!! note

    The console is not complied or packaged with NebulaGraph server binaries. You can install [nebula-console](https://github.com/vesoft-inc/nebula-console) by yourself.

## Prerequisites

- The tool `wget` is installed.

## Step 1: Download the package from cloud service

!!! note

    NebulaGraph is currently only supported for installation on Linux systems, and only CentOS 7.x, CentOS 8.x, Ubuntu 16.04, Ubuntu 18.04, and Ubuntu 20.04 operating systems are supported. 

* Download the released version.

    URL:

    ```bash
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

    For example, download the release package `{{ nebula.release }}` for `Centos 7.5`:

    ```bash
    wget https://oss-cdn.nebula-graph.io/package/{{ nebula.release }}/nebula-graph-{{ nebula.release }}.el7.x86_64.rpm
    wget https://oss-cdn.nebula-graph.io/package/{{ nebula.release }}/nebula-graph-{{ nebula.release }}.el7.x86_64.rpm.sha256sum.txt
    ```

    Download the release package `{{ nebula.release }}` for `Ubuntu 1804`:

    ```bash
    wget https://oss-cdn.nebula-graph.io/package/{{ nebula.release }}/nebula-graph-{{ nebula.release }}.ubuntu1804.amd64.deb
    wget https://oss-cdn.nebula-graph.io/package/{{ nebula.release }}/nebula-graph-{{ nebula.release }}.ubuntu1804.amd64.deb.sha256sum.txt
    ```

* Download the nightly version.

  !!! danger

      - Nightly versions are usually used to test new features. Do not use it in a production environment.
      - Nightly versions may not be built successfully every night. And the names may change from day to day.

    URL:

    ```bash
    //Centos 7
    https://oss-cdn.nebula-graph.io/package/nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.el7.x86_64.rpm

    //Centos 8
    https://oss-cdn.nebula-graph.io/package/nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.el8.x86_64.rpm

    //Ubuntu 1604
    https://oss-cdn.nebula-graph.io/package/nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.ubuntu1604.amd64.deb

    //Ubuntu 1804
    https://oss-cdn.nebula-graph.io/package/nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.ubuntu1804.amd64.deb

    //Ubuntu 2004
    https://oss-cdn.nebula-graph.io/package/nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.ubuntu2004.amd64.deb
    ```

    For example, download the `Centos 7.5` package developed and built in `2021.11.28`:

    ```bash
    wget https://oss-cdn.nebula-graph.io/package/nightly/2021.11.28/nebula-graph-2021.11.28-nightly.el7.x86_64.rpm
    wget https://oss-cdn.nebula-graph.io/package/nightly/2021.11.28/nebula-graph-2021.11.28-nightly.el7.x86_64.rpm.sha256sum.txt
    ```

    For example, download the `Ubuntu 1804` package developed and built in `2021.11.28`:

    ```bash
    wget https://oss-cdn.nebula-graph.io/package/nightly/2021.11.28/nebula-graph-2021.11.28-nightly.ubuntu1804.amd64.deb
    wget https://oss-cdn.nebula-graph.io/package/nightly/2021.11.28/nebula-graph-2021.11.28-nightly.ubuntu1804.amd64.deb.sha256sum.txt
    ```

## Step 2: Install NebulaGraph

* Use the following syntax to install with an RPM package.

  ```bash
  $ sudo rpm -ivh --prefix=<installation_path> <package_name>
  ```

  The option `--prefix` indicates the installation path. The default path is `/usr/local/nebula/`.

  For example, to install an RPM package in the default path for the {{nebula.release}} version, run the following command.

  ```bash
  sudo rpm -ivh nebula-graph-{{nebula.release}}.el7.x86_64.rpm
  ```

* Use the following syntax to install with a DEB package.

  ```bash
  $ sudo dpkg -i <package_name>
  ```

  !!! note
        Customizing the installation path is not supported when installing NebulaGraph with a DEB package. The default installation path is `/usr/local/nebula/`.

  For example, to install a DEB package for the {{nebula.release}} version, run the following command.

  ```bash
  sudo dpkg -i nebula-graph-{{nebula.release}}.ubuntu1804.amd64.deb
  ```

  !!! note

        The default installation path is `/usr/local/nebula/`.

## Next to do

- [Start NebulaGraph](https://docs.nebula-graph.io/{{nebula.release}}/2.quick-start/5.start-stop-service/)  <!--这里用外链。-->

- [Connect to NebulaGraph](https://docs.nebula-graph.io/{{nebula.release}}/2.quick-start/3.connect-to-nebula-graph/)<!--这里用外链。-->
