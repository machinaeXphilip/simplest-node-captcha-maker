import { captchaMaker } from "./index.js";

(async function(){
  let captcha = new captchaMaker({width:180,height:40,fontpath:'Roboto_Mono/static/RobotoMono-ExtraLight.ttf'});
  await captcha.init()

  let datauri = await captcha.getRandomCaptcha();
  console.log(datauri);
}())
