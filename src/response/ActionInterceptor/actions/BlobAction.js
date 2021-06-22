import BaseAction from './BaseAction'
import { b64ToUtf8Safe } from '@feugene/mu/src/utils'

const getFileName = (contentDisposition, value) => {
  if (value) {
    return value
  }

  if (contentDisposition) {
    return contentDisposition.split('filename=')[1]
  }

  return 'download-file'
}

const buildReader = ({ filename }) => {
  const reader = new FileReader()

  reader.onloadend = function() {
    let url = reader.result

    url = url.replace(/^data:[^;]*;/, 'data:attachment/file;')

    const link = document.createElement('a')

    link.href = url
    link.download = filename
    link.target = '_blank'

    document.body.append(link)
    link.click()

    link.remove()
  }

  return reader
}

export default class BlobAction extends BaseAction {
  constructor(data) {
    super(data)
  }

  run(axiosConfig, response) {
    const responseData = response.data()

    const contentDisposition = response.response.headers['content-disposition']
    const headerFilename = response.response.headers['x-filename']
    const filename = getFileName(contentDisposition, b64ToUtf8Safe(headerFilename))

    buildReader({ filename })
      .readAsDataURL(
        new Blob([responseData], {
          type: responseData.type || 'application/octet-stream',
        }),
      )
  }
}
