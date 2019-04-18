// mount real-dom to our html page!

export default ($node, $target) => {
	// use $node element replace $target element!
	$target.replaceWith($node);
	return $node;
}

