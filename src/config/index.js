// git仓库组
export const GROUP = ''

// 应用名称
export const APP = ''

/** 
 * 项目中history是否开启basename
 * 例如：basename = '/root'
 *      history.push("/page") //实际跳转路径 /root/page
 * 默认basename为 GROUP+APP
 * */
export const BASE_NAME = `${GROUP ? `/${GROUP}` : ''}${APP ? `/${APP}` : ''}`