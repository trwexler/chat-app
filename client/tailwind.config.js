module.exports = {

  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      
      keyframes: {
        cssAnimation:{
        '0%, 100%':{opacity:0},
        '50%':{opacity:1}
        }
       },

      animation: {
        cssAnimation: 'cssAnimation 2s forwards',
       }

     },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }



//  .animate-pulse	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

//  @keyframes pulse {
//    0%, 100% {
//      opacity: 1;
//    }
//    50% {
//      opacity: .5;
//    }
//  }