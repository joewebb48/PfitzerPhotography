



import querystring from 'querystring'



class Email {
	
	constructor( ancestor ) {
		const dupe = ancestor ? ancestor : {  }
		this.subject = dupe.subject || { value: '', error: '', min: 10 }
		this.address = dupe.address || { value: '', error: '', min: 10 }
		this.message = dupe.message || { value: '', error: '', min: 75 }
		this.invalidated = 0
	}
	
	
	purgeInvalid( ) {
		// Dump the non form field class attribute from the set
		const screen = attr => attr !== 'invalidated'
		return Object.keys( this ).filter( screen )
	}
	
	setProps( setup ) {
		const info = { sent: setup.sent, diff: setup.diff }
		const join = ( set, exe ) => set.reduce( exe, {  } )
		// Combine field attributes to construct form field props
		return join( this.purgeInvalid( ), ( form, name ) => {
			let base = { name, placeholder: '', ...this[ name ] }
			return { ...form, [ name ]: { ...base, ...info } }
		} )
	}
	
	fuseForm( field ) {
		const { name, value } = field
		// Merge the new field input value into an updated form
		const letter = new Email( this )
		letter[ name ] = { ...this[ name ], value }
		return letter
	}
	
	isPopulated( ) {
		// Look to see if any form field value is currently empty
		return this.purgeInvalid( ).every( key => this[ key ].value )
	}
	
	validateFields( ) {
		const parcel = new Email( this )
		this.purgeInvalid( ).forEach( field => {
			let extra = field === 'address' ? 'email ' + field : field
			let valid = this[ field ].min < this[ field ].value.length
			let alert = valid ? '' : 'Your ' + extra + ' must be at least'
			let mini = valid ? '' : ' ' + this[ field ].min + ' characters!'
			// Apply error message if any and track errors found
			!valid ? parcel.invalidated++ : null
			parcel[ field ].error = alert + mini
		} )
		parcel.analyzeEmail( )
		return parcel
	}
	
	analyzeEmail( ) {
		// Ignore all further validation if there's already an error
		if ( this.address.error.length === 0 ) {
			const regex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
			const check = regex.test( this.address.value )
			const flash = check ? '' : 'Your email is improperly formatted!'
			!check ? this.invalidated++ : null
			this.address.error = flash
		}
	}
	
	harvestQuery( bio ) {
		// Generate a query string for using form data via email
		const whom = { recipient: bio.fields.email }
		const query = item => querystring.stringify( item )
		const trans = ( obj, run ) => query( obj.reduce( run, {  } ) )
		return trans( this.purgeInvalid( ), ( body, data ) => {
			return { ...body, [ data ]: this[ data ].value, ...whom }
		} )
	}
	
}


export default Email



