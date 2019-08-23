export class Constants {
  public static FCOSE_LAYOUT_OPTIONS: any = {
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
}
