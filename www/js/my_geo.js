
			$(document).ready(function(){
				$('#testbutton').click(function(){
					showMessage($('#name').val());
				});
				$('#testbutton1').click(function(){
					onDeviceReady();
				});
				$('#name').keypress(function(e){
					var keycode = (e.keyCode ? e.keyCode : e.which);
					if(keycode == '13'){
						e.stopPropagation();
						$('#testbutton').click();
                    	return false;
					}	
				});
			});
			function showMessage(val)
			{
				$('#container').html('<span>Hi, '+val+'</span>');
                $('#testbutton span').html('Press Me Again!').attr('title','I Dare You!');
			}

			// Wait for Cordova to load
    //
    //document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          +                                   position.timestamp          + '<br />';
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

