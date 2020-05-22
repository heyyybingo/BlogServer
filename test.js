let content = "<sadasdadad>sadassdasdwqqdqw>qdqweqw"

let simpleContent = content.slice(0, content.lastIndexOf(">", 150) + 1);
let result = simpleContent.replace(/<[^>]+>/g, "")

console.log(result)