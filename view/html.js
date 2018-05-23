



const Html = ( root, title ) => `
	<!DOCTYPE html>
	
	
	
	<html lang="en">
		
		<head>
			<meta charset="utf-8">
			<title>${ title }</title>
			<script src="/main.js" defer></script>
			
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
			<meta name="theme-color" content="#000000">
			
			<link rel="shortcut icon" href="favicon.ico">
		</head>
		
		<body>
			<noscript> You need to enable JavaScript to run this app. </noscript>
			<div id="root">${ root }</div>
		</body>
		
	</html>
`


export default Html



