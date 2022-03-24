/**
 * 将base64转为blob
 * @param base64 图片base64编码
 * @param name 图片名称
 * @returns {Blob}
 */
function changeBase64ToBlob(base64, name) {
  let base64Arr = base64.split(",");
  console.log(base64Arr);
  let imgType = "";
  let base64String = "";
  if (base64Arr.length > 1) {
    // 去掉图片base64头信息
    base64String = base64Arr[1];
    imgType = base64Arr[0].substring(
      base64Arr[0].indexOf(":") + 1,
      base64Arr[0].indexOf(";")
    ); // 获取图片类型
  }
  // 将base64解码，atob() 方法用于解码使用 base-64 编码的字符串。
  let bytes = atob(base64String);
  let bytesCode = new ArrayBuffer(bytes.length);
  // 转换为类型化数组，Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。
  let byteArray = new Uint8Array(bytesCode);
  // 将base64转换为ascii码
  for (let i = 0; i < bytes.length; i++) {
    byteArray[i] = bytes.charCodeAt(i); // 对类型化数组进行赋值
  }
  let blobData = new Blob([bytesCode], { type: imgType });
  console.log(blobData);
  let imgSuffix = "." + imgType.split("/")[1]; // 获取图片后缀
  console.log(imgSuffix);
  let imageFile = new File([blobData], name + imgSuffix); // 将blob转换为file类型
  return imageFile;
}


 const file = new FileReader();

file.onloadend = function (e) {
          
    let base64 = e.target.result // 获取文件的base64编码
    changeBase64ToBlob(base64);
}