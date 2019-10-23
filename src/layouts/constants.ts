export class Constants {
  public static FCOSE_LAYOUT_OPTIONS: any = {
    name: 'fcose',
    // whether or not to animate the layout
    animate: true,
    // duration of animation in ms, if enabled
    animationDuration: 1000,
    // easing of animation, if enabled
    animationEasing: undefined,
    // Divisor to compute edge forces
    edgeElasticity: 0.45,
    // fit the viewport to the repositioned nodes
    fit: true,
    // Gravity force (constant)
    gravity: 0.25,
    // Gravity force (constant) for compounds
    gravityCompound: 1.0,
    // Gravity range (constant)
    gravityRange: 3.8,
    // Gravity range (constant) for compounds
    gravityRangeCompound: 1.5,
    // Ideal edge (non nested) length
    idealEdgeLength: 50,
    // Initial cooling factor for incremental layout
    initialEnergyOnIncremental: 0.3,
    // Nesting factor (multiplier) to compute ideal edge length for nested edges
    nestingFactor: 0.1,
    // whether to include labels in node dimensions. Valid in "proof" quality
    nodeDimensionsIncludeLabels: false,
    // Node repulsion (non overlapping) multiplier
    nodeRepulsion: 4500,
    // separation amount between nodes
    nodeSeparation: 75,
    // Maximum number of iterations to perform
    numIter: 2500,
    // padding around layout
    padding: 10,
    // power iteration tolerance
    piTol: 0.0000001,
    // 'draft', 'default' or 'proof'
    // - "draft" only applies spectral layout
    // - "default" improves the quality with incremental layout (fast cooling rate)
    // - "proof" improves the quality with incremental layout (slow cooling rate)
    quality: 'default',
    // use random node positions at beginning of layout
    // if this is set to false, then quality option must be "proof"
    randomize: true,
    // sample size to construct distance matrix
    sampleSize: 25,
    /* spectral layout options */
    // false for random, true for greedy sampling
    samplingType: true,
    /* incremental layout options */
    // For enabling tiling
    tile: false,
    // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
    tilingPaddingHorizontal: 10,
    // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
    tilingPaddingVertical: 10,
    /* layout event callbacks */
    ready: () => {}, // on layoutready
    stop: () => {}, // on layoutstop
  };

  public static CISE_LAYOUT_OPTIONS: any = {
    name: 'cise',
    // Whether to pull on-circle nodes inside of the circle
    allowNodesInsideCircle: false,
    // clusters:[['EBI-852823','EBI-10026613','EBI-10041778','EBI-748062']],
    // clusters:[['P05412'],['EBI-10026613']],

    // -------- Optional parameters --------
    // Whether to animate the layout
    // - true : Animate while the layout is running
    // - false : Just show the end result
    // - 'end' : Animate directly to the end result
    animate: false,
    // Animation duration used for animate:'end'
    animationDuration: undefined,
    // Easing for animate:'end'
    animationEasing: undefined,
    // ClusterInfo can be a 2D array contaning node id's or a function that returns cluster ids.
    // For the 2D array option, the index of the array indicates the cluster ID for all elements in
    // the collection at that index. Unclustered nodes must NOT be present in this array of clusters.
    //
    // For the function, it would be given a Cytoscape node and it is expected to return a cluster id
    // corresponding to that node. Returning negative numbers, null or undefined is fine for unclustered
    // nodes.
    // e.g
    // Array:                                     OR          function(node){
    //  [ ['n1','n2','n3'],                                       ...
    //    ['n5','n6']                                         }
    //    ['n7', 'n8', 'n9', 'n10'] ]
    clusters: node => {
      return node.data('clusterID');
    },

    // Whether to fit the viewport to the repositioned graph
    // true : Fits at end of layout for animate:false or animate:'end'
    fit: true,
    // Gravity force (constant)
    gravity: 0.25,

    // Gravity range (constant)
    gravityRange: 3.8,
    // Inter-cluster edge length factor
    // (2.0 means inter-cluster edges should be twice as long as intra-cluster edges)
    idealInterClusterEdgeLengthCoefficient: 1.4,
    // Max percentage of the nodes in a circle that can move inside the circle
    maxRatioOfNodesInsideCircle: 0.1,
    // Node repulsion (non overlapping) multiplier
    nodeRepulsion: 4500,
    // separation amount between nodes in a cluster
    // note: increasing this amount will also increase the simulation time
    nodeSeparation: 50,
    // Padding in rendered co-ordinates around the layout
    padding: 30,
    // number of ticks per frame; higher is faster but more jerky
    refresh: 10,
    // - Lower values give looser springs
    // - Higher values give tighter springs
    springCoeff: 0.45,
    // Layout event callbacks; equivalent to `layout.one('layoutready', callback)` for example
    ready: () => {}, // on layoutready
    stop: () => {}, // on layoutstop
  };

  public static NGRAPH_LAYOUT_OPTIONS: any = {
    animate: true,
    async: {
      // tell layout that we want to compute all at once:
      maxIterations: 1000,
      stepsPerCycle: 30,

      // Run it till the end:
      waitForStep: false,
    },
    fit: true,
    iterations: 10000,
    physics: {
      /**
       * Drag force coefficient. Used to slow down system, thus should be less than 1.
       * The closer it is to 0 the less tight system will be.
       */
      dragCoeff: 0.02,
      fit: true,
      /**
       * Coulomb's law coefficient. It's used to repel nodes thus should be negative
       * if you make it positive nodes start attract each other :).
       */
      gravity: -1.2,
      iterations: 10000,
      /**
       * Ideal length for links (springs in physical model).
       */
      springLength: 100,

      /**
       * Hook's law coefficient. 1 - solid spring.
       */
      springCoeff: 0.0008,

      /**
       * Maximum movement of the system which can be considered as stabilized
       */
      stableThreshold: 0.000009,
      /**
       * Default time step (dt) for forces integration
       */
      /**
       * Theta coefficient from Barnes Hut simulation. Ranged between (0, 1).
       * The closer it's to 1 the more nodes algorithm will have to go through.
       * Setting it to one makes Barnes Hut simulation no different from
       * brute-force forces calculation (each node is considered).
       */
      theta: 0.8,
      timeStep: 20,
    },

    refreshInterval: 16, // in ms
    refreshIterations: 10, // iterations until thread sends an update
    stableThreshold: 2,
  };

  public static AVSDF_LAYOUT_OPTIONS: any = {
    name: 'avsdf',
    // Type of layout animation. The option set is {'during', 'end', false}
    animate: 'end',
    // Duration for animate:end
    animationDuration: 500,
    // Whether to fit the network view after when done
    fit: true,
    // How apart the nodes are
    nodeSeparation: 120,
    // Padding on fit
    padding: 10,
    // Called on `layoutready`
    ready: () => {},
    // number of ticks per frame; higher is faster but more jerky
    refresh: 30,
    // Called on `layoutstop`
    stop: () => {},
    // Prevent the user grabbing nodes during the layout (usually with animate:true)
    ungrabifyWhileSimulating: false,
  };

  public static COLA_LAYOUT_OPTIONS: any = {
    name: 'cola',
    alignment: undefined, // relative alignment constraints on nodes, e.g. function( node ){ return { x: 0, y: 1 } }
    allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
    animate: false, // whether to show the layout as it's running
    avoidOverlap: true, // if true, prevents overlap of node bounding boxes
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    convergenceThreshold: 0.01, // when the alpha value (system energy) falls below this value, the layout stops
    // different methods of specifying edge length
    // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
    edgeLength: undefined, // sets edge length directly in simulation
    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined, // jaccard edge length in simulation
    fit: true, // on every layout reposition of nodes, fit the viewport
    flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
    gapInequalities: undefined, // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    // infinite layout options
    infinite: false, // overrides all other options for a forces-all-the-time mode
    maxSimulationTime: 4000, // max length in ms to run the layout
    nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
    nodeSpacing: node => {
      return 10;
    }, // extra spacing around nodes
    padding: 30, // padding around the simulation
    // positioning options
    randomize: false, // use random node positions at beginning of layout
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    // iterations of cola algorithm; uses default values on undefined
    unconstrIter: undefined, // unconstrained initial layout iterations
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    userConstIter: undefined, // initial layout iterations with user-specified constraints
    // layout event callbacks
    ready: () => {}, // on layoutready
    stop: () => {}, // on layoutstop
  };

  public static SPINNER_OPTIONS: any = {
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    className: 'spinner', // The CSS class to assign to the spinner
    color: '#000000', // CSS color or array of colors
    corners: 1, // Corner roundness (0..1)
    direction: 1, // 1: clockwise, -1: counterclockwise
    fadeColor: 'transparent', // CSS color or array of colors
    length: 38, // The length of each line
    lines: 13, // The number of lines to draw
    position: 'absolute', // Element positioning
    radius: 45, // The radius of the inner circle
    rotate: 0, // The rotation offset
    scale: 1, // Scales overall size of the spinner
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    speed: 1, // Rounds per second
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    width: 17, // The line thickness
    zIndex: 2e9, // The z-index (defaults to 2000000000)
  };

  public static INITIAL_MAX_ZOOM: number = 1.5;
  public static USER_MAX_ZOOM: number = 10;
  public static INITIAL_MIN_ZOOM: number = 0;
  public static USER_MIN_ZOOM: number = 0.2;

}
