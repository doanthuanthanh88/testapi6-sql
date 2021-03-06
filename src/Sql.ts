
import knex, { Knex } from 'knex'
import chalk from 'chalk'
import { Tag } from 'testapi6/dist/components/Tag'

/**
 * Query command
 */
export class Query {
  /** Query title */
  title?: string
  /** Sql command */
  query: string
  /** Sql parameter */
  args?: any[]
  /** 
   * Set data after execute done
   * 
   * ```yaml
   * string: set result to this var
   * object: set customize result to each properties in this var
   * ```
   */
  var: string | { [key: string]: any }
}

/**
 * Execute sql query
 */
export class Sql extends Tag {
  /** 
   * Sql connection string 
   * 
   * Example: mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700
   * */
  connection: string // mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700
  /**
   * Sql configuration
   */
  config = {} as {
    /** Sql database type */
    client?: 'mysql' | 'pg',
    /** 
     * Sql connection string 
     * 
     * Example: mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700
     * */
    connection: string
  }
  /** Query collection */
  queries: (Query | string)[]
  /** 
   * Set data after request done
   * 
   * ```yaml
   * string: set response data to this var
   * object: set customize response to each properties in this var
   * ```
   */
  var: string | { [key: string]: any }
  _db: Knex

  init(attrs: Sql) {
    super.init(attrs)
    if (!this.config) this.config = {} as any
    if (this.connection) {
      this.config.connection = this.connection
    }
    if (!this.config.client) {
      this.config.client =
        this.config.connection?.startsWith('mysql://') ? 'mysql' :
          this.config.connection?.startsWith('postgres://') ? 'pg' : undefined
    }
    if (!this.config.client) throw new Error('Not support: ' + this.config)
    if (!this.queries) this.queries = []
  }

  async beforeExec() {
    await super.beforeExec()
    this._db = knex({
      ...this.config
    })
  }

  async exec() {
    if (!this.slient && this.title) this.context.group(chalk.green('%s'), this.title)
    for (const q of this.queries) {
      let query: Query
      if (typeof q === 'string') {
        query = {
          query: q.trim(),
          args: []
        } as Query
      } else {
        query = q as Query
        if (!query.args) query.args = []
      }
      if (!this.slient && query.title) this.context.group('QuerySQL: %s', query.title)
      const begin = Date.now()
      const [rs,] = await this._db.raw(query.query, ...query.args)
      const res = {
        time: Date.now() - begin,
        result: !rs ? rs : typeof rs === 'object' ? JSON.parse(JSON.stringify(rs)) : rs
      }
      if (!this.slient) {
        this.context.log(`${chalk.green('%s')} ${chalk.gray('- %dms')}`, query.args, res.time)
        if (res.result && typeof res.result === 'object') {
          this.context.log(chalk.yellow('%s'), this.context.Utils.json(res.result))
        } else {
          this.context.log(chalk.yellow('%s'), res.result)
        }
      }
      if (query.var) this.setVar(query.var, res.result)
      if (!this.slient && query.title) this.context.groupEnd()
    }
  }

  async dispose() {
    await this._db.destroy()
  }
}

/**
 * Execute mysql query
 */
export class MySql extends Sql { }

/**
 * Execute postgreSQL query
 */
export class PostgreSql extends Sql { }
