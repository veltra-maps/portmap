[ 各概要 ]

|- index.html 
    世界地図にポートのシンボルを出す本体
    各種のポートデータは、Cloudflare Workersで管理されています。
    Cloudflareでは下記でドメイン構築済
    https://port-data.veltra.work/port.json
    直接アクセスしても簡易的にマスタファイルを閲覧できないように処理済
|- route.html
    クエリで指定した船の旅程を呼び出し、MAPで表示する
    例：https://veltra-maps.github.io/portmap/route.html?ship=1359_MSC-Bellissima&ItineraryNo=4026183
    
|- vt_area.json  
   VELTRAエリアトップのURLマスタファイル
   
|- itinerary_schedules
    クルーズ船ごとの旅程表をjsonファイルにて保管
    例：1359_MSC-Bellissima.json

|- images
　　アイコンなどの画像データ
