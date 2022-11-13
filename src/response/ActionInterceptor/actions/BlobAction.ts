import BaseAction from './BaseAction'
import { b64ToUtf8Safe } from '@feugene/mu'
import type { LayerConfig } from '@feugene/layer-request'
import type { AxiosResponse } from 'axios'
import ResponseWrapper from '~/response/WrapperInterceptor/ResponseWrapper'

const getFileName = (contentDisposition?: string, value?: string): string => {
  if (value) {
    return value
  }

  if (contentDisposition) {
    return contentDisposition.split('filename=')[1]
  }

  return 'download-file'
}

const buildReader = (filename: string, fnOnDone: () => void) => {
  const reader = new FileReader()

  reader.onloadend = function () {
    let url: string = <string>reader.result

    url = url.replace(/^data:[^;]*;/, 'data:attachment/file;')

    const link = document.createElement('a')

    link.href = url
    link.download = filename
    link.target = '_blank'

    document.body.append(link)
    link.click()

    link.remove()

    fnOnDone()
  }

  return reader
}

export default class BlobAction extends BaseAction {
  public run(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): void {
    let responseData
    let axiosResponse: AxiosResponse
    if (response instanceof ResponseWrapper) {
      axiosResponse = response.response
    }
    else {
      responseData = response.data
      axiosResponse = response
    }


    const contentDisposition: string = axiosResponse.headers['content-disposition']
    const headerFilename: string = axiosResponse.headers['x-filename']

    const filename = getFileName(contentDisposition, b64ToUtf8Safe(headerFilename))

    buildReader(filename, () => {
      this.done()
    })
      .readAsDataURL(
        new Blob([responseData], {
          type: responseData.type || 'application/octet-stream',
        }),
      )
  }
}
