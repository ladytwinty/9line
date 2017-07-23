var bufferAngle = 0 // хранит теперешний угол стрелки
$(document).ready(function(){
	$('.img-wrap').click(function(e) {
		  //
		  var relativeX = (e.pageX - $(this).offset().left);
		  var relativeY = (e.pageY - $(this).offset().top);
		  //координаты курсора(x,y) при клике
		  mouse_coords = {
						'x': relativeX,
						'y': relativeY
					};
		  // точка относительно которой идет высщитивание угла
		  point_coords = {
		  	'x':$(this).width() / 2,
		  	'y':$(this).height() 
		  }
		  //получаем угол
		  var angle = getAngle(point_coords, mouse_coords)
		  //анимируем и 
		  animateRotate(angle)
		  // сохраняем теперешнее состояние
		  bufferAngle = angle
		});
});

function animateRotate(d){
    var elem = $(".arrow-wrap");

    $({deg: bufferAngle}).animate({deg: d}, {
        duration: 1000,
        step: function(now){
            elem.css({
                 transform: "rotate(" + now + "deg)"
            });
            showProcent(now)
        }
    });
}
	function showProcent(angle) {
		proccent = Math.floor((angle / 180) * 100);
		$('.persent').text(proccent + "%")
	}	

	function getAngle(ms, ctr) {
		var x     = ms.x - ctr.x,
		    y     = - ms.y + ctr.y,
		    hyp   = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
		    angle = Math.acos(x / hyp);
		
			if (y < 0) {    
				angle = 2 * Math.PI - angle;
			}

			angle = radToDeg(angle)
			angle  = (angle - 360) * -1
			
		    if(angle <=5) {
		  	  angle = 0
		    }else
		    if(angle >=175) {
		  	  angle = 180
		    }
		return angle;
    }

    function radToDeg(r) {
    	return (r * (180 / Math.PI));
    };

