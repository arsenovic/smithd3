
var smith = {
  version: "0.1"
  }
  
smith.chart = function(){
  // smith chart options
  this.radius = 1
  this.type = 'z'// 'z' or 'y' 
  this.flipme = 1 
  if (this.type == 'y'){this.flipme = -1}
  
  
  this.strokeWidth = 2
  // svg options
  this.pad = 20 
  this.width = 500 
  this.height = this.width
  this.ZERO = 1e-5
  // these need to be dynamic based on a zoom level
  this.rValues =[0, 0.2, 0.5,1, 2.0, 5.0 ]
  this.xValues = [ 0.2, 0.5, 1, 2.0 , 5.0,-0.2, -0.5,-1,  -2.0, -5.0 ]
  
  //\\this.rCircles = this.rValues.map(function(d){return new this.rCircle(d,1)})
  this.xCircles = this.xValues.map(function(d){
    return new smith.xCircle(d,this.flipme)})
    
  this.rCircles = this.rValues.map(function(d){
    return new smith.rCircle(d,1)})
    }
  
  
smith.chart.prototype.xyScale = function (){
  return d3.scale.linear()
           .domain([-this.radius, this.radius])
           .range([this.pad, this.width-this.pad]);
  };
smith.chart.prototype.rScale = function (){
  return d3.scale.linear()
           .domain([0, this.radius])
           .range([0, (this.width-2*this.pad)/2]);
      }; 


  // circles of constant Resistance 
smith.rCircle = function(R, s){
  this.R = R 
  this.flipme=s
  this.s = s
  };
smith.rCircle.prototype.x = function(){
      return this.R/(1+this.R)*this.flipme};

smith.rCircle.prototype.y = function(){
      return 0};

smith.rCircle.prototype.r = function(){
      return 1/(1+this.R)};

  // circles of constant Reactance  
smith.xCircle = function(X, flipme){
  this.X = X
  this.flipme=flipme
  };    
smith.xCircle.prototype.x = function(){
      return (1*this.flipme)};
smith.xCircle.prototype.y = function(){
      return (1/this.X)};
smith.xCircle.prototype.r = function(){
      return (Math.abs(1/this.X))};

    



smith.chart.prototype.draw = function(svg){    
    
    svg.attr('width',this.width)
        .attr('height',this.height)
        .attr('fill', 'rgba(0,0,0,0)')
        .attr('stroke','black')
        .attr('stroke-width',this.strokeWidth);
    
    
    svg.selectAll('circle.x')
        .data(this.xCircles)
        .enter()
        .append('circle')							 
        .attr('class','x')
        .attr('stroke','grey')
        .attr('cx',function(d){return d.cx()})
        .attr('cy',function(d){return d.cy()})
        .attr('r',function(d){return d.radius()});
        
    svg.selectAll('circle.r')
        .data(this.rCircles)
        .enter()
        .append('circle')							 
        .attr('class','r')
        .attr('stroke','grey')
        .attr('cx',function(d){return d.cx()})
        .attr('cy',function(d){return d.cy()})
        .attr('r',function(d){return d.radius()});
    
    clipCircle = new rCircle(0,1)
    svg.append('clipPath')
        .attr('id','chart-area')
        .append('circle')
        .attr('cx',clipCircle.cx())
        .attr('cy',clipCircle.cy())
        .attr('r',clipCircle.radius()+this.strokeWidth/2);   
    
    svg.selectAll(['.x','.r'])
        .attr("clip-path", "url(#chart-area)")
    };


