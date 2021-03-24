[testapi6-sql](../README.md) / [Exports](../modules.md) / Query

# Class: Query

Query command

## Table of contents

### Constructors

- [constructor](query.md#constructor)

### Properties

- [prms](query.md#prms)
- [sql](query.md#sql)
- [title](query.md#title)
- [var](query.md#var)

## Constructors

### constructor

\+ **new Query**(): [*Query*](query.md)

**Returns:** [*Query*](query.md)

## Properties

### prms

• `Optional` **prms**: *any*[]

Sql parameter

___

### sql

• **sql**: *string*

Sql command

___

### title

• `Optional` **title**: *string*

Query title

___

### var

• **var**: *string* \| { [key: string]: *any*;  }

Set data after execute done

```yaml
string: set result to this var
object: set customize result to each properties in this var
```
