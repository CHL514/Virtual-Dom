// given some default value
// notes: options can be empty object !

export default (tagName, {attrs = {}, children = []} = {}) => {
	return {
		tagName,
		attrs,
		children
	}
}

