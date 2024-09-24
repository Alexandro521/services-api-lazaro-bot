import webp from 'webp-converter'
let i = 0
export async function toJpg(image){
webp.grant_permission();
const promises = image.map(async (pages,index) =>{
   const result =await webp.dwebp(`./download/img-coverter/webp/${pages}`,`./download/img-coverter/jpeg/image_${index}.jpg`,"-o");
})
await Promise.all(promises)
console.log('finish')
return true
}