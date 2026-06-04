fetch('https://api.tracker.yandex.net/v3/issues/BASIC-2199', {
  headers: {
    'Authorization': 'OAuth y0__wgBEM7y36aq94ACGMODQyDQluXmF2tslGxQKjwf98NKyj2Qju4XOJLx',
    'X-Cloud-Org-ID': '7085385'
  }
})
.then(r => r.json())
.then(data => console.log(data))