const renderElem = ({ tagName, attrs, children}) => {
	let $el = document.createElement(tagName);
	
	// set attributeds
	// 数组的解构赋值
	for (const [k, v] of Object.entries(attrs)) {
		$el.setAttribute(k, v);
	}
	
	// set children (Array)
	for (const child of children) {
		const $child = render(child);
		$el.appendChild($child);
	}
	return $el;
}

const render = (vNode) => {
	// if element node is text, and createTextNode
	if (typeof vNode === 'string') {
		return document.createTextNode(vNode);
	}

	// otherwise return renderElem
	return renderElem(vNode);
}

export default render
