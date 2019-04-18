import render from './render'

const zip = (xs, ys) => {
	const zipped = [];
	for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
		zipped.push([xs[i], ys[i]]);
	}
	return zipped;
};

const diffAttributes = (oldAttrs, newAttrs) => {
	const patches = [];

	// set new attributes
	for(const [k, v] of Object.entries(newAttrs)) {
		patches.push($node => {
			$node.setAttribute(k, v);
			return $node;
		})
	}

	// remove old attribute
	for(const k in oldAttrs) {
		if (!(k in newAttrs)) {
			// $node 是整颗真实的 dom tree
			patches.push($node => {
				$node.removeAttribute(k);
				return $node;
			})	
		}
	}

	return $node => {
		for (const patch of patches) {
			patch($node);
		}
	}
}

const diffChildren = (oldVChildren, newVChildren) => {
	const childPatches = [];

	for (const [oldVChild, newVChild] of zip(oldVChildren, newVChildren)) {
		childPatches.push(diff(oldVChild, newVChild));
	}

	const additionalPatches = [];
	for (const additionalVChild of additionalPatches.slice(oldVChildren.length)) {
		additionalPatches.push($node => {
			$node.appendChild(render(additionalVChild));
			return $node;
		})
	}

	return $parent => {
		for (const [patch, child] of zip(childPatches, $parent.childNodes)) {
			patch(child);
		}

		for (const patch of additionalPatches) {
			patch($parent);
		}
		return $parent;
	}
}

const diff = (vOldNode, vNewNode) => {
	if (vNewNode === 'undefined') {
		return $node => {
			$node.remove();
			return undefined;
		};
	}

	if (typeof vOldNode === 'string' || typeof vNewNode === 'string') {
		if (vOldNode !== vNewNode) {
			return $node => {
				const $newNode = render(vNewNode);
				$node.replaceWith($newNode);
				return $newNode;
			};
		} else {
			return $node => undefined;
		}
	}

	// 如果tagName不想等
	if (vOldNode.tagName !== vNewNode.tagName) {
		return $node => {
			const $newNode = render(vNewNode);
			$node.replaceWith($newNode);
			return $newNode;
		};
	}

	const patchAttrs = diffAttributes(vOldNode.attrs, vNewNode.attrs);
	const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

	return $node => {
		patchAttrs($node);
		patchChildren($node);
		return $node;
	};
};

export default diff;
