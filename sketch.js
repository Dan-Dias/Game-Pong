//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;
let raio = diametro/2;

//velocidade da bolinha
let velocidadeXBolinha = 10;
let velocidadeYBolinha = 10;

//Raquete
let xRaquete = 5;
let yRaquete = 150;
let RaqueteComprimento = 10;
let RaqueteAltura = 90;
let Colidiu = false;

//Raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeyOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons
let raquetada;
let trilha;
let ponto;

//let inicio;
function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  //inicio = loadSound("inicio.mp3")
}

//Variavel pro oponente errar
let chanceDeErrar = 1;

//tamanho da area de trabalho
function setup() {
  createCanvas(600,400);
  trilha.loop();
  //inicio.play();
}

//roda em loop os comandos

function draw() {
  background(0);
  mostrarBolinha ();
  movimentaBolinha ();
  verificaColisaoBorda ();
  mostraRaquete (xRaquete, yRaquete);
  mostraRaquete (xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  colisaoRaquete(xRaquete, yRaquete);
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentarRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
  bolinhaNaoFicaPresaOponente();
}

//detalhando as funcoes chamadas no draw

function mostrarBolinha(){
  circle(xBolinha,yBolinha,diametro)
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){velocidadeXBolinha *= -1}
  if (yBolinha +raio > height || yBolinha - raio <0){velocidadeYBolinha *= -1}
}

function mostraRaquete(x,y){
  rect(x,y,RaqueteComprimento, RaqueteAltura)
}

function movimentaMinhaRaquete(){
  if (keyIsDown(87)){
    yRaquete -= 10;
  }

  if (keyIsDown(83)){
    yRaquete += 10;
  }
}

function  colisaoRaquete(x,y){
  Colidiu = collideRectCircle(x, y, RaqueteComprimento, RaqueteAltura, xBolinha, yBolinha, raio);  
  if (Colidiu) {
        velocidadeXBolinha *= -1;
    raquetada.play();
    }
}

function movimentarRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - RaqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}
 // if (keyIsDown(UP_ARROW)){
    //yRaqueteOponente -= 10;
  //}

 //if (keyIsDown(DOWN_ARROW)){
  //  yRaqueteOponente += 10;
//}


function incluiPlacar(){
  stroke (255);
  textAlign(CENTER);
  textSize (18);
  fill(color(0, 100, 0));
  rect (179, 7, 42, 25);
  fill(255);
  text(meusPontos, 200, 26);
  fill(color(0, 100, 0));
  rect (379, 7, 42, 25);
  fill(255);
  text(pontosDoOponente, 400, 26)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
 function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23} 
}
function bolinhaNaoFicaPresaOponente(){
    if (xBolinha - raio > 599){
    xBolinha = 578} 
}

