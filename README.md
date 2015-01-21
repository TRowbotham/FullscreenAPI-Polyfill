<h1>FullscreenAPI-Polyfill</h1>
<p>This project seeks to normalize the <a href="https://fullscreen.spec.whatwg.org/">Fullscreen API</a> across the
	different browsers so that the user can use the	standardized API calls in their code rather than having to guess at
	all the different spellings and prefixes.  It is important to note that this polyfill only works in browsers that
	support some form of the Fullscreen API.</p>

<h2>API</h2>
<h3>Element.requestFullscreen()</h3>
<p>Used to request that an element enter fullscreen.  Upon success, the fullscreenchange event will be fired on the
	document object.  On failure, the fullscreenerror event will be fired on the document object.</p>

<h3>document.exitFullscreen()</h3>
<p>Only one element is allowed to be fullscreen at any given time.  To exit fullscreen mode, call
	document.exitFullscreen().</p>

<h3>document.fullscreenEnabled</h3>
<p>Returns true if document has the ability to display elements fullscreen and fullscreen is supported, or false
	otherwise.</p>

<h3>document.fullscreenElement</h3>
<p>Returns the element that is displayed in fullscreen, or null if there are no elements currently displayed in
	fullscreen.</p>

<h3>allowfullscreen</h3>
<p>This attribute only affects &lt;iframe&gt;s.  When set to true the iframe document will not be allowed to request
	that an element enterfullscreen.  If omitted or set to false, the iframe document will be allowed to request that an
	element enter fullscreen.</p>

<h2>Events</h2>
<h3>fullscreenchange</h3>
<p>Everytime an Element successfully enters fullscreen or the document exits fullscreen, a fullscreenchange event will
	be fired.  Use the document.fullscreenElement property in conjunction with the fullscreenchange event to determine
	whether the event was fired in response to an element entering fullscreen or the document exiting fullscreen.</p>

<h3>fullscreenerror</h3>
<p>The fullscreenerror event is fired when an attempt element's attempt to enter fullscreen has failed for some
	reason.</p>