# Fallbacks  JS and CSS

By using CDN you can get  many good features  on your site:

* Caching
* Support for HTTP and HTTPS
* Regional servers to decrease latency
* Support for concurrent calls


But  sometimes  you may have problem to get your libraries,  for instance,  you're behind a vpn  which doesn't allow  you to access them. Then, if you're not using  something like requirejs, webpack, browserify you have to use something called <b>fallback</b>.

The common way to do this, it's  like this:

```javascript
<script type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery/jquery-1.7.1.min.js"></script>
<script type="text/javascript">
if (typeof jQuery == 'undefined') {
  document.write(unescape("%3Cscript src='/js/jquery-1.7.1.min.js' type='text/javascript'%3E%3C/script%3E"));
}
</script>
```

The problem  it's you have to put this code after each CDN library. There are some ways to  do the same  inside a js file. You can wrap  the  fallback methods inside a module which can validate js files and css files.



```javascript
<script  type="text/javascript"  src="https://cdn.jsdelivr.net/jquery/3.0.0-alpha1/jquery.min.jsss"></script>
<script  type="text/javascript"  src="https://cdn.jsdelivr.net/modernizr/2.8.3/modernizr.min.jsss"></script>
<script type="text/javascript"  src="fallback/FallBackModule.js"></script>
<script type="text/javascript">

var cssList=[{cdn:"https://cdn.jsdelivr.net/bootstrap/3.3.5/css/bootstrap.min.css", local:"lib/bootstrap_335/css/bootstrap.min.css"}];
FallBackModule.checkCss(cssList);
var jsList=[{object:"jQuery",local:"lib/jquery_300/jquery.min.js"},{object:"Modernizr",local:"lib/modernizr_283/modernizr.min.js"}];
FallBackModule.checkJs(jsList);
//Initialize  js handlers
window.onload = function(){
	$("#txt_id").html("Loaded");
	$("#btn_id").click(function(){
		$("#txt_id").html("Click!");
	});
}

```
This example  has  2 js files from [jsdelivr](http://www.jsdelivr.com/), these urls have errors, so when  the module FallBackModule is loaded  and its methods are called them  will check if the  contents  of the CDN resources  were loaded. For  css files will be checked if  the url exists   inside   of each  link and for js  files will be checked if  the library is different from undefined.
