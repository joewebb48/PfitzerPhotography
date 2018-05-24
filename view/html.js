



const Html = ( root, title ) => `
	<!DOCTYPE html>
	
	
	
	<html lang="en">
		
		<head>
			<meta charset="utf-8"/>
			<title>${ title }</title>
			
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
			<meta name="theme-color" content="#000000"/>
			
			<link rel="shortcut icon" type="image/x-icon" href="favicon.ico"/>
			
			<link rel="stylesheet" type="text/css" href="styles.css"/>
		</head>
		
		<body>
			<main id="root">${ root }</main>
			
			<noscript> You need to enable JavaScript to run this app. </noscript>
			
			<script defer type="text/javascript" src="main.js"></script>
		</body>
		
	</html>
`


export default Html



