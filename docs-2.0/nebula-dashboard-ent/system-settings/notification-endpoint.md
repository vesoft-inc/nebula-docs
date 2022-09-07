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
  
On the left-side navigation bar of the **Interface Settings** page, click **Notification Endpoints**->**Webhook** to input the **Webhook URL** used to receive alert messages. You can turn on or off the Webhook feature at the top right of the page.
