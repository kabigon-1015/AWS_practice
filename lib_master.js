AWS.config.update({
    region: "ap-northeast-1",
    //endpoint: "http://localhost:8000",
    endpoint: "https://dynamodb.ap-northeast-1.amazonaws.com/",
    // accessKeyId default can be used while using the downloadable version of DynamoDB.
    // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    accessKeyId: "AKIAXMZR7ZO22RDK27GF",
    // secretAccessKey default can be used while using the downloadable version of DynamoDB.
    // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    secretAccessKey: "EoCic/B2VSq6oeTB7KQPf4vfHKK+7D4YFcg/bxFZ"
})

const docClient = new AWS.DynamoDB.DocumentClient()
const tableName = 'JIKKEN3_shoes_DB'
// アイテム表示用のdivを作成
const createItem = (item = null) => {
    const e = document.createElement('div')
    e.className = 'item-box'
    if (item) {
        const imgbox = document.createElement('div')
        imgbox.className = 'item-thumb'
        const img = document.createElement('img')
        /*img.src = 'https://jikken3-cds.s3-ap-northeast-1.amazonaws.com/img/' + item.product_id + '.jpg'*/
        img.src='images/pimon2.png'
        imgbox.appendChild(img)

        const mask = document.createElement('div')
        mask.className = 'item-mask'

        const desc = document.createElement('div')
        desc.className = 'item-desc'
        desc.innerHTML = item.product_info
        mask.appendChild(desc)
        imgbox.appendChild(mask)
        e.appendChild(imgbox)

        const id = document.createElement('a')
        id.className = 'item-id text-small'
        id.innerHTML = item.product_id
        e.appendChild(id)

        const title = document.createElement('a')
        title.className = 'item-title'
        title.innerHTML = item.product_name
        e.appendChild(title)

        const price = document.createElement('a')
        price.className = 'item-price'
        price.innerHTML = '¥' + Number(item.price).toLocaleString()
        e.appendChild(price)
    }
    return e
}

// 画像処理
const base64Decoder = (bin) => {
    let img = new Image()
    img.src = bin
    return img
}
