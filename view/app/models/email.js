



class Email {
	
	constructor( ancestor ) {
		const dupe = ancestor ? ancestor : {  }
		this.subject = dupe.subject || { value: '', error: '', min: 10 }
		this.address = dupe.address || { value: '', error: '', min: 10 }
		this.message = dupe.message || { value: '', error: '', min: 100 }
		this.invalidated = 0
	}
	
	
	purgeInvalid( ) {
		// Dump the non form field class attribute from the set
		const pass = attr => attr !== 'invalidated'
		return Object.keys( this ).filter( pass )
	}
	
	setProps( setup ) {
		const info = { sent: setup.sent, diff: setup.diff }
		const join = ( set, exe ) => set.reduce( exe, {  } )
		// Combine field attributes to construct form field props
		return join( this.purgeInvalid( ), ( form, name ) => {
			let body = { name, placeholder: '', ...this[ name ] }
			return { ...form, [ name ]: { ...body, ...info } }
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
		const form = new Email( this )
		this.purgeInvalid( ).forEach( field => {
			let extra = field === 'address' ? 'email ' + field : field
			let valid = this[ field ].min < this[ field ].value.length
			let text = valid ? '' : 'Your ' + extra + ' must be at least'
			let mini = valid ? '' : ' ' + this[ field ].min + ' characters!'
			// Apply error message if any and track errors found
			!valid ? form.invalidated++ : null
			form[ field ].error = text + mini
		} )
		return form
	}
	
}


export default Email



