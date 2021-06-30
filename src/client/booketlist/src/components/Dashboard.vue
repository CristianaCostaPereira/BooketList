<template>
  <div>
    <!-- Ghosty welcome page -->
    <div
      class="ghost-welcome-page">

      <div id="background"></div>

        <div class="top">
          <h1>Welcome to your BooketList App</h1>
        </div>

        <div class="ghost-drawing">
          <div class="ghost-copy">
            <div class="one"></div>
            <div class="two"></div>
            <div class="three"></div>
            <div class="four"></div>
          </div>

          <div class="ghost">
            <div class="face">
              <div class="eye"></div>
              <div class="eye-right"></div>
              <div class="mouth"></div>
            </div>
          </div>

          <div class="shadow"></div>
        </div>

        <div class="bottom">
          <p>Booo, looks like a ghost loves this page!</p>
      </div>
    </div>
    </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Lato');

  $white: #EDEDED;
  $gray: #BFC0C0;
  $dark: #585959;
  $big: 'Abril Fatface', serif;

  .top {
    margin-top: 140px;
    margin-bottom: 90px;
  }

  .ghost-drawing {
    margin: 0 auto;
    position: relative;
    width: 250px;
    height: 250px;
    margin-top: -40px;
  }

  .ghost, .ghost-copy {
    width: 50%;
    height: 53%;
    left: 25%;
    top: 10%;
    position: absolute;
    border-radius: 50% 50% 0 0;
    background: $white;
    border: 1px solid $gray;
    border-bottom: none;
    animation: float 2s ease-out infinite;
  }

  .face {
    position: absolute;
    width: 100%;
    height: 60%;
    top: 20%;
  }

  .eye, .eye-right {
    position: absolute;
    background: $dark;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    top: 40%;
  }

  .eye {
    left: 25%;
  }
  .eye-right {
    right: 25%;
  }

  .mouth {
    position:absolute;
    top: 50%;
    left: 45%;
    width: 10px;
    height: 10px;
    border: 3px solid;
    border-radius: 50%;
    border-color: transparent $dark $dark transparent;
    transform: rotate(45deg);
  }

  .one, .two, .three, .four {
    position: absolute;
    background: $white;
    top: 85%;
    width: 25%;
    height: 23%;
    border: 1px solid $gray;
    z-index: 0;
  }

  .one {
    border-radius: 0 0 100% 30%;
    left: -1px;
  }

  .two {
    left: 23%;
    border-radius: 0 0 50% 50%;
  }

  .three {
    left: 50%;
    border-radius: 0 0 50% 50%;
  }

  .four {
    left: 74.5%;
    border-radius: 0 0 30% 100%;
  }

  .shadow {
    position: absolute;
    width: 30%;
    height: 7%;
    background: $gray;
    left: 35%;
    top: 80%;
    border-radius: 50%;
    animation: scale 2s infinite;
  }

  .bottom {
    font-size: 25px;
    margin-top: 20px;
  }

  /*text styling*/
  h1 {
    font-family: $big;
    color: #8d6856;
    text-align: center;
    font-size: 5em !important;
    text-shadow: -1px 0 $gray, 0 1px $gray, 1px 0 $gray, 0 -1px $gray;
  }

  h3 {
    font-size: 1em;
    text-transform: uppercase;
    text-align: center;
    color: $gray;
    margin-top: -20px;
    font-weight: 900;
  }

  p {
    font-family: 'Abril Fatface', cursive;
    text-align: center;
    color: #733e38cf;
    font-size: 23px;
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes float {
    50% {
      transform: translateY(15px);
    }
  }
</style>
