AWS.config.update({
    region: "ap-northeast-2",
    //endpoint: "http://localhost:8000",
    endpoint: "https://dynamodb.ap-northeast-2.amazonaws.com/",
    // accessKeyId default can be used while using the downloadable version of DynamoDB.
    // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    accessKeyId: "AKIATSG7K2BTY34KGPXM",
    // secretAccessKey default can be used while using the downloadable version of DynamoDB.
    // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    secretAccessKey: "Lc1DiGXcflNB4o8GWu+S7Fs3EflB1RYKOv/y9x7e"
})
const docClient = new AWS.DynamoDB.DocumentClient()
const tableName = 'isdl-aws-db'

var params = {
    TableName: tableName,
};

docClient.scan(params, (err, data) => {
    if (err) {
        // エラーのときの処理
        console.log(err)
        let errStr = '<span style="color:red;">' + 'ERROR<br>' + err + '</span>'
        document.getElementById('table-wrapper').innerHTML = errStr
    } else {
        // 成功したときの処理
        console.log(data)
        console.log(data.Items)

        DATA = data.Items
        const parent = document.getElementById('table-wrapper')
        data.Items.forEach(item => {
            parent.appendChild(createItem(item))
        })
    }
})

const createItem = (item = null) => {
    const e = document.createElement('div')
    e.className = 'item-box'
    if (item) {
        const imgbox = document.createElement('div')
        imgbox.className = 'item-thumb'
        const img = document.createElement('img')
        img.src = 'https://isdl-aws-strage.s3-ap-northeast-2.amazonaws.com/img/' + item.product_id + '.png'
        imgbox.appendChild(img)
        e.appendChild(imgbox)

        // const mask = document.createElement('div')
        // mask.className = 'item-mask'

        // const desc = document.createElement('div')
        // desc.className = 'item-desc'
        // desc.innerHTML = item.product_info
        // mask.appendChild(desc)
        // imgbox.appendChild(mask)
        // e.appendChild(imgbox)

        // const id = document.createElement('a')
        // id.className = 'item-id text-small'
        // id.innerHTML = item.product_id
        // e.appendChild(id)

        const title = document.createElement('a')
        title.className = 'item-title'
        title.innerHTML = item.product_name
        e.appendChild(title)

        const price = document.createElement('a')
        price.className = 'item-price'
        price.innerHTML = '¥' + Number(item.price).toLocaleString()
        e.appendChild(price)

        const desc = document.createElement('a')
        desc.className = 'item-desc'
        desc.innerHTML = '補足：'+item.product_info
        e.appendChild(desc)
    }
    return e
}

// 画像処理
const base64Decoder = (bin) => {
    let img = new Image()
    img.src = bin
    return img
}


// //アイテム全体の枠組み
// const e = document.createElement('div')
// e.className = 'item-box'
// //画像の枠組み
// const imgbox = document.createElement('div')
// imgbox.className = 'item-thumb'
// //画像
// const img = document.createElement('img')
// // img.src='https://isdl-aws-strage.s3-ap-northeast-2.amazonaws.com/img/' + item.product_id + '.png'
// img.src='images/pimon2.png'
// imgbox.appendChild(img)//画像を画像の枠組みに挿入
// e.appendChild(imgbox)//画像の枠組みをアイテム全体の枠組みに挿入
// //アイテムの名称
// const title = document.createElement('a')
// title.className = 'item-title'
// title.innerHTML = '商品名：'+'パイモン'
// e.appendChild(title)
// //値段
// const price = document.createElement('a')
// price.className = 'item-price'
// price.innerHTML = '¥0'
// e.appendChild(price)

// const desc = document.createElement('a')
// desc.className = 'item-desc'
// desc.innerHTML = '補足　：'+'非常食'
// e.appendChild(desc)
// //htmlのドキュメントに書き込み
// document.getElementById('table-wrapper').appendChild(e);


// const createItem = (item = null) => {
//     //アイテム全体の枠組み
//     const e = document.createElement('div')
//     e.className = 'item-box'
//     //画像の枠組み
//     const imgbox = document.createElement('div')
//     imgbox.className = 'item-thumb'
//     //画像
//     const img = document.createElement('img')
//     img.src='S3からの画像'
//     imgbox.appendChild(img)//画像を画像の枠組みに挿入
//     e.appendChild(imgbox)//画像の枠組みをアイテム全体の枠組みに挿入
//     //アイテムの名称
//     const title = document.createElement('a')
//     title.className = 'item-title'
//     title.innerHTML = item.product_name
//     e.appendChild(title)
//     //値段
//     const price = document.createElement('a')
//     price.className = 'item-price'
//     price.innerHTML = '¥' + Number(item.price).toLocaleString()
//     e.appendChild(price)

//     return e
// }
// //htmlのドキュメントに書き込み
// document.getElementById('table-wrapper').appendChild(createitem(item));