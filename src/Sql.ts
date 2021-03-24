
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
  sql: string
  /** Sql parameter */
  prms?: any[]
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

  constructor(attrs: Sql) {
    super(attrs)
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
          sql: q.trim(),
          prms: []
        } as Query
      } else {
        query = q as Query
        if (!query.prms) query.prms = []
      }
      if (!this.slient && query.title) this.context.group('QuerySQL: %s', query.title)
      const begin = Date.now()
      const [rs,] = await this._db.raw(query.sql, ...query.prms)
      const res = {
        time: Date.now() - begin,
        result: !rs ? rs : JSON.parse(JSON.stringify(rs))
      }
      if (!this.slient) {
        this.context.log(`${chalk.green('%s')} ${chalk.gray('- %dms')}`, query.sql, res.time)
        if (res.result) {
          this.context.Utils.json(res.result).split('\n').map(e => this.context.log(chalk.yellow(e)))
        }
      }
      if (query.var) this.setVar(query.var, res)
      if (!this.slient && query.title) this.context.groupEnd()
    }
  }

  async dispose() {
    await this._db.destroy()
  }
}
