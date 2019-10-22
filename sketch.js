let coffee;

let palette = ["#1C9156","#12591D","#95673C","#FFFFFF","#197327"];

let frame = 0;
let animRate = 20;
let n = "visual1";

let canvas_size;
// load csv data
function preload() {
  coffee = loadTable("data/coffee.csv", "csv", "header")
  canvas_size = Math.min(windowWidth,windowHeight);
}

function setup() {
  createCanvas(canvas_size, canvas_size);
}

//switch visualizations
function mousePressed(e) {
// Initialize values
  frame = 0;
  //n = visuals reconized with id from buttons
  n = e.target.id;
  if (n == "visual1")
  {
    resizeCanvas(canvas_size,canvas_size)
  }
  else if (n == "visual2")
  {
    resizeCanvas(800,400)
  }
  // else {
  //
  //   // visual3();
  // }
}

function draw() {

  //switching visualizations based on id of button pressed
  if (n == "visual1")
  {
    visual1();
  }
  else if (n == "visual2")
  {
    visual2();
  }
  // else {
  //
  //   visual3();
  // }
}

let date;
let cups;

function visual1()
{

  if(cups<=2)
  {
  background(palette[0])
} else {
  background(palette[4])

}



  const cupHeight = canvas_size*.7;
  const cupWidth = canvas_size*.4;
  const cupTop = 1.1;
  const cupBot = .8;
  const gap = 5;


  const cupY = (height+cupHeight)*.5
  const cupX1 = (width-cupWidth)*.5
  const cupX2 = (width-cupWidth*cupBot)*.5


  //empty cup
  fill(palette[1]);
  stroke(0);
  strokeWeight(3);
  beginShape();
  vertex((width-cupWidth*cupTop)*.5,cupY-cupHeight);
  vertex(cupX1,cupY-cupHeight);
  vertex(cupX2,cupY);
  vertex(cupX2+cupWidth*cupBot,cupY);
  vertex(cupX1+cupWidth,cupY-cupHeight);
  vertex((width+cupWidth*cupTop)*.5,cupY-cupHeight);
  endShape();




  if (frameCount % animRate == 0 )
  {
    //get data
    date = +coffee.getRow(frame).get('Date');
    cups = +coffee.getRow(frame).get('Cups');

    frame++;
  }


    //timeLine
    line(canvas_size*.1, canvas_size*.95, canvas_size*.9, canvas_size*.95);
    let elX = canvas_size*(.1+.8*map(date,10,23,0,1));
    let elY = canvas_size*.95
    ellipse(elX,elY,10,10);
    noStroke();
    fill(palette[3])
    let t = "Sep,"+date;
    text(t,elX-10,elY-10);

    //data
    let dataHeight
    let widthAdjust
    if(cups>0&&cups<=6)
    {
      dataHeight=cupHeight/6*cups;
      widthAdjust = .5*cupWidth*(1-cupBot)/6*(6-cups)
    }
    else if (cups == 0)
    {
      dataHeight=cupHeight/6*0.1;
      widthAdjust = .5*cupWidth*(1-cupBot)/6*(6-0.1)
    }




      //draw cup

      noStroke();
      fill(palette[2]);
      beginShape();
      vertex(cupX1+widthAdjust+gap,cupY-dataHeight+gap);
      vertex(cupX2+gap,cupY-gap);
      vertex(cupX2+cupWidth*cupBot-gap,cupY-gap);
      vertex(cupX1+cupWidth-widthAdjust-gap,cupY-dataHeight+gap);
      endShape();

      stroke(200,80);
      line((width-cupWidth*cupTop)*.5,cupY-cupHeight/6*2,(width+cupWidth*cupTop)*.5,cupY-cupHeight/6*2);
      noStroke();
      fill(0);
      text("2",(width+cupWidth*cupTop)*.5+5,cupY-cupHeight/6*2);

  if (frame >= coffee.getRowCount())
  {
    frame = 0;
  }

}


function visual2()
{
  background("#197327");

  let margin = 50;
  let xdist = (width -  margin) / coffee.getRowCount();




  for (var k = 0; k < coffee.getRowCount(); k++)
  {
    const date = +coffee.getRow(k).get('Date');
    const cups = +coffee.getRow(k).get('Cups');

    let x =  margin + xdist * k;
    let y = height*noise(k+100);
    //consentric stain
    for (var j = 0; j < 40; j+=1) {

      let c = color(palette[2]);
      c.setAlpha(100);
      stroke(c);
      strokeWeight(j);
      if (j == 0){
        fill(c);
      }else{
        noFill();
      }
      c.setAlpha(30);
      let r = 40*Math.sqrt(cups)-j*.4;
      beginShape();
      //draw one stain
      for (var i = 0; i < 2*PI; i+=.05)
      {
        let offset
        if (i < PI)
        {
          offset = (1+noise(i+j+k)*i*.2)
        }else{
          offset = (1+noise(i+j+k)*(2*PI-i)*.2)
        }
        vertex(x+r*offset*cos(i),y+r*offset*sin(i));
      }
      endShape(CLOSE);
    }
  }
  for (var k = 0; k < coffee.getRowCount(); k++)
  {
    const date = +coffee.getRow(k).get('Date');
    let x =  margin + xdist * k;
    let y = height*noise(k+100);
    noStroke();
    fill(palette[3]);
    let t = "Sep,"+date;
    text(t,x,y);
  }
}
