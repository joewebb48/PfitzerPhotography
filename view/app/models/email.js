



class Email {
	
	constructor( ancestor ) {
		const dupe = ancestor ? ancestor : {  }
		this.subject = dupe.subject || { value: '', error: '', min: 10 }
		this.address = dupe.address || { value: '', error: '', min: 10 }
		this.message = dupe.message || { value: '', error: '', min: 100 }
	}
	
	
	setProps( setup ) {
		const join = ( set, exe ) => set.reduce( exe, {  } )
		// Combine field attributes to construct form field props
		return join( Object.keys( this ), ( form, name ) => {
			let body = { name, placeholder: '', ...this[ name ] }
			return { ...form, [ name ]: { ...body, ...setup } }
		} )
	}
	
	fuseForm( field ) {
		const { name, value } = field
		// Merge the new field input value into an updated form
		const input = new Email( this )
		input[ name ] = { ...this[ name ], value }
		return input
	}
	
	isPopulated( ) {
		// Look to see if any form field value is currently empty
		return Object.keys( this ).every( key => this[ key ].value )
	}
	
	validateFields( ) {
		const form = new Email( this )
		Object.keys( this ).forEach( field => {
			let extra = field === 'address' ? 'email ' + field : field
			let valid = this[ field ].min < this[ field ].value.length
			form[ field ].error = valid ? '' : 'Your ' + extra + ' is too short!'
		} )
		return form
	}
	
}


export default Email



