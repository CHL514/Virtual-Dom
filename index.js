const arr = [
	1,
	...Array.from({ length: 3 }, () => {
		return Math.floor(Math.random() * 10)
	})
]

console.log(arr);
