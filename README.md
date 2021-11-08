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

# Configuration

Read [knex](https://www.npmjs.com/package/knex)

### Use in yaml
```yaml
- testapi6-sql.Sql:
    connection: mysql://root:root@localhost/mydb
    # connection: postgres://root:root@localhost/mydb
    queries: 
      - select * from user
      - title: Get users
        sql: select * from users where id = ?
        prms: 
          - 123
        var: rs
- Echo: ${rs}
```