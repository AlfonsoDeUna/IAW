var simpleLevelPlan = `
.........................
..#................##....
..#................##....
..#.........o.o....##....
..#.@......#####...#.....
..#####............#.....
......#++++++++++++#.....
......##############.....
.........................`;

var domDisplay; //
var player;
var scale = 1;
  
  var Vec = class Vec {
    constructor(x, y) {
      this.x = x; this.y = y;
    }
    plus(other) {
      return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor) {
      return new Vec(this.x * factor, this.y * factor);
    }
  }
  
  var Player = class Player {
    constructor(pos, speed) {
      this.pos = pos;
      this.speed = speed;
    }
  

    setPlayer(pos,speed) {
      this.pos = pos;
      this.speed = speed;
    }
  
    get type() { return "player"; }
  
    static create(pos) {
      return new Player(pos.plus(new Vec(10, -300)), new Vec(0, 0));
    }
  }
  
  // Tamaño de nuestro jugador...
  Player.prototype.size = new Vec(13, 18);

function crearMapaAut () {

    domDisplay = document.createElement("div");
    domDisplay.setAttribute ("class","game");
    document.body.appendChild(domDisplay);

    tabla = document.createElement("table");
    tabla.setAttribute ("id","map");
    //tabla.setAttribute ("border","1px");
    tabla.setAttribute ("class", "background");

    document.body.getElementsByTagName("div")[0].appendChild (tabla);
    filas = 0;
   
    for (i=0;i<=simpleLevelPlan.length-1; i++) {

        if (simpleLevelPlan[i] === "\n") {   
            filas++;         
            fila = document.createElement ("tr");
            fila.setAttribute ("id","fila"+filas.toString());
            fila.setAttribute ("height","30px");
           
            document.getElementById("map").appendChild (fila);
           
        } else {
            if (simpleLevelPlan[i] === ".") {
                celda = document.createElement ("td");
                celda.setAttribute ("class", "lava");
                celda.setAttribute ("width","15px");
                celda.innerHTML = "<img src=\'https://us.123rf.com/450wm/prapann/prapann1410/prapann141000010/32774187-textura-de-hierba-verde-hermosa.jpg?ver=6\' width=\"15px\" height=\"30px\" >";
                document.getElementById("fila"+ filas.toString()).appendChild (celda);
                
                //imagen = document.createElement ("img");
                //imagen.setAttribute ("src", "https://us.123rf.com/450wm/prapann/prapann1410/prapann141000010/32774187-textura-de-hierba-verde-hermosa.jpg?ver=6");
                //imagen.setAttribute ("width","15");
                //imagen.setAttribute ("height","30");
                
            }else{
                celda = document.createElement ("td");
                celda.setAttribute ("class", "roca");
                celda.setAttribute ("width","15px");
                document.getElementById("fila"+ filas.toString()).appendChild (celda);
            }
        }
    }  
}

/** gestión de las teclas */
function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
      if (keys.includes(event.key)) {
        down[event.key] = event.type == "keydown";
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
  }

// variables de la física
var playerXSpeed = 47;
var gravity = 600;
var jumpSpeed = 47;

function playerUpdate(time, keys, actor){

  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;
  let pos = actor.pos;
  pos = pos.plus(new Vec(xSpeed * time, 0));

  // falta wall
  let ySpeed = actor.speed.y + time * gravity;
  pos = pos.plus(new Vec(0, ySpeed * time));
  
  // falta wall
  if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }
  actor.setPlayer(pos, new Vec(xSpeed, ySpeed));
  return actor;
}

function updateState (time, arrowKeys, actor) {
    return playerUpdate(time, arrowKeys, actor);
}

function drawPlayer (actor) {
    player = document.createElement("div");
    player.setAttribute("id","player");
    player.setAttribute ("class","actor player"); 
    player.style.width = `${actor.size.x * scale}px`;
    player.style.height = `${actor.size.y * scale}px`;
    player.style.left = `${actor.pos.x * scale}px`;
    player.style.top = `${actor.pos.y * scale}px`;
    document.body.getElementsByTagName("div")[0].appendChild (player);
    return player;
}

function syncState (oldPlayer, actor) {
  
  // borra el jugador
  borrado = document.getElementById("player");
  borrado.remove();

  // dibuja la nueva posición del jugador
  player = drawPlayer(actor);
  domDisplay.appendChild(player);
  
  // Movemos el scroll para centrar nuestro jugador a la ventana
  scrollPlayerIntoView(actor);
}

function runAnimation(frameFunc) {

    let lastTime = null;
    function frame(time) {
      if (lastTime != null) {
        let timeStep = Math.min(time - lastTime, 100) / 1000;
        if (frameFunc(timeStep) === false) return;
      }
      lastTime = time;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

  }

   function scrollPlayerIntoView (actor) {
    let width = domDisplay.clientWidth;
    let height = domDisplay.clientHeight;
    let margin = width / 3;
  
    // The viewport
    let left = domDisplay.scrollLeft, right = left + width;
    let top = domDisplay.scrollTop, bottom = top + height;
  
    let center = actor.pos.plus(actor.size.times(0.5))
                           .times(scale);
  
    if (center.x < left + margin) {
      domDisplay.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      domDisplay.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
      domDisplay.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      domDisplay.scrollTop = center.y + margin - height;
    }
  };

function startGame () {

    // crear Mapa
      crearMapaAut();

    // crear Jugador
    let actor = Player.create(new Vec(10,410));  
    let player = drawPlayer(actor);
    let arrowKeys =
    trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

      // Lanzar el motor del juego   
      runAnimation(time => {
        syncState(player, updateState(time, arrowKeys, actor));
      });
    
    

}

