# Storage 负载均衡

用户可以使用`SUBMIT JOB BALANCE`语句平衡 Raft leader 的分布。详情请参见 [SUBMIT JOB BALANCE](../synchronization-and-migration/2.balance-syntax.md)。

!!! danger

    `SUBMIT JOB BALANCE`命令通过创建和执行一组子任务来迁移数据和均衡分片分布，**禁止**停止集群中的任何机器或改变机器的 IP 地址，直到所有子任务完成，否则后续子任务会失败。


## 均衡 leader 分布

用户可以使用命令`SUBMIT JOB BALANCE LEADER`均衡分布所有图空间中的 Leader 分片副本。

### 示例

```ngql
nebula> SUBMIT JOB BALANCE LEADER;
```

用户可以执行`SHOW HOSTS`检查结果。

```ngql
nebula> SHOW HOSTS;
+------------------+------+----------+--------------+-----------------------------------+------------------------+---------+
| Host             | Port | Status   | Leader count | Leader distribution               | Partition distribution | Version |
+------------------+------+----------+--------------+-----------------------------------+------------------------+---------+
| "192.168.10.100" | 9779 | "ONLINE" | 4            | "basketballplayer:3"              | "basketballplayer:8"   | "{{nebula.release}}" |
| "192.168.10.101" | 9779 | "ONLINE" | 8            | "basketballplayer:3"              | "basketballplayer:8"   | "{{nebula.release}}" |
| "192.168.10.102" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:8"   | "{{nebula.release}}" |
| "192.168.10.103" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "{{nebula.release}}" |
| "192.168.10.104" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "{{nebula.release}}" |
| "192.168.10.105" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "{{nebula.release}}" |
+------------------+------+-----------+----------+--------------+-----------------------------------+------------------------+---------+
```

!!! caution

    在{{nebula.name}} {{ nebula.release }} 中，Leader 分片副本切换期间，Leader 分片副本会被暂时禁止写入直到切换完成。如果在 Leader 分片副本切换期间，有大量的写入请求，将会导致请求错误（Storage Error `E_RPC_FAILURE`），错误处理方法见 [FAQ](../20.appendix/0.FAQ.md#storage_error_e_rpc_failure)。
    
    用户可以在 Storage 配置文件中设置`raft_heartbeat_interval_secs`的值来控制 Leader 副本切换的超时时间。有关配置文件的详细信息，请参见[ Storage 配置文件](../5.configurations-and-logs/1.configurations/4.storage-config.md)。

