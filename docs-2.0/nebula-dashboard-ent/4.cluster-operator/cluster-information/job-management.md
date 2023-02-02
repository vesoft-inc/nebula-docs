# Job management

Users can manage the jobs in a specified graph space through the Dashboard, including viewing, stopping, and recovering jobs, and supports viewing the details of a single job.

!!! note

    How to run jobs, see [Job manager and the JOB statements](../../../3.ngql-guide/4.job-statements.md).

## Prerequisites

- The job management feature is available in NebulaGraph Enterprise Edition 3.4.0 and above versions.
- The job management feature is available in NebulaGraph Community Edition 3.3.0 and above versions.

## Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. On the left-side navigation bar of the page, click **Information**->**Job Management**.
4. Select any online Graph service address, enter the account to log in to NebulaGraph (not the Dashboard login account), and the corresponding password.
5. Select the target graph space at the upper left corner of the page.

## View job

After you select the graph space, the page will display all the job information that has not expired by default. You can quickly find jobs through the filter box at the top of the page as follows:

- Select a job status for filtering. The status includes `QUEUE`, `RUNNING`, `FINISHED`, `FAILED`, `STOPPED`, and `SUCCEEDED`. For the status description, see [Job manager and the JOB statements](../../../3.ngql-guide/4.job-statements.md).
- Select a time range for filtering. You can view the job information of the maximum of 7 days by default. You can also select a time range or quickly select latest 12 hours, 1 day, 3 days, or 7 days.
- Select a `Job ID` or `Command` for filtering and enter what you want to search for.
- By default, the job information page will not be updated automatically. You can set the update frequency of the job information page globally or click the ![setup](https://docs-cdn.nebula-graph.com.cn/figures/refresh-220616.png) button to update the page manually.
- Click `Detail` in the `Operation` column on the right side of the target job to view more information, including `Task ID`, `Host`, `Error Code`, etc.

## Stop job

Click `Stop Job` in the `Operation` column on the right side of the target job to stop an unfinished job. After clicking, the status of the job becomes `STOPPED`.

## Recover job

Click `Recover Job` in the `Operation` column on the right side of the target job to recover the job whose status is `FAILED` or `STOPPED`. After clicking, the status of the job becomes `RUNNING`.

!!! note

    - If there are multiple `BALANCE DATA` jobs in `STOPPED` status, only the latest one can be recovered.
    - The completed job can not be recovered.
