FROM centos:6

RUN yum -y install http://yum.postgresql.org/9.5/redhat/rhel-6-x86_64/pgdg-redhat95-9.5-2.noarch.rpm && \
        yum -y update && \
        yum -y install \
            postgresql95-server

RUN yum -y install httpd
RUN yum -y install pgbadger

EXPOSE 80
EXPOSE 5432

VOLUME /var/www/html

ADD docker-entrypoint.sh /
RUN chmod 777 /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
