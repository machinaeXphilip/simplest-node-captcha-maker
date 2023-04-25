
const PImage = require('pureimage');
const fs = require('fs');
const sharp = require('sharp');

const [width, height] = [180,40];

const captchaCanvas = PImage.make(width, height);

const fontpath = 'Roboto_Mono/static/RobotoMono-ExtraLight.ttf'

async function drawTextToCaptcha(c,captchaCanvas){
    let ctx = captchaCanvas.getContext('2d');
    ctx.font = "40px MyFont";
    ctx.fillStyle = "darkgreen";
    await ctx.fillText(c,0,30);
    console.log(captchaCanvas.data);

    let buffer = await bitmap2PngBuffer(captchaCanvas.data,width,height);
    return 'data:image/png;base64,'+buffer.toString('base64')
  }

async function bitmap2PngBuffer(buffer,width,height,channels = 4){
  
  return await sharp(buffer, {
    raw: {
      width,
      height,
      channels,
    }
  }).toFormat('png')
  .toBuffer();
}


  
async function main(){
  await PImage.registerFont(fontpath,'MyFont').loadPromise()
  let dataurl = await drawTextToCaptcha("test",captchaCanvas);
  console.log(dataurl);   
}


main();