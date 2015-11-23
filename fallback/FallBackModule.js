/**
 * FallBackModule can check if  CDN resources (css or js files ) have been already loaded on the page.
 */
var FallBackModule={

    /**
     *  This method checks if css files  have been loaded, by asking  if   the CDN url   exists inside the DOM
     * @method  checkCss
     * @param cdnCssList {Array} Array that has the CDN url and the  local url of the same css file. Format [{cdn:"cdn url", local:"local url"}]
     */
    checkCss:function(cdnCssList){

        var links = document.getElementsByTagName('link');
        for(var cont=0;cdnCssList.length>cont;cont++){
            var noExist = true;
            var dataCdn=cdnCssList[cont];
            for ( var i = 0; i < links.length; i++ ){
                if ( links[i].href == dataCdn.cdn ){
                    noExist = false;
                }
            }
            if (noExist){
                var newLink = document.createElement('link');
                newLink.rel="stylesheet";
                newLink.href=dataCdn.local;
                document.getElementsByTagName('head')[0].appendChild(newLink);
            }
        }
    },

    /**
     *  This method checks if js files  have been loaded, by asking  if   the  object is  not undefined (example typeof( window["jQuery"] ) === 'undefined')
     * @method  checkJs
     * @param cdnJsList {Array} Array that has the object js and  the  local url of the same js file. Format [{object:"Object js", local:"local url"}]
     */
    checkJs:function(cdnJsList){

        for(var cont=0;cdnJsList.length>cont;cont++){
            var dataCdn=cdnJsList[cont];
            //console.info(window[dataCdn.object]);
            if ( typeof( window[dataCdn.object] ) === 'undefined' ){
                var newScript = document.createElement('script');
                newScript.type = 'text/javascript';
                newScript.src = dataCdn.local;
                document.getElementsByTagName('head')[0].appendChild(newScript);
            }
        }

    }

};