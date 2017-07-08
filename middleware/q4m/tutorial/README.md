# Setup
```
$ docker-compose run -d
$ mysql -u mysql -ppassword -h 127.0.0.1 q4m
```

# How to use
1. Waiting to receive new messages in a queue
  - `select queue_wait('table_name');`
2. Finish to deal with new messages
  - `select queue_end();`
  - `queue_end` is used to proceed messages.
    Note that after queue_end, messages in `table` will be dequeued.
3. Failed to deal with messages
  - `select queue_abort();`
  - After `queue_abort`, messages can be dequeued again after next queue_wait.
4. Sample to run queue_wait commands:
```
> create table items (id integer, name varchar(255) not null) engine=queue;
> select queue_wait('items');
waiting
-- insert into items values(1, 'item name'); from another shell
+---------------------+
| queue_wait('items') |
+---------------------+
|                   1 |
+---------------------+
1 row in set (2.10 sec)

> select * from items;
+------+-----------+
| id   | name      |
+------+-----------+
|    1 | item name |
+------+-----------+
1 row in set (0.00 sec)

-- insert from another shell
-- insert into items values(2, 'item name');
> select * from items;
+------+-----------+
| id   | name      |
+------+-----------+
|    1 | item name |
+------+-----------+
1 row in set (0.00 sec)

> select queue_end();
+-------------+
| queue_end() |
+-------------+
|           1 |
+-------------+
1 row in set (0.00 sec)

> select * from items;
Empty set (0.00 sec)

-- if queue_abort is used instead of queue_end
mysql> select queue_abort();
+---------------+
| queue_abort() |
+---------------+
|             1 |
+---------------+
1 row in set (0.00 sec)

mysql> select * from items;
+------+-----------+
| id   | name      |
+------+-----------+
|    1 | item name |
|    2 | item name |
+------+-----------+
2 rows in set (0.00 sec)
```
5. See http://q4m.github.io/tutorial.html for more details.

# Troubleshooting
1. Primary key is not permitted for queue table.
```
mysql> create table items (id integer primary key, name varchar(255) not null) engine=queue;
ERROR 1069 (42000): Too many keys specified; max 0 keys allowed
```
2. AUTO_INCREMENT is not supported for queue table.
```
mysql> create table items (id integer auto_increment, name varchar(255) not null) engine=queue;
ERROR 1164 (42000): The used table type doesn't support AUTO_INCREMENT columns
```
