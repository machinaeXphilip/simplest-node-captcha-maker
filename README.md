# Simplest Node CaptchaMaker

I needed a simple basis for a nodejs captchaMaker. 
After hitting a wall with [an issue with node-canvas on some OS'](https://github.com/Automattic/node-canvas/issues/1796) i discovered [pureimage](https://github.com/joshmarinacci/node-pureimage) and combined it with https://github.com/lovell/sharp/ (overkill, should be possible with dependencies of pureimage but i was too impatient, feel free to contribute!)
I got inspired by the [Captcha-Validator](https://github.com/makeuseofcode/CAPTCHA-Validator) project.

This creates not a safe captcha (yet) but a fairly easy to read captcha. It does that by painting it on a virtual canvas and returning it as base64 datauri png which could be send to frontends. 
To make it harder for bots to read, some more visual noise needs to be added. This is meant more as a starting point.

## Usage

```js
import { captchaMaker } from "./index.js"; // es6
// const { captchaMaker } = require("./index.js"); // commonjs

(async function(){
  let captcha = new captchaMaker({width:180,height:40,fontpath:'Roboto_Mono/static/RobotoMono-ExtraLight.ttf'});
  await captcha.init()

  let datauri = await captcha.getRandomCaptcha();
  console.log(datauri);
}())
```
