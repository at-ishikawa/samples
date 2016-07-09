#! /bin/bash

if [ "$1" = "" ]; then
    service httpd start
    service postgresql-9.5 initdb
    cat <<EOF >> /var/lib/pgsql/9.5/data/postgresql.conf
log_checkpoints = on
log_connections = on
log_disconnections = on
log_lock_waits = on             # log lock waits >= deadlock_timeout
log_temp_files = 0                      # log temporary files equal or larger
log_line_prefix = '%t [%p]: [%l-1] db=%d,user=%u,app=%a,client=%h '                     # special values:
log_autovacuum_min_duration = 0 # -1 disables, 0 logs all actions and
log_directory = '/var/lib/pgsql/9.5/pg_log'             # directory where log files are written,
                                        # can be absolute or relative to PGDATA
log_filename = 'postgresql-%Y%m%d.log'  # log file name pattern,
                                        # can include strftime() escapes
log_file_mode = 0640                    # creation mode for log files,

log_min_duration_statement = 0
EOF
    mkdir -p /var/lib/pgsql/9.5/pg_log
    chown -R postgres:postgres /var/lib/pgsql/9.5/pg_log
    sed -i -e "s/ident/trust/g" /var/lib/pgsql/9.5/data/pg_hba.conf
    sed -i -e "s/peer/trust/g" /var/lib/pgsql/9.5/data/pg_hba.conf

    service postgresql-9.5 start
    psql -U postgres -c "CREATE DATABASE sample";
    psql -U postgres sample -c "CREATE TABLE sample(id serial primary key, name text not null)";
    psql -U postgres sample -c "INSERT INTO sample(name) VALUES('name')"
    cd /var/www/html
    pgbadger --prefix '%t [%p]: [%l-1] db=%d,user=%u,app=%a,client=%h ' /var/lib/pgsql/9.5/pg_log/postgresql-$(date +%Y%m%d).log
    /bin/bash
else
    exec "$@"
fi
