# waringo-henrich-smooth

[![Build Status](https://travis-ci.org/davesque/waringo-henrich-smooth.png?branch=master)](https://travis-ci.org/davesque/waringo-henrich-smooth)

Functions for smoothing a path of 2D coordinates using the method described in
the following article: 

**Smoothing of Piecewise Linear Paths**  
Michel Waringo and Dominik Henrich  
University of Bayreuth, Germany  
International Journal of Advanced Robotic Systems, Vol.5, No. 3 (2008)

<http://cdn.intechopen.com/pdfs/4283/InTech-Smoothing_of_piecewise_linear_paths.pdf>

## Usage

The `waringoHenrichSmooth` function may be used to cull a list of 2D points
with the effect of smoothing the path described by those points:

```javascript
var points = [
  {x: 0, y: 0},
  {x: 5, y: -5},
  {x: 10, y: 3},
  {x: 15, y: 0}
];

expect(waringoHenrichSmooth(points, 100)).toEqual([{x: 0, y: 0}, {x: 15, y: 0}]);
```

## License

Copyright (c) 2013 David Sanders  
Licensed under the MIT license.
