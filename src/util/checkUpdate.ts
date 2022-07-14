import Taro from '@tarojs/taro';

/**
 * 检测当前的小程序
 * 是否是最新版本，是否需要下载、更新
 */
export default function checkUpdateVersion() {
  // 创建 UpdateManager 实例
  const updateManager = Taro.getUpdateManager();
  // 检测版本更新
  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {
      // 监听小程序有版本更新事件
      updateManager.onUpdateReady(() => {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res2) {
            if (res2.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          },
        });
      });

      updateManager.onUpdateFailed(() => {
        // 新版本下载失败
        Taro.showModal({
          title: '已经有新版本咯~',
          content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开呦~',
        });
      });
    }
  });
}