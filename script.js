/************************************** Copyright **************************************
    The MIT License (MIT)

	Copyright (c) 2015 Mrinmoy Roy

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
/************************************** Copyright **************************************/

var theVid;
var startTime;
$(document).ready(function() {
	$('#video-submit').on('submit', function(e){
		e.preventDefault()
		$('#video-link').blur()
		var videoTag = '<video id="the-video" controls src="'+$('#video-link').val()+'" type="video/mp4"></video>'
		$('#video-box').html(videoTag)
		$('#video-container').slideDown()
		theVid = $('#the-video').get(0)
	})

	$('#generated-cc').text('WEBVTT\n\n');

	$('body').on('keydown',function(e){
		if(e.keyCode==39){
			theVid.play()
			stopTimeShow()
		}
		if(e.keyCode==37){
			var currTime = theVid.currentTime
			currTime = currTime - 0.250;
			if(currTime>0){
				theVid.currentTime = currTime;
			}
			else{
				theVid.currentTime = 0;
				currTime = 0;
			}
			theVid.pause()
			stopTimeShow()
		}
	})

	$('body').on('keyup',function(e){
		// right arrow
		if(e.keyCode==39){
			theVid.pause()
		}

		// left arrow
		if(e.keyCode==37){
			var currTime = theVid.currentTime
			currTime = currTime - 0.250;
			if(currTime>0){
				theVid.currentTime = currTime;
			}
			else{
				theVid.currentTime = 0;
				currTime = 0;
			}
			theVid.pause()
		}

		// up arrow
		if(e.keyCode==38){
			startTime = theVid.currentTime;
			startTime = toMMSSMS(startTime);
			$('#ccTextBit').show().focus();
			$('#showStartTime').html('<span style="color:red;">Start Time : </span>'+startTime);
		}

		// down arrow
		if(e.keyCode==40){
			startTime = '';
			$('#ccTextBit').hide();
			$('#showStartTime').html('');
			stopTimeShow()
		}
	})

	$('#ccTextBitSubmit').click(function(e){
		e.preventDefault();
		if($('#ccTextBit').val()){
			var stopTime = theVid.currentTime;
			stopTime = toMMSSMS(stopTime);
			var textBit = startTime + ' --> ' + stopTime + '\n' + $('#ccTextBit').val() + '\n\n';
			$('#generated-cc').text($('#generated-cc').text()+textBit);
			$('#ccTextBit').val('').hide();
		}
	})

	function stopTimeShow(){
		if($('#showStartTime').text()){
			$('#showStopTime').html('<span style="color:red;">Stop Time : </span>'+toMMSSMS(theVid.currentTime));
		}
		else{
			$('#showStopTime').html('');
		}
	}

})

function toMMSSMS(getTime){
    var sec_num = Math.round(getTime * 1000) / 1000; // don't forget the second param
    var seconds = Math.floor(sec_num);
    var ms = sec_num - seconds;
    ms = Math.round(ms * 1000);

    var minutes;
    //return ms
    if(seconds>59){
    	minutes = Math.floor(seconds/60)
    }
    else{
    	minutes = 0
    }
    if(Math.floor(minutes/10)==0){
    	minutes = '0'+minutes;
    }

    seconds = seconds - (minutes * 60)
    if(Math.floor(seconds/10)==0){
    	seconds = '0'+seconds;
    }

    var time    = minutes+':'+seconds+'.'+ms;
    return time;
}
