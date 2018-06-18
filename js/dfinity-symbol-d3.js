/**
 * @file DfinitySymbolD3
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

/**
 * This class draws the DFINITY logo infinity symbol using a d3 force-directed graph.
 */
class DfinitySymbolD3 {
  /**
   * Create a DfinitySymbolD3 object.
   * @constructor
   * @param {Element} element Element which contains the symbol.
   */
  constructor(element, addNewBlockCallback) {
    // Save parameters.
    this.element = element;
    this.addNewBlockCallback = addNewBlockCallback;

    // A force-directed graph can be a difficult beast to tame. Most changes to settings in this
    // class will likely change the shape of the graph and require changing other settings through
    // trial and error in order to get the graph back to the DFINITY logo shape. Any number of the
    // settings below could be made into constructor parameters. Another idea would be to pre-define
    // different groups of settings that produce a shape which approximates the DFINITY logo
    // shape, and then allow the caller to specify which group of settings to use. Since there is
    // currently only one group of settings defined, settings groups would not currently be useful.

    // Code is customized for this window size. Modifying these values will cause the d3 force-
    // directed graph to change shape unless scaleToWindow is adjusted to keep the object the same
    // size.
    this.width = 800;
    this.height = 400;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.scaleToWindow = this.width / 2 * 0.8;

    // Specify the number of symbol nodes and the number of vertices for each symbol node. The
    // current values of 36 symbol nodes and 8 vertices (octagon) was arrived at after trial and
    // error to produce a shape which resembles the DFINITY logo.
    this.numSymbolNodes = 36;
    this.numVertices = 8;
    this.numNodes = this.numSymbolNodes * this.numVertices;

    // Specify the charge of the symbol nodes and the non-symbol nodes. "A positive value causes
    // nodes to attract each other, similar to gravity, while a negative value causes nodes to
    // repel each other, similar to electrostatic charge." The default value is -30, but we specify
    // much lower in magnitude values because we do not want the nodes to repel very much. For the
    // fixed nodes which draw the infinity symbol, we do not want any force at all.
    this.forceManyBodyStrengthSymbolNodes = 0;
    this.forceManyBodyStrengthNonSymbolNodes = -9;

    // Specify the link distance. "The link force pushes linked nodes together or apart according to
    // the desired link distance." The default value is 30.
    this.linkDistance = 14;

    // Specify node and link drawing properties.
    this.nodeRadius = 4.5;
    this.nodeRadiusSelected = 5.5;
    this.nodeFillColor = "rgb(127, 127, 127)";
    this.nodeFillColorSelected = "rgb(255, 255, 255)";
    this.nodeStrokeColorSelected = "rgb(255, 255, 255)";
    this.nodeOpacity = 0.5;
    this.nodeOpacitySelected = 0.75;
    this.linkStrokeWidth = 2; // why do lines get blurry when this is increased?
    this.glowStdDeviation = 4;

    // Adjust the symbolHeightMultiplier to make the symbol shorter or taller. A value of 1.0
    // represents normal height.
    this.symbolHeightMultiplier = 1.111111;

    // The initial rotateOffset does two things: it determines which part of the symbol goes in
    // front (blue is on top in the DFINITY logo), and it makes a small adjustment to align the
    // colors correctly.
    this.rotateOffset = this.numSymbolNodes / 2 - 1.2;

    // The rotate interval frequency.
    this.rotateTimeMs = 33.3; // 30 frames/sec max

    // The amount of rotation for every rotate interval.
    this.rotateAmount = 0.00001;

    // The block time.  
    this.blockTimeMs = 3500;

    // The currently selected node index.
    this.selectedNodeIndex = -1;
  }

  /**
   * Draw the DFINITY logo infinity symbol.
   * @public
   */
  draw() {
    // Set up the nodes and links of the graph.
    this.addNodes();
    this.addLinks();

    // Create the d3 simulation.
    this.createSimulation();

    // Set up SVG to draw the simulation.
    this.setupSvg();
  }

  /**
   * Populate nodes_data[] with the nodes of the graph.
   * @private
   */
  addNodes() {
    // Add the symbol nodes to nodes_data[] at fixed positions (fx, fy). _fx and _fy save the fixed
    // position across drag/drop operations, linkCount is used to calculate the strength of the
    // force of a link.
    this.nodes_data = [];
    for (let i = 0; i < this.numSymbolNodes; i++) {
      const pos = this.getNodePosition(i);
      this.nodes_data.push({
        "fx" : pos[0],
        "fy" : pos[1],
        "_fx" : pos[0],
        "_fy" : pos[1],
        "linkCount" : 0});
    }

    // Add the non-symbol nodes at non-fixed positions.
    for (let i = this.numSymbolNodes; i < this.numNodes; i++) {
      this.nodes_data.push({"linkCount" : 0});
    }
  }

  /**
   * Get the position of the node with the specified index.
   * @param {Number} index The node index.
   * @return {Object} An array containing the [x, y] position of the node.
   * @private
   */
  getNodePosition(index) {
    const t =
      2 * Math.PI * ((index + this.rotateOffset) % this.numSymbolNodes) / this.numSymbolNodes;
    const scale = 2 / (3 - Math.cos(2 * t));
    const fx = this.centerX + scale * Math.cos(t) * this.scaleToWindow;
    const fy =
      this.centerY +
      scale * Math.sin(2 * t) * this.symbolHeightMultiplier / 2 * this.scaleToWindow;
    return [fx, fy];
  }

  /**
   * Populate links_data[] with the links of the graph.
   * @private
   */
  addLinks() {
    this.links_data = [];
    for (let i = 0; i < this.numSymbolNodes; i++) {   
      // Define the ith link of the symbol.
      const indexSymbol = i;
      const indexSymbolNext = (i + 1) % this.numSymbolNodes;
      this.addLink(indexSymbol, indexSymbolNext, 0, 1);
           
      // Link at top of shape, parallel to symbol link, invisible.
      const vertexShapeTop = this.numVertices / 2;
      const indexShapeTop = vertexShapeTop * this.numSymbolNodes + i;
      const indexShapeTopNext =
        vertexShapeTop * this.numSymbolNodes + (i + 1) % this.numSymbolNodes;
      this.addLink(indexShapeTop, indexShapeTopNext, 1, 0);
      
      // Cross bar, invisible. This pulls the graph in and provides stability. Rather than linking
      // the cross bar from the link at top of shape to the symbol index, we link it from the shape
      // node prior. Found that this produces a more interesting graph. Note that previously this
      // code was in the for loop below and executed when j === 3, but with the same parameters to
      // addLink(). This produced a slightly different/thicker graph.
      const vertexShapeAlmostTop = vertexShapeTop - 1;
      const indexShapeAlmostTop = vertexShapeAlmostTop * this.numSymbolNodes + i;
      this.addLink(indexShapeAlmostTop, indexSymbol, 1, 0);
      
      for (let j = 0; j < this.numVertices; j++) {     
        // Define the jth link of the shape (e.g., if numVertices is 6, shape is 6-sided polygon).
        const index = j * this.numSymbolNodes + i;
        const indexShapeNext = (index + this.numSymbolNodes) % this.numNodes;
        this.addLink(index, indexShapeNext, 0, 0.7);
      
        // Define the jth link of the spiral which spirals around the shapes. Two spirals are used
        // for better stability.
        const indexSpiralNext =
          (j + 1) % this.numVertices * this.numSymbolNodes + (i + 1) % this.numSymbolNodes;            
        this.addLink(index, indexSpiralNext, 0.65, 0.5);
        this.addLink(index, indexSpiralNext, 0.65, 0.5);
      }
    }
  }

  /**
   * Add a link of the graph to links_data[].
   * @param {Number} indexSource The index of the source node of the link.
   * @param {Number} indexTarget The index of the target node of the link.
   * @param {Number} The strength of the link, or 0 for use default strength.
   * @param {Number} opacity The opacity of the link.
   * @private
   */
  addLink(indexSource, indexTarget, strength, opacity) {
    this.links_data.push({
      "source": indexSource.toString(),
      "target": indexTarget.toString(),
      "_strength" : strength,
      "opacity" : opacity,
      "_opacity" : opacity});
    this.nodes_data[indexSource].linkCount++;
    this.nodes_data[indexTarget].linkCount++;
  }

  /**
   * Create the d3 simulation of the force-directed graph. Nodes and links must be added before
   * calling this function.
   * @private
   */
  createSimulation() {
    // Create a new simulation containing the nodes.
    this.simulation = d3.forceSimulation(this.nodes_data);

    // Add a charge to each node and a centering force.
    const _this = this;
    this.simulation
      .force("charge", d3.forceManyBody()
        .strength(function (d) {
          return d.index < _this.numSymbolNodes ?
          _this.forceManyBodyStrengthSymbolNodes : _this.forceManyBodyStrengthNonSymbolNodes;
        }))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));

    // Add the links, with the strength of the force of a link optionally specified by the link's
    // _strength.
    const link_force =  d3.forceLink(this.links_data)
      .strength(function(d) {
        return d._strength > 0 ?
          d._strength :
          1 / Math.min(d.source.linkCount, d.target.linkCount); // default
      })
      .distance(this.linkDistance);        
      this.simulation.force("links", link_force);

    // Call tick() for every tick. We have to jump through some hoops to get the this pointer into
    // the tick() function.
    this.simulation.on("tick", function() {_this.tick(_this);});

    // Set the decay rate to zero to have the simulation run forever at the current alpha.
    this.simulation.alphaDecay(0);

    // Rotate the symbol using a d3 interval.
    d3.interval(function(elapsed) {_this.rotate(_this, elapsed);}, _this.rotateTimeMs);

    // Add new blocks using a d3 interval.
    d3.interval(function(elapsed) {_this.addNewBlock(_this, elapsed);}, _this.blockTimeMs);
  }

  /**
   * Set up SVG to draw the simulation.
   * @private
   */
  setupSvg() {
    // Create svg element to hold the force-directed graph.
    this.svg = d3.select(this.element).append("svg");
    this.svg.attr("width", this.width);
    this.svg.attr("height", this.height);
    
    // Draw circles for the nodes.
    const _this = this;
    this.node = this.svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(this.nodes_data)
      .enter().append("circle")
        .attr("r", _this.nodeRadius)
        .style("stroke", function(d) {return _this.nodeStroke(_this, d);})
        .style("fill", this.nodeFillColor)
        .style("opacity", this.nodeOpacity)
        .call(d3.drag()
          .on("start", function(d) {return _this.dragStarted(_this, d);})
          .on("drag", this.dragged)
          .on("end", function(d) {return _this.dragEnded(_this, d);}));

    // Draw lines for the links.
    this.link = this.svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(this.links_data)
      .enter().append("line")
        .attr("stroke-width", this.linkStrokeWidth)
        .style("stroke", function(d) { return _this.getColor(d.index, _this.links_data.length); })
        .style("opacity", function(d) { return d.opacity; });

    // Glow effect
    this.defs = this.svg.append("defs");
    const filter = this.defs.append("filter")
      .attr("id", "glow")
      .attr("filterUnits", "userSpaceOnUse"); // remove clipping           
    filter.append("feGaussianBlur")
      .attr("class", "blur")
      .attr("stdDeviation", _this.glowStdDeviation.toString())
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
      .attr("in", "coloredBlur");
    feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic")
  }

  /**
   * Return the color based on the specified index and number of indices.
   * @param {Number} index The index to return the color of.
   * @param {Number} numIndices The total number of indices used to determine the color.
   * @return {Number} The color of the specified index.
   * @private
   */
  getColor(index, numIndices) {
    // These colors come from the DFINITY logo.
    const purple = [99,38,132];
    const pink = [237,30,121];
    const darkOrange = [241,90,36];
    const lightOrange = [251,176,59];
    const blue = [41,171,226];

    // Certain color transitions in the DFINITY logo are small, others are gradual.
    const transitionPercentSmall = 0.02;
    const transitionPercentGradual = 0.1;
    const transitionIndicesSmall = numIndices * transitionPercentSmall;
    const transitionIndicesGradual = numIndices * transitionPercentGradual;

    // The number of indices of each color was determined by analyzing the DFINITY logo.
    const lastPurpleIndex = numIndices * 0.15 - transitionIndicesGradual;
    const lastPinkIndex =
      lastPurpleIndex + transitionIndicesGradual + numIndices * 0.15 - transitionIndicesSmall;
    const lastDarkOrangeIndex =
      lastPinkIndex + transitionIndicesSmall + numIndices * 0.15 - transitionIndicesGradual;
    const lastLightOrangeIndex =
      lastDarkOrangeIndex + transitionIndicesGradual + numIndices * 0.15 - transitionIndicesSmall;
    const lastBlueIndex =
      lastLightOrangeIndex + transitionIndicesSmall + numIndices * 0.4 - transitionIndicesSmall;

    // Determine the color based on the color zone the index is in.
    if (index <= lastPurpleIndex)
      return this.rgbFromArray(purple);
    else if (index <= lastPurpleIndex + transitionIndicesGradual)
    {
      const percentage = (index - lastPurpleIndex) / transitionIndicesGradual;
      const array = this.gradientColor(pink, purple, percentage);
      return this.rgbFromArray(array);
    }
    else if (index <= lastPinkIndex)
      return this.rgbFromArray(pink);
    else if (index <= lastPinkIndex + transitionIndicesSmall)
    {
      const percentage = (index - lastPinkIndex) / transitionIndicesSmall;
      const array = this.gradientColor(darkOrange, pink, percentage);
      return this.rgbFromArray(array);
    }
    else if (index <= lastDarkOrangeIndex)
      return this.rgbFromArray(darkOrange);
    else if (index <= lastDarkOrangeIndex + transitionIndicesGradual)
    {
      const percentage = (index - lastDarkOrangeIndex) / transitionIndicesGradual;
      const array = this.gradientColor(lightOrange, darkOrange, percentage);
      return this.rgbFromArray(array);
    }
    else if (index <= lastLightOrangeIndex)
      return this.rgbFromArray(lightOrange);
    else if (index <= lastLightOrangeIndex + transitionIndicesSmall)
    {
      const percentage = (index - lastLightOrangeIndex) / transitionIndicesSmall;
      const array = this.gradientColor(blue, lightOrange, percentage);
      return this.rgbFromArray(array);
    }     
    else if (index <= lastBlueIndex)
      return this.rgbFromArray(blue);
    else
    {
      const percentage = (index - lastBlueIndex) / transitionIndicesSmall;
      const array = this.gradientColor(purple, blue, percentage);
      return this.rgbFromArray(array);
    }
  }

  /**
   * Return the gradient color based on the specified parameters.
   * @param {Object} color1 The RGB array of color 1.
   * @param {Object} color2 The RGB array of color 2.
   * @param {Object} percent The percentage of the gradient.
   * @return {Object} The RGB array of the gradient color.
   * @private
   */
  gradientColor(color1, color2, percent) {
    const p1 = percent;
    const p2 = 1 - p1;
    const rgb = [
      Math.round(color1[0] * p1 + color2[0] * p2),
      Math.round(color1[1] * p1 + color2[1] * p2),
      Math.round(color1[2] * p1 + color2[2] * p2)];
    return rgb;
  }

  /**
   * Return the RGB color string corresponding to the specified RGB color array.
   * @param {Object} array The RGB array.
   * @return {Object} The RGB color string.
   * @private
   */
  rgbFromArray(array) {
    return "rgb(" + array.join() + ")";
  }

  /**
   * Return the stroke color of the specified node.
   * @param {Object} _this This class object.
   * @param {Object} d The node to return the stroke color of.
   * @return {Number} The stroke color of the specified node.
   * @private
   */
  nodeStroke(_this, d) {
    return _this.getColor(d.index % _this.numSymbolNodes, _this.numSymbolNodes);
  }

/**
   * Start dragging a node.
   * @param {Object} d The node being dragged.
   * @private
   */
  dragStarted(_this, d) {
    const isSimulationRunning = _this.simulation.alphaDecay() === 0;
    if (!isSimulationRunning) {
      if (!d3.event.active)
        _this.simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }

  /**
   * Continue dragging a node.
   * @param {Object} d The node being dragged.
   * @private
   */
  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  /**
   * Stop dragging a node.
   * @param {Object} d The node being dragged.
   * @private
   */
  dragEnded(_this, d) {
    const isSimulationRunning = _this.simulation.alphaDecay() === 0;
    if (!isSimulationRunning) {
      if (!d3.event.active)
        _this.simulation.alphaTarget(0);
    }
    d.fx = d._fx;
    d.fy = d._fy;
  }

  /**
   * Update the node and link positions on each tick of the simulation.
   * @param {Object} _this This class object.
   * @private
   */
  tick(_this) {
    _this.node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    _this.link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });   
  }

  /**
   * Rotate the symbol.
   * @param {Object} _this This class object.
   * @param {Number} elapsed Elapsed time since the timer became active.
   * @private
   */
  rotate(_this, elapsed) {
    // In order to increase efficiency, it might be possible to decrease the frequency at which we
    // rotate, then use d3 transition so that the movement is smooth. The problem is, non-symbol
    // nodes will still be moving based on the simulation, so it's unknown whether this will
    // actually improve performance. Since it does not seem like d3.interval() can be counted on to
    // call this function with precision, this may not be a feasible approach, since if you do not
    // know when the next call will be, you cannot know how long to make the transition.
    // See webpage "D3.selectAll(...).transition() Explained"
    // (http://bl.ocks.org/Kcnarf/9e4813ba03ef34beac6e)

    for (let i = 0; i < _this.numSymbolNodes; i++) {
      _this.rotateOffset += _this.rotateAmount;
      const pos = _this.getNodePosition(i);
      _this.nodes_data[i].fx = _this.nodes_data[i]._fx = pos[0];
      _this.nodes_data[i].fy = _this.nodes_data[i]._fy = pos[1];
    }
  }

  /**
   * Add a new block.
   * @param {Object} _this This class object.
   * @param {Number} elapsed Elapsed time since the timer became active.
   * @private
   */
  addNewBlock(_this, elapsed) {
    _this.selectedNodeIndex = getRandomInt(0, _this.numNodes - 1);

    _this.addNewBlockCallback();

    // Link node and link transitions so that they start at the same time.
    const t = d3.transition();

    d3.select(_this.node.nodes()[_this.selectedNodeIndex])
      .transition(t)
        .ease(d3.easeCubic)
        .duration(500)
        .attr("r", _this.nodeRadiusSelected)
        .style("stroke", _this.nodeStrokeColorSelected)
        .style("fill", _this.nodeFillColorSelected)
        .style("filter", "url(#glow)")
        .style("opacity", _this.nodeOpacitySelected)
      .transition()
        .ease(d3.easeCubic)
        .duration(500)
        .attr("r", _this.nodeRadius)
        .style("stroke", function(d) {return _this.nodeStroke(_this, d);})
        .style("fill", _this.nodeFillColor)
        .style("opacity", _this.nodeOpacity)
      .transition()
        .style("filter", null);

    _this.svg.selectAll("line")
      .transition(t)
        .duration(500)
        .ease(d3.easeLinear)
        .style("opacity", function(d) {return Math.min(d._opacity + 0.25, 1);})
      .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .style("opacity", function(d) {return d._opacity;});
  }
}
