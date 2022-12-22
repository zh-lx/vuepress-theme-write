<template>
  <div class="loading-container">
    <div class="loading-text">
      <span class="loader"><span class="L">L</span>oad&nbsp;ng</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' baseProfile='full' width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 800' %3E%3Crect x='1300' y='400' rx='40' ry='40' width='300' height='300' stroke='rgb(129, 201, 149)' fill='rgb(129, 201, 149)' %3E%3CanimateTransform attributeType='XML' attributeName='transform' begin='0s' dur='35s' type='rotate' from='0 1450 550' to='360 1450 550' repeatCount='indefinite' /%3E%3C/rect%3E%3Cpath d='M 100 350 A 150 150 0 1 1 400 350 Q400 370 380 370 L 250 370 L 120 370 Q100 370 100 350' stroke='rgb(253, 214, 99)' fill='rgb(253, 214, 99)' %3E%3CanimateMotion path='M 800 -200 L 800 -300 L 800 -200' dur='20s' begin='0s' repeatCount='indefinite' /%3E%3CanimateTransform attributeType='XML' attributeName='transform' begin='0s' dur='30s' type='rotate' values='0 210 530 ; -30 210 530 ; 0 210 530' keyTimes='0 ; 0.5 ; 1' repeatCount='indefinite' /%3E%3C/path%3E%3Ccircle cx='200' cy='150' r='20' stroke='%231a73e8' fill='%231a73e8'%3E%3CanimateMotion path='M 0 0 L 40 20 Z' dur='5s' repeatCount='indefinite' /%3E%3C/circle%3E%3C!-- 三角形 --%3E%3Cpath d='M 165 580 L 270 580 Q275 578 270 570 L 223 483 Q220 480 217 483 L 165 570 Q160 578 165 580' stroke='rgb(238, 103, 92)' fill='rgb(238, 103, 92)' %3E%3CanimateTransform attributeType='XML' attributeName='transform' begin='0s' dur='35s' type='rotate' from='0 210 530' to='360 210 530' repeatCount='indefinite' /%3E%3C/path%3E%3Ccircle cx='1200' cy='600' r='30' stroke='rgb(241, 243, 244)' fill='rgb(241, 243, 244)' %3E%3CanimateMotion path='M 0 0 L -20 40 Z' dur='9s' repeatCount='indefinite' /%3E%3C/circle%3E%3Cpath d='M 100 350 A 40 40 0 1 1 180 350 L 180 430 A 40 40 0 1 1 100 430 Z' stroke='rgb(241, 243, 244)' fill='rgb(241, 243, 244)' %3E%3CanimateMotion path='M 140 390 L 180 360 L 140 390' dur='20s' begin='0s' repeatCount='indefinite' /%3E%3CanimateTransform attributeType='XML' attributeName='transform' begin='0s' dur='30s' type='rotate' values='0 140 390; -60 140 390; 0 140 390' keyTimes='0 ; 0.5 ; 1' repeatCount='indefinite' /%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat no-repeat;
  background-position: center center;
  background-size: cover;
}

.loading-text {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loader {
  color: #3491fa;
  position: relative;
  display: inline-block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 48px;
  letter-spacing: 4px;
  box-sizing: border-box;
  text-align: left;
}
.loader::before {
  content: '';
  position: absolute;
  right: 70px;
  bottom: 10px;
  height: 28px;
  width: 4.9px;
  background: currentColor;
  box-sizing: border-box;
  animation: animloader1 1s linear infinite alternate;
}
.loader::after {
  content: '';
  width: 10px;
  height: 10px;
  position: absolute;
  left: 125px;
  top: 2px;
  border-radius: 50%;
  background: red;
  box-sizing: border-box;
  animation: animloader 1s linear infinite alternate;
}

@keyframes animloader {
  0% {
    transform: translate(0px, 0px) scaleX(1);
  }
  14% {
    transform: translate(-12px, -16px) scaleX(1.05);
  }
  28% {
    transform: translate(-27px, -28px) scaleX(1.07);
  }
  42% {
    transform: translate(-46px, -35px) scaleX(1.1);
  }
  57% {
    transform: translate(-70px, -37px) scaleX(1.1);
  }
  71% {
    transform: translate(-94px, -32px) scaleX(1.07);
  }
  85% {
    transform: translate(-111px, -22px) scaleX(1.05);
  }
  100% {
    transform: translate(-125px, -9px) scaleX(1);
  }
}

@keyframes animloader1 {
  0% {
    box-shadow: 0 -6px;
  }
  25% {
    box-shadow: 0 0px;
  }
  75% {
    box-shadow: 0 0px;
  }
  100% {
    box-shadow: 0 0px;
  }
}
.L {
  display: inline-block;
  animation: Lani 2s linear infinite;
}
@keyframes Lani {
  0% {
    transform: scaleY(1) translateY(0);
  }
  40% {
    transform: scaleY(1) translateY(0);
  }
  50% {
    transform: scaleY(1.1) translateY(-5%);
  }
  60% {
    transform: scaleY(1) translateY(0);
  }
  100% {
    transform: scaleY(1) translateY(0);
  }
}
</style>
