# Notification endpoint

On **Notification Endpoint** page, you can set the notification mail and webhook.

## Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **System Settings**.
2. On the left-side navigation bar of the page, click **Notification Endpoint**.

## Steps

### Mail

Dashboard supports sending and receiving alert messages for all clusters via E-mail.

- You need to set the following parameters to send alert messages.

  | Parameter           | Description                                                         |
  | -------------- | ------------------------------------------------------------ |
  | SMTP Server Address| The SMTP server address corresponding to yourmailbox.                               |
  | Port         | The port number of the SMTP server corresponding to yourmailbox.                                |
  | Use SSL        | Check the box to enable SSL for encrypted datatransmission.                              |
  | SMTP User Name     | The SMTP server account name.                                         |
  | SMTP Password       | The SMTP server password.                                           |
  | Sender Email     | The email address of the one who sent you the email.                                    |

- You need to set a receiver to receive alert messages.

  | Parameter           | Description                                                         |
  | -------------- | ------------------------------------------------------------ |
  | Receiver         | Set the email address to receive alert messages. This email address will receive alert messages for all clusters created on Dashboard. |

### Webhook

Dashboard supports configuring Webhook to bring all cluster alert messages into third-party projects.
  
On the left-side navigation bar of the **System Settings** page, click **Notification Endpoints**->**Webhook** to input the **Webhook URL** and **Webhook request body** (optional) used to receive alert messages. You can turn on or off the Webhook feature at the top right of the page.

The descriptions of the supported variables are as follows.

| Variable           | Description      |
| -------------- | --------- |
|`${cluster.name}` | Cluster name. |
|`${cluster.id}`  | Cluster ID. | 
|`${cluster.version}` | Cluster version.|
|`${cluster.status}` | The current state of the cluster.|
|`${cluster.owner}` | The name of the account that has the owner role privileges of the cluster.|
|`${alert.labels.instance}` | IP address and port of the service.  |
|`${alert.labels.endpointIP}` | IP address of the service.  |
|`${alert.labels.instanceName}` |  Service name. For example `192.168.10.100-graphd-9669`. |
|`${alert.labels.alertname}` | Alert name.|
|`${alert.labels.severity}` | Alert severity. The severity includes `emergency`, `critical`, `minor`, `warning`, and `info`.|
|`${alert.labels.severityLevel}` | Alert severity level. The correspondence with alarm severity is `emergency`=`1`, `critical`=`2`, `minor`=`3`, `warning`=`4`, and `info`=`5`.|
|`${alert.labels.componentType}` |  Alert service type.|
|`${alert.annotations.summary}` | Alert summary.|
|`${alert.annotations.description}` |  Alert message description.|

For more information about the alert, see [Notification](../4.cluster-operator/9.notification.md).
