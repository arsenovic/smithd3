
var smith = {
  version: "0.1"
  }
smith.chart = function(){  
  // smith chart options
  this.radius = 1
  var chartType = 'z'// 'z' or 'y' 
  this.strokeWidth = 2
  // svg options
  var pad = 20 
  var width = 500 
  var height = width
  var ZERO = 1e-5
  
  
  var r =[ 0,1,0.2, 0.5, 2.0, 5.0 ]
  var x = [ 1,-1,0.2, 0.5,  2.0 , 5.0, -0.2, -0.5,  -2.0, -5.0 ]

  smith.chart.prototype.zoom = function(radius){
  
  xyScale = d3.scale.linear()
      .domain([-radius, radius])
      .range([pad, width-pad]);
  rScale = d3.scale.linear()
      .domain([0, radius])
      .range([0, (width-2*pad)/2]); 
  
  svg.selectAll('.r')
       .transition()
       .attr('cx',Rcx)
       .attr('cy',Rcy)
       .attr('r',Rr);
  svg.selectAll('.x')
       .transition()
       .attr('cx',Xcx)
       .attr('cy',Xcy)
       .attr('r',Xr);

  }
  smith.chart.prototype.draw = function(svg){  
    xyScale = d3.scale.linear()
            .domain([-this.radius, this.radius])
            .range([pad, width-pad]);
    
    rScale = d3.scale.linear()
            .domain([0, this.radius])
            .range([0, (width-2*pad)/2]); 
    
    var flipme = 1 
    if (chartType == 'y'){flipme = -1};
    
    
    
    Rcx = function(r){
        return xyScale(r/(1+r)*flipme)
        };
    Rcy = function(r){
        return xyScale(0)
        };
    Rr = function(r){
        return rScale(1/(1+r))
        };
    Xcx = function(x){
        return xyScale(1*flipme)
        };
    Xcy = function(x){
        if (x==0){x =ZERO};
        return xyScale(1/x)
        };
    Xr = function(x){
        if (x==0){x =ZERO};
        return rScale(Math.abs(1/x))
        };
    
    svg.attr('width',width)
      .attr('height',height)
      .attr('fill', 'rgba(0,0,0,0)')
      .attr('stroke','black')
      .attr('stroke-width',this.strokeWidth);
        
        
    svg.append('clipPath')
      .attr('id','chart-area')
      .append('circle')
      .attr('cx',Rcx(0))
      .attr('cy',Rcy(0))
      .attr('r',rScale(this.radius)+this.strokeWidth/2);
    
    var rCircles = svg.selectAll('circle.r')
                       .data(r)
                       .enter()
                       .append('circle')
                       .attr('class','r')
                       .attr('stroke','grey')
                       .attr('cx',Rcx)
                       .attr('cy',Rcy)
                       .attr('r',Rr);
    
                 
    
    var xCircles = svg.selectAll('circle.x')
                       .data(x)
                       .enter()
                       .append('circle')							 
                       .attr('class','x')
                       .attr('stroke','grey')
                       .attr('cx',Xcx)
                       .attr('cy',Xcy)
                       .attr('r',Xr);
    
  }
      

}

