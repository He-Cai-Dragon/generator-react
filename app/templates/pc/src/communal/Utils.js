const mWidth = window.screen.width || document.documentElement.clientWidth
const mHeight = window.screen.height || document.documentElement.clientHeight
//设置手机在电脑屏幕上的最大宽度
const maxWidthMethod = () => {
	if (mWidth > 1024) { //电脑屏幕
		return 540 + "px"
	} else {
		return '100%'
	}
}
//设置手机在电脑屏幕上的最小高度
const minHightMethod = () => {
	if (mWidth > 1024) { //电脑屏幕
		return mHeight * 0.85 + "px"
	} else {
		return mHeight
	}
}
const maxWidth = maxWidthMethod();
const minHeight = minHightMethod();


export {
	mWidth,
	mHeight,
	maxWidth,
	minHeight
}