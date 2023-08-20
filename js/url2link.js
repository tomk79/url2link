/**
 * ドキュメント中のURLらしき文字列をリンクに変換する
 *
 * Elementオブジェクトを与える
 * ```js
 * url2link(document.getElementById('target-element-id'));
 * ```
 *
 * クエリ文字列を与える
 * ```js
 * url2link('.target-element-query');
 * ```
 *
 * @param {Element|String} $targetElement Elementオブジェクト または クエリ文字列
 * @param {Object} options オプション
 * @returns void
 */
function url2link( $targetElement, options ){
	if( typeof($targetElement) == typeof('string') ){
		var $targetContainer = document.querySelectorAll($targetElement);
		$targetContainer.forEach(function($row, index){
			url2link($row, options);
		});
		return;
	}

	var regExpPattern = /https?\:\/\/[a-zA-Z0-9\.\\-\_]+\/[a-zA-Z0-9\-\_\.\?\&\=\+\%\/\#]*/;

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
				$node.after($a);
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
