# url2link

It works on browser and converts URLs written on web pages into links.


## Install

As an ES Module.

```js
import url2link from "@tomk79/url2link";
```

As external JavaScript file.

```html
<script src="node_modules/@tomk79/url2link/dist/url2link.js"></script>
```


## Usage

```html
<div class="target-elements">
    <p>Convert inline URLs (ex: https://example.com/foo/bar.html ) to links.</p>
</div>

<script src="url2link.js"></script>
<script>
url2link('.target-elements');
</script>
```

to be like this:

```html
<div class="target-elements">
    <p>Convert inline URLs (ex: <a href="https://example.com/foo/bar.html" rel="noopener noreferrer" target="_blank">https://example.com/foo/bar.html</a> ) to links.</p>
</div>
```

## Options

```js
url2link('.target-elements', {
    pattern: /https?\:\/\/(?:[a-zA-Z0-9\.\-\_\%]*(?:\:[a-zA-Z0-9\.\-\_\%]*)?\@)?[a-zA-Z0-9\.\-]+(?:\:[0-9]+)?(?:\/[a-zA-Z0-9\.\-\_\%\/\?\&\=\+\#]*)?/,
    onCreateLink: function($a){
        // The generated A element `$a` is passed.
        // Please process as necessary.
        return $a;
    },
});
```

- `options.pattern`: Regular expression pattern for detecting URLs
- `options.onCreateLink`: Callback function called on link generation


## Change log

### @tomk79/url2link v0.1.1 (2023-08-21)

- Fix: a flaw in URL pattern detection.

### @tomk79/url2link v0.1.0 (2023-08-20)

- Initial Release


## License

MIT License https://opensource.org/licenses/mit-license.php


## Author

- Tomoya Koyanagi <tomk79@gmail.com>
- website: <https://www.pxt.jp/>
- Twitter: @tomk79 <https://twitter.com/tomk79/>
