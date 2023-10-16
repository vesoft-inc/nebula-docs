# Inline frame

NebulaGraph Explorer supports inline frame (iframe), which can be used to embed canvases into third-party pages. This topic describes how to embed a canvas.

## Prerequisites

The Explorer has been installed.

## Precautions

- Embedded Explorer pages only access the corresponding graph space by default, so some pages and features are not displayed. For example, the upper navigation bar and some left-navigation-bar features are hidden. If you need to access multiple graph spaces, you can embed them separately on multiple pages.
- Language switching is not supported. The default language is Chinese.

## Steps

1. Modify the configuration file `config/app-config.yaml` in the installation directory of Explorer. The following parameters need to be modified.

  ```bash
  # Uncomment the CertFile and KeyFile parameters.
  CertFile: "./config/NebulaGraphExplorer.crt"
  KeyFile: "./config/NebulaGraphExplorer.key"

  # Modify the value of IframeMode.Enable to true.
  IframeMode:
    Enable: true
  # You can set the URI whitelist of the window. By default, no URI is restricted.
    # Origins:
    #  - "http://192.168.8.8"
  ```

2. Use the command `openssl` in the directory `config` to generate a self-signed certificate. The following is an example.

  ```bash
  openssl req -newkey rsa:4096 -x509 -sha512 -days 365 -nodes -subj "/CN=NebulaGraphExplorer.com" -out NebulaGraphExplorer.crt -keyout NebulaGraphExplorer.key
  ```

  - `-newkey`: The secret key is automatically generated when a certificate request or self-signed certificate is generated.
  - `-x509`: Generates a self-signed certificate.
  - `-sha512`: Specifies the algorithm of the message digest.
  - `-days`: The number of days that the certificate generated with parameter `-x509` is valid.
  - `-nodes`: Outputs the secret key without encryption.
  - `-subj`: Sets the subject of the request.
  - `-out`: Specifies the name of the generated certificate request or self-signed certificate.
  - `-keyout`: Specifies the name of the automatically generated secret key.

3. Embed the Explorer page by using iframe on a third-party page. The work needs to be developed by yourself.

4. On the parent page, pass the request through the postMessage method as shown in the following example:

  ```json
  const links = [
    {
      source: 'player150',
      target: 'player143',
      id: 'follow player150->player143 @0',
      rank: 0,
      edgeType: 'follow',
      properties: {
        degree: 90,
      },
      color: '#d40e0e',
    },
    {
      source: 'player143',
      target: 'player150',
      id: 'follow player143->player150 @0',
      rank: 0,
      edgeType: 'follow',
      properties: {
        degree: 90,
      },
    },
  ];

  const nodes = [
    {
      id: 'player150',
      tags: ['player'],
      properties: {
        player: {
          age: 20,
          name: 'Luka Doncic',
        },
      },
      color: '#20eb14',
    },
    {
      id: 'player143',
      tags: ['player'],
      properties: {
        player: {
          age: 23,
          name: 'Kristaps Porzingis',
        },
      },
      color: '#3713ed',
    },
  ];

  // login
  iframeEle.contentWindow.postMessage(
    {
      // `NebulaGraphExploreLogin` type has been deprecated and `ExplorerLogin` is used instead, but continues to be compatible with version 3.x.
      type: 'ExplorerLogin',
      data: {
        authorization: 'WyJyb290IiwibmVidWxhIl0=',  // NebulaGraph accounts and passwords were formed into an array and serialized, then Base64 encoded. The array format is `['account', 'password']`. The example is['root', 'nebula']. The encoded result is `WyJyb290IiwibmVidWxhIl0=`.
        host: '192.168.8.240:9669',  // The graph service address of NebulaGraph.
        space: 'demo_basketball',  // The name of the target graph space.
      },
    },
    '*'
  );

  // add vertexes or edges
  iframeEle.contentWindow.postMessage({ type: 'ExplorerAddCanvasElements', data: { nodes, links } }, '*')

  // Clear canvas
  iframeEle.contentWindow.postMessage({ type: 'ExplorerClearCanvas' }, '*')
  ```

5. Start the Explorer service.

  !!! note

        If the Explorer is installed by RPM/DEB package, run the command `sudo ./nebula-explorer-server &`。

  ```bash
  ./scripts/start.sh
  ```

6. Check whether the embedded Explorer page is displayed on the third-party page. For example, the first page displays the graph space `basketballplayer`, and the second and third pages display other graph spaces.

  ![iframe_example](https://docs-cdn.nebula-graph.com.cn/figures/explorer_iframe_example_221025.png)
