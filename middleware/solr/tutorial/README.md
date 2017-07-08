# Setup
Running on solr 6.6
```
$ docker-compose run -d
$ docker exec -it solr bin/solr create_core -c gettingstarted
$ docker exec -it solr bin/post -c gettingstarted example/exampledocs/manufacturers.xml
OR
$ docker exec -it solr bash
$ bin/post -c gettingstarted example/exampledocs/*
```

# How to use
## See on browser
1. Access http://localhost:8983/solr
2. Select documents and Query

## Select
1. Select All
```
curl -XGET "http://localhost:8983/solr/gettingstarted/select?indent=on&q=*:*&wt=xml"
```
  - Select words by **OR**, **AND**, **NOT** like
    - q=(-apple AND *:* NOT address_s:*CA*) OR id:asus
    - `curl -XGET "http://localhost:8983/solr/gettingstarted/select?indent=on&q=(-apple%20AND%20*:*%20NOT%20address_s:*CA*)%20OR%20id:asus&wt=json"`
      - See https://stackoverflow.com/questions/634765/using-or-and-not-in-solr-query for "-" and NOT
      - See http://www.solrtutorial.com/solr-query-syntax.html for more query syntax

  - Sort fields by asc/desc and concatenated by comma for more than one field
    - `curl -XGET "http://localhost:8983/solr/gettingstarted/select?indent=on&q=*&sort=genre_s%20desc,%20field(price,max)%20asc&wt=json"`

2. Create data
```
curl -XGET http://localhost:8983/solr/gettingstarted/update -d '
> [
>  {"id" : "book1",
>   "title_t" : "The Way of Kings",
>   "author_s" : "Brandon Sanderson"
>  }
> ]'
```

3. Update data
  - Use atomic updates to change parts of documents
    - https://cwiki.apache.org/confluence/display/solr/Updating+Parts+of+Documents
  - add fields
```
curl http://localhost:8983/solr/gettingstarted/update?commit=true -d '
[
 {"id"         : "book1",
  "cat_s"      : { "add" : "fantasy" },
  "pubyear_i"  : { "add" : 2010 },
  "ISBN_s"     : { "add" : "978-0-7653-2635-5" }
 }
]'
```

  - Update values of fields
```
curl http://localhost:8983/solr/gettingstarted/update?commit=true -d '
[
 {"id"         : "book1",
  "author_s"   : { "set": "John" }
 }
]'
```

4. Delete data
```
curl -XPOST "http://localhost:8983/solr/gettingstarted/update?commit=true" -d '{ "delete": "book1" }'
```
  - you have to commit to update index
  - See http://www.ryanwright.me/cookbook/apachesolr/add-json-doc for more details

5. Commit for update
```
curl -XPOST "http://localhost:8983/solr/gettingstarted/update" -d '{ "commit": {} }'
```
  - See http://www.ryanwright.me/cookbook/apachesolr/add-json-doc for more details
