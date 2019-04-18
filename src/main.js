import createElement from './vdom/createElement'
import render from './vdom/render'
import mount from './vdom/mount'
import diff from './vdom/diff'

const createVApp = (count) => createElement('div', {
	attrs: {
		id: 'app',
		dataCount: count
	},
	children: [
		createElement('input'), // dom重绘使得Input失焦
		String(count),
		...Array.from({ length: count }, () => createElement('img', {
			attrs: {
				src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555610261877&di=6619e67b4f45768a359a296c55ec1cc3&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2Fmr7DezX-Q4GLNBM_VPVaWA%3D%3D%2F333829322379622331.jpg'
			}
		}))
	]
})

let count = 0;
let vApp = createVApp(count);
const $app  = render(vApp);
let $rootEl = mount($app, document.getElementById('app')); // real dom tree

setInterval(() => {
	count++;
	// 每隔一秒，重绘一次页面
	// $rootEl = mount(render(createVApp(count)), $rootEl)

	// 衍生出 diff 算法
	const vNewApp = createVApp(count);
	const patch = diff(vApp, vNewApp);
	$rootEl = patch($rootEl);
	vApp = vNewApp; // 每一秒之后都有更新，保存起来以供下次比对。
}, 1000)
