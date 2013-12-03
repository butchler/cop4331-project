var Camera = function(gl, size, modelUp) {
	// center the camera
	var center = [0, 0, 0];
					
					
	// get the distance from the max val to the min val
	var diagonal = size;
					
					
	// setup most of the cameras variables and settings
	var name = "auto";
	var at = center;
        var eye = [	
                    center[0],
                    center[1],
                    center[2] + diagonal];
	var up = modelUp.slice(0);
	var near = diagonal * 0.1;
	var far = diagonal * 3;
	var FOV = 32;
	
	
	
	// gets the camera position given that it is rotated by some amount
	this.getRotatedCameraPosition = function (angle) {
		var m = new Matrix4().setTranslate(at[0], at[1], at[2]);
		m.rotate(angle, up[0], up[1], up[2]).translate(-at[0], -at[1], -at[2]);
		
		var e = m.multiplyVector4(new Vector4([eye[0], eye[1], eye[2], 1])).elements;
		
		return [e[0], e[1], e[2]];
	}
	
	
	
	// get teh view matrix, if an camera position is given, use it
	// otherwise create the matrix
	this.getViewMatrix = function (e) {
		if (e == undefined) e = eye;
		
		return new Matrix4().setLookAt(
								e[0], e[1], e[2], 
								at[0], at[1], at[2], 
								up[0], up[1], up[2]);
	}
	
	
	// rotate a view matrix, this does both the rotation and gives the view
	this.getRotatedViewMatrix = function (angle) {
		return this.getViewMatrix(this.getRotatedCameraPosition(angle));
	}
	
	
	// cretae the projection matrix
	this.getProjMatrix = function () {
		return new Matrix4().setPerspective(FOV, gl.canvas.width / gl.canvas.height, near, far);
	}
}