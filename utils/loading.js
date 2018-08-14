function show(msg) {
  wx.showLoading({
    title: msg,
  })
}

function hide() {
  wx.hideLoading();
}

function showToast(msg) {
  if (!msg)
    return;

  wx.showToast({
    title: msg,
    icon: "none"
  })
}

module.exports = {
  show: show,
  hide: hide,
  showToast: showToast
}