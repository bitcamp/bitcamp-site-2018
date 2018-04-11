window.onload = function() {
	var closeBtn = document.querySelector('.close-all__link');
	closeBtn.onclick = function() {
		window.close();
	}

	// Center the key
	var title = document.querySelector('.info-body__title');
	if (window.opener != null) {
		var url = window.location.href;
		if (url.includes('denied')) {
			document.title = 'Failed!';
			title.textContent = 'Failed!';
			if (!url.includes('error=access_denied')) {
				// Create new Twitter access token (in case user wants to login again)
    			window.opener.noAuthTwitter();
			}
    		window.opener.noAuth();
		}
		else if (url.includes('oauth_token')) {
			// Twitter
			var accessToken = url.split('oauth_token=').pop().split('&')[0];
			var verifier = url.split('oauth_verifier=')[1];
			if (accessToken != null && verifier != null) {
				document.title = 'Success!';  
				title.textContent = 'Success!';
	    		window.opener.authTwitter(accessToken,verifier);
			}
			else {
				document.title = 'Failed!';
				title.textContent = 'Failed!';
    			window.opener.noAuthTwitter();
			}
		}
		else if (url.includes('code')) {
			// Slack
			var code = url.split('code=').pop().split('&')[0];
			var state = url.split('state=')[1];
			if (code != null) {
				document.title = 'Success!';  
				title.textContent = 'Success!';
	    		window.opener.authSlack(code,state);
			}
			else {
				document.title = 'Failed!';
				title.textContent = 'Failed!';
    			window.opener.noAuth();
			}
		}
	    window.close();
	}	
}