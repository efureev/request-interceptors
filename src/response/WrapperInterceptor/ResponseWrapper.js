import { forEach } from '@feugene/mu/src'
import { select } from '@feugene/mu/src/object'
import { isArray, isBlob, isEmpty, isObject, isString } from '@feugene/mu/src/is'
import merge from '@feugene/mu/src/object/merge'
import defaultConfig from './default'

/**
 * Create instance, which represent response object
 * @param {Object} response Axios Response
 * @param {Object} config
 */
export default class ResponseWrapper {
  constructor(response, config) {
    this.type = 'mixed'
    this.config = merge({}, defaultConfig, config)

    this.datas = {
      data: null,
      extra: {},
    }

    this.setResponse(response)
  }

  setResponse(response) {
    this.response = response

    this.setData()

    if (!this.isContent()) {
      this.setExtraData().setMessageData()
    }

    return this
  }

  dataKeyName() {
    if (this.config.root) {
      return ''
    }
    return !isEmpty(this.config.dataKey) ? this.config.dataKey : ''
  }

  setData() {
    if (isString(this.response.data)) {
      this.datas.data = this.response.data
      this.type = 'content'
      return
    }

    const dk = this.dataKeyName()
    const data = !isEmpty(dk) && this.response.data[dk] !== undefined ? this.response.data[dk] : this.response.data

    if (isObject(data)) {
      this.datas.data = { ...data }
      this.type = 'entity'
    } else if (isArray(data)) {
      this.datas.data = [...data]
      this.type = 'collection'
    } else if (isBlob(data)) {
      this.datas.data = data
      this.type = 'blob'
    } else {
      this.datas.data = data
      if (isEmpty(dk)) {
        this.type = 'content'
      } else {
        this.type = 'mixed'
      }
    }

    return this
  }

  setExtraData() {
    const dk = this.dataKeyName()
    if (dk) {
      forEach(this.response.data, (value, key) => {
        if (key !== dk && key !== 'message') {
          this.datas.extra[key] = value
        }
      })
    }
    return this
  }

  setMessageData(message = null) {
    if (!this.isBinary()) {
      this.message = message === null ? this.response.data.message : message
    }

    return this
  }

  /**
   * @example resp.get('response.data')
   * @example resp.get('data')
   * @example resp.get('extra')
   * @example resp.get('extra.meta')
   * @param {string} key
   * @return {*}
   */
  get(key) {
    return select(this.datas, key)
  }

  /**
   * Получение основных данных
   *
   * @param {string|null} parameter
   * @return {*}
   */
  data(parameter = null) {
    if (this.isContent()) {
      return this.datas.data
    }
    return this.get(`data${parameter ? `.${parameter}` : ''}`)
  }

  /**
   * Получение дополнительных данных
   *
   * @param {string|null} parameter
   * @return {*}
   */
  extra(parameter = null) {
    if (this.isContent()) {
      return this.datas.extra
    }
    return this.get(`extra${parameter ? `.${parameter}` : ''}`)
  }

  isContent() {
    return this.type === 'content'
  }

  isBinary() {
    return this.type === 'blob'
  }
}
