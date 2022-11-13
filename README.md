# interceptors for the Axios

## List of request interceptor

- AuthInterceptor

## List of response interceptor

- WrapperInterceptor
- ActionInterceptor

### WrapperInterceptor

Wraps axios-response to `ResponseWrapper` wrapper. Wraps success and error responses.

### ActionInterceptor

Execute some action by attributes from response.
Actions:
- Redirect
- Download file by link
- Blob download

Response must have following structure:

For redirect
```json
{
  "status": {
    "type": "redirect",
    "url": "https://google.com"  
  }
}
```

For download by url
```json
{
  "status": {
    "type": "download",
    "url": "https://google.com/file.pdf",  
    "name": "ExampleFile.pdf"  
  }
}
```
For download blob-file
headers:
```json
{
  "Access-Control-Expose-Headers" : "Content-Disposition",
  "x-filename": "test2.pdf"
}
```

Sample for Server side (Laravel Controler):
```php
return Storage::disk('public')->download(
    $user->avatar,
    "avater.{$ext}",
    [
        'Access-Control-Expose-Headers' => 'Content-Disposition',
        'x-filename'                    => "test2.{$ext}",
    ]
);
```

## Basic usage

```js
import buildRequest from '@feugene/layer-request'

const apiHost = process.env.VUE_APP_API_HOST || ''

export const createRequest = (store, config) => {
  const request = buildRequest({ extra: { store } })

  request.manager.addLayer((cm) => {
    return cm.new({
      requestConfig: {
        headers: {
          ...(isObject(config.headers) ? config.headers : {}),
          'X-Requested-With': 'XMLHttpRequest',
        },
        baseURL: `${apiHost}/api`,
      },
      interceptors: {
        request: [(config) => (rConfig) => {
          console.info(`\t🌐 ${rConfig.baseURL}/${rConfig.url}`)
          return rConfig
        }],
        response: [
          (config) => (response) => {
            console.info(`\t✅ ${response.request.responseURL}`)
            return response
          },
          Interceptor(),
          ActionInterceptorBuild({
            actionAttributeName: 'status',
          }),
        ],
      },
    })
  }, 'api')

  return request
}
```
