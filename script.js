const { Engine, Render, World, Bodies } = Matter;

let wHeight = window.innerHeight,
    wWidth = window.innerWidth;

class Circle {
  constructor(x, y) {
    this.body = Bodies.circle( x, y, (Math.floor( Math.random() * 10) + 12), {
      restitution: 1.05, // play here
      friction: 1,    // play here
      slop: 0,      // play here
      render: { fillStyle:['#EA1070', '#EAC03C', '#25DDBC', '#007DB0', '#252B7F', '#FF6040'][Math.round(Math.random() * 6 - 0.5)] }
    });
    World.add(engine.world, this.body);
  }
}



const engine = Engine.create();

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: wWidth,
    height: wHeight,
    wireframes: false,
    showAngleIndicator: false,
    background: "#000"
  }
});

const linething = Bodies.rectangle(wWidth / 2, wHeight / 3, 350, 10, {
  isStatic: true,
  render: { fillStyle: "#fff" }
});
const floor = Bodies.rectangle(wWidth / 2, wHeight, wWidth, 3, {
  isStatic: true,
  render: { fillStyle: "#fff" }
});

World.add(engine.world, [floor, linething]);

let circles = [], i = 0;

const interval = setInterval(() => {
  if (i < 250) {
    circles.push(new Circle(wWidth / 2, 0));
    i++;
  } else clearInterval(interval);
}, 12);


var mouse = Matter.Mouse.create(render.canvas),
    mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      contraint: {
        stiffness: 1,
        render: {
          visible: true
        }
      }
    });
World.add(engine.world, mouseConstraint);
render.mouse = mouse;
Engine.run(engine);
Render.run(render);
