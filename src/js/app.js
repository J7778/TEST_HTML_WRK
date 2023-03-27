var THREE = require('three');

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let camera, scene, renderer, Light;

let mixer;

let tl = gsap.timeline();

const clock = new THREE.Clock();

const canvas = document.querySelector(".webgl");

camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.5, 100);
camera.position.set(-7, 4, 7);

scene = new THREE.Scene();

Light = new THREE.DirectionalLight(0xffffff, 0.5, 100, 10);

Light.position.set(-5, 2, 0);

scene.add(Light);

const loadingBarElement = document.querySelector('.loading-img')
const loadingBar = document.querySelector('.loading-bar')
const overlayLoader = document.querySelector(".loading-overlay")
const loadingManager = new THREE.LoadingManager(

    () =>
    {

        window.setTimeout(() =>
        {
          const textrev = gsap.timeline();

          textrev.from(".header__resume__title", 1, {
              y: 50,
              ease: "power4.out",
              skewY: 3,
              opacity: 0,
              stagger: {
                  amount: 0.4,
              },
          }),
          textrev.from(".header__resume__text", 1.8, {
            y: 50,
            ease: "power4.out",
            skewY: 3,
            opacity: 0,
            stagger: {
                amount: 0.4,
            },
        });

            gsap.to(overlayLoader, { duration: 3, opacity: 0 })
            loadingBar.classList.add('ended')
            loadingBar.style.transform = ''

            document.documentElement.style.overflow = ''

        }, 150)
    },

    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        const progressRatio = (itemsLoaded / itemsTotal) * 150 + '%'

        loadingBarElement.style.transform = `translateX(${progressRatio}) `

        document.documentElement.style.overflow = "hidden"
    }
)
 
new RGBELoader(loadingManager)
    .load('https://raw.githubusercontent.com/J7778/3d/main/alps_field_1k.hdr', function (texture) {

        texture.mapping = THREE.EquirectangularReflectionMapping;
        //scene.background = texture;
        scene.environment = texture;

const loader = new GLTFLoader(loadingManager);
loader.load("https://raw.githubusercontent.com/J7778/3d/main/tenhun4.glb",
    function (gltf) {

        const model = gltf.scene;
        model.position.set(-6.5, 2, 0);
        model.rotation.set(0, 1.5, 0);
        model.scale.set(1, 1, 1);

        gsap.to(model.scale, 1, {
             x: 1.5, 
             y: 1.5, 
             z: 1.5,
             ease: "power1.out",
             scrollTrigger: {
                 trigger: ".over__wrapper",
                 scrub: 2,
                 start: "top top",
                 end: "bottom bottom"
             }
            });
        
        tl.to(model.rotation, {
            y: 2.3,
            x: 0.3,
            z: -0.3,
            ease: "power1.out",
            scrollTrigger: {
                trigger: ".over__wrapper",
                scrub: 2,
                start: "top top",
                end: "bottom bottom"
            }
          }),
          tl.to(model.position, {
            x: -6.5,
            y: 3,
            ease: "power1.out",
            scrollTrigger: {
                trigger: ".over__wrapper",
                scrub: 2,
                start: "top top",
                end: "bottom bottom"
            }
          })

    scene.add(model);
    
    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();

    animate();

});

});

renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas, alpha: true});
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

}

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    mixer.update( delta );

    render();

}

function render() {

    renderer.render( scene, camera );

}

gsap.to("body", {
    scrollTrigger: {
    trigger: ".section__resume__experience",
    scrub: 2,
    start: "top center",
onEnter: () => {
    gsap.to("body", 0.8, {
        backgroundColor: "#000",
        color: "#fff",
        overwrite: "auto"
    }),
    gsap.to(".menu__m__o", 0.8, {
      backgroundColor: "#000",
  }),
    gsap.to(".path__color", 0.8, {
      stroke: "#fff",
})

},
onLeaveBack: () => {
    gsap.to("body", 0.8, {
        backgroundColor: "#fff",
        color: "#000",
        overwrite: "auto"
    }),
    gsap.to("body", 0.8, {
      backgroundColor: "#fff",
      color: "#000",
      overwrite: "auto"
  }),
    gsap.to(".menu__m__o", 0.8, {
      backgroundColor: "#fff",
  }),
  gsap.to(".path__color", 0.8, {
    stroke: "#000",
})

},
    end: "bottom bottom"
}
})
  
let section = document.querySelectorAll(".section");
let sections = {};
let i = 0;

Array.prototype.forEach.call(section, function(e) {
  sections[e.id] = e.offsetTop;
});

window.onscroll = function() {
    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

  for (i in sections) {
    if (sections[i] <= scrollPosition) {
      document.querySelector('.active').setAttribute('class', ' ');
      document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');

      document.querySelector('.svg__anim').setAttribute('class', ' ');
      document.querySelector('path[href*=' + i + ']').setAttribute('class', 'svg__anim');

    }
  }
};

let f = document.querySelector('.active')
let c = document.querySelector('#link')


const r = f.childNodes[1].children[0].childNodes[1]
  
    window.onload = function() {
        const container = document.querySelector('.br');
        const svg = document.querySelector('.s');
        const progressBar = document.querySelector('.progress-bar');
        const pct = document.querySelector('.pct');
        const pct2 = document.querySelector('.pct2');
        const totalLength = progressBar.getTotalLength();
          
        setTopValue(svg);
        
        progressBar.style.strokeDasharray = totalLength;
        progressBar.style.strokeDashoffset = totalLength;
        
        window.addEventListener('scroll', () => {
          setProgress(container, pct, pct2, progressBar, totalLength);
        });
        
        window.addEventListener('resize', () => {
          setTopValue(svg);
        });
      }
      
      function setTopValue(svg) {
        svg.style.top = document.documentElement.clientHeight * 0.5 - (svg.getBoundingClientRect().height * 0.5) + 'px';
      }
      
      
      function setProgress(container, pct, pct2, progressBar, totalLength) {
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        
        const percentage = scrollTop / (scrollHeight - clientHeight);
        if(percentage === 1) {
          container.classList.add('completed');
          pct.style.display = "none";
          pct2.style.display = "block";
        } else {
          container.classList.remove('completed');
          pct.style.display = "block";
          pct2.style.display = "none";
        }
        pct.innerHTML = Math.round(percentage * 100) + '%';
        progressBar.style.strokeDashoffset = totalLength - totalLength * percentage;  
      }

const offScroll = document.documentElement

const overlayPath = document.querySelector('.overlay__path');

const menuWrap = document.querySelector('.menu__wrap');

const menuItems = document.querySelectorAll('.menu__item__m');

const frameOpen = document.querySelector('.frame__m__open');

const openMenuCtrl = document.querySelector('.menu__m__open');

const closeMenuCtrl = document.querySelector('.menu__m__close');

let isAnimating = false;

const openMenu = ()  => {
    
    if ( isAnimating ) return;
    isAnimating = true;
    gsap.timeline({
            onComplete: () => isAnimating = false
        })
        .set(overlayPath, {
            attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
        })
        .to(overlayPath, { 
            duration: 0.8,
            ease: 'power4.in',
            attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' }
        }, 0)
        .to(overlayPath, { 
            duration: 0.3,
            ease: 'power2',
            attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
            onComplete: () => {
                frameOpen.classList.add('frame--menu-open');
                offScroll.classList.add('is-lock-scroll');
                menuWrap.classList.add('menu-wrap--open');
            }
        })

        .set(menuItems, { 
            opacity: 0
        })
        .set(overlayPath, { 
            attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' }
        })
        .to(overlayPath, { 
            duration: 0.3,
            ease: 'power2.in',
            attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
        })
        .to(overlayPath, { 
            duration: 0.8,
            ease: 'power4',
            attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
        })

        .to(menuItems, { 
            duration: 1.1,
            ease: 'power4',
            startAt: {y: 150},
            y: 0,
            opacity: 1,
            stagger: 0.05
        }, '>-=1.1');

}

const closeMenu = ()  => {
    
    if ( isAnimating ) return;
    isAnimating = true;
    gsap.timeline({
            onComplete: () => isAnimating = false
        })
        .set(overlayPath, {
            attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
        })
        .to(overlayPath, { 
            duration: 0.8,
            ease: 'power4.in',
            attr: { d: 'M 0 0 V 50 Q 50 100 100 50 V 0 z' }
        }, 0)
        .to(overlayPath, { 
            duration: 0.3,
            ease: 'power2',
            attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' },
            onComplete: () => {
                frameOpen.classList.remove('frame--menu-open');
                offScroll.classList.remove('is-lock-scroll');
                menuWrap.classList.remove('menu-wrap--open');
            }
        })
        .set(overlayPath, { 
            attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' }
        })
        .to(overlayPath, { 
            duration: 0.3,
            ease: 'power2.in',
            attr: { d: 'M 0 100 V 50 Q 50 100 100 50 V 100 z' }
        })
        .to(overlayPath, { 
            duration: 0.8,
            ease: 'power4',
            attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
        })
        .to(menuItems, { 
            duration: 0.8,
            ease: 'power2.in',
            y: 100,
            opacity: 0,
            stagger: -0.05
        }, 0)

}

openMenuCtrl.addEventListener('click', openMenu);

closeMenuCtrl.addEventListener('click', closeMenu);



