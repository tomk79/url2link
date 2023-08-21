/**
 * Convert URL-like strings in documents to links
 *
 * Give an Element object
 * ```js
 * url2link(document.getElementById('target-element-id'));
 * ```
 *
 * Give a query string
 * ```js
 * url2link('.target-element-query');
 * ```
 *
 * @param {Element|String} $targetElement Element object or Query string
 * @param {Object} options Options
 * @param {RegExp} options.pattern Regular expression pattern for detecting URLs
 * @param {Function} options.onCreateLink Callback function called on link generation
 * @returns void(0)
 */
function url2link( $targetElement, options ){
	options = options || {};

	if( typeof($targetElement) == typeof('string') ){
		var $targetContainer = document.querySelectorAll($targetElement);
		$targetContainer.forEach(function($row, index){
			url2link($row, options);
		});
		return void(0);
	}

	var regExpPattern = options.pattern || /https?\:\/\/(?:[a-zA-Z0-9\.\-\_\%]*(?:\:[a-zA-Z0-9\.\-\_\%]*)?\@)?[a-zA-Z0-9\.\-]+(?:\:[0-9]+)?(?:\/[a-zA-Z0-9\.\-\_\%\/\?\&\=\+\#]*)?/;
	var fncOnCreateLink = options.onCreateLink || function($a){return $a;};

	for(var index = 0; $targetElement.childNodes.length > index; index ++){
		var $node = $targetElement.childNodes[index];

		if( $node.nodeName == "#text" ){
			// テキストノードが変換対象

			var regExpResult = regExpPattern.exec($node.data);
			if( regExpResult ){
				var before = $node.data.slice(0, $node.data.indexOf(regExpResult[0]));
				var extractedUrl = regExpResult[0];
				var after = $node.data.slice($node.data.indexOf(regExpResult[0])+regExpResult[0].length);

				$node.data = before;
				$node.after(after);

				var $a = document.createElement('a');
				$a.innerText = extractedUrl;
				$a.href = extractedUrl;
				$a.rel = `noopener noreferrer`;
				$a.target = `_blank`;
				var $finalA = fncOnCreateLink($a) || $a;
				$node.after($finalA);
			}
			continue;

		}else if( $node.nodeName == "#comment" ){
			// コメントは処理しない
			continue;

		}else if( ['A', 'PRE', 'CODE', 'TEXTAREA', 'INPUT', 'SELECT', 'SCRIPT', 'STYLE'].includes($node.tagName) ){
			// 再帰処理しない種類のタグ
			continue;

		}else{
			// 子要素を再帰的に処理する
			url2link($node, options);
			continue;

		}
	}
}

export default url2link;
