		var mathRoundVar   = 0.5;
		var indexIncrement = 2;
		var pointLine      = 25;
		var mathTheta      = 0;
		const PI           = Math.PI;

    var vectorPoints = [10,10,20,20,10,20,10,10];
		var canvas       = document.createElement("canvas");
		var canvasRenCTX = canvas.getContext("2D");

		windowHeight = window.innerHeight;
		windowWidth  = window.innerWidth;

		canvas.height  = windowHeight;
		canvas.width   = windowWidth;

		var width  = Math.round(canvas.width * mathRoundVar);
		var height = Math.round(canvas.height * mathRoundVar);

		for(var index = 0, length = vectorPoints.length; index < length; index += indexIncrement){
			vectorPoints[index]   = vectorPoints[index] * pointLine;
			vectorPoints[index++] = vectorPoints[index++] * pointLine;
		}

		document.body.appendChild(canvas);

		function hasPoint(param1, param2, param3, param4){
		var c      = false;
		var p      = this.points;
		var length = p.length;

		for (var index = 0, h = length-indexIncrement; index < length; index += indexIncrement) {
			var px1 = p[index] + param1;
			var px2 = p[h] + param1;

			var py1 = p[index+1] + param2;
			var py2 = p[h+1] + param2;

			if (( py1 > param4 != py2 > param4 ) &&
			    ( param3 < (px2-px1) * (param4-py1) / (py2-py1) + px1 )
			) {
				c = !c;
			}
			h = index;
		}
		return c;
	}

	function asteroidRotation(mathPI,mathTheta){
		var max = [Math.cos(mathTheta), -Math.sin(mathTheta), Math.sin(mathTheta), Math.cos(mathTheta)];

		for(var index  = 0, length = p.length; index < length; index += indexIncrement){
			var coordX = p[index];
			var coordY = p[index++];

			p[index]   = coordX*max[0] + coordY*max[1];
			p[index++] = coordX*max[2] + coordY*max[3]
		}

		var xCoord = 0;
		var yCoord = 0;

		document.onmousemove = function(mouseEvent){
			xCoord = mouseEvent.pageX - canvas.offsetLeft;
			yCoord = mouseEvent.pageY - canvas.offsetTop;
		}
	}

  //Still working on this
	function ctxLoop(){
		canvasRenCTX.clearRect(0,0, canvas.width, canvas.height);
	}
