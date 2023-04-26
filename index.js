
const PImage = require('pureimage');
const fs = require('fs');
const sharp = require('sharp');

class captchaMaker{
  constructor({width, height, fontpath}){
    this.width = width;
    this.height = height;
    this.captchaCanvas = PImage.make(this.width, this.height);
    this.fontpath = fontpath;
  }

  async init(){
    return await PImage.registerFont(this.fontpath,'MyFont').loadPromise();
  }

  async drawTextToCaptcha(text){
    let ctx = this.captchaCanvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,this.width,this.height);
    ctx.font = "40px MyFont";
    ctx.fillStyle = "darkgreen";
    await ctx.fillText(text,0,35);

    let buffer = await this.bitmap2PngBuffer(this.captchaCanvas.data,this.width,this.height);
    return 'data:image/png;base64,'+buffer.toString('base64')
  }

  async bitmap2PngBuffer(buffer,width,height,channels = 4){
  
    return await sharp(buffer, {
      raw: {
        width,
        height,
        channels,
      }
    }).toFormat('png')
    .toBuffer();
  }

  /**
   * creates a captcha image and adds the code to the global activeCaptchas.
   * also sets up timers to delete captchas if not used within 90 seconds
   * and tidies up if more than 10 captchas active at a time
   * 
   * inspired by https://github.com/makeuseofcode/CAPTCHA-Validator 
   *  MIT License Copyright (c) 2022 Yuvraj Chandra
   */
  async getRandomCaptcha(){
    const alphaNums = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 
      'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 
      'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9','!',
      '?','-',":"
    ];
    let refreshArr = [];
    for (let j = 1; j <= 7; j++) {
        refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    let signupCaptcha = refreshArr.join('');
    
    let datauri = await this.drawTextToCaptcha(signupCaptcha);
    return datauri
  }
}

// Example implementation:

// (async function(){
//   let captcha = new captchaMaker({width:180,height:40,fontpath:'Roboto_Mono/static/RobotoMono-ExtraLight.ttf'});
//   await captcha.init()

//   let datauri = await captcha.getRandomCaptcha();
//   console.log(datauri);
// }())


module.exports = {captchaMaker}