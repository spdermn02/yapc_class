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

        // Cordova is ready
        //
        function onDeviceReady() {
            //playAudio("http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3");
            //playAudio("http://audio.ibeat.org/?ccm=/files/enoe/693");
			setupAndPlayAudio("media/enoe_-_Blunt_-_The_gods_are_laughing.mp3");
        }

        // Audio player
        //
        var my_media = null;
        var mediaTimer = null;

		function setupAndPlayAudio(src)
		{
			my_media = new Media(src, onSuccess, onError, setaudiostatus);
			playAudio();
		}

        // Play audio
        //
        function playAudio() {

            // Play audio
            my_media.play();

            // Update my_media position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
        }

        // Pause audio
        // 
        function pauseAudio() {
            if (my_media) {
				if( audio_staus === 3 )
				{ playAudio(); }
				else
				{ my_media.pause(); 
            	  clearInterval(mediaTimer);
            	  mediaTimer = null;
				}
            }
        }

		var audio_status = 0;
		function setaudiostatus(num)
		{
			audio_staus = num;
		}	

        // Stop audio
        // 
        function stopAudio() {
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
            document.getElementById('audio_position').innerHTML = '';
        }

        // onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback 
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
        }

        // Set audio position
        // 
        function setAudioPosition(position) {
            document.getElementById('audio_position').innerHTML = position;
        }
