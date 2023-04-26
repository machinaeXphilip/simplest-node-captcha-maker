# Simplest Node CaptchaMaker

I needed a simple basis for a nodejs captchaMaker. 
After hitting a wall with [an issue with node-canvas on some OS']() i discovered [pureimage]https://github.com/joshmarinacci/node-pureimage and combined it with https://github.com/lovell/sharp/ (overkill, should be possible with dependencies of pureimage but i was too impatient, feel free to contribute!)
I got inspired by the [Captcha-Validator](https://github.com/makeuseofcode/CAPTCHA-Validator) project.

This creates not a safe captcha (yet) but a fairly easy to read captcha, by painting it on a virtual canvas and returns it as base64 datauri which could be send to frontends. To make it harder for robots to read, some more visual action needs to go on of course. This is meant more as a starting point.