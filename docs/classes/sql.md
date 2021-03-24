[testapi6-sql](../README.md) / [Exports](../modules.md) / Sql

# Class: Sql

Execute sql query

## Hierarchy

* *Tag*

  ↳ **Sql**

## Table of contents

### Constructors

- [constructor](sql.md#constructor)

### Properties

- [config](sql.md#config)
- [connection](sql.md#connection)
- [queries](sql.md#queries)
- [var](sql.md#var)

## Constructors

### constructor

\+ **new Sql**(`attrs`: [*Sql*](sql.md)): [*Sql*](sql.md)

#### Parameters:

Name | Type |
:------ | :------ |
`attrs` | [*Sql*](sql.md) |

**Returns:** [*Sql*](sql.md)

Overrides: void

## Properties

### config

• **config**: *object*

Sql configuration

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`client`? | *mysql* \| *pg* | Sql database type   |
`connection` | *string* | Sql connection string  Example: mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700    |

___

### connection

• **connection**: *string*

Sql connection string

Example: mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700

___

### queries

• **queries**: [*Query*](query.md)[]

Query collection

___

### var

• **var**: *string* \| { [key: string]: *any*;  }

Set data after request done

```yaml
string: set response data to this var
object: set customize response to each properties in this var
```
