"use strict";

var canvas;
var gl;

var pointsArray = [];

var fColor;
var red;
var orange;
var yellow;
var green;
var blue;
var purple;
var white;
var black;

var thetaclock = 0;
var thetaCclock = 0;
var thetaLoc;

var modelViewMatrix;
var modelViewMatrixLoc; 



window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    red = vec4(1.0, 0.0, 0.0, 1.0);
	orange = vec4(1.0, 0.6, 0.0, 1.0);
	yellow = vec4(1.0, 1.0, 0.0, 1.0);
	green = vec4(0.0, 1.0, 0.0, 1.0);
	blue = vec4(0.0, 0.0, 1.0, 1.0);
	purple = vec4(0.6, 0.0, 1.0, 1.0);
	white = vec4(1.0, 1.0, 1.0, 1.0);
	black = vec4(0.0, 0.0, 0.0, 1.0);
	
    // square
	
 	pointsArray.push(vec4( -0.5, -0.5, 0.0, 1.0));
	pointsArray.push(vec4( -0.5,  0.5, 0.0, 1.0));
	pointsArray.push(vec4(  0.5,  0.5, 0.0, 1.0));
	pointsArray.push(vec4(  0.5, -0.5, 0.0, 1.0));
	
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    fColor = gl.getUniformLocation(program, "fColor");

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    
    thetaLoc = gl.getUniformLocation(program, "theta");

    render();
}

var render = function() {

        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        thetaCclock += 1;
        thetaclock -= 1;
        
        
        ////bottom right
        // white rectangle
		modelViewMatrix = mat4();
		modelViewMatrix = mult(modelViewMatrix, translate(0.45,-0.45,0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaCclock, 0, 1, 0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaCclock, 1, 0, 0));	
		modelViewMatrix = mult(modelViewMatrix, scalem(0.4,0.8,0));
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniform4fv(fColor, flatten(white));
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
        
        ////bottom right
        // black rectangle
		modelViewMatrix = mat4();
		modelViewMatrix = mult(modelViewMatrix, translate(0.45,-0.45,0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaCclock, 1, 0, 0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaCclock, 0, 1, 0));	
		modelViewMatrix = mult(modelViewMatrix, scalem(0.8,0.4,0));
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniform4fv(fColor, flatten(black));
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
        
        ////top left
        // white rectangle
		modelViewMatrix = mat4();
		modelViewMatrix = mult(modelViewMatrix, translate(-0.45,0.45,0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaCclock, 0, 1, 0));	
		modelViewMatrix = mult(modelViewMatrix, scalem(0.4,0.8,0));
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniform4fv(fColor, flatten(white));
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
        
        ////top left
        // black rectangle
		modelViewMatrix = mat4();
		modelViewMatrix = mult(modelViewMatrix, translate(-0.45,0.45,0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaCclock, 1, 0, 0));	
		modelViewMatrix = mult(modelViewMatrix, scalem(0.8,0.4,0));
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniform4fv(fColor, flatten(black));
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
        
        
        ////bottom left
		//green square
		modelViewMatrix = mat4();
		modelViewMatrix = mult(modelViewMatrix, translate(-0.45,-0.45,0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaCclock, 0, 0, 1));	
		modelViewMatrix = mult(modelViewMatrix, scalem(0.2,0.2,0));
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniform4fv(fColor, flatten(green));
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        
        ////bottom left
		//blue square
		modelViewMatrix = mat4();
		modelViewMatrix = mult(modelViewMatrix, translate(-0.45,-0.45,0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaclock, 0, 0, 1));	
		modelViewMatrix = mult(modelViewMatrix, scalem(0.4,0.4,0));
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniform4fv(fColor, flatten(blue));
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        
        ////bottom left
		//purple square
		modelViewMatrix = mat4();
		modelViewMatrix = mult(modelViewMatrix, translate(-0.45,-0.45,0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaCclock, 0, 0, 1));	
		modelViewMatrix = mult(modelViewMatrix, scalem(0.6,0.6,0));
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniform4fv(fColor, flatten(purple));
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        
        
        ////top right
		//yellow square
		modelViewMatrix = mat4();
		modelViewMatrix = mult(modelViewMatrix, translate(0.45,0.45,0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaCclock, 0, 0, 1));	
		modelViewMatrix = mult(modelViewMatrix, scalem(0.2,0.2,0));
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniform4fv(fColor, flatten(yellow));
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        
        ////top right
		//orange square
		modelViewMatrix = mat4();
		modelViewMatrix = mult(modelViewMatrix, translate(0.45,0.45,0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaclock, 0, 0, 1));	
		modelViewMatrix = mult(modelViewMatrix, scalem(0.4,0.4,0));
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniform4fv(fColor, flatten(orange));
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        
        ////top right
		//red square
		modelViewMatrix = mat4();
		modelViewMatrix = mult(modelViewMatrix, translate(0.45,0.45,0));
		modelViewMatrix = mult(modelViewMatrix, rotate(thetaCclock, 0, 0, 1));	
		modelViewMatrix = mult(modelViewMatrix, scalem(0.6,0.6,0));
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniform4fv(fColor, flatten(red));
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        
        
        requestAnimFrame(render);
    }
