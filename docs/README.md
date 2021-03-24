testapi6-sql / [Exports](modules.md)

# testapi6-sql
A plugin to create tag to execute sql(mysql, postgres...)

# Features
- Execute sql

> Read [document details](https://github.com/doanthuanthanh88/testapi6-plugins)

# How to use
### Installation
```javascript
// install via npm
npm install -g testapi6-sql

// install via yarn
yarn global add testapi6-sql
```

### Use in yaml
```yaml
# - Exec:
#     args:
#       - yarn global add testapi6-sql
- Require:
    modules:
      - /Users/${USER}/testapi6-sql/dist # Path to plugin
# Find more: 
- Sql:
    connection: mysql://root:root@localhost/mydb
    # connection: postgres://root:root@localhost/mydb
    queries: 
      - title: Get users
        sql: select * from users
        prms: []
        var: rs
- Echo: ${rs}
```
