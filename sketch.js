var tela = 0
var dim_tela_x = 360
var dim_tela_y = 665
var palavras = ["negro","exito","termo","nobre","afeto","plena","etica","sutil","vigor","aquem","porem","fazer","secao","inato","poder","moral","torpe","honra","muito","justo","anexo","futil","etnia","icone","sobre","tange","lapso","expor","haver","habil","amigo","tempo","pesar","avido","entao","bocal","ardil","genro","prole","dizer","tenaz","digno","crivo","saber","apice","brado","animo","comum","culto","temor","sendo","mundo","censo","fugaz","denso","forte","vulgo","estar","pudor","dogma","impor","jeito","ordem","round","pedir","saude","manso","juizo","sabio","ontem","servo","prosa","feliz","presa","coisa","fluir","cunho","forma","meiga","vendo","serio","visar","temer","limbo","acaso","puder","arduo","otica","ciume","igual","humor","ideal","hiato","vacuo","pobre","ambos","claro","terno","velho","fusao","leito","horda","linda","marco","jovem","fonte","velar","ficar","noite","rigor","verso","botar","vazio","cruel","frase","virus","covil","signo","preso","docil","feito","lazer","minha","vetor","arido","flora","impar","maior","vulto","brisa","houve","vasto","setor","adeus","pegar","salvo","seita","prado","livro","comer","plano","rezar","acima","sorte","junto","nunca","chuva","mudar","bando","fugir","prazo","norma","epoca","grupo","tenso","lenda","parte","reino","campo","exijo","sumir","vilao","fixar","preto","voraz","antes","quase","cheio","turva","certa","copia","risco","apego","filho","indio","grave","prova","apelo","nivel","pardo","psico","texto","fenda","ligar","trupe","tocar","lindo","ficha","navio","livre","astro","fraco","etico","verba","conta","autor","lidar","firme","tinha","verbo","bater","fatos","irmao","turvo","macio","deixa","salve","abriu","supor","pique","asilo","rouca","festa","caber","extra","curso","besta","ruina","sexta",,"zelar","video","radio","bioma","feudo","agudo","facto"]
var letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','z','del']
var palavra_escolhida;
var vetor_img_tapas = []
var cont = [0,0,0,0,0,0,0,0]
var fade = [0,0,0,0,0,0]
var delay = [0,0,0,0]
var vetor_obj_letras = []
var vetor_obj_quadros = []
var click_letra = 0
var seg = 0
var mim = 0
var ind_letra_verde = []

function preload(){
  fonte = loadFont('arq/absender.ttf')
  fonte1 = loadFont('arq/noodle.ttf')
  img_fundo = loadImage('arq/fundo.png')
  img_coracao = loadImage('arq/coracao.png')
  logo = loadImage('arq/k18.png')
  plus = loadImage('arq/mais.png')
  plus1 = loadImage('arq/mais1.png')
  ajuda = loadImage('arq/ajuda.png')
  ajuda1 = loadImage('arq/ajuda1.png')
  voltar = loadImage('arq/volte.png')
  voltar1 = loadImage('arq/volte1.png')
  replay = loadImage('arq/replay.png')
  replay1 = loadImage('arq/replay1.png')
  home = loadImage('arq/home.png')
  home1 = loadImage('arq/home1.png')
  x = loadImage('arq/errado.png')
  eu = loadImage('arq/eu.png')
  click = loadSound('arq/click.wav')
  acertou = loadSound('arq/acertou.wav')
  error = loadSound('arq/error.wav')
}

class Quadro{
  constructor(pos_x,pos_y,larg,alt,cor_qd,vazio = true,letra_qd='',tentativa_n_aceita=false){
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.larg = larg;
    this.alt = alt;
    this.cor_qd = cor_qd;
    this.vazio = vazio;
    this.letra_qd = letra_qd
    this.tentativa_n_aceita = tentativa_n_aceita
  }
  
  set_cor_qd(valor){
    this.cor_qd = valor
  }
  set_vazio(valor){
    this.vazio = valor
  }
  
  criar_quadro(){
    push()
    fill(this.cor_qd)
    if (this.tentativa_n_aceita == true) {
      stroke(255, 0, 0)
      strokeWeight(4)
      this.tentativa_n_aceita = false
    }else{
      stroke(0)
      strokeWeight(1)
    }
    rect(this.pos_x,this.pos_y,this.larg,this.alt)
    pop()
    push()
    textSize(60)
    textFont(fonte)
    fill(0)
    text(this.letra_qd,this.pos_x+15,this.pos_y+50)
    pop()
  }
}

class TelaDeJogo{
  constructor(vidas,vetor_obj_quadros,palavra_tentativa="",click_letra=0,linha=0,tentativa_aprovada,ajuda_ativar=false,sobre_mim=false,transicao=false){
    this.vidas = vidas
    this.vetor_obj_quadros = vetor_obj_quadros
    this.palavra_tentativa = palavra_tentativa
    this.click_letra = click_letra
    this.linha = linha
    this.tentativa_aprovada = tentativa_aprovada
    this.ajuda_ativar = ajuda_ativar
    this.sobre_mim = sobre_mim
    this.transicao = transicao
  }
  
  set_palavra_tentativa(valor){
    this.palavra_tentativa += valor
  }
  deset_palavra_tentativa(){
    this.palavra_tentativa = this.palavra_tentativa.substring(0,this.palavra_tentativa.length - 1)
  }
  
  set_click_letra(){
    this.click_letra += 1
  }
  deset_click_letra(){
    this.click_letra -= 1
  }
  set_linha(){
    this.linha += 1
  }
  deset_linha(){
    this.linha -= 1
  }
  set_tentativa_aprovada(valor){
    this.tentativa_aprovada = valor
  }
  
  mostrar_TelaDeJogo(){
    for(var i=0; i<25; i++){
      vetor_obj_quadros[i].criar_quadro()
    }
  }
  
  mostrar_vida(){
    for(var i=0; i<this.vidas; i++){
      image(img_coracao,315-i*30,25)
    }
  }
  
  errou_palavra(){
    this.vidas--;
  }
  
  sortear_palavra(){
    palavra_escolhida = random(palavras)
  }
  
  tentativa(letra){
    if(this.click_letra < 6){
      this.set_palavra_tentativa(letra)
    }
  }
  
  aplicar_tentativa(palavra_escolhida){
    this.analisar_tentativa()
    if(this.tentativa_aprovada == true){
      let c = 0
      let c1 = 0
      let acertos = 0
      let palavra_sem_acertos = ""
      let tentativa_com_erros = ""
      let inds = []
      for(var i=this.linha*5; i<((this.linha+1)*5); i++){
        if(palavra_escolhida[c] == this.palavra_tentativa[i]){
          vetor_obj_quadros[i].set_cor_qd(color(83,230,83))
          this.colorir_letra_teclado(vetor_obj_quadros[i],"verde")
          acertos++
        }else{
          palavra_sem_acertos += palavra_escolhida[c]
          tentativa_com_erros += this.palavra_tentativa[i]
          inds[c1] = i
          c1++
        }
        c++
      }
    
      let nao_tem;
    
      for (var j = 0; j < palavra_sem_acertos.length; j++) {
        for (var k = 0; k < palavra_sem_acertos.length; k++) {
          nao_tem = true
        
          if (tentativa_com_erros[j] == palavra_sem_acertos[k]){
            vetor_obj_quadros[inds[j]].set_cor_qd('yellow')
            this.colorir_letra_teclado(vetor_obj_quadros[inds[j]],"amarelo")
            nao_tem = false
            break
          }
        }
        if(nao_tem == true){
        vetor_obj_quadros[inds[j]].set_cor_qd(color(230,83,83))
        this.colorir_letra_teclado(vetor_obj_quadros[inds[j]],"vermelho")
        }
      }
    
      if(acertos == 5){
        tela = 2
      }else{
        this.errou_palavra()
        if(this.vidas == 0){
          tela = 3
        }
      }
    }else{
      error.play()
      for(var i=this.linha*5; i<((this.linha+1)*5); i++){
        this.apagar_letra()
        this.set_click_letra()
        vetor_obj_quadros[i].tentativa_n_aceita = true
      }
      this.deset_linha()
    }
  }
  
  apagar_letra(){
    for(var i=24; i>=this.linha*5; i--){
      if(vetor_obj_quadros[i].vazio == false){
        vetor_obj_quadros[i].vazio = true
        this.deset_palavra_tentativa()
        vetor_obj_quadros[i].letra_qd = ""
        this.deset_click_letra()
        break
      }
    }
  }
  
  reset(tela){
    tela = tela
    cont[0] = 0
    cont[2] = 0
    cont[3] = 0
    cont[4] = 0
    cont[5] = 0
    cont[6] = 0
    seg = 0
    mim = 0
    for(var i=0;i<25; i++){
      vetor_obj_quadros[i].letra_qd = ""
      vetor_obj_quadros[i].set_cor_qd('white')
      vetor_obj_quadros[i].vazio = true
      this.linha = 0
      this.palavra_tentativa = ""
      this.vidas = 5
      vetor_obj_letras[i].set_cor_letra_tec(false)
      
    }
  }
  
  colorir_letra_teclado(obj,cor){
    for(var i=0; i<25; i++){
      if(vetor_obj_letras[i].texto == obj.letra_qd){
        if(cor == 'vermelho'){
          vetor_obj_letras[i].set_cor_letra_tec(true)
          vetor_obj_letras[i].set_cor_tecla(color(230,83,83))
        }else if (cor == 'amarelo') {
          vetor_obj_letras[i].set_cor_letra_tec(true)
          vetor_obj_letras[i].set_cor_tecla('yellow')
        }else if (cor == 'verde') {
          vetor_obj_letras[i].set_cor_letra_tec(true)
          vetor_obj_letras[i].set_cor_tecla(color(83, 230, 83))
        }
      }
    }
  }
  
  analisar_tentativa(){
    let vogais = ['a','e','i','o','u']
    let consoantes = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','x','z']
    let valeu = true
    let cont;
    
    for(var j=0; j<5; j++){
      cont = 0;
      for(var i=this.linha*5; i<((this.linha+1)*5); i++){
        if(vogais[j] == this.palavra_tentativa[i]){
          cont++;
        }
      }
      if(cont > 1){
        valeu = false
        j = 5
      }
    }
    
    if(valeu == true){
      this.set_tentativa_aprovada(true)
    }else{
      this.set_tentativa_aprovada(false)
    }
  }
  
  tela_ajuda(){
    fill(15, 195, 171, fade[1])
    if (fade[1] < 280) {
      fade[1] += 25
    }
    if(delay[1] > 5){
      if (fade[3] < 250) {
        fade[3] += 40
      }
      push()
      rect(20, 50, 320, fade[3], 10)
      textSize(35)
      textFont(fonte1)
      fill(0, 0, 0, fade[3])
      text('instruções', 125, 100)
      textSize(20)
      text('este jogo e baseado no wordle\n• cada palavra possui 5 letras;\n• As palavras não teram letras repetidas;\n• você terá 5 chances para acertar;\n• sistema de cores:\n•        verde = a letra esta na posição correta;\n•        amarelo = a letra esta na posição errada;\n•        vermelho = não tem a letra na palavra', 40, 140)
      image(x, 305, 55, 30, 30)
      fill('green')
      rect(47.5,248,17,17)
      fill('yellow')
      rect(47.5,274,17,17)
      fill('red')
      rect(47.5,299,17,17)
      pop()
    }else{
      delay[1]++
    }
  }
  
  tela_sobre_mim(){
    fill(15, 195, 171, fade[1])
    if (fade[1] < 520) {
      fade[1] += 40
    }
    rect(20, 50, 320, fade[1], 10)
    if(delay[0] > 5){
      if (fade[2] < 520) {
        fade[2] += 40
      }
      push()
      textSize(35)
      textFont(fonte1)
      fill(0, 0, 0, fade[2])
      text('sobre mim',125,100)
      textSize(20)
      image(x, 305, 55, 30, 30)
      image(eu,95,120)
      textAlign(CENTER)
      text('programador:\ncarlos gabriel medeiros da silva\n\nestudante de ciências e tecnologia na UFRN\niniciante no mundo da programação!\nfuturo engennheiro da computaçao.\n\ngithub: @CarlosG18\ninstagram: @c.gabriel18\nlinkedin: none',180,325)
      pop()
    }else{
      delay[0]++
    }
  }
  
  efeito_transicao(){
    if (cont[2] <= 2) {
      pixelDensity(cont[2])
      cont[2] += 0.02
    }
    
  }
}

const tela_de_jogo = new TelaDeJogo(5,vetor_obj_quadros)
for(var i=0; i<25; i++){
  if(i <= 4){
    vetor_obj_quadros[i] = new Quadro(20+i*64,50,64,62,'white')
  }else if(i <= 9){
    vetor_obj_quadros[i] = new Quadro(20+(i-5)*64,112,64,62,'white')
  }else if(i <= 14){
    vetor_obj_quadros[i] = new Quadro(20+(i-10)*64,174,64,62,'white')
  }else if(i <= 19){
    vetor_obj_quadros[i] = new Quadro(20+(i-15)*64,236,64,62,'white')
  }else{
    vetor_obj_quadros[i] = new Quadro(20+(i-20)*64,298,64,62,'white')
  }
}

class Botao{
  constructor(pos_x,pos_y,texto,cor_txt,cor_bt='',size_txt=40,larg_bt,alt_bt=50,tamPal,on_cor_bt,on_cor_txt,no_on_cor_bt,no_on_cor_txt,cor_letra_tec=false,cor_tecla){
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.texto = texto;
    this.cor_txt = cor_txt;
    this.cor_bt = cor_bt;
    this.larg_bt = larg_bt;
    this.alt_bt = alt_bt;
    this.size_txt = size_txt;
    this.tamPal = tamPal
    this.on_cor_bt = cor_txt
    this.on_cor_txt = cor_bt
    this.no_on_cor_bt = cor_bt
    this.no_on_cor_txt = cor_txt
    this.cor_letra_tec = cor_letra_tec
    this.cor_tecla = cor_tecla
    this.set_tamPal()
    this.set_larg_bt()
  }
  get_cor_bt(){
    return this.cor_bt;
  }
  set_cor_bt(valor){
    this.cor_bt = valor
  }
  set_cor_txt(valor){
    this.cor_txt = valor
  }
  get_cor_txt(){
    return this.cor_txt
  }
  get_tamPal(){
    return this.tamPal
  }
  get_size_bt(){
    return this.size_txt
  }
  set_cor_tecla(valor){
    this.cor_tecla = valor
  }
  set_cor_letra_tec(valor){
    this.cor_letra_tec = valor
  }
  set_larg_bt(){
    this.larg_bt = this.get_tamPal() + (this.get_tamPal() * 0.30)
  }
  set_tamPal(){
    let tam_txt_variavel = this.texto.length * (this.size_txt/2)
      this.tamPal = tam_txt_variavel
  }
  get_on_cor_bt(){
    return this.on_cor_bt
  }
  get_on_cor_txt(){
    return this.on_cor_txt
  }
  get_no_on_cor_bt(){
    return this.no_on_cor_bt
  }
  get_no_on_txt(){
    return this.no_on_cor_txt
  }

  criarBotao(){
    push()
    if(this.cor_letra_tec == false){
      fill(this.cor_bt)
    }else{
      fill(this.cor_tecla)
    }
    rect(this.pos_x,this.pos_y,this.larg_bt,this.alt_bt,10)
    textSize(this.size_txt)
    textFont(fonte)
    if (this.cor_letra_tec == false) {
      fill(this.cor_txt)
    } else {
      fill(0)
    }
    text(this.texto,this.pos_x + (this.get_tamPal() * 0.15),this.pos_y + 38)
    pop()
    this.efeito()
  }
  
  on_botao(){
    this.set_cor_bt(this.get_on_cor_bt())
    this.set_cor_txt(this.get_on_cor_txt())
  }
  
  no_on_botao(){
    this.set_cor_bt(this.get_no_on_cor_bt())
    this.set_cor_txt(this.get_no_on_txt())
  }
  
  efeito(){
    if(mouseX >= this.pos_x && mouseX <= this.pos_x + this.larg_bt && mouseY >= this.pos_y && mouseY <= this.pos_y + this.alt_bt ){
      this.on_botao();
    }else{
      this.no_on_botao()
    }
  }
    
  botao_clicado(){
    tela_de_jogo.set_click_letra()
    if(tela_de_jogo.click_letra < 6){
      tela_de_jogo.tentativa(this.texto)
      for(var i=0; i<25; i++){
        if(vetor_obj_quadros[i].vazio == true){
          vetor_obj_quadros[i].vazio = false
          vetor_obj_quadros[i].letra_qd = this.texto
          break
        }
      }
    }
  }
}

class Teclado{
  constructor(letras,vetor_obj_letras){
    this.letras = letras
    this.vetor_obj_letras = vetor_obj_letras
  }
  
  mostrar_teclado(){
    for(var i=0; i<this.letras.length; i++){
      this.vetor_obj_letras[i].criarBotao()
    }
  }
}

const botao_iniciar = new Botao(110,270,'Start','black','white')
const botao_confirmar = new Botao(57.5,575,'confirmar','white','green')
const teclado = new Teclado(letras,vetor_obj_letras)
for (var i = 0; i < letras.length; i++) {
  if (i <= 9) {
    vetor_obj_letras[i] = new Botao((20 + i * 32.5), 375, this.letras[i], 'black', 'white')
  } else if (i <= 19) {
    vetor_obj_letras[i] = new Botao((20 + (i - 10) * 32.5), 435, this.letras[i], 'black', 'white')
  } else {
    vetor_obj_letras[i] = new Botao((70 + (i - 20) * 32.5), 495, this.letras[i], 'black', 'white')
  }
}
const botao_tentar_dnv = new Botao(12.5,350,'tentar novamente','black','white',32.5)


function setup() {
  cc = createCanvas(dim_tela_x,dim_tela_y);
  cc.parent("box_game");
  frameRate(60)
  colorMode(RGB,255)
}

function draw() {
  if(tela == 0){ // tela inicial
    tela_de_jogo.efeito_transicao()
    image(img_fundo,0,0)
    push()
    textSize(80)
    textFont(fonte)
    fill(0,0,0,fade[0])
    if(fade[0] < 300){
      fade[0]+=4
    }
    text('LETROX',60,250)
    pop()
    image(logo,153,600,50,50)
    push()
    textSize(20)
    textFont(fonte1)
    fill(0)
    text('GAMES',160,660)
    pop()
    image(plus,325,5,25,25)
    if (mouseX >= 325 && mouseX <= 350 && mouseY >= 5 && mouseY <= 30) {
      image(plus1, 325, 5, 25, 25)
    }
    image(ajuda,152.5,360,50,50)
    if (mouseX >= 152.5 && mouseX <= 202.5 && mouseY >= 360 && mouseY <= 410) {
      image(ajuda1,152.5,360,50,50)
    }
    
    botao_iniciar.criarBotao();
    
    if(tela_de_jogo.ajuda_ativar == true){
      tela_de_jogo.tela_ajuda()
    }
    
    if(tela_de_jogo.sobre_mim == true){
      tela_de_jogo.tela_sobre_mim()
    }
    
  }else if(tela == 1){// tela de jogo
    if(frameCount % 40 == 0){
      seg++
    }
    if(seg % 60 == 0 && seg != 0){
        mim += 1
        seg = 0
    }
    
    if(cont[3] <= 2){
      pixelDensity(cont[3])
      cont[3] += 0.02
    }
    image(img_fundo,0,0)
    botao_confirmar.criarBotao()
    teclado.mostrar_teclado()
    if(cont[0] == 0){
      tela_de_jogo.sortear_palavra()
    }
    if(cont[0] < 5){
      cont[0]++
    }
    tela_de_jogo.mostrar_TelaDeJogo()
    tela_de_jogo.mostrar_vida()
    
    image(voltar,20,10,30,30)
    if (mouseX >= 20 && mouseX <= 50 && mouseY >= 10 && mouseY <= 40) {
      image(voltar1,20,10,30,30)
    }
    
  }else if(tela == 2){//tela de vitoria
    if(cont[6] == 0){
      acertou.play()
    }
    if(cont[6] < 2){
      cont[6]++
    }
    if (cont[4] <= 2) {
      pixelDensity(cont[4])
      cont[4] += 0.02
    }
    
    image(img_fundo,0,0)
    push()
    textSize(60)
    textFont(fonte1)
    fill('green')
    text('você acertou!',50,230)
    pop()
    push()
    textSize(30)
    textFont(fonte1)
    fill(0)
    text(`• tempo total: ${mim}mim:${seg}s`,75,280)
    text(`• tentativas usadas:  ${tela_de_jogo.linha}`,75,320)
    pop()
    
    image(replay,115,340,50,50)
    if (mouseX >= 115 && mouseX <= 165 && mouseY >= 340 && mouseY <= 390) {
      image(replay1, 115, 340, 50, 50)
    }
    image(home,195,338,52.5,52.5)
    if (mouseX >= 195 && mouseX <= 247.5  && mouseY >= 338 && mouseY <= 390.5) {
      image(home1, 195, 338, 52.5, 52.5)
    }
    
  }else if(tela == 3){//tela de derrota
    if (cont[5] <= 2) {
      pixelDensity(cont[5])
      cont[5] += 0.02
    }
    image(img_fundo,0,0)
    push()
    textSize(50)
    textFont(fonte)
    fill(0)
    text('Voce perdeu',42.5,200)
    fill('green')
    textFont(fonte1)
    text('a palavra certa era:',25,260)
    textSize(70)
    fill('red')
    textFont(fonte)
    text(palavra_escolhida,90,330)
    pop()
    
    image(replay, 115, 340, 50, 50)
    if (mouseX >= 115 && mouseX <= 165 && mouseY >= 340 && mouseY <= 390) {
      image(replay1, 115, 340, 50, 50)
    }
    image(home, 195, 338, 52.5, 52.5)
    if (mouseX >= 195 && mouseX <= 247.5 && mouseY >= 338 && mouseY <= 390.5) {
      image(home1, 195, 338, 52.5, 52.5)
    }
    
  }
}

function mouseClicked(){
  if(tela == 0){
    if (mouseX >= botao_iniciar.pos_x && mouseX <= botao_iniciar.pos_x + botao_iniciar.larg_bt && mouseY >= botao_iniciar.pos_y && mouseY <= botao_iniciar.pos_y + botao_iniciar.alt_bt) {
      if(tela_de_jogo.ajuda_ativar == false && tela_de_jogo.sobre_mim == false){
        click.play()
        tela = 1
      }
    }else if (mouseX >= 152.5 && mouseX <= 202.5 && mouseY >= 360 && mouseY <= 410) {
      click.play()
      tela_de_jogo.ajuda_ativar = true
    }else if (mouseX >= 325 && mouseX <= 350 && mouseY >= 5 && mouseY <= 30) {
      tela_de_jogo.sobre_mim = true
      click.play()
    }else if (mouseX >= 305 && mouseX <= 340 && mouseY >= 55 && mouseY <= 85) {
      if(tela_de_jogo.ajuda_ativar == true || tela_de_jogo.sobre_mim == true){
        click.play()
        fade[1] = 0
        fade[2] = 0
        fade[3] = 0
        delay[0] = 0
        delay[1] = 0
        tela_de_jogo.ajuda_ativar = false
        tela_de_jogo.sobre_mim = false
      }
    }
    
    
  }else if(tela == 1){
    if (mouseX >= vetor_obj_letras[0].pos_x && mouseX <= vetor_obj_letras[0].pos_x + vetor_obj_letras[0].larg_bt && mouseY >= vetor_obj_letras[0].pos_y && mouseY <= vetor_obj_letras[0].pos_y + vetor_obj_letras[0].alt_bt) {
      click.play()
      vetor_obj_letras[0].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[1].pos_x && mouseX <= vetor_obj_letras[1].pos_x + vetor_obj_letras[1].larg_bt && mouseY >= vetor_obj_letras[1].pos_y && mouseY <= vetor_obj_letras[1].pos_y + vetor_obj_letras[1].alt_bt) {
      click.play()
      vetor_obj_letras[1].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[2].pos_x && mouseX <= vetor_obj_letras[2].pos_x + vetor_obj_letras[2].larg_bt && mouseY >= vetor_obj_letras[2].pos_y && mouseY <= vetor_obj_letras[2].pos_y + vetor_obj_letras[2].alt_bt) {
      click.play()
      vetor_obj_letras[2].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[3].pos_x && mouseX <= vetor_obj_letras[3].pos_x + vetor_obj_letras[3].larg_bt && mouseY >= vetor_obj_letras[3].pos_y && mouseY <= vetor_obj_letras[3].pos_y + vetor_obj_letras[3].alt_bt) {
      click.play()
      vetor_obj_letras[3].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[4].pos_x && mouseX <= vetor_obj_letras[4].pos_x + vetor_obj_letras[4].larg_bt && mouseY >= vetor_obj_letras[4].pos_y && mouseY <= vetor_obj_letras[4].pos_y + vetor_obj_letras[4].alt_bt) {
      click.play()
      vetor_obj_letras[4].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[5].pos_x && mouseX <= vetor_obj_letras[5].pos_x + vetor_obj_letras[5].larg_bt && mouseY >= vetor_obj_letras[5].pos_y && mouseY <= vetor_obj_letras[5].pos_y + vetor_obj_letras[5].alt_bt) {
      click.play()
      vetor_obj_letras[5].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[6].pos_x && mouseX <= vetor_obj_letras[6].pos_x + vetor_obj_letras[6].larg_bt && mouseY >= vetor_obj_letras[6].pos_y && mouseY <= vetor_obj_letras[6].pos_y + vetor_obj_letras[6].alt_bt) {
      click.play()
      vetor_obj_letras[6].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[7].pos_x && mouseX <= vetor_obj_letras[7].pos_x + vetor_obj_letras[7].larg_bt && mouseY >= vetor_obj_letras[7].pos_y && mouseY <= vetor_obj_letras[7].pos_y + vetor_obj_letras[7].alt_bt) {
      click.play()
      vetor_obj_letras[7].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[8].pos_x && mouseX <= vetor_obj_letras[8].pos_x + vetor_obj_letras[8].larg_bt && mouseY >= vetor_obj_letras[8].pos_y && mouseY <= vetor_obj_letras[8].pos_y + vetor_obj_letras[8].alt_bt) {
      click.play()
      vetor_obj_letras[8].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[9].pos_x && mouseX <= vetor_obj_letras[9].pos_x + vetor_obj_letras[9].larg_bt && mouseY >= vetor_obj_letras[9].pos_y && mouseY <= vetor_obj_letras[9].pos_y + vetor_obj_letras[9].alt_bt) {
      click.play()
      vetor_obj_letras[9].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[10].pos_x && mouseX <= vetor_obj_letras[10].pos_x + vetor_obj_letras[10].larg_bt && mouseY >= vetor_obj_letras[10].pos_y && mouseY <= vetor_obj_letras[10].pos_y + vetor_obj_letras[10].alt_bt) {
      click.play()
      vetor_obj_letras[10].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[11].pos_x && mouseX <= vetor_obj_letras[11].pos_x + vetor_obj_letras[11].larg_bt && mouseY >= vetor_obj_letras[11].pos_y && mouseY <= vetor_obj_letras[11].pos_y + vetor_obj_letras[11].alt_bt) {
      click.play()
      vetor_obj_letras[11].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[12].pos_x && mouseX <= vetor_obj_letras[12].pos_x + vetor_obj_letras[12].larg_bt && mouseY >= vetor_obj_letras[12].pos_y && mouseY <= vetor_obj_letras[12].pos_y + vetor_obj_letras[12].alt_bt) {
      click.play()
      vetor_obj_letras[12].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[13].pos_x && mouseX <= vetor_obj_letras[13].pos_x + vetor_obj_letras[13].larg_bt && mouseY >= vetor_obj_letras[13].pos_y && mouseY <= vetor_obj_letras[13].pos_y + vetor_obj_letras[13].alt_bt) {
      click.play()
      vetor_obj_letras[13].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[14].pos_x && mouseX <= vetor_obj_letras[14].pos_x + vetor_obj_letras[14].larg_bt && mouseY >= vetor_obj_letras[14].pos_y && mouseY <= vetor_obj_letras[14].pos_y + vetor_obj_letras[14].alt_bt) {
      click.play()
      vetor_obj_letras[14].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[15].pos_x && mouseX <= vetor_obj_letras[15].pos_x + vetor_obj_letras[15].larg_bt && mouseY >= vetor_obj_letras[15].pos_y && mouseY <= vetor_obj_letras[15].pos_y + vetor_obj_letras[15].alt_bt) {
      click.play()
      vetor_obj_letras[15].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[16].pos_x && mouseX <= vetor_obj_letras[16].pos_x + vetor_obj_letras[16].larg_bt && mouseY >= vetor_obj_letras[16].pos_y && mouseY <= vetor_obj_letras[16].pos_y + vetor_obj_letras[16].alt_bt) {
      click.play()
      vetor_obj_letras[16].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[17].pos_x && mouseX <= vetor_obj_letras[17].pos_x + vetor_obj_letras[17].larg_bt && mouseY >= vetor_obj_letras[17].pos_y && mouseY <= vetor_obj_letras[17].pos_y + vetor_obj_letras[17].alt_bt) {
      click.play()
      vetor_obj_letras[17].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[18].pos_x && mouseX <= vetor_obj_letras[18].pos_x + vetor_obj_letras[18].larg_bt && mouseY >= vetor_obj_letras[18].pos_y && mouseY <= vetor_obj_letras[18].pos_y + vetor_obj_letras[18].alt_bt) {
      click.play()
      vetor_obj_letras[18].botao_clicado()
    }else if (mouseX > vetor_obj_letras[19].pos_x && mouseX <= vetor_obj_letras[19].pos_x + vetor_obj_letras[19].larg_bt && mouseY >= vetor_obj_letras[19].pos_y && mouseY <= vetor_obj_letras[19].pos_y + vetor_obj_letras[19].alt_bt) {
      click.play()
      vetor_obj_letras[19].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[20].pos_x && mouseX <= vetor_obj_letras[20].pos_x + vetor_obj_letras[20].larg_bt && mouseY >= vetor_obj_letras[20].pos_y && mouseY <= vetor_obj_letras[20].pos_y + vetor_obj_letras[20].alt_bt) {
      click.play()
      vetor_obj_letras[20].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[21].pos_x && mouseX <= vetor_obj_letras[21].pos_x + vetor_obj_letras[21].larg_bt && mouseY >= vetor_obj_letras[21].pos_y && mouseY <= vetor_obj_letras[21].pos_y + vetor_obj_letras[21].alt_bt) {
      click.play()
      vetor_obj_letras[21].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[22].pos_x && mouseX <= vetor_obj_letras[22].pos_x + vetor_obj_letras[22].larg_bt && mouseY >= vetor_obj_letras[22].pos_y && mouseY <= vetor_obj_letras[22].pos_y + vetor_obj_letras[22].alt_bt) {
      click.play()
      vetor_obj_letras[22].botao_clicado()
    }else if (mouseX >= vetor_obj_letras[23].pos_x && mouseX <= vetor_obj_letras[23].pos_x + vetor_obj_letras[23].larg_bt && mouseY >= vetor_obj_letras[23].pos_y && mouseY <= vetor_obj_letras[23].pos_y + vetor_obj_letras[23].alt_bt) {
      click.play()
      vetor_obj_letras[23].botao_clicado()
    }else if (mouseX >= botao_confirmar.pos_x && mouseX <= botao_confirmar.pos_x + botao_confirmar.larg_bt && mouseY >= botao_confirmar.pos_y && mouseY <= botao_confirmar.pos_y + botao_confirmar.alt_bt) {
      if(tela_de_jogo.click_letra >= 5){
        click.play()
        tela_de_jogo.click_letra = 0
        tela_de_jogo.aplicar_tentativa(palavra_escolhida)
        tela_de_jogo.set_linha()
      }
    }else if (mouseX >= vetor_obj_letras[24].pos_x && mouseX <= vetor_obj_letras[24].pos_x + vetor_obj_letras[24].larg_bt && mouseY >= vetor_obj_letras[24].pos_y && mouseY <= vetor_obj_letras[24].pos_y + vetor_obj_letras[24].alt_bt) {
      click.play()
      tela_de_jogo.apagar_letra()
    }else if (mouseX >= 20 && mouseX <= 50 && mouseY >= 10 && mouseY <= 40) {
      click.play()
      tela = 0
      tela_de_jogo.reset()
    }
  }else if(tela == 2){
    if (mouseX >= 115 && mouseX <= 165 && mouseY >= 340 && mouseY <= 390) {
      click.play()
      tela_de_jogo.reset()
      tela = 1
    }
    if (mouseX >= 195 && mouseX <= 247.5 && mouseY >= 338 && mouseY <= 390.5) {
      click.play()
      tela_de_jogo.reset()
      tela = 0
    }
  }else if(tela == 3){
    if (mouseX >= 115 && mouseX <= 165 && mouseY >= 340 && mouseY <= 390) {
      click.play()
      tela_de_jogo.reset()
      tela = 1
    }
    if (mouseX >= 195 && mouseX <= 247.5 && mouseY >= 338 && mouseY <= 390.5) {
      click.play()
      tela_de_jogo.reset()
      tela = 0
    }
  }
}
